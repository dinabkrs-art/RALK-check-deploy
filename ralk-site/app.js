/* RALK website — shared script: language, theme, pricing, header/footer */

const CONFIG = {
  CONTACT_EMAIL: "info@ralk.io",
  // Licence orders: same-origin path, proxied by vercel.json to the RALK backend
  ORDER_ENDPOINT: "/api/licence-order",
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

    heroEyebrow:"Compliance & financial-crime training",
    heroTitle:"Every employee trained. *Ready for every partner.*",
    heroLead:"Banks, investors, international partners and new markets expect companies with proven compliance. RALK trains every employee to recognise fraud, corruption, sanctions breaches, money laundering, data leaks and cyber attacks, tailored to their role, sector and country, and documents it with certificates anyone can verify.",
    heroBuy:"Get a licence", heroCheck:"Free 10-minute compliance check",
    heroNote:"Annual licence from USD 45 per employee. No set-up fee.",
    rotPre:"Train every team against",
    rotWords:["fraud","corruption","sanctions breaches","money laundering","data leaks","cyber attacks"],
    mockTitle:"Team progress", mockLive:"Live", mockCert:"Certificate verified", mockCertS:"Valid for 12 months, QR check",
    mockRai:"RAI: this payment request shows 3 red flags. Report it internally.", mockReport:"Audit report ready",
    k1:"modules covering every financial-crime risk", k2:"to tailor a training to your company", k3:"of certificates verifiable online", k4:"learning on any device",
    platEyebrow:"The platform", platTitle:"Proof for every partner, in one place",
    platLead:"Progress per team, module and country, certificates anyone can verify and reports you can hand to partners, banks, management, auditors and supervisors.",
    platPoints:["Live dashboard per team and module","Certificates with QR verification","Reports for audits and inspections","HR import and automatic reminders"],
    dashTitle:"Completion by team", dashTeams:["Front office","Finance","Procurement","Management","IT","HR"], floatCta:"Free compliance check",
    stat1:"9 modules", stat1s:"from fraud and corruption to sanctions, data and cyber",
    stat2:"Role-based", stat2s:"front office, compliance, management",
    stat3:"Proof on request", stat3s:"for partners, banks and auditors",

    whyEyebrow:"Why RALK",
    whyTitle:"Compliance decides who you can do business with.",
    whyLead:"Before they work with you, banks, investors, large buyers and public clients check your compliance: due diligence questionnaires, KYC reviews, tender conditions. Laws on bribery, sanctions, money laundering and data protection add their own training duties. Companies that can show trained staff gain access to new markets and partners. Classroom training is expensive, quickly outdated and hard to document.",
    why1t:"Access to markets and partners", why1:"Show banks, investors and partners that every employee knows the rules, in due diligence, onboarding and tenders.",
    why2t:"Always current", why2:"Every training is written fresh for your company, so updates to rules, sanctions and typologies reach your staff with their next training.",
    why3t:"Fewer incidents", why3:"Employees who recognise red flags stop fraud, bribery and cyber attacks before they cost money, licences or reputation.",

    howEyebrow:"How it works", howTitle:"Live in one day, without anyone on site.",
    how1t:"Get your licence", how1:"Choose the number of employees, accept the licence terms online and receive your invoice.",
    how2t:"Import your staff", how2:"Upload your employee list or connect your HR system. Each person gets their own access.",
    how3t:"Staff train on their own", how3:"Short, role-based modules with real scenarios and an assessment, on any device.",
    how4t:"You keep the evidence", how4:"Dashboard, reports and certificates for management, partners, auditors and the regulator.",

    modEyebrow:"Modules", modTitle:"One platform for all financial-crime risks",
    modLead:"Every employee completes all 9 modules. Scenarios, red flags and examples adapt to each learner's role, sector and country. The AML module covers KYC, beneficial owners, politically exposed persons and suspicious transaction reports.",
    mods:["Fraud prevention", "Anti-bribery & corruption", "Sanctions & embargo", "AML/CFT, KYC & PEP", "Data protection", "Cybersecurity", "AI & financial crime", "Crypto & virtual assets", "Whistleblower protection"],

    forEyebrow:"Who it is for", forTitle:"For every organisation exposed to financial crime",
    forLead:"Regulated firms must train their staff by law. Every company that wants to work with banks, international partners or public buyers needs proof of compliance too, in mining, energy, telecoms, construction and trade.",
    fors:["Banks","Microfinance institutions","Fintechs, PSPs & e-money","Mobile money","Money transfer & forex","Insurers","Asset managers & brokers","Crypto / VASPs","Law firms, notaries, accountants","Regulators & public bodies","Professional associations","Mining, oil & gas","Telecoms & energy","Construction & trade","Corporates & NGOs"],

    voiceEyebrow:"Pilot partners", voiceTitle:"Tested in practice",
    voice1:"A well-designed tool, calibrated to operational needs. An excellent initiative that we encourage.",
    voice1r:"President, Congoinvest 360, RALK pilot partner",
    voice2:"The design choice is right. By tying each module to the learner's profile instead of distributing one undifferentiated content, RALK makes a choice consistent with the risk-based approach, precisely where most AML/CFT training falls short.",
    voice2r:"Expert in financial intelligence units and asset recovery, CoDA / African Union; former President of the Agency for the Prevention and Fight against Corruption (APLC), DR Congo",
    priceEyebrow:"Pricing", priceTitle:"Simple annual licence per employee",
    priceLead:"One fixed rate per employee, based on the size of your organisation. All 9 modules included, no set-up fee. A classroom course costs about USD 460 per participant for a single topic.",
    perEmp:"/ employee / year",
    bandHead:"Employees", rateHead:"Price per employee / year", upTo:"up to {n}", over:"more than {n}",
    inclTitle:"Included in every licence", incl:["All 9 modules","Role-based training with real scenarios","Certificates & verification","Manager dashboard & reports","HR import","Email support"],
    inclBig:"From 1,001 employees: dedicated onboarding contact",
    minNote:"Minimum annual licence: USD 5,000. When an organisation grows into a cheaper band, its licence never costs less than the largest organisation of the band below.",
    fixedNote:"Fixed published prices, the same for every customer. Volume discounts are already built in; there are no individual discounts.",
    taxNote:"Prices are net amounts in USD. Taxes and levies in the customer's country are added to the price (licence terms, section 6).",
    calcTitle:"Calculate your licence", calcLabel:"Number of employees to train",
    calcRate:"Rate per employee", calcTotal:"Annual licence", calcMin:"Minimum annual licence applies",
    calcBuy:"Continue to order", calcFloor:"Band transition rule applies", calcEff:"Effective price per employee",

    cmpEyebrow:"Compare", cmpTitle:"More training for less money than the classroom",
    cmpLead:"Organisations often pay more for classroom courses that cover fewer topics, reach fewer people and are outdated within months.",
    cmpOldT:"Classroom compliance course", cmpOldP:"≈ USD 460 per participant",
    cmpOld:["One-off, typically 3–5 days","Usually one topic only","Travel and time away from work","Same content for every role","Paper attendance list as evidence"],
    cmpNewT:"RALK licence", cmpNewP:"USD 45–65 per employee per year",
    cmpNew:["All year, short modules on any device","9 financial-crime modules included","No travel, no time away from customers","Adapted to each role, sector and country","Verifiable certificates and audit reports"],
    faqEyebrow:"FAQ", faqTitle:"Questions before you start", faqAll:"Show the {n} questions", faqLess:"Hide questions", carPrev:"Previous topics", carNext:"Next topics",
    faq:[
      ["How long does the training take?", "Each employee completes short modules of about 10 minutes, each with a real-life scenario and a short test. Training can be paused and continued at any time, on any device."],
      ["Which topics are covered?", "9 modules: fraud, bribery and corruption, sanctions, money laundering (incl. KYC and PEP), data protection, cybersecurity, AI-enabled crime, crypto assets and whistleblowing. Every employee completes all 9; scenarios and examples are tailored to their role, sector and country."],
      ["Is the content adapted to our company?", "Yes. RALK tailors every training to your sector, your country's rules and each learner's role. A cashier, a buyer and a board member see different situations."],
      ["How do we prove the training to partners, banks and auditors?", "Every completion produces a certificate with a QR code that anyone can verify online, including your partners and their compliance teams. Management sees progress per team and module and can export reports for due diligence, audits and inspections."],
      ["Does the training need to be repeated?", "Certificates are valid for 12 months. With each annual licence your staff complete a refreshed training that includes new rules, sanctions and typologies."],
      ["How do employees get access?", "You import your staff list or connect your HR system. Employees sign in with your company code or with their Microsoft or Google work account. Nothing needs to be installed."],
      ["Which languages are available?", "English and French. Further languages on request."],
      ["How is our data protected?", "RALK processes only the data needed for training and certificates, under the GDPR and a data processing agreement with your organisation. Access is restricted to your administrators."],
      ["Can we try RALK first?", "Yes. The free 10-minute compliance check shows where your organisation stands and which modules your teams need."],
      ["How do we pay?", "By invoice and bank transfer in USD (or EUR on request). Invoices are due within 14 days. Access is activated on payment or, for public bodies, on receipt of the purchase order."],
      ["How long does the licence run?", "12 months. It renews automatically unless you cancel at least 30 days before the end of the term."],
      ["Can we add employees later?", "Yes. Additional seats can be booked at any time at the rate of your size band."],
      ["Can we negotiate the price?", "No. Like Google Workspace or Microsoft 365, RALK uses one published price list for everyone. Volume discounts are already included in the size bands."],
      ["Is RALK legal advice?", "No. RALK provides training. It supports, but does not replace, your compliance function and legal advice."]
    ],

    ctaTitle:"Start training your team this week.",
    ctaLead:"Get your licence online in a few minutes, or check your current risk first, free of charge.",

    footRights:"© 2026 RALK. All rights reserved.",
    footLicence:"Licence terms", footPrivacy:"Privacy", footCookies:"Cookie settings", footImprint:"Legal notice", footTerms:"Terms of use",

    /* order page */
    oTitle:"Order your RALK licence", oLead:"Fill in your details, accept the licence terms and receive your invoice by email.",
    oStep1:"1 · Organisation", oStep2:"2 · Licence", oStep3:"3 · Confirm",
    fOrg:"Organisation name", fCountry:"Country", fSector:"Type of organisation", fAddress:"Billing address",
    fTax:"Tax ID / company registration no. (optional)", fSeats:"Number of employees to train",
    fContact:"Contact person (full name)", fRole:"Function / title", fEmail:"Business email", fPhone:"Phone / WhatsApp",
    fPo:"Purchase order number (optional)", fNotes:"Notes (optional)",
    fCurrency:"Invoice currency",
    fAccept:"I accept the RALK Licence Terms on behalf of the organisation named above and confirm that I am authorised to do so.",
    fTaxAck:"I acknowledge that any withholding tax or similar levy is borne by our organisation in addition to the price, so that RALK receives the full invoiced amount.",
    fSubmit:"Place binding order", fSending:"Sending…",
    sumTitle:"Your licence", sumSeats:"Employees", sumRate:"Rate per employee / year", sumTerm:"Term",
    sumTermV:"12 months, renews annually", sumTotal:"Annual licence (net)", sumSetup:"Set-up fee", sumSetupV:"none",
    errReq:"Please fill in all required fields and accept the licence terms.",
    errSend:"The order could not be sent. Please try again or email us at info@ralk.io.",
    okTitle:"Thank you, your order has been received.",
    okLead:"We will send your invoice and the countersigned order confirmation to {email} within one business day. Your access to app.ralk.io is activated as soon as payment (or your purchase order) is received.",
    okRef:"Order reference", okPrint:"Print / save as PDF", okBack:"Back to ralk.io",
    sectors:["Bank","Microfinance institution","Fintech / PSP / e-money","Mobile money operator","Money transfer / forex bureau","Insurance","Investment / asset management","Crypto / VASP","Law firm / notary / accountant","Regulator / public body","Professional association","Mining / oil & gas","Telecoms / energy","Construction / trade","Corporate / other company","NGO / non-profit","Other"]
  },

  fr: {
    navProduct:"Produit", navModules:"Modules", navPricing:"Tarifs", navFaq:"FAQ",
    navLogin:"Connexion", navBuy:"Obtenir une licence",

    heroEyebrow:"Formation conformité & criminalité financière",
    heroTitle:"Chaque collaborateur formé. *Prêt pour chaque partenaire.*",
    heroLead:"Banques, investisseurs, partenaires internationaux et nouveaux marchés attendent des entreprises une conformité démontrée. RALK forme chaque collaborateur à reconnaître la fraude, la corruption, les violations de sanctions, le blanchiment, les fuites de données et les cyberattaques, selon sa fonction, son secteur et son pays, et le documente par des certificats vérifiables par tous.",
    heroBuy:"Obtenir une licence", heroCheck:"Diagnostic conformité gratuit en 10 minutes",
    heroNote:"Licence annuelle à partir de 45 USD par collaborateur. Sans frais de mise en place.",
    rotPre:"Formez chaque équipe contre",
    rotWords:["la fraude","la corruption","les violations de sanctions","le blanchiment","les fuites de données","les cyberattaques"],
    mockTitle:"Progression de l'équipe", mockLive:"En direct", mockCert:"Certificat vérifié", mockCertS:"Valable 12 mois, contrôle QR",
    mockRai:"RAI : cette demande de paiement présente 3 signaux d'alerte. Signalez-la en interne.", mockReport:"Rapport d'audit prêt",
    k1:"modules couvrant tous les risques de criminalité financière", k2:"pour adapter une formation à votre entreprise", k3:"des certificats vérifiables en ligne", k4:"formation sur tout appareil",
    platEyebrow:"La plateforme", platTitle:"La preuve pour chaque partenaire, au même endroit",
    platLead:"Progression par équipe, module et pays, certificats vérifiables par tous et rapports à remettre aux partenaires, banques, direction, auditeurs et superviseurs.",
    platPoints:["Tableau de bord en direct par équipe et module","Certificats avec vérification QR","Rapports pour audits et contrôles","Import RH et relances automatiques"],
    dashTitle:"Taux de réalisation par équipe", dashTeams:["Front office","Finance","Achats","Direction","Informatique","RH"], floatCta:"Diagnostic gratuit",
    stat1:"9 modules", stat1s:"de la fraude et la corruption aux sanctions, données et cyber",
    stat2:"Par fonction", stat2s:"front office, conformité, direction",
    stat3:"Preuve sur demande", stat3s:"pour partenaires, banques et auditeurs",

    whyEyebrow:"Pourquoi RALK",
    whyTitle:"La conformité décide avec qui vous pouvez faire affaire.",
    whyLead:"Avant de travailler avec vous, banques, investisseurs, grands clients et acheteurs publics vérifient votre conformité : questionnaires de due diligence, revues KYC, conditions d'appels d'offres. Les lois sur la corruption, les sanctions, le blanchiment et la protection des données imposent en outre des obligations de formation. Les entreprises qui prouvent la formation de leurs équipes accèdent à de nouveaux marchés et partenaires. La formation en salle est coûteuse, vite dépassée et difficile à documenter.",
    why1t:"Accès aux marchés et aux partenaires", why1:"Montrez aux banques, investisseurs et partenaires que chaque collaborateur connaît les règles, lors des due diligences, de l'entrée en relation et des appels d'offres.",
    why2t:"Toujours à jour", why2:"Chaque formation est rédigée à neuf pour votre entreprise : les évolutions des règles, sanctions et typologies atteignent vos équipes dès leur prochaine formation.",
    why3t:"Moins d'incidents", why3:"Des collaborateurs qui reconnaissent les signaux d'alerte stoppent fraude, corruption et cyberattaques avant qu'elles ne coûtent de l'argent, des licences ou la réputation.",

    howEyebrow:"Fonctionnement", howTitle:"Opérationnel en une journée, sans déplacement.",
    how1t:"Obtenez votre licence", how1:"Choisissez le nombre de collaborateurs, acceptez les conditions de licence en ligne et recevez votre facture.",
    how2t:"Importez vos équipes", how2:"Téléversez la liste du personnel ou connectez votre SIRH. Chaque personne reçoit son propre accès.",
    how3t:"Vos équipes se forment en autonomie", how3:"Modules courts par fonction, avec des cas réels et une évaluation, sur tout appareil.",
    how4t:"Vous conservez les preuves", how4:"Tableau de bord, rapports et certificats pour la direction, les partenaires, les auditeurs et le régulateur.",

    modEyebrow:"Modules", modTitle:"Une plateforme pour tous les risques de criminalité financière",
    modLead:"Chaque collaborateur suit les 9 modules. Scénarios, signaux d'alerte et exemples s'adaptent à sa fonction, son secteur et son pays. Le module LBC/FT couvre le KYC, les bénéficiaires effectifs, les personnes politiquement exposées et les déclarations de soupçon.",
    mods:["Prévention de la fraude", "Anti-corruption", "Sanctions & embargos", "LBC/FT, KYC & PPE", "Protection des données", "Cybersécurité", "IA & criminalité financière", "Crypto & actifs virtuels", "Protection des lanceurs d'alerte"],

    forEyebrow:"Pour qui", forTitle:"Pour toute organisation exposée à la criminalité financière",
    forLead:"Les entreprises assujetties doivent former leur personnel par la loi. Toute entreprise qui veut travailler avec des banques, des partenaires internationaux ou des acheteurs publics doit aussi prouver sa conformité, dans les mines, l'énergie, les télécoms, le BTP et le commerce.",
    fors:["Banques","Institutions de microfinance","Fintechs, PSP & monnaie électronique","Mobile money","Transfert d'argent & bureaux de change","Assurances","Gestion d'actifs & courtiers","Crypto / PSAV","Avocats, notaires, experts-comptables","Régulateurs & organismes publics","Ordres et associations professionnelles","Mines, pétrole & gaz","Télécoms & énergie","BTP & commerce","Entreprises & ONG"],

    voiceEyebrow:"Partenaires pilotes", voiceTitle:"Éprouvé sur le terrain",
    voice1:"Outil bien conçu et calibré aux besoins opérationnels. Une excellente initiative que nous encourageons.",
    voice1r:"Président, Congoinvest 360, partenaire pilote RALK",
    voice2:"Le parti pris de conception est juste. En conditionnant la génération du module au profil de l'apprenant plutôt qu'en diffusant un contenu unique et indifférencié, RALK opère un choix cohérent avec l'approche fondée sur les risques, précisément là où la plupart des dispositifs de formation en LBC/FT révèlent leurs insuffisances.",
    voice2r:"Expert FFI et recouvrement des avoirs, CoDA / Union Africaine ; ancien Président de l'Agence de Prévention et de Lutte contre la Corruption (APLC), RD Congo",
    priceEyebrow:"Tarifs", priceTitle:"Une licence annuelle simple, par collaborateur",
    priceLead:"Un tarif fixe par collaborateur, selon la taille de votre organisation. Les 9 modules inclus, sans frais de mise en place. Une formation en salle coûte environ 460 USD par participant pour un seul thème.",
    perEmp:"/ collaborateur / an",
    bandHead:"Collaborateurs", rateHead:"Prix par collaborateur / an", upTo:"jusqu'à {n}", over:"plus de {n}",
    inclTitle:"Inclus dans chaque licence", incl:["Les 9 modules","Formation par fonction avec cas réels","Certificats & vérification","Tableau de bord & rapports","Import RH","Support par e-mail"],
    inclBig:"Dès 1 001 collaborateurs : interlocuteur dédié pour la mise en place",
    minNote:"Licence annuelle minimale : 5 000 USD. Lorsqu'une organisation passe dans une tranche moins chère, sa licence ne coûte jamais moins que celle de la plus grande organisation de la tranche précédente.",
    fixedNote:"Prix fixes et publics, identiques pour tous les clients. Les remises sur volume sont déjà intégrées ; il n'y a pas de remise individuelle.",
    taxNote:"Prix nets en USD. Les impôts et taxes du pays du client s'ajoutent au prix (conditions de licence, article 6).",
    calcTitle:"Calculez votre licence", calcLabel:"Nombre de collaborateurs à former",
    calcRate:"Tarif par collaborateur", calcTotal:"Licence annuelle", calcMin:"La licence annuelle minimale s'applique",
    calcBuy:"Passer à la commande", calcFloor:"Règle de passage de tranche appliquée", calcEff:"Prix effectif par collaborateur",

    cmpEyebrow:"Comparer", cmpTitle:"Plus de formation, pour moins cher qu'en salle",
    cmpLead:"Les organisations paient souvent davantage pour des formations en salle qui couvrent moins de thèmes, touchent moins de personnes et sont dépassées en quelques mois.",
    cmpOldT:"Formation conformité en salle", cmpOldP:"≈ 460 USD par participant",
    cmpOld:["Ponctuelle, souvent 3 à 5 jours","En général un seul thème","Déplacements et absence du poste","Même contenu pour toutes les fonctions","Feuille de présence papier comme preuve"],
    cmpNewT:"Licence RALK", cmpNewP:"45–65 USD par collaborateur et par an",
    cmpNew:["Toute l'année, modules courts sur tout appareil","9 modules de criminalité financière inclus","Sans déplacement, sans quitter les clients","Adapté à chaque fonction, secteur et pays","Certificats vérifiables et rapports d'audit"],
    faqEyebrow:"FAQ", faqTitle:"Vos questions avant de commencer", faqAll:"Afficher les {n} questions", faqLess:"Masquer les questions", carPrev:"Thèmes précédents", carNext:"Thèmes suivants",
    faq:[
      ["Combien de temps dure la formation ?", "Chaque collaborateur suit des modules courts d'environ 10 minutes, chacun avec un cas réel et un court test. La formation peut être interrompue et reprise à tout moment, sur tout appareil."],
      ["Quels thèmes sont couverts ?", "9 modules : fraude, corruption, sanctions, blanchiment (dont KYC et PPE), protection des données, cybersécurité, criminalité liée à l'IA, crypto-actifs et lanceurs d'alerte. Chaque collaborateur suit les 9 ; scénarios et exemples sont adaptés à sa fonction, son secteur et son pays."],
      ["Le contenu est-il adapté à notre entreprise ?", "Oui. RALK adapte chaque formation à votre secteur, à la réglementation de votre pays et à la fonction de chaque apprenant. Un caissier, un acheteur et un administrateur voient des situations différentes."],
      ["Comment prouver la formation aux partenaires, banques et auditeurs ?", "Chaque formation réussie donne lieu à un certificat avec QR code, vérifiable en ligne par tous, y compris vos partenaires et leurs équipes conformité. La direction suit la progression par équipe et par module et exporte des rapports pour les due diligences, audits et contrôles."],
      ["La formation doit-elle être renouvelée ?", "Les certificats sont valables 12 mois. Avec chaque licence annuelle, vos équipes suivent une formation actualisée intégrant les nouvelles règles, sanctions et typologies."],
      ["Comment les collaborateurs accèdent-ils à la plateforme ?", "Vous importez la liste du personnel ou connectez votre SIRH. Les collaborateurs se connectent avec le code entreprise ou leur compte professionnel Microsoft ou Google. Aucune installation n'est nécessaire."],
      ["Quelles langues sont disponibles ?", "Anglais et français. D'autres langues sur demande."],
      ["Comment nos données sont-elles protégées ?", "RALK ne traite que les données nécessaires à la formation et aux certificats, conformément au RGPD et à un accord de traitement des données conclu avec votre organisation. L'accès est réservé à vos administrateurs."],
      ["Peut-on tester RALK avant ?", "Oui. Le diagnostic conformité gratuit de 10 minutes montre où en est votre organisation et de quels modules vos équipes ont besoin."],
      ["Comment payer ?", "Par facture et virement bancaire en USD (ou en EUR sur demande). Les factures sont payables sous 14 jours. L'accès est activé à réception du paiement ou, pour les organismes publics, du bon de commande."],
      ["Quelle est la durée de la licence ?", "12 mois. Elle se renouvelle automatiquement, sauf résiliation au moins 30 jours avant la fin de la période."],
      ["Peut-on ajouter des collaborateurs plus tard ?", "Oui. Des places supplémentaires peuvent être ajoutées à tout moment au tarif de votre tranche."],
      ["Peut-on négocier le prix ?", "Non. Comme Google Workspace ou Microsoft 365, RALK applique une seule grille tarifaire publique pour tous. Les remises sur volume sont déjà intégrées aux tranches."],
      ["RALK est-il un conseil juridique ?", "Non. RALK fournit de la formation. Elle soutient votre fonction conformité et vos conseils juridiques, sans les remplacer."]
    ],

    ctaTitle:"Formez vos équipes dès cette semaine.",
    ctaLead:"Obtenez votre licence en ligne en quelques minutes, ou évaluez d'abord votre risque, gratuitement.",

    footRights:"© 2026 RALK. Tous droits réservés.",
    footLicence:"Conditions de licence", footPrivacy:"Confidentialité", footCookies:"Paramètres des cookies", footImprint:"Mentions légales", footTerms:"Conditions d'utilisation",

    oTitle:"Commander votre licence RALK", oLead:"Renseignez vos coordonnées, acceptez les conditions de licence et recevez votre facture par e-mail.",
    oStep1:"1 · Organisation", oStep2:"2 · Licence", oStep3:"3 · Confirmation",
    fOrg:"Nom de l'organisation", fCountry:"Pays", fSector:"Type d'organisation", fAddress:"Adresse de facturation",
    fTax:"N° fiscal / RCCM (facultatif)", fSeats:"Nombre de collaborateurs à former",
    fContact:"Personne de contact (nom complet)", fRole:"Fonction", fEmail:"E-mail professionnel", fPhone:"Téléphone / WhatsApp",
    fPo:"N° de bon de commande (facultatif)", fNotes:"Remarques (facultatif)",
    fCurrency:"Devise de facturation",
    fAccept:"J'accepte les Conditions de licence RALK au nom de l'organisation ci-dessus et confirme être habilité(e) à le faire.",
    fTaxAck:"Je reconnais que toute retenue à la source ou taxe similaire est à la charge de notre organisation en plus du prix, afin que RALK perçoive l'intégralité du montant facturé.",
    fSubmit:"Passer la commande ferme", fSending:"Envoi…",
    sumTitle:"Votre licence", sumSeats:"Collaborateurs", sumRate:"Tarif par collaborateur / an", sumTerm:"Durée",
    sumTermV:"12 mois, renouvelable chaque année", sumTotal:"Licence annuelle (net)", sumSetup:"Frais de mise en place", sumSetupV:"aucun",
    errReq:"Veuillez remplir tous les champs obligatoires et accepter les conditions de licence.",
    errSend:"La commande n'a pas pu être envoyée. Veuillez réessayer ou nous écrire à info@ralk.io.",
    okTitle:"Merci, votre commande a bien été reçue.",
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
    if(typeof v !== "string") return;
    if(v.includes("*")) el.innerHTML = v.split("*").map((p,i) => { const e = p.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); return i % 2 ? `<em class="g">${e}</em>` : e; }).join("");
    else el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-label]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nLabel)));
  document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nAria).replace(/\*/g, "")));
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
      <nav class="main" aria-label="Main">
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
      <nav aria-label="Footer">
        <a href="/licence" data-i18n="footLicence"></a>
        <a href="${CONFIG.CHECK_URL}/terms" data-i18n="footTerms"></a>
        <a href="${CONFIG.CHECK_URL}/privacy" data-i18n="footPrivacy"></a>
        <a href="#" data-cookie-settings data-i18n="footCookies"></a>
        <a href="/imprint" data-i18n="footImprint"></a>
        <a href="mailto:${CONFIG.CONTACT_EMAIL}">${CONFIG.CONTACT_EMAIL}</a>
      </nav>
    </div>`;
}

/* ---------- Motion: scroll reveal, card spotlight, header shadow ---------- */
const MOTION_OK = !navigator.webdriver && "IntersectionObserver" in window &&
  !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
if(MOTION_OK) document.documentElement.classList.add("fx");
function motion(){
  const header = document.querySelector("header.top");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive:true }); onScroll();
  document.querySelectorAll(".mod,.tier").forEach(el => el.addEventListener("pointermove", e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (e.clientX - r.left) + "px"); el.style.setProperty("--my", (e.clientY - r.top) + "px");
  }));
  guilloche(); rotator(); floatCta(); carousel();
  const hv = document.getElementById("heroVisual");
  if(hv && MOTION_OK && matchMedia("(pointer:fine)").matches){
    hv.addEventListener("pointermove", e => { const r = hv.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      hv.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg"); hv.style.setProperty("--ry", (x * 10).toFixed(2) + "deg"); });
    hv.addEventListener("pointerleave", () => { hv.style.setProperty("--rx","0deg"); hv.style.setProperty("--ry","0deg"); });
  }
  if(!MOTION_OK) return;
  const cio = new IntersectionObserver(es => es.forEach(e => { if(!e.isIntersecting) return; cio.unobserve(e.target);
    const el = e.target, to = +el.dataset.to, t0 = performance.now(), dur = 1400;
    const step = now => { const k = Math.min(1, (now - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if(k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step); }), { threshold: .6 });
  document.querySelectorAll(".count").forEach(el => { el.textContent = "0"; cio.observe(el); });
  const bio = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("go"); bio.unobserve(e.target); } }), { threshold: .3 });
  document.querySelectorAll(".bars,.rings").forEach(el => bio.observe(el));
  const sel = ".band-grid > div:first-child, .grid.g2 > *, section:not(.hero) .eyebrow, section:not(.hero) h2, section:not(.hero) .lead, section:not(.hero) .card, .chip, .mod, .kpi, .tier, .calc, .taxnote, .incl, .ticks li, .dash, section:not(.hero) .note";
  const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }),
    { rootMargin:"0px 0px -8% 0px", threshold:0.08 });
  const seen = new Map();
  document.querySelectorAll(sel).forEach(el => {
    const parent = el.parentElement; const i = seen.get(parent) || 0; seen.set(parent, i + 1);
    el.style.setProperty("--d", Math.min(i, 8) * 0.07 + "s");
    el.classList.add("rv");
    if(el.matches(".band-grid > div:first-child, .why .card:nth-child(1), .grid.g2 > :first-child, .voice-grid > :first-child, .calc > .card:first-child")) el.classList.add("rv-l");
    if(el.matches(".dash, .why .card:nth-child(3), .grid.g2 > :last-child, .calc > .card:last-child")) el.classList.add("rv-r");
    io.observe(el);
  });
}

/* ---------- Guilloché (security-print line work, as on banknotes and certificates) ---------- */
function hypo(R, r, d, turns, steps){
  let pts = [];
  for(let i = 0; i <= steps; i++){
    const t = i / steps * Math.PI * 2 * turns, k = (R - r) / r;
    pts.push(((R - r) * Math.cos(t) + d * Math.cos(k * t)).toFixed(1) + "," + ((R - r) * Math.sin(t) - d * Math.sin(k * t)).toFixed(1));
  }
  return "M" + pts.join("L");
}
function guilloche(){
  if(navigator.webdriver) return;   // decorative; keep the prerendered HTML small
  const NS = "http://www.w3.org/2000/svg";
  const ros = document.getElementById("rosette");
  if(ros && !ros.childElementCount){
    // wavy rings, each drawn many times with a tiny phase shift: the interlaced mesh of security printing
    const ring = (R, a, n, copies, cls) => {
      const g = document.createElementNS(NS, "g"); g.setAttribute("class", cls);
      for(let c = 0; c < copies; c++){
        const ph = c / copies * Math.PI * 2 / n; let d = "";
        for(let i = 0; i <= 720; i++){
          const t = i / 720 * Math.PI * 2, rr = R + a * Math.cos(n * t + ph * n) * Math.cos(t * 2 + c * 0.35) ;
          d += (i ? "L" : "M") + (rr * Math.cos(t)).toFixed(1) + "," + (rr * Math.sin(t)).toFixed(1);
        }
        const path = document.createElementNS(NS, "path"); path.setAttribute("d", d); g.appendChild(path);
      }
      ros.appendChild(g);
    };
    ring(172, 12, 36, 14, "g0"); ring(138, 20, 24, 16, "g1"); ring(98, 24, 16, 16, "g2"); ring(54, 22, 10, 12, "g3");
  }
  const wave = (svg, rows, amp, w, h) => {
    if(!svg || svg.childElementCount) return;
    for(let j = 0; j < rows; j++){
      let d = "";
      for(let x = 0; x <= w; x += 6){
        const y = h/2 + Math.sin(x/38 + j*0.55) * amp + Math.sin(x/97 - j*0.3) * amp*0.6;
        d += (x ? "L" : "M") + x + "," + y.toFixed(1);
      }
      const path = document.createElementNS(NS, "path"); path.setAttribute("d", d); svg.appendChild(path);
    }
  };
  wave(document.getElementById("guilBand"), 9, 11, 1200, 60);
  document.querySelectorAll('svg[data-guil="wave"]').forEach(svg => wave(svg, 14, 40, 1200, 220));
}

function carousel(){
  const track = document.getElementById("modList"); if(!track) return;
  const step = () => { const card = track.querySelector(".mod"); return card ? card.getBoundingClientRect().width + 14 : 260; };
  const go = dir => {
    const max = track.scrollWidth - track.clientWidth - 2;
    if(dir > 0 && track.scrollLeft >= max) track.scrollTo({ left: 0, behavior: "smooth" });
    else if(dir < 0 && track.scrollLeft <= 2) track.scrollTo({ left: max, behavior: "smooth" });
    else track.scrollBy({ left: dir * step(), behavior: "smooth" });
  };
  document.getElementById("modPrev")?.addEventListener("click", () => go(-1));
  document.getElementById("modNext")?.addEventListener("click", () => go(1));
  track.addEventListener("keydown", e => { if(e.key === "ArrowRight"){ e.preventDefault(); go(1); } if(e.key === "ArrowLeft"){ e.preventDefault(); go(-1); } });
  if(!MOTION_OK) return;
  let paused = false;
  ["pointerenter","focusin","touchstart"].forEach(ev => track.parentElement.addEventListener(ev, () => paused = true, { passive:true }));
  ["pointerleave","focusout"].forEach(ev => track.parentElement.addEventListener(ev, () => paused = false));
  setInterval(() => { if(!paused && !document.hidden) go(1); }, 3200);
}

function rotator(){
  const el = document.getElementById("rot"); if(!el) return;
  const words = t("rotWords"); let i = 0; el.textContent = words[0];
  if(!MOTION_OK) return;
  clearInterval(window.__rot);
  window.__rot = setInterval(() => { el.classList.add("out");
    setTimeout(() => { i = (i + 1) % words.length; el.textContent = t("rotWords")[i]; el.classList.remove("out"); }, 380); }, 2400);
}
function floatCta(){
  const b = document.getElementById("floatCta"), hero = document.querySelector(".hero"); if(!b || !hero) return;
  const upd = () => b.classList.toggle("show", window.scrollY > hero.offsetHeight * .7);
  window.addEventListener("scroll", upd, { passive:true }); upd();
}

/* ---------- Star rain in the hero (as on the app.ralk.io login page) ---------- */
function starRain(){
  const hero = document.querySelector(".hero");
  if(!hero || navigator.webdriver) return;
  let c = hero.querySelector("canvas.stars");
  if(!c){ c = document.createElement("canvas"); c.className = "stars"; c.setAttribute("aria-hidden","true"); hero.prepend(c); }
  if(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = c.getContext("2d"), COLORS = ["#FFD700","#FFC200","#FFE066","#FFAA00","#FFF0A0"];
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), stars = [], raf = 0;
  const size = () => { w = hero.clientWidth; h = hero.clientHeight; c.width = w*dpr; c.height = h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); };
  const make = () => ({ x: Math.random()*w, y: Math.random()*h, s: 1.2 + Math.random()*3, v: 0.25 + Math.random()*0.8,
                        o: 0.35 + Math.random()*0.55, tw: Math.random()*Math.PI*2, col: COLORS[Math.floor(Math.random()*COLORS.length)] });
  size(); stars = Array.from({ length: w < 600 ? 40 : 80 }, make);
  const light = () => document.documentElement.dataset.theme === "light";
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const k = light() ? 0.55 : 1;
    for(const s of stars){
      s.y -= s.v; s.tw += 0.03;
      if(s.y + s.s < 0){ s.y = h + s.s; s.x = Math.random()*w; }
      ctx.globalAlpha = s.o * k * (0.65 + 0.35*Math.sin(s.tw));
      ctx.fillStyle = s.col; ctx.shadowColor = s.col; ctx.shadowBlur = s.s*3;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.s/2, 0, Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    raf = requestAnimationFrame(draw);
  };
  window.addEventListener("resize", size);
  document.addEventListener("visibilitychange", () => { cancelAnimationFrame(raf); if(!document.hidden) raf = requestAnimationFrame(draw); });
  raf = requestAnimationFrame(draw);
}

applyTheme();
document.addEventListener("DOMContentLoaded", () => {
  const pl = document.documentElement.dataset.pageLang;
  if(pl) store("ralk_lang", pl);          // keep the language on /order, /licence …
  renderChrome(); applyTheme(); applyI18n(); starRain(); motion();
});

/* ---------- Google Ads measurement (consent mode v2) ----------
   Nothing is stored until the visitor accepts; before that Google only gets
   cookieless pings. Skipped during prerendering (navigator.webdriver). */
const ADS = { ID: "AW-18520098546", ORDER_LABEL: "ysdxCKn8hKEdEPKNif9E" };
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
function adsConsent(){ try{ return localStorage.getItem("ralk_consent"); }catch(e){ return null; } }
function initAds(){
  if(navigator.webdriver) return;
  const granted = adsConsent() === "granted" ? "granted" : "denied";
  gtag("consent", "default", { ad_storage: granted, ad_user_data: granted, ad_personalization: granted, analytics_storage: granted });
  const s = document.createElement("script");
  s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + ADS.ID;
  document.head.appendChild(s);
  gtag("js", new Date()); gtag("config", ADS.ID);
  if(!adsConsent()) consentBanner();
}
function consentBanner(){
  const fr = getLang() === "fr";
  const b = document.createElement("div");
  b.className = "consent"; b.setAttribute("role", "dialog"); b.setAttribute("aria-label", fr ? "Cookies" : "Cookies");
  b.innerHTML = `<p>${fr
      ? "Nous utilisons des cookies Google Ads pour mesurer l'efficacité de nos annonces. Acceptez-vous ?"
      : "We use Google Ads cookies to measure how well our ads work. Do you accept?"}
    <a href="${CONFIG.CHECK_URL}/privacy">${fr ? "Confidentialité" : "Privacy"}</a></p>
    <div><button type="button" data-c="denied" class="btn ghost">${fr ? "Refuser" : "Decline"}</button>
    <button type="button" data-c="granted" class="btn">${fr ? "Accepter" : "Accept"}</button></div>`;
  b.addEventListener("click", e => {
    const v = e.target.dataset && e.target.dataset.c; if(!v) return;
    try{ localStorage.setItem("ralk_consent", v); }catch(err){}
    gtag("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
    b.remove();
  });
  document.body.appendChild(b);
}
/* Called by the order page once the backend has stored the order. */
function trackOrder(p){
  gtag("event", "conversion", { send_to: ADS.ID + "/" + ADS.ORDER_LABEL,
    value: Number(p.annual_licence_net_usd) || 0, currency: "USD", transaction_id: p.order_reference });
}
document.addEventListener("DOMContentLoaded", initAds);
/* Footer "Cookie settings": withdraw or change consent at any time. */
document.addEventListener("click", e => {
  const a = e.target.closest && e.target.closest("[data-cookie-settings]"); if(!a) return;
  e.preventDefault();
  try{ localStorage.removeItem("ralk_consent"); }catch(err){}
  gtag("consent", "update", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
  if(!document.querySelector(".consent")) consentBanner();
});
