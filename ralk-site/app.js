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
    { max: 4000,     rate: 65 },
    { max: 7999,     rate: 50 },
    { max: Infinity, rate: 45 }
  ],
  minimumAnnual: 5000
};
function rateFor(n){ return PRICING.tiers.find(t => n <= t.max).rate; }
function quote(n){
  n = Math.max(1, Math.floor(Number(n) || 0));
  const rate = rateFor(n);
  const list = n * rate;
  const total = Math.max(list, PRICING.minimumAnnual);
  return { seats:n, rate, list, total, minimumApplied: total > list };
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
    heroLead:"RALK is AI-powered e-learning that trains your staff on anti-money laundering, sanctions, fraud, corruption, data protection and cyber risk — tailored to their role, sector and country, with certificates you can show your regulator and auditors.",
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

    forEyebrow:"Who it is for", forTitle:"Built for regulated organisations",
    fors:["Banks","Microfinance institutions","Fintechs, PSPs & e-money","Mobile money","Money transfer & forex","Insurers","Asset managers & brokers","Crypto / VASPs","Law firms, notaries, accountants","Regulators & public bodies","Professional associations","Corporates & NGOs"],

    priceEyebrow:"Pricing", priceTitle:"Simple annual licence per employee",
    priceLead:"One fixed rate per employee, based on the size of your organisation. All modules included. No set-up fee.",
    perEmp:"/ employee / year",
    t1:"Up to 4,000 employees", t2:"4,001 – 7,999 employees", t3:"8,000+ employees",
    incl:["All 13 modules","Role-based AI training","Certificates & verification","Manager dashboard & reports","HR import","Email support"],
    inclBig:"Plus dedicated onboarding contact",
    minNote:"Minimum annual licence: USD 5,000.",
    taxNote:"All prices are net amounts in USD. Any withholding tax or similar levy in the customer's country is the sole responsibility of the customer and is borne in addition to the price, so that RALK as the contractor receives the full invoiced amount.",
    calcTitle:"Calculate your licence", calcLabel:"Number of employees to train",
    calcRate:"Rate per employee", calcTotal:"Annual licence", calcMin:"Minimum annual licence applies",
    calcBuy:"Continue to order",

    faqEyebrow:"FAQ", faqTitle:"Questions before you start",
    faq:[
      ["How do we pay?","By invoice and bank transfer in USD (or EUR on request). Invoices are due within 14 days; access is activated on payment or, for public bodies, on receipt of the purchase order."],
      ["What about withholding tax?","Prices are net. If withholding tax or a similar levy applies in your country, it is borne by you in addition to the price, so that RALK receives the full invoiced amount."],
      ["Do we need anyone on site?","No. Everything runs online: ordering, onboarding, training and reporting. Our team supports you by email or video call."],
      ["Which languages are available?","English and French. Further languages on request."],
      ["Can we add employees later?","Yes. Additional seats can be booked at any time at the rate of your size band."],
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
    sectors:["Bank","Microfinance institution","Fintech / PSP / e-money","Mobile money operator","Money transfer / forex bureau","Insurance","Investment / asset management","Crypto / VASP","Law firm / notary / accountant","Regulator / public body","Professional association","Corporate / other company","NGO / non-profit","Other"]
  },

  fr: {
    navProduct:"Produit", navModules:"Modules", navPricing:"Tarifs", navFaq:"FAQ",
    navLogin:"Connexion", navBuy:"Obtenir une licence",

    heroEyebrow:"Formation conformité criminalité financière pour l'Afrique",
    heroTitle:"Chaque collaborateur formé. Chaque contrôle maîtrisé.",
    heroLead:"RALK est une plateforme d'e-learning propulsée par l'IA qui forme vos équipes à la lutte contre le blanchiment, aux sanctions, à la fraude, à la corruption, à la protection des données et au risque cyber — adaptée à leur fonction, leur secteur et leur pays, avec des certificats à présenter à votre régulateur et à vos auditeurs.",
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

    forEyebrow:"Pour qui", forTitle:"Conçu pour les organisations assujetties",
    fors:["Banques","Institutions de microfinance","Fintechs, PSP & monnaie électronique","Mobile money","Transfert d'argent & bureaux de change","Assurances","Gestion d'actifs & courtiers","Crypto / PSAV","Avocats, notaires, experts-comptables","Régulateurs & organismes publics","Ordres et associations professionnelles","Entreprises & ONG"],

    priceEyebrow:"Tarifs", priceTitle:"Une licence annuelle simple, par collaborateur",
    priceLead:"Un tarif fixe par collaborateur, selon la taille de votre organisation. Tous les modules inclus. Sans frais de mise en place.",
    perEmp:"/ collaborateur / an",
    t1:"Jusqu'à 4 000 collaborateurs", t2:"4 001 – 7 999 collaborateurs", t3:"8 000 collaborateurs et plus",
    incl:["Les 13 modules","Formation IA par fonction","Certificats & vérification","Tableau de bord & rapports","Import RH","Support par e-mail"],
    inclBig:"Plus un interlocuteur dédié pour la mise en place",
    minNote:"Licence annuelle minimale : 5 000 USD.",
    taxNote:"Tous les prix s'entendent nets, en USD. Toute retenue à la source ou taxe similaire applicable dans le pays du client est à la charge exclusive du client et s'ajoute au prix, de sorte que RALK, en tant que prestataire, perçoive l'intégralité du montant facturé.",
    calcTitle:"Calculez votre licence", calcLabel:"Nombre de collaborateurs à former",
    calcRate:"Tarif par collaborateur", calcTotal:"Licence annuelle", calcMin:"La licence annuelle minimale s'applique",
    calcBuy:"Passer à la commande",

    faqEyebrow:"FAQ", faqTitle:"Vos questions avant de commencer",
    faq:[
      ["Comment payer ?","Par facture et virement bancaire en USD (ou en EUR sur demande). Les factures sont payables sous 14 jours ; l'accès est activé à réception du paiement ou, pour les organismes publics, du bon de commande."],
      ["Et la retenue à la source ?","Les prix sont nets. Si une retenue à la source ou une taxe similaire s'applique dans votre pays, elle est à votre charge en plus du prix, afin que RALK perçoive l'intégralité du montant facturé."],
      ["Faut-il une présence sur place ?","Non. Tout se fait en ligne : commande, mise en place, formation et reporting. Notre équipe vous accompagne par e-mail ou visioconférence."],
      ["Quelles langues sont disponibles ?","Français et anglais. D'autres langues sur demande."],
      ["Peut-on ajouter des collaborateurs plus tard ?","Oui. Des licences supplémentaires peuvent être ajoutées à tout moment au tarif de votre tranche."],
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
    sectors:["Banque","Institution de microfinance","Fintech / PSP / monnaie électronique","Opérateur de mobile money","Transfert d'argent / bureau de change","Assurance","Investissement / gestion d'actifs","Crypto / PSAV","Avocat / notaire / expert-comptable","Régulateur / organisme public","Ordre / association professionnelle","Entreprise / autre société","ONG / association","Autre"]
  }
};

/* ---------- Language & theme ---------- */
function store(k, v){ try{ if(v===undefined) return localStorage.getItem(k); localStorage.setItem(k, v); }catch(e){ return null; } }
function getLang(){
  const q = new URLSearchParams(location.search).get("lang");
  if(q === "en" || q === "fr") return q;
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
function toggleLang(){ store("ralk_lang", getLang() === "en" ? "fr" : "en");
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
document.addEventListener("DOMContentLoaded", () => { renderChrome(); applyTheme(); applyI18n(); });
