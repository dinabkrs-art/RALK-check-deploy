/* RALK website — shared script: language, theme, pricing, header/footer */

const CONFIG = {
  CONTACT_EMAIL: "info@ralk.io",
  // Licence orders are sent here (same form service as check.ralk.io)
  ORDER_ENDPOINT: "https://formsubmit.co/ajax/contact@ralk.io",
  APP_URL: "https://app.ralk.io",
  CHECK_URL: "https://check.ralk.io",
  TERMS_VERSION: "2026-10"
};

/* ---------- Pricing (RALK price model, no set-up fee) ----------
   Annual licence per employee, fixed rate by company size, USD. */
const PRICING = {
  currency: "USD",
  tiers: [
    { max: 1000,     rate: 65 },
    { max: 10000,    rate: 55 },
    { max: Infinity, rate: 45 }
  ],
  minimumAnnual: 5000
};
function tierIndex(n){ return PRICING.tiers.findIndex(t => n <= t.max); }
function rateFor(n){ return PRICING.tiers[tierIndex(n)].rate; }
/* Fixed price list, no negotiation. Moving into a cheaper size band never
   makes the licence cheaper than the largest organisation of the band below
   (no price cliff at band boundaries). */
function quote(n){
  n = Math.max(1, Math.floor(Number(n) || 0));
  const i = tierIndex(n), rate = PRICING.tiers[i].rate;
  const list = n * rate;
  const bandFloor = PRICING.tiers.slice(0, i).reduce((m, t) => Math.max(m, t.max * t.rate), 0);
  const total = Math.max(list, bandFloor, PRICING.minimumAnnual);
  return { seats:n, rate, list, total,
           minimumApplied: total === PRICING.minimumAnnual && total > list,
           bandFloorApplied: total === bandFloor && total > list,
           effective: total / n };
}
function bandLabel(i){
  const T = PRICING.tiers, loc = getLang() === "fr" ? "fr-FR" : "en-US", f = n => n.toLocaleString(loc);
  if(i === 0) return t("upTo").replace("{n}", f(T[0].max));
  if(T[i].max === Infinity) return t("over").replace("{n}", f(T[i-1].max));
  return `${f(T[i-1].max + 1)} – ${f(T[i].max)}`;
}
function money(v){
  const lang = getLang();
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US",
    { style:"currency", currency:PRICING.currency, maximumFractionDigits:0 }).format(v);
}

/* ---------- Texts ---------- */
const I18N = {
  en: {
    navProduct:"Product", navModules:"Modules", navPricing:"Pricing", navFaq:"FAQ",
    navLogin:"Log in", navBuy:"Get a licence",

    heroEyebrow:"Financial-crime compliance training for Africa",
    heroTitle:"Every employee trained. Every audit answered.",
    heroLead:"RALK is e-learning that trains your staff on anti-money laundering, sanctions, fraud, corruption, data protection and cyber risk — tailored to their role, sector and country, with certificates you can show your regulator and auditors.",
    heroBuy:"Get a licence", heroCheck:"Free 10-minute compliance check",
    heroNote:"Annual licence from USD 45 per employee. No set-up fee.",
    stat1:"13 risk areas", stat1s:"from AML/KYC to AI and whistleblowing",
    stat2:"Role-based", stat2s:"front office, compliance, management",
    stat3:"Audit-ready", stat3s:"certificates, reports, verification",

    whyEyebrow:"Why RALK",
    whyTitle:"Regulators expect proof that your people are trained.",
    whyLead:"FATF standards and national AML laws oblige banks, fintechs, insurers, money transfer operators and professionals to train their staff — and to prove it in inspections. Classic classroom training is expensive, quickly outdated and hard to document.",
    why1t:"Required by law", why1:"Training obligations under national AML/CFT laws and FATF Recommendation 18 — checked in every inspection.",
    why2t:"Always current", why2:"New sanctions, typologies and rules flow into the training continuously — no outdated slide decks.",
    why3t:"Documented automatically", why3:"Every completion is recorded with a certificate and a verifiable reference for supervisors and auditors.",

    howEyebrow:"How it works", howTitle:"Live in one day — without anyone on site.",
    how1t:"Get your licence", how1:"Choose the number of employees, accept the licence terms online and receive your invoice.",
    how2t:"Import your staff", how2:"Upload your employee list or connect your HR system. Each person gets their own access.",
    how3t:"Staff train on their own", how3:"Short, role-based modules with real scenarios and an assessment — on any device.",
    how4t:"You keep the evidence", how4:"Dashboard, reports and certificates for management, auditors and the regulator.",

    modEyebrow:"Modules", modTitle:"One platform for all financial-crime risks",
    modLead:"Content adapts to each learner's role, sector and country, based on FATF standards and local regulation.",
    mods:["Sanctions & embargo","AML/CFT & KYC","Beneficial ownership","PEP & enhanced due diligence","Monitoring & suspicious transaction reports","Crypto / virtual assets","Fraud prevention","Anti-bribery & corruption","Data protection","Cybersecurity","AI & financial crime","Governance, audit & training","Whistleblower protection"],

    forEyebrow:"Who it is for", forTitle:"For every organisation exposed to financial crime",
    forLead:"Regulated firms must train their staff by law. Every other company faces fraud, bribery and sanctions risk too — in mining, energy, telecoms, construction and trade.",
    fors:["Banks","Microfinance institutions","Fintechs, PSPs & e-money","Mobile money","Money transfer & forex","Insurers","Asset managers & brokers","Crypto / VASPs","Law firms, notaries, accountants","Regulators & public bodies","Professional associations","Mining, oil & gas","Telecoms & energy","Construction & trade","Corporates & NGOs"],

    priceEyebrow:"Pricing", priceTitle:"Simple annual licence per employee",
    priceLead:"One fixed rate per employee, based on the size of your organisation. All modules included. No set-up fee.",
    perEmp:"/ employee / year",
    bandHead:"Employees", rateHead:"Price per employee / year", upTo:"up to {n}", over:"more than {n}",
    inclTitle:"Included in every licence", incl:["All 13 modules","Role-based training with real scenarios","Certificates & verification","Manager dashboard & reports","HR import","Email support"],
    inclBig:"From 1,001 employees: dedicated onboarding contact",
    minNote:"Minimum annual licence: USD 5,000. When an organisation grows into a cheaper band, its licence never costs less than the largest organisation of the band below.",
    fixedNote:"Fixed published prices — the same for every customer. Volume discounts are already built in; there are no individual discounts.",
    taxNote:"All prices are net amounts in USD. Any withholding tax or similar levy in the customer's country is the sole responsibility of the customer and is borne in addition to the price, so that RALK as the contractor receives the full invoiced amount.",
    calcTitle:"Calculate your licence", calcLabel:"Number of employees to train",
    calcRate:"Rate per employee", calcTotal:"Annual licence", calcMin:"Minimum annual licence applies",
    calcBuy:"Continue to order", calcFloor:"Band transition rule applies", calcEff:"Effective price per employee",

    cmpEyebrow:"Compare", cmpTitle:"More training for less money than the classroom",
    cmpLead:"Organisations often pay more for classroom courses that cover fewer topics, reach fewer people and are outdated within months.",
    cmpOldT:"Classroom AML course", cmpOldP:"≈ USD 460 per participant",
    cmpOld:["One-off, typically 3–5 days","Usually one topic (AML/KYC)","Travel and time away from work","Same content for every role","Paper attendance list as evidence"],
    cmpNewT:"RALK licence", cmpNewP:"USD 45–65 per employee per year",
    cmpNew:["All year, short modules on any device","13 financial-crime topics included","No travel, no time away from customers","Adapted to each role, sector and country","Verifiable certificates and audit reports"],
    faqEyebrow:"FAQ", faqTitle:"Questions before you start",
    faq:[
      ["How do we pay?","By invoice and bank transfer in USD (or EUR on request). Invoices are due within 14 days; access is activated on payment or, for public bodies, on receipt of the purchase order."],
      ["What about withholding tax?","Prices are net. If withholding tax or a similar levy applies in your country, it is borne by you in addition to the price, so that RALK receives the full invoiced amount."],
      ["Do we need anyone on site?","No. Everything runs online: ordering, onboarding, training and reporting. Our team supports you by email or video call."],
      ["Which languages are available?","English and French. Further languages on request."],
      ["Can we add employees later?","Yes. Additional seats can be booked at any time at the rate of your size band."],
      ["Can we negotiate the price?","No. Like Google Workspace or Microsoft 365, RALK uses one published price list for everyone. Volume discounts are already included in the size bands, so every customer gets the same fair price."],
      ["Is RALK legal advice?","No. RALK provides training. It supports, but does not replace, your compliance function and legal advice."]
    ],

    ctaTitle:"Start training your team this week.",
    ctaLead:"Get your licence online in a few minutes — or check your current risk first, free of charge.",

    footRights:"© 2026 RALK. All rights reserved.",
    footLicence:"Licence terms", footPrivacy:"Privacy", footImprint:"Legal notice", footTerms:"Terms of use",

    /* order page */
    oTitle:"Order your RALK licence", oLead:"Fill in your details, accept the licence terms and receive your invoice by email.",
    oStep1:"1 · Organisation", oStep2:"2 · Licence", oStep3:"3 · Confirm",
    fOrg:"Organisation name", fCountry:"Country", fSector:"Type of organisation", fAddress:"Billing address",
    fTax:"Tax ID / company registration no. (optional)", fSeats:"Number of employees to train",
    fContact:"Contact person (full name)", fRole:"Function / title", fEmail:"Business email", fPhone:"Phone / WhatsApp",
    fPo:"Purchase order number (optional)", fNotes:"Notes (optional)",
    fCurrency:"Invoice currency",
    fAccept:"I accept the RALK Licence Terms (version {v}) on behalf of the organisation named above and confirm that I am authorised to do so.",
    fTaxAck:"I acknowledge that any withholding tax or similar levy is borne by our organisation in addition to the price, so that RALK receives the full invoiced amount.",
    fSubmit:"Place binding order", fSending:"Sending…",
    sumTitle:"Your licence", sumSeats:"Employees", sumRate:"Rate per employee / year", sumTerm:"Term",
    sumTermV:"12 months, renews annually", sumTotal:"Annual licence (net)", sumSetup:"Set-up fee", sumSetupV:"none",
    errReq:"Please fill in all required fields and accept the licence terms.",
    errSend:"The order could not be sent. Please try again or email us at info@ralk.io.",
    okTitle:"Thank you — your order has been received.",
    okLead:"We will send your invoice and the countersigned order confirmation to {email} within one business day. Your access to app.ralk.io is activated as soon as payment (or your purchase order) is received.",
    okRef:"Order reference", okPrint:"Print / save as PDF", okBack:"Back to ralk.io",
    sectors:["Bank","Microfinance institution","Fintech / PSP / e-money","Mobile money operator","Money transfer / forex bureau","Insurance","Investment / asset management","Crypto / VASP","Law firm / notary / accountant","Regulator / public body","Professional association","Mining / oil & gas","Telecoms / energy","Construction / trade","Corporate / other company","NGO / non-profit","Other"]
  },

  fr: {
    navProduct:"Produit", navModules:"Modules", navPricing:"Tarifs", navFaq:"FAQ",
    navLogin:"Connexion", navBuy:"Obtenir une licence",

    heroEyebrow:"Formation conformité criminalité financière pour l'Afrique",
    heroTitle:"Chaque collaborateur formé. Chaque contrôle maîtrisé.",
    heroLead:"RALK est une plateforme d'e-learning qui forme vos équipes à la lutte contre le blanchiment, aux sanctions, à la fraude, à la corruption, à la protection des données et au risque cyber — adaptée à leur fonction, leur secteur et leur pays, avec des certificats à présenter à votre régulateur et à vos auditeurs.",
    heroBuy:"Obtenir une licence", heroCheck:"Diagnostic conformité gratuit en 10 minutes",
    heroNote:"Licence annuelle à partir de 45 USD par collaborateur. Sans frais de mise en place.",
    stat1:"13 domaines de risque", stat1s:"de la LBC/FT/KYC à l'IA et aux lanceurs d'alerte",
    stat2:"Par fonction", stat2s:"front office, conformité, direction",
    stat3:"Prêt pour l'audit", stat3s:"certificats, rapports, vérification",

    whyEyebrow:"Pourquoi RALK",
    whyTitle:"Les régulateurs exigent la preuve que vos équipes sont formées.",
    whyLead:"Les normes du GAFI et les lois nationales LBC/FT obligent banques, fintechs, assureurs, sociétés de transfert d'argent et professions assujetties à former leur personnel — et à le prouver lors des contrôles. La formation en salle est coûteuse, vite dépassée et difficile à documenter.",
    why1t:"Obligation légale", why1:"Obligations de formation prévues par les lois LBC/FT nationales et la Recommandation 18 du GAFI — vérifiées à chaque contrôle.",
    why2t:"Toujours à jour", why2:"Nouvelles sanctions, typologies et réglementations intégrées en continu — fini les supports obsolètes.",
    why3t:"Documenté automatiquement", why3:"Chaque formation suivie est enregistrée avec un certificat et une référence vérifiable pour superviseurs et auditeurs.",

    howEyebrow:"Fonctionnement", howTitle:"Opérationnel en une journée — sans déplacement.",
    how1t:"Obtenez votre licence", how1:"Choisissez le nombre de collaborateurs, acceptez les conditions de licence en ligne et recevez votre facture.",
    how2t:"Importez vos équipes", how2:"Téléversez la liste du personnel ou connectez votre SIRH. Chaque personne reçoit son propre accès.",
    how3t:"Vos équipes se forment en autonomie", how3:"Modules courts par fonction, avec des cas réels et une évaluation — sur tout appareil.",
    how4t:"Vous conservez les preuves", how4:"Tableau de bord, rapports et certificats pour la direction, les auditeurs et le régulateur.",

    modEyebrow:"Modules", modTitle:"Une plateforme pour tous les risques de criminalité financière",
    modLead:"Le contenu s'adapte à la fonction, au secteur et au pays de chaque apprenant, sur la base des normes du GAFI et de la réglementation locale.",
    mods:["Sanctions & embargos","LBC/FT & KYC","Bénéficiaires effectifs","PPE & vigilance renforcée","Surveillance & déclarations de soupçon","Crypto / actifs virtuels","Prévention de la fraude","Anti-corruption","Protection des données","Cybersécurité","IA & criminalité financière","Gouvernance, audit & formation","Protection des lanceurs d'alerte"],

    forEyebrow:"Pour qui", forTitle:"Pour toute organisation exposée à la criminalité financière",
    forLead:"Les entreprises assujetties doivent former leur personnel par la loi. Toutes les autres sont aussi exposées à la fraude, à la corruption et aux sanctions — dans les mines, l'énergie, les télécoms, le BTP et le commerce.",
    fors:["Banques","Institutions de microfinance","Fintechs, PSP & monnaie électronique","Mobile money","Transfert d'argent & bureaux de change","Assurances","Gestion d'actifs & courtiers","Crypto / PSAV","Avocats, notaires, experts-comptables","Régulateurs & organismes publics","Ordres et associations professionnelles","Mines, pétrole & gaz","Télécoms & énergie","BTP & commerce","Entreprises & ONG"],

    priceEyebrow:"Tarifs", priceTitle:"Une licence annuelle simple, par collaborateur",
    priceLead:"Un tarif fixe par collaborateur, selon la taille de votre organisation. Tous les modules inclus. Sans frais de mise en place.",
    perEmp:"/ collaborateur / an",
    bandHead:"Collaborateurs", rateHead:"Prix par collaborateur / an", upTo:"jusqu'à {n}", over:"plus de {n}",
    inclTitle:"Inclus dans chaque licence", incl:["Les 13 modules","Formation par fonction avec cas réels","Certificats & vérification","Tableau de bord & rapports","Import RH","Support par e-mail"],
    inclBig:"Dès 1 001 collaborateurs : interlocuteur dédié pour la mise en place",
    minNote:"Licence annuelle minimale : 5 000 USD. Lorsqu'une organisation passe dans une tranche moins chère, sa licence ne coûte jamais moins que celle de la plus grande organisation de la tranche précédente.",
    fixedNote:"Prix fixes et publics — identiques pour tous les clients. Les remises sur volume sont déjà intégrées ; il n'y a pas de remise individuelle.",
    taxNote:"Tous les prix s'entendent nets, en USD. Toute retenue à la source ou taxe similaire applicable dans le pays du client est à la charge exclusive du client et s'ajoute au prix, de sorte que RALK, en tant que prestataire, perçoive l'intégralité du montant facturé.",
    calcTitle:"Calculez votre licence", calcLabel:"Nombre de collaborateurs à former",
    calcRate:"Tarif par collaborateur", calcTotal:"Licence annuelle", calcMin:"La licence annuelle minimale s'applique",
    calcBuy:"Passer à la commande", calcFloor:"Règle de passage de tranche appliquée", calcEff:"Prix effectif par collaborateur",

    cmpEyebrow:"Comparer", cmpTitle:"Plus de formation, pour moins cher qu'en salle",
    cmpLead:"Les organisations paient souvent davantage pour des formations en salle qui couvrent moins de thèmes, touchent moins de personnes et sont dépassées en quelques mois.",
    cmpOldT:"Formation LBC/FT en salle", cmpOldP:"≈ 460 USD par participant",
    cmpOld:["Ponctuelle, souvent 3 à 5 jours","En général un seul thème (LBC/FT/KYC)","Déplacements et absence du poste","Même contenu pour toutes les fonctions","Feuille de présence papier comme preuve"],
    cmpNewT:"Licence RALK", cmpNewP:"45–65 USD par collaborateur et par an",
    cmpNew:["Toute l'année, modules courts sur tout appareil","13 thèmes de criminalité financière inclus","Sans déplacement, sans quitter les clients","Adapté à chaque fonction, secteur et pays","Certificats vérifiables et rapports d'audit"],
    faqEyebrow:"FAQ", faqTitle:"Vos questions avant de commencer",
    faq:[
      ["Comment payer ?","Par facture et virement bancaire en USD (ou en EUR sur demande). Les factures sont payables sous 14 jours ; l'accès est activé à réception du paiement ou, pour les organismes publics, du bon de commande."],
      ["Et la retenue à la source ?","Les prix sont nets. Si une retenue à la source ou une taxe similaire s'applique dans votre pays, elle est à votre charge en plus du prix, afin que RALK perçoive l'intégralité du montant facturé."],
      ["Faut-il une présence sur place ?","Non. Tout se fait en ligne : commande, mise en place, formation et reporting. Notre équipe vous accompagne par e-mail ou visioconférence."],
      ["Quelles langues sont disponibles ?","Français et anglais. D'autres langues sur demande."],
      ["Peut-on ajouter des collaborateurs plus tard ?","Oui. Des licences supplémentaires peuvent être ajoutées à tout moment au tarif de votre tranche."],
      ["Le prix est-il négociable ?","Non. Comme Google Workspace ou Microsoft 365, RALK applique une grille tarifaire publique unique. Les remises sur volume sont déjà intégrées dans les tranches : chaque client bénéficie du même prix équitable."],
      ["RALK est-il un conseil juridique ?","Non. RALK est une solution de formation. Elle soutient votre fonction conformité sans remplacer un conseil juridique."]
    ],

    ctaTitle:"Formez vos équipes dès cette semaine.",
    ctaLead:"Obtenez votre licence en ligne en quelques minutes — ou évaluez d'abord votre risque, gratuitement.",

    footRights:"© 2026 RALK. Tous droits réservés.",
    footLicence:"Conditions de licence", footPrivacy:"Confidentialité", footImprint:"Mentions légales", footTerms:"Conditions d'utilisation",

    oTitle:"Commander votre licence RALK", oLead:"Renseignez vos coordonnées, acceptez les conditions de licence et recevez votre facture par e-mail.",
    oStep1:"1 · Organisation", oStep2:"2 · Licence", oStep3:"3 · Confirmation",
    fOrg:"Nom de l'organisation", fCountry:"Pays", fSector:"Type d'organisation", fAddress:"Adresse de facturation",
    fTax:"N° fiscal / RCCM (facultatif)", fSeats:"Nombre de collaborateurs à former",
    fContact:"Personne de contact (nom complet)", fRole:"Fonction", fEmail:"E-mail professionnel", fPhone:"Téléphone / WhatsApp",
    fPo:"N° de bon de commande (facultatif)", fNotes:"Remarques (facultatif)",
    fCurrency:"Devise de facturation",
    fAccept:"J'accepte les Conditions de licence RALK (version {v}) au nom de l'organisation ci-dessus et confirme être habilité(e) à le faire.",
    fTaxAck:"Je reconnais que toute retenue à la source ou taxe similaire est à la charge de notre organisation en plus du prix, afin que RALK perçoive l'intégralité du montant facturé.",
    fSubmit:"Passer la commande ferme", fSending:"Envoi…",
    sumTitle:"Votre licence", sumSeats:"Collaborateurs", sumRate:"Tarif par collaborateur / an", sumTerm:"Durée",
    sumTermV:"12 mois, renouvelable chaque année", sumTotal:"Licence annuelle (net)", sumSetup:"Frais de mise en place", sumSetupV:"aucun",
    errReq:"Veuillez remplir tous les champs obligatoires et accepter les conditions de licence.",
    errSend:"La commande n'a pas pu être envoyée. Veuillez réessayer ou nous écrire à info@ralk.io.",
    okTitle:"Merci — votre commande a bien été reçue.",
    okLead:"Nous enverrons votre facture et la confirmation de commande à {email} sous un jour ouvré. Votre accès à app.ralk.io est activé dès réception du paiement (ou de votre bon de commande).",
    okRef:"Référence de commande", okPrint:"Imprimer / enregistrer en PDF", okBack:"Retour à ralk.io",
    sectors:["Banque","Institution de microfinance","Fintech / PSP / monnaie électronique","Opérateur de mobile money","Transfert d'argent / bureau de change","Assurance","Investissement / gestion d'actifs","Crypto / PSAV","Avocat / notaire / expert-comptable","Régulateur / organisme public","Ordre / association professionnelle","Mines / pétrole & gaz","Télécoms / énergie","BTP / commerce","Entreprise / autre société","ONG / association","Autre"]
  }
};

/* ---------- Language & theme ---------- */
function store(k, v){ try{ if(v===undefined) return localStorage.getItem(k); localStorage.setItem(k, v); }catch(e){ return null; } }
function getLang(){
  const q = new URLSearchParams(location.search).get("lang");
  if(q === "en" || q === "fr") return q;
  const pl = document.documentElement.dataset.pageLang;   // prerendered /  and /fr pages
  if(pl === "en" || pl === "fr") return pl;
  const s = store("ralk_lang");
  if(s === "en" || s === "fr") return s;
  return (navigator.language || "en").toLowerCase().startsWith("fr") ? "fr" : "en";
}
function t(key){ return I18N[getLang()][key]; }

function applyI18n(){
  const lang = getLang();
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = t(el.dataset.i18n);
    if(typeof v === "string") el.textContent = v;
  });
  document.querySelectorAll("[data-lang]").forEach(el => { el.hidden = el.dataset.lang !== lang; });
  const lb = document.getElementById("langBtn");
  if(lb) lb.textContent = lang === "en" ? "FR" : "EN";
  document.dispatchEvent(new CustomEvent("ralk:lang"));
}
function toggleLang(){
  const next = getLang() === "en" ? "fr" : "en";
  store("ralk_lang", next);
  const pl = document.documentElement.dataset.pageLang;
  if(pl){ location.href = (next === "fr" ? "/fr" : "/") + location.hash; return; }
  const u = new URL(location.href); u.searchParams.delete("lang"); history.replaceState(null, "", u); applyI18n(); }

function getTheme(){ const s = store("ralk_theme"); return s === "light" ? "light" : "dark"; }
function applyTheme(){ document.documentElement.dataset.theme = getTheme();
  const b = document.getElementById("themeBtn"); if(b) b.textContent = getTheme() === "dark" ? "☀" : "☾"; }
function toggleTheme(){ store("ralk_theme", getTheme() === "dark" ? "light" : "dark"); applyTheme(); }

/* ---------- Header & footer ---------- */
function renderChrome(){
  const h = document.getElementById("top");
  if(h) h.innerHTML = `
    <div class="wrap">
      <a href="/" aria-label="RALK home"><img class="logo" src="/logo.png" alt="RALK"></a>
      <nav class="main">
        <a href="/#product" data-i18n="navProduct"></a>
        <a href="/#modules" data-i18n="navModules"></a>
        <a href="/#pricing" data-i18n="navPricing"></a>
        <a href="/#faq" data-i18n="navFaq"></a>
        <a href="${CONFIG.APP_URL}" data-i18n="navLogin"></a>
      </nav>
      <div class="tools">
        <button class="tbtn" id="langBtn" onclick="toggleLang()" aria-label="Language">FR</button>
        <button class="tbtn" id="themeBtn" onclick="toggleTheme()" aria-label="Theme">☀</button>
        <a class="btn sm" href="/order" data-i18n="navBuy"></a>
      </div>
    </div>`;
  const f = document.getElementById("foot");
  if(f) f.innerHTML = `
    <div class="wrap">
      <div><img class="logo" src="/logo.png" alt="RALK" style="height:18px;display:inline-block;vertical-align:middle">
        &nbsp; <span data-i18n="footRights"></span></div>
      <nav>
        <a href="/licence" data-i18n="footLicence"></a>
        <a href="${CONFIG.CHECK_URL}/terms" data-i18n="footTerms"></a>
        <a href="${CONFIG.CHECK_URL}/privacy" data-i18n="footPrivacy"></a>
        <a href="/imprint" data-i18n="footImprint"></a>
        <a href="mailto:${CONFIG.CONTACT_EMAIL}">${CONFIG.CONTACT_EMAIL}</a>
      </nav>
    </div>`;
}

applyTheme();
document.addEventListener("DOMContentLoaded", () => {
  const pl = document.documentElement.dataset.pageLang;
  if(pl) store("ralk_lang", pl);          // keep the language on /order, /licence …
  renderChrome(); applyTheme(); applyI18n();
});
