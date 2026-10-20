// Generates the topic landing pages (one per training module, EN and FR):
//   ralk-site/training/<slug>.html      -> https://ralk.io/training/<slug>
//   ralk-site/fr/formation/<slug>.html  -> https://ralk.io/fr/formation/<slug>
// Usage: node ralk-site-src/topics.js   (plain Node, no browser needed)
// Order of TOPICS = order of the module list ("mods") in ralk-site/app.js.
const fs = require("fs"), path = require("path");
const SITE = path.join(__dirname, "..", "ralk-site");
const BASE = "https://ralk.io";

const TOPICS = [
  { en: { slug:"fraud-prevention", name:"Fraud prevention",
      title:"Fraud prevention training for employees",
      desc:"Online fraud prevention training for every employee: payment and invoice fraud, CEO fraud, internal fraud and red flags, adapted to each role. Licence from USD 45 per employee.",
      lead:"Most fraud succeeds because one employee does not recognise the warning signs. RALK trains every member of staff to spot and stop fraud attempts in their own daily work.",
      why:"Fraud is one of the most frequent predicate offences behind money laundering and a direct cost for every organisation. Fake supplier invoices, changed bank details, CEO fraud and internal manipulation all rely on people acting quickly and alone. Trained employees slow down, verify and report.",
      learn:["The most common fraud patterns: invoice and payment fraud, CEO fraud, identity and document fraud, internal fraud","Red flags in requests, documents and customer behaviour","The four-eyes principle and call-back verification before payments","What to do when something looks wrong and whom to inform","Real cases from their own sector and role"],
      who:"Finance and accounting, procurement, customer service and front office, branch staff, management and anyone who approves or makes payments." },
    fr: { slug:"prevention-fraude", name:"Prévention de la fraude",
      title:"Formation prévention de la fraude pour vos collaborateurs",
      desc:"Formation en ligne à la prévention de la fraude pour chaque collaborateur : fraude au paiement et à la facture, fraude au président, fraude interne, signaux d'alerte. Dès 45 USD par collaborateur.",
      lead:"La plupart des fraudes réussissent parce qu'un collaborateur ne reconnaît pas les signaux d'alerte. RALK forme chaque membre du personnel à repérer et à stopper les tentatives de fraude dans son travail quotidien.",
      why:"La fraude est l'une des infractions sous-jacentes les plus fréquentes du blanchiment et un coût direct pour toute organisation. Fausses factures, changement de coordonnées bancaires, fraude au président et manipulations internes misent toutes sur une réaction rapide et isolée. Des collaborateurs formés prennent le temps de vérifier et de signaler.",
      learn:["Les schémas de fraude les plus courants : fraude à la facture et au paiement, fraude au président, fraude documentaire et à l'identité, fraude interne","Les signaux d'alerte dans les demandes, les documents et le comportement des clients","Le principe des quatre yeux et le contre-appel avant tout paiement","Que faire lorsqu'une situation paraît anormale et qui informer","Des cas réels issus de leur secteur et de leur fonction"],
      who:"Finance et comptabilité, achats, service client et front office, agences, direction et toute personne qui valide ou exécute des paiements." } },

  { en: { slug:"anti-bribery", name:"Anti-bribery & corruption",
      title:"Anti-bribery and corruption training for employees",
      desc:"Online anti-bribery and corruption training: gifts, facilitation payments, conflicts of interest and third parties, adapted to each role. Licence from USD 45 per employee.",
      lead:"Partners, investors and public buyers expect a clear stance against bribery. RALK shows every employee where the line is and how to say no.",
      why:"The United Nations Convention against Corruption obliges states to criminalise bribery, and international partners, lenders and public tenders increasingly require proof of an anti-bribery programme with staff training. Corruption is also a key predicate offence in the FATF standards, and politically exposed persons call for enhanced due diligence.",
      learn:["What counts as bribery, including small facilitation payments","Gifts, hospitality and invitations: what is acceptable and what must be declared","Conflicts of interest and how to disclose them","Risks from agents, intermediaries and other third parties","How to refuse a request and report it safely"],
      who:"Sales and business development, procurement, management, staff dealing with public officials, licences or customs, and all employees." },
    fr: { slug:"anti-corruption", name:"Anti-corruption",
      title:"Formation anti-corruption pour vos collaborateurs",
      desc:"Formation en ligne anti-corruption : cadeaux, paiements de facilitation, conflits d'intérêts et tiers, adaptée à chaque fonction. Dès 45 USD par collaborateur.",
      lead:"Partenaires, investisseurs et acheteurs publics attendent une position claire contre la corruption. RALK montre à chaque collaborateur où se situe la limite et comment dire non.",
      why:"La Convention des Nations unies contre la corruption oblige les États à incriminer la corruption, et les partenaires internationaux, bailleurs et marchés publics exigent de plus en plus la preuve d'un programme anti-corruption avec formation du personnel. La corruption est aussi une infraction sous-jacente majeure dans les standards du GAFI, et les personnes politiquement exposées exigent une vigilance renforcée.",
      learn:["Ce qui constitue de la corruption, y compris les petits paiements de facilitation","Cadeaux, hospitalité et invitations : ce qui est acceptable et ce qui doit être déclaré","Les conflits d'intérêts et comment les déclarer","Les risques liés aux agents, intermédiaires et autres tiers","Comment refuser une sollicitation et la signaler en sécurité"],
      who:"Commercial et développement, achats, direction, personnel en contact avec des agents publics, des licences ou la douane, et tous les collaborateurs." } },

  { en: { slug:"sanctions", name:"Sanctions & embargo",
      title:"Sanctions and embargo training for employees",
      desc:"Online sanctions training: targeted financial sanctions, asset freezing, screening and embargoes, adapted to each role and kept up to date. Licence from USD 45 per employee.",
      lead:"A single payment to a sanctioned party can freeze correspondent relationships and trigger heavy penalties. RALK trains your staff to recognise sanctions risk before it becomes a breach.",
      why:"FATF Recommendations 6 and 7 require countries to implement targeted financial sanctions without delay, including those of the United Nations Security Council. Banks and international partners expect their counterparties to screen and freeze correctly. Sanctions lists change constantly, so training has to stay current.",
      learn:["What targeted financial sanctions and embargoes are","How screening works and what a potential match means","Asset freezing: the immediate steps and what must not happen","Evasion techniques: front companies, changed names, trade routes","Escalation and documentation of sanctions alerts"],
      who:"Payments and operations, trade finance, onboarding and KYC teams, compliance, procurement and logistics." },
    fr: { slug:"sanctions", name:"Sanctions & embargos",
      title:"Formation sanctions et embargos pour vos collaborateurs",
      desc:"Formation en ligne aux sanctions : sanctions financières ciblées, gel des avoirs, filtrage et embargos, adaptée à chaque fonction et mise à jour. Dès 45 USD par collaborateur.",
      lead:"Un seul paiement à une partie sanctionnée peut geler des relations de correspondance et entraîner de lourdes sanctions. RALK forme votre personnel à reconnaître le risque avant qu'il ne devienne une violation.",
      why:"Les Recommandations 6 et 7 du GAFI exigent la mise en œuvre sans délai des sanctions financières ciblées, notamment celles du Conseil de sécurité des Nations unies. Les banques et partenaires internationaux attendent de leurs contreparties un filtrage et un gel corrects. Les listes évoluent en permanence : la formation doit rester à jour.",
      learn:["Ce que sont les sanctions financières ciblées et les embargos","Le fonctionnement du filtrage et la signification d'une correspondance potentielle","Le gel des avoirs : les premières mesures et ce qu'il ne faut surtout pas faire","Les techniques de contournement : sociétés écrans, changements de noms, routes commerciales","L'escalade et la documentation des alertes sanctions"],
      who:"Paiements et opérations, financement du commerce, entrée en relation et KYC, conformité, achats et logistique." } },

  { en: { slug:"aml-cft", name:"AML/CFT, KYC & PEP",
      title:"AML/CFT, KYC and PEP training for employees",
      desc:"Online anti-money laundering and counter-terrorist financing training based on FATF standards: KYC, PEPs, red flags and suspicious transaction reporting. Licence from USD 45 per employee.",
      lead:"FATF Recommendation 18 requires ongoing employee training as part of every AML/CFT programme. RALK delivers it for each role, with proof for supervisors and auditors.",
      why:"Supervisors and correspondent banks check whether staff know how to identify customers, recognise suspicious activity and report it. FATF Recommendations 10, 12 and 20 set out customer due diligence, politically exposed persons and suspicious transaction reporting. Generic slides do not prepare a teller, a relationship manager and a board member for the same risk.",
      learn:["Customer due diligence and beneficial ownership","Politically exposed persons and enhanced due diligence","Red flags of money laundering and terrorist financing in their own activity","Suspicious transaction reports: when, how and the ban on tipping-off","Record keeping and the risk-based approach"],
      who:"Front office and tellers, relationship managers, onboarding and KYC, operations, compliance and audit, management and board." },
    fr: { slug:"lbc-ft", name:"LBC/FT, KYC & PPE",
      title:"Formation LBC/FT, KYC et PPE pour vos collaborateurs",
      desc:"Formation en ligne à la lutte contre le blanchiment et le financement du terrorisme fondée sur les standards du GAFI : KYC, PPE, signaux d'alerte et déclaration de soupçon. Dès 45 USD par collaborateur.",
      lead:"La Recommandation 18 du GAFI exige une formation continue du personnel dans tout dispositif LBC/FT. RALK la délivre pour chaque fonction, avec les preuves pour les superviseurs et les auditeurs.",
      why:"Superviseurs et banques correspondantes vérifient si le personnel sait identifier les clients, reconnaître une activité suspecte et la déclarer. Les Recommandations 10, 12 et 20 du GAFI encadrent la vigilance à l'égard de la clientèle, les personnes politiquement exposées et la déclaration d'opérations suspectes. Des diapositives génériques ne préparent pas de la même façon un guichetier, un chargé de clientèle et un administrateur.",
      learn:["La vigilance à l'égard de la clientèle et les bénéficiaires effectifs","Les personnes politiquement exposées et la vigilance renforcée","Les signaux d'alerte de blanchiment et de financement du terrorisme dans leur activité","La déclaration de soupçon : quand, comment, et l'interdiction d'en informer le client","La conservation des documents et l'approche fondée sur les risques"],
      who:"Front office et guichets, chargés de clientèle, entrée en relation et KYC, opérations, conformité et audit, direction et conseil d'administration." } },

  { en: { slug:"data-protection", name:"Data protection",
      title:"Data protection training for employees",
      desc:"Online data protection training: personal data, lawful processing, data breaches and customer rights, adapted to each role. Licence from USD 45 per employee.",
      lead:"Customer data is valuable to your business and to criminals. RALK shows every employee how to handle personal data correctly and what to do when something goes wrong.",
      why:"A growing number of countries have national data protection laws with supervisory authorities and sanctions, and European partners expect GDPR-level care when they share data with you. Most data breaches start with a human mistake: a wrong recipient, an unlocked file, a request that nobody checked.",
      learn:["What personal data is and which data is especially sensitive","Lawful purposes, data minimisation and retention","Sharing data with colleagues, partners and authorities","Recognising and reporting a data breach immediately","Customer rights and how to respond to requests"],
      who:"Customer service, HR, sales and marketing, IT, operations and every employee who works with customer or staff data." },
    fr: { slug:"protection-donnees", name:"Protection des données",
      title:"Formation protection des données pour vos collaborateurs",
      desc:"Formation en ligne à la protection des données : données personnelles, traitement licite, violations de données et droits des clients, adaptée à chaque fonction. Dès 45 USD par collaborateur.",
      lead:"Les données clients ont de la valeur pour votre entreprise et pour les criminels. RALK montre à chaque collaborateur comment traiter correctement les données personnelles et que faire en cas d'incident.",
      why:"De plus en plus de pays disposent d'une loi sur la protection des données avec une autorité de contrôle et des sanctions, et les partenaires européens attendent un niveau de protection comparable au RGPD lorsqu'ils partagent des données avec vous. La plupart des violations de données commencent par une erreur humaine : un mauvais destinataire, un fichier non protégé, une demande non vérifiée.",
      learn:["Ce que sont les données personnelles et quelles données sont particulièrement sensibles","Les finalités licites, la minimisation et la durée de conservation","Le partage de données avec des collègues, des partenaires et des autorités","Reconnaître et signaler immédiatement une violation de données","Les droits des clients et comment répondre à leurs demandes"],
      who:"Service client, RH, commercial et marketing, informatique, opérations et tout collaborateur qui traite des données de clients ou du personnel." } },

  { en: { slug:"cybersecurity", name:"Cybersecurity",
      title:"Cybersecurity awareness training for employees",
      desc:"Online cybersecurity awareness training: phishing, social engineering, passwords, mobile devices and incident reporting, adapted to each role. Licence from USD 45 per employee.",
      lead:"Attackers rarely break in; they are let in. RALK trains every employee to recognise phishing and manipulation and to react correctly.",
      why:"Phishing, business email compromise and social engineering remain the most common entry points for cyber attacks and payment fraud. Technical controls help, but the decision to click, to share a code or to approve a transfer is made by a person.",
      learn:["Recognising phishing emails, SMS and messaging scams","Social engineering by phone and in person","Strong passwords, two-factor authentication and safe use of mobile devices","Handling attachments, links, USB drives and public Wi-Fi","Reporting incidents quickly and without fear"],
      who:"All employees, with role-specific cases for finance, IT, customer service and management." },
    fr: { slug:"cybersecurite", name:"Cybersécurité",
      title:"Formation de sensibilisation à la cybersécurité",
      desc:"Formation en ligne de sensibilisation à la cybersécurité : hameçonnage, ingénierie sociale, mots de passe, appareils mobiles et signalement des incidents. Dès 45 USD par collaborateur.",
      lead:"Les attaquants entrent rarement par effraction : on leur ouvre la porte. RALK forme chaque collaborateur à reconnaître l'hameçonnage et la manipulation et à réagir correctement.",
      why:"L'hameçonnage, la compromission de messagerie et l'ingénierie sociale restent les points d'entrée les plus fréquents des cyberattaques et des fraudes au paiement. Les outils techniques aident, mais la décision de cliquer, de transmettre un code ou de valider un virement est prise par une personne.",
      learn:["Reconnaître les e-mails, SMS et messages frauduleux","L'ingénierie sociale par téléphone et en personne","Mots de passe robustes, double authentification et usage sûr des appareils mobiles","Pièces jointes, liens, clés USB et Wi-Fi public","Signaler un incident rapidement et sans crainte"],
      who:"Tous les collaborateurs, avec des cas propres à la finance, à l'informatique, au service client et à la direction." } },

  { en: { slug:"ai-financial-crime", name:"AI & financial crime",
      title:"AI and financial crime training for employees",
      desc:"Online training on AI-enabled financial crime: deepfakes, voice cloning, synthetic identities and AI-assisted scams, and the safe use of AI at work. Licence from USD 45 per employee.",
      lead:"Criminals now use artificial intelligence to fake voices, faces and documents. RALK prepares your staff for these new scams and for the responsible use of AI tools.",
      why:"Deepfake video calls, cloned voices of executives and AI-generated identity documents make classic fraud far more convincing. At the same time, employees paste confidential data into public AI tools. Both risks are new for most teams and call for clear rules.",
      learn:["How deepfakes, voice cloning and synthetic identities are used in fraud","Verification steps that still work when a voice or face can be faked","AI-generated documents and their warning signs","Safe use of AI tools: confidential data, accuracy and accountability","Reporting suspicious AI-enabled contacts"],
      who:"Finance and payments, onboarding and KYC, customer service, management and every employee who uses AI tools." },
    fr: { slug:"ia-criminalite-financiere", name:"IA & criminalité financière",
      title:"Formation IA et criminalité financière",
      desc:"Formation en ligne sur la criminalité financière liée à l'IA : deepfakes, clonage de voix, identités synthétiques, arnaques assistées par IA et usage sûr de l'IA au travail. Dès 45 USD par collaborateur.",
      lead:"Les criminels utilisent désormais l'intelligence artificielle pour imiter des voix, des visages et des documents. RALK prépare votre personnel à ces nouvelles arnaques et à un usage responsable des outils d'IA.",
      why:"Appels vidéo truqués, voix de dirigeants clonées et pièces d'identité fabriquées par IA rendent la fraude classique bien plus convaincante. Dans le même temps, des collaborateurs copient des données confidentielles dans des outils d'IA publics. Ces deux risques sont nouveaux pour la plupart des équipes et appellent des règles claires.",
      learn:["Comment les deepfakes, le clonage de voix et les identités synthétiques servent à la fraude","Les vérifications qui restent efficaces quand une voix ou un visage peut être imité","Les documents générés par IA et leurs signaux d'alerte","L'usage sûr des outils d'IA : données confidentielles, exactitude et responsabilité","Signaler les contacts suspects utilisant l'IA"],
      who:"Finance et paiements, entrée en relation et KYC, service client, direction et tout collaborateur qui utilise des outils d'IA." } },

  { en: { slug:"crypto-assets", name:"Crypto & virtual assets",
      title:"Crypto and virtual assets training for employees",
      desc:"Online training on virtual assets and financial crime: FATF Recommendation 15, the travel rule, crypto red flags and scams, adapted to each role. Licence from USD 45 per employee.",
      lead:"Customers, payments and scams increasingly involve crypto-assets. RALK gives your staff the knowledge to recognise the risks, whether or not your company deals in virtual assets.",
      why:"FATF Recommendation 15 brings virtual assets and virtual asset service providers under AML/CFT rules, including the travel rule for transfers. Banks and payment providers see customers move funds to and from exchanges, and investment scams promising crypto returns target customers and staff alike.",
      learn:["Basics of virtual assets, wallets and exchanges","FATF Recommendation 15 and the travel rule","Red flags: mixers, rapid conversions, unregistered providers","Crypto investment scams and how to warn customers","Escalating crypto-related suspicions correctly"],
      who:"Compliance, payments and operations, onboarding and KYC, relationship managers, fintech and virtual asset service provider staff." },
    fr: { slug:"crypto-actifs", name:"Crypto & actifs virtuels",
      title:"Formation crypto-actifs et actifs virtuels",
      desc:"Formation en ligne aux actifs virtuels et à la criminalité financière : Recommandation 15 du GAFI, règle de voyage, signaux d'alerte et arnaques crypto. Dès 45 USD par collaborateur.",
      lead:"Clients, paiements et arnaques impliquent de plus en plus les crypto-actifs. RALK donne à votre personnel les connaissances pour en reconnaître les risques, que votre entreprise opère ou non dans les actifs virtuels.",
      why:"La Recommandation 15 du GAFI soumet les actifs virtuels et les prestataires de services sur actifs virtuels aux règles LBC/FT, y compris la règle de voyage pour les transferts. Banques et prestataires de paiement voient des clients transférer des fonds vers et depuis des plateformes d'échange, et les arnaques à l'investissement crypto visent autant les clients que le personnel.",
      learn:["Les bases : actifs virtuels, portefeuilles et plateformes d'échange","La Recommandation 15 du GAFI et la règle de voyage","Les signaux d'alerte : mixeurs, conversions rapides, prestataires non enregistrés","Les arnaques à l'investissement crypto et comment avertir les clients","Faire remonter correctement un soupçon lié aux crypto-actifs"],
      who:"Conformité, paiements et opérations, entrée en relation et KYC, chargés de clientèle, personnel des fintechs et des prestataires de services sur actifs virtuels." } },

  { en: { slug:"whistleblowing", name:"Whistleblower protection",
      title:"Whistleblowing training for employees",
      desc:"Online whistleblowing training: how to report misconduct, protection against retaliation and handling reports correctly, adapted to each role. Licence from USD 45 per employee.",
      lead:"Many frauds and corruption cases come to light because an employee speaks up. RALK shows staff how to report safely and shows managers how to handle reports correctly.",
      why:"The United Nations Convention against Corruption asks states to protect persons who report wrongdoing, and partners increasingly expect a working reporting channel. A channel only works if employees trust it and managers know that retaliation is not tolerated.",
      learn:["Which concerns should be reported and through which channels","Confidentiality and protection against retaliation","How to describe a concern with facts","For managers: receiving, documenting and escalating a report","Why speaking up protects the organisation"],
      who:"All employees, with an additional focus for managers, HR, compliance and internal audit." },
    fr: { slug:"lanceurs-alerte", name:"Protection des lanceurs d'alerte",
      title:"Formation lanceurs d'alerte pour vos collaborateurs",
      desc:"Formation en ligne sur les lanceurs d'alerte : comment signaler un manquement, protection contre les représailles et traitement correct des signalements. Dès 45 USD par collaborateur.",
      lead:"De nombreuses fraudes et affaires de corruption sont révélées parce qu'un collaborateur ose parler. RALK montre au personnel comment signaler en sécurité et aux managers comment traiter correctement un signalement.",
      why:"La Convention des Nations unies contre la corruption invite les États à protéger les personnes qui signalent des manquements, et les partenaires attendent de plus en plus un canal de signalement opérationnel. Un canal ne fonctionne que si les collaborateurs lui font confiance et si les managers savent que les représailles ne sont pas tolérées.",
      learn:["Quels faits signaler et par quels canaux","La confidentialité et la protection contre les représailles","Comment décrire une préoccupation de manière factuelle","Pour les managers : recevoir, documenter et faire remonter un signalement","Pourquoi parler protège l'organisation"],
      who:"Tous les collaborateurs, avec un volet spécifique pour les managers, les RH, la conformité et l'audit interne." } },
];

const UI = {
  en: { home:"/", order:"/order", check:"https://check.ralk.io/?lang=en", eyebrow:"Compliance training",
        buy:"Get a licence", checkBtn:"Free 10-minute compliance check",
        note:"Annual licence from USD 45 per employee. All 9 topics included. No set-up fee.",
        whyT:"Why it matters", learnT:"What your employees learn", whoT:"Who it is for",
        howT:"How RALK trains",
        how:[["Learn","Key rules, red flags, rights and duties for the learner's own role."],
             ["Apply","A realistic situation from their job, sector and country."],
             ["Prove","A short assessment with explanations. Certificates anyone can verify online."]],
        allT:"One licence, all 9 topics", allLead:"Every RALK licence includes all 9 modules. Every employee completes them, adapted to their role, sector and country.",
        ctaT:"Start training your team this week.", ctaLead:"Order online in a few minutes. Fixed public prices, no negotiation needed.",
        courseDesc:"Role-based online compliance training module" },
  fr: { home:"/fr", order:"/order", check:"https://check.ralk.io/?lang=fr", eyebrow:"Formation conformité",
        buy:"Obtenir une licence", checkBtn:"Check conformité gratuit (10 min)",
        note:"Licence annuelle dès 45 USD par collaborateur. Les 9 thèmes inclus. Sans frais de mise en place.",
        whyT:"Pourquoi c'est important", learnT:"Ce que vos collaborateurs apprennent", whoT:"Pour qui",
        howT:"Comment RALK forme",
        how:[["Apprendre","Les règles clés, les signaux d'alerte, les droits et devoirs propres à la fonction de l'apprenant."],
             ["Appliquer","Une situation réaliste issue de son métier, de son secteur et de son pays."],
             ["Prouver","Une courte évaluation avec explications. Des certificats vérifiables en ligne par tous."]],
        allT:"Une licence, les 9 thèmes", allLead:"Chaque licence RALK inclut les 9 modules. Chaque collaborateur les suit, adaptés à sa fonction, à son secteur et à son pays.",
        ctaT:"Formez votre équipe dès cette semaine.", ctaLead:"Commandez en ligne en quelques minutes. Prix publics fixes, sans négociation.",
        courseDesc:"Module de formation conformité en ligne adapté à chaque fonction" }
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const urlOf = (lang, slug) => lang === "en" ? `/training/${slug}` : `/fr/formation/${slug}`;

function page(i, lang){
  const T = TOPICS[i][lang], O = TOPICS[i][lang === "en" ? "fr" : "en"], u = UI[lang];
  const self = BASE + urlOf(lang, T.slug), other = BASE + urlOf(lang === "en" ? "fr" : "en", O.slug);
  const enUrl = lang === "en" ? self : other, frUrl = lang === "en" ? other : self;
  const ld = { "@context":"https://schema.org", "@type":"Course", name:T.title, description:T.desc, url:self, inLanguage:lang,
    provider:{ "@type":"Organization", name:"RALK", url:BASE },
    offers:{ "@type":"Offer", category:"Paid", priceCurrency:"USD", price:"45", url:BASE + "/order" },
    hasCourseInstance:{ "@type":"CourseInstance", courseMode:"online", courseWorkload:"PT10M" } };
  const others = TOPICS.map((t, j) => j === i ? `<span class="chip on">${esc(t[lang].name)}</span>`
                                              : `<a class="chip" href="${urlOf(lang, t[lang].slug)}">${esc(t[lang].name)}</a>`).join("\n        ");
  return `<!doctype html>
<html lang="${lang}" data-theme="dark" data-page-lang="${lang}" data-alt="${urlOf(lang === "en" ? "fr" : "en", O.slug)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(T.title)} | RALK</title>
<meta name="description" content="${esc(T.desc)}">
<meta property="og:title" content="${esc(T.title)} | RALK">
<meta property="og:description" content="${esc(T.desc)}">
<meta property="og:image" content="${BASE}/logo.png">
<meta property="og:url" content="${self}">
<meta property="og:type" content="website">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="canonical" href="${self}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="fr" href="${frUrl}">
<link rel="alternate" hreflang="x-default" href="${enUrl}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link rel="stylesheet" href="/styles.css">
<script src="/app.js"></script>
</head>
<body>
<header class="top" id="top"></header>
<main class="topic">
  <section class="topic-hero">
    <div class="wrap">
      <p class="eyebrow">${esc(u.eyebrow)} · ${esc(T.name)}</p>
      <h1>${esc(T.title)}</h1>
      <p class="lead">${esc(T.lead)}</p>
      <div class="cta">
        <a class="btn" href="${u.order}">${esc(u.buy)}</a>
        <a class="btn ghost" href="${u.check}">${esc(u.checkBtn)}</a>
      </div>
      <p class="note">${esc(u.note)}</p>
    </div>
  </section>

  <section class="alt">
    <div class="wrap grid g2 topic-cols">
      <div>
        <h2>${esc(u.whyT)}</h2>
        <p>${esc(T.why)}</p>
        <h2>${esc(u.whoT)}</h2>
        <p>${esc(T.who)}</p>
      </div>
      <div class="card">
        <h2>${esc(u.learnT)}</h2>
        <ul class="ticks">
          ${T.learn.map(l => `<li>${esc(l)}</li>`).join("\n          ")}
        </ul>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="head"><h2>${esc(u.howT)}</h2></div>
      <div class="grid g3">
        ${u.how.map((h, k) => `<div class="card"><span class="num">${k + 1}</span><h3>${esc(h[0])}</h3><p>${esc(h[1])}</p></div>`).join("\n        ")}
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <div class="head"><h2>${esc(u.allT)}</h2><p class="lead">${esc(u.allLead)}</p></div>
      <div class="chips topic-chips">
        ${others}
      </div>
    </div>
  </section>

  <section>
    <div class="wrap center">
      <h2>${esc(u.ctaT)}</h2>
      <p class="lead">${esc(u.ctaLead)}</p>
      <div class="cta"><a class="btn" href="${u.order}">${esc(u.buy)}</a></div>
    </div>
  </section>
</main>
<footer id="foot"></footer>
</body>
</html>
`;
}

for (const lang of ["en", "fr"]) {
  const dir = lang === "en" ? path.join(SITE, "training") : path.join(SITE, "fr", "formation");
  fs.mkdirSync(dir, { recursive: true });
  TOPICS.forEach((t, i) => {
    fs.writeFileSync(path.join(dir, t[lang].slug + ".html"), page(i, lang));
  });
}

// Sitemap: homepages, topic pages (with hreflang pairs), legal pages.
const today = new Date().toISOString().slice(0, 10);
const pair = (en, fr) => `    <xhtml:link rel="alternate" hreflang="en" href="${BASE}${en}"/>\n    <xhtml:link rel="alternate" hreflang="fr" href="${BASE}${fr}"/>`;
const entries = [["/", "/fr"], ...TOPICS.map(t => [urlOf("en", t.en.slug), urlOf("fr", t.fr.slug)])]
  .flatMap(([en, fr]) => [en, fr].map(loc => `  <url><loc>${BASE}${loc}</loc><lastmod>${today}</lastmod>\n${pair(en, fr)}</url>`));
entries.push(...["/licence", "/imprint"].map(p => `  <url><loc>${BASE}${p}</loc><lastmod>${today}</lastmod></url>`));
fs.writeFileSync(path.join(SITE, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`);

// Slug list for app.js (module cards on the homepage link to these pages).
module.exports = { TOPICS, urlOf };
console.log("wrote", TOPICS.length * 2, "topic pages and sitemap.xml");
