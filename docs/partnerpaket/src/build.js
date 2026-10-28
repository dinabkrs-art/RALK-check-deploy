// Renders the partner pack (NDA, partner agreement, partner guide; EN/FR) to A4 PDFs.
// Usage: NODE_PATH=$(npm root -g) node docs/partnerpaket/src/build.js
// RALK's postal address is set once here; leave the placeholder until the imprint is updated.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ADDRESS = '<span class="fill">address as per imprint</span>';
const SRC = __dirname;
const OUT = path.resolve(SRC, '..');
const DOCS = [
  'nda-en', 'nda-fr',
  'partner-agreement-en', 'partner-agreement-fr',
  'partner-guide-en', 'partner-guide-fr',
];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage();
  for (const name of DOCS) {
    const html = fs.readFileSync(path.join(SRC, name + '.html'), 'utf8').replaceAll('{{ADDRESS}}', ADDRESS);
    const tmp = path.join(SRC, '.render-' + name + '.html');
    fs.writeFileSync(tmp, html, 'utf8');
    await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const fr = name.endsWith('-fr');
    if (name.startsWith('partner-guide')) {
      // One-pager: shrink slightly until it fits on one A4 page (same approach as the procurement pack).
      await page.setViewportSize({ width: 688, height: 1000 });
      await page.evaluate(() => {
        let z = 1;
        while (document.documentElement.scrollHeight > 1010 && z > 0.8) {
          z = Math.round((z - 0.01) * 100) / 100;
          document.body.style.zoom = String(z);
        }
      });
    }
    await page.pdf({
      path: path.join(OUT, name + '.pdf'),
      format: 'A4',
      printBackground: true,
      margin: { top: '12mm', bottom: '14mm', left: '14mm', right: '14mm' },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%;font-family:Inter,Arial,sans-serif;font-size:7px;color:#777;padding:0 14mm;display:flex;justify-content:space-between;">
        <span>RALK · info@ralk.io · ralk.io</span><span>${fr ? 'Version octobre 2026' : 'Version October 2026'} · Page <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    });
    fs.unlinkSync(tmp);
    console.log('ok', name);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
