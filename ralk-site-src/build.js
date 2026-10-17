// Prerenders the ralk.io homepage (EN at /, FR at /fr) so search engines and
// link previews get the full text without running JavaScript.
// Usage: node ralk-site-src/build.js   (needs Playwright + Chromium)
const http = require("http"), fs = require("fs"), path = require("path");
const { chromium } = require("playwright");

const SITE = path.join(__dirname, "..", "ralk-site");
const TEMPLATE = path.join(__dirname, "index.html");
const TYPES = { ".html":"text/html", ".js":"text/javascript", ".css":"text/css", ".png":"image/png", ".svg":"image/svg+xml" };

const META = {
  en: { url:"https://ralk.io/",
        title:"RALK — Financial-crime compliance training for Africa",
        desc:"Compliance e-learning for banks, fintechs, insurers, mining, telecoms and every company in Africa: AML/CFT, sanctions, fraud, corruption, data protection, cyber. Annual licence from USD 45 per employee." },
  fr: { url:"https://ralk.io/fr",
        title:"RALK — Formation conformité LBC/FT et criminalité financière pour l'Afrique",
        desc:"E-learning conformité pour banques, fintechs, assurances, mines, télécoms et toutes les entreprises en Afrique : LBC/FT, sanctions, fraude, corruption, protection des données, cyber. Licence annuelle dès 45 USD par collaborateur." }
};

const server = http.createServer((req, res) => {
  const u = new URL(req.url, "http://x");
  const file = u.pathname === "/__template" ? TEMPLATE : path.join(SITE, decodeURIComponent(u.pathname));
  if (!file.startsWith(SITE) && file !== TEMPLATE) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
});

(async () => {
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const port = server.address().port;
  const browser = await chromium.launch(fs.existsSync("/opt/pw-browsers/chromium") ? { executablePath:"/opt/pw-browsers/chromium" } : {});
  for (const lang of ["en", "fr"]) {
    const page = await browser.newPage();
    await page.route("**/fonts.googleapis.com/**", r => r.abort());
    await page.goto(`http://127.0.0.1:${port}/__template?lang=${lang}`);
    await page.waitForFunction(() => document.getElementById("faqList").children.length > 0);
    let html = "<!doctype html>\n" + await page.evaluate(() => document.documentElement.outerHTML);
    const m = META[lang];
    html = html
      .replace(/<html[^>]*>/, `<html lang="${lang}" data-theme="dark" data-page-lang="${lang}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${m.title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${m.desc}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${m.desc}`)
      .replace(/(<meta property="og:url" content=")[^"]*/, `$1${m.url}`)
      .replace(/(<link rel="canonical" href=")[^"]*/, `$1${m.url}`);
    const out = lang === "en" ? path.join(SITE, "index.html") : path.join(SITE, "fr", "index.html");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    console.log("wrote", path.relative(process.cwd(), out), html.length, "bytes");
    await page.close();
  }
  await browser.close(); server.close();
})();
