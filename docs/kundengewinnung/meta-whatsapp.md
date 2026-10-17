# Meta-Anzeigen (Facebook/Instagram) und WhatsApp Business

Erklärungen auf Deutsch, alle Kundentexte auf Französisch (FR) und Englisch (EN).
Alle Texte in den Tabellen „ID | Feld | Text“ und in den grauen Textblöcken werden von
`google-ads/validate.py` auf Länge und verbotene Wörter geprüft.

**Regeln für alle Texte**
- Kein „Africa/Afrique/African/africain“ im Kundentext (die Länder stehen nur im Targeting).
- Breit auftreten: Fraude, Korruption, Sanktionen, Datenschutz, Cyber – Geldwäsche (LBC/FT, AML)
  ist ein Thema unter 13, nicht die Hauptbotschaft.
- Keine erfundenen Zahlen, Kunden oder Zitate, kein Hinweis auf KI, keine Behörden-„Empfehlung“.
- Preise nur so, wie sie auf ralk.io stehen (65 / 55 / 45 USD, Minimum 5.000 USD, keine Rabatte).

---

## 1. Meta-Anzeigen

> **Sparvariante:** Zuerst nur der 14-Tage-Test „Klick zu WhatsApp“ (FR-3, EN-3) mit 3 USD/Tag.
> Alles andere in diesem Abschnitt ist Vorrat für später.

**Längen:** Primärtext ≤ 125 Zeichen (sonst schneidet Meta mit „… mehr“ ab),
Überschrift ≤ 40, Beschreibung ≤ 30.

**Ziel-Links (immer mit UTM, damit man im Postfach sieht, woher der Check/Auftrag kommt):**

| Anzeige | Link |
|---|---|
| FR-1, FR-4 | `https://check.ralk.io/?lang=fr&utm_source=meta&utm_medium=paid_social&utm_campaign=ralk_fr&utm_content=fr1` (bzw. `fr4`) |
| FR-2 | `https://ralk.io/fr?utm_source=meta&utm_medium=paid_social&utm_campaign=ralk_fr&utm_content=fr2#pricing` |
| FR-3 | Ziel „WhatsApp“ (Klick-zu-WhatsApp), keine URL |
| EN-1, EN-4 | `https://check.ralk.io/?lang=en&utm_source=meta&utm_medium=paid_social&utm_campaign=ralk_en&utm_content=en1` (bzw. `en4`) |
| EN-2 | `https://ralk.io/?utm_source=meta&utm_medium=paid_social&utm_campaign=ralk_en&utm_content=en2#pricing` |
| EN-3 | Ziel „WhatsApp“ (Klick-zu-WhatsApp), keine URL |

### Französisch

| ID | Feld | Text |
|---|---|---|
| FR-1 | Primärtext | Fraude, corruption, sanctions, cyber : où vos équipes sont-elles exposées ? Faites le check gratuit en 10 minutes. |
| FR-1 | Überschrift | Check de risque gratuit en 10 minutes |
| FR-1 | Beschreibung | Résultat immédiat |
| FR-2 | Primärtext | Formez tous vos collaborateurs à la conformité : 13 thèmes, certificats inclus, dès 45 USD par personne et par an. |
| FR-2 | Überschrift | Licence e-learning conformité |
| FR-2 | Beschreibung | Prix publics et fixes |
| FR-3 | Primärtext | Une question sur la formation conformité de vos équipes ? Écrivez-nous directement sur WhatsApp. |
| FR-3 | Überschrift | Parlons-en sur WhatsApp |
| FR-3 | Beschreibung | Réponse en français |
| FR-4 | Primärtext | Mines, énergie, télécoms, ONG : la fraude, la corruption et les sanctions vous concernent aussi. Testez vos risques. |
| FR-4 | Überschrift | Conformité : formez chaque fonction |
| FR-4 | Beschreibung | 13 thèmes, une licence |

Button: FR-1/FR-4 „En savoir plus“, FR-2 „Voir les tarifs“ (falls nicht vorhanden: „En savoir plus“), FR-3 „Envoyer un message WhatsApp“.

### Englisch

| ID | Feld | Text |
|---|---|---|
| EN-1 | Primärtext | Fraud, bribery, sanctions, cyber: where are your staff exposed? Take the free 10-minute risk check. |
| EN-1 | Überschrift | Free 10-minute compliance risk check |
| EN-1 | Beschreibung | Instant result |
| EN-2 | Primärtext | Train every employee in financial-crime compliance: 13 topics, certificates included, from USD 45 per person per year. |
| EN-2 | Überschrift | Compliance e-learning licence |
| EN-2 | Beschreibung | Fixed public prices |
| EN-3 | Primärtext | Questions about compliance training for your staff? Message us directly on WhatsApp. |
| EN-3 | Überschrift | Let's talk on WhatsApp |
| EN-3 | Beschreibung | Answers in English |
| EN-4 | Primärtext | Mining, energy, telecoms, NGOs: fraud, bribery and sanctions risks apply to you too. Check your exposure. |
| EN-4 | Überschrift | Compliance training for every role |
| EN-4 | Beschreibung | 13 topics, one licence |

Button: EN-1/EN-4 „Learn more“, EN-2 „See pricing“/„Learn more“, EN-3 „Send WhatsApp message“.

**Bild/Video:** Logo von ralk.io, ruhiges Business-Motiv (Büro, Team am Laptop), Text im Bild
höchstens eine Zeile („Check gratuit – 10 min“ / „Free check – 10 min“). Keine Flaggen, keine
Landkarten (Regel: keine Region im Kundentext).

### Targeting (Vorschlag)

| Kampagne | Länder | Sprache |
|---|---|---|
| RALK FR (Meta) | Senegal, Côte d'Ivoire, Kamerun, Benin, Togo, Burkina Faso, Mali, Niger, Gabun, Kongo (Brazzaville), DR Kongo, Guinea, Madagaskar, Tschad, Zentralafrikanische Republik, Burundi | Französisch |
| RALK EN (Meta) | Nigeria, Kenia, Ghana, Uganda, Tansania, Ruanda, Sambia, Südafrika, Botswana, Malawi, Sierra Leone, Gambia, Liberia, Namibia, Simbabwe, Mauritius | Englisch |

- **Alter:** 25–60. **Standort-Option:** „Personen, die an diesem Ort leben oder sich kürzlich dort aufgehalten haben“.
- **Detailliertes Targeting – Interessen** (je Anzeigengruppe 5–10 auswählen, Meta schlägt
  Ähnliches vor): Regulatory compliance, Compliance, Risk management, Anti-money laundering,
  Internal audit, Corporate governance, Banking, Microfinance, Mobile money, Financial services,
  Fintech, Insurance, Mining, Petroleum industry, Telecommunications, Human resources,
  Training and development, Business ethics.
- **Berufsbezeichnungen** (falls Meta sie im Konto anbietet, unter „Demografische Angaben →
  Beruf“): Compliance Officer, Chief Compliance Officer, Risk Manager, Internal Auditor,
  Head of HR, HR Manager, Training Manager, Managing Director, Chief Financial Officer;
  FR: Responsable conformité, Directeur des risques, Auditeur interne, DRH, Directeur général.
- **Platzierungen:** Facebook- und Instagram-Feed, Stories. Audience Network ausschließen
  (bringt viele Fehlklicks).
- **Sonderkategorie:** Keine. Es wird eine Schulung beworben, kein Kredit oder Finanzprodukt.
  Falls Meta trotzdem „Finanzprodukte und -dienstleistungen“ verlangt: annehmen, das Targeting
  wird dann nur breiter.
- **Budget (Sparvariante, Dinas Vorgabe):** Meta ist **optional**. Wenn überhaupt, nur ein
  **Klick-zu-WhatsApp-Test** mit FR-3 und EN-3: **3 USD pro Tag insgesamt (Vorschlag: 2 USD FR-3, 1 USD EN-3), 14 Tage, danach
  automatisch beenden** (beim Anlegen ein Enddatum setzen, Gesamtkosten max. ca. 42 USD). Die Anzeigen
  FR-1/2/4 und EN-1/2/4 liegen bereit für später, wenn der Test Gespräche bringt.
  Stopp-Regel: Kommt nach 20 USD Ausgaben kein einziges WhatsApp-Gespräch mit einer Firma,
  Test sofort beenden.
- **Optimierung:** Solange kein Meta-Pixel auf ralk.io und check.ralk.io ist, auf
  „Link-Klicks“ optimieren (WhatsApp-Anzeigen: „Unterhaltungen“). Mit Pixel (Website-Session,
  mit Cookie-Einwilligung) später auf „Leads“ umstellen.

---

## 2. WhatsApp Business

Eigene Nummer verwenden (nicht die private). App „WhatsApp Business“ installieren →
Unternehmensprofil → die Texte unten einfügen.

### Profil

| ID | Feld | Text |
|---|---|---|
| WA-NAME | WA-Katalogname | RALK |
| WA-INFO-FR | WA-Info | Formation conformité en ligne : fraude, corruption, sanctions, LBC/FT, données, cyber. |
| WA-INFO-EN | WA-Info | Online compliance training: fraud, bribery, sanctions, AML, data protection, cyber. |
| WA-DESC | WA-Beschreibung | RALK forme vos collaborateurs à la conformité : fraude, corruption, sanctions, LBC/FT, protection des données, cybersécurité et 7 autres thèmes. Modules courts par fonction, certificats et rapports d'audit. RALK trains your staff in financial-crime compliance: fraud, bribery, sanctions, AML, data protection, cyber and 7 more topics. Short role-based modules, certificates and audit reports. ralk.io |

- **Kategorie:** „Bildung“ (oder „Professionelle Dienstleistungen“).
- **Website:** `https://ralk.io` und `https://check.ralk.io` · **E-Mail:** contact@ralk.io
- **Info-Zeile:** nur eine ist möglich – die Sprache wählen, in der die meisten Anfragen kommen
  (Vorschlag: FR).

### Katalog (3 Preisstufen)

Preis-Feld in WhatsApp: der Preis **pro Mitarbeiter und Jahr**. Link mit UTM, damit Bestellungen
aus WhatsApp erkennbar sind (die Bestellseite übernimmt `seats` und `lang`).

| ID | Feld | Text |
|---|---|---|
| CAT-1-FR | WA-Katalogname | Licence RALK – jusqu'à 1 000 collaborateurs |
| CAT-1-FR-T | Katalogtext | 65 USD par collaborateur et par an. Les 13 modules inclus. Licence annuelle minimum : 5 000 USD. Prix nets, sans frais de mise en place. |
| CAT-2-FR | WA-Katalogname | Licence RALK – 1 001 à 10 000 collaborateurs |
| CAT-2-FR-T | Katalogtext | 55 USD par collaborateur et par an. Les 13 modules inclus. Prix nets, sans frais de mise en place. |
| CAT-3-FR | WA-Katalogname | Licence RALK – plus de 10 000 collaborateurs |
| CAT-3-FR-T | Katalogtext | 45 USD par collaborateur et par an. Les 13 modules inclus. Prix nets, sans frais de mise en place. |
| CAT-1-EN | WA-Katalogname | RALK licence – up to 1,000 employees |
| CAT-1-EN-T | Katalogtext | USD 65 per employee per year. All 13 modules included. Minimum annual licence: USD 5,000. Net prices, no set-up fee. |
| CAT-2-EN | WA-Katalogname | RALK licence – 1,001 to 10,000 employees |
| CAT-2-EN-T | Katalogtext | USD 55 per employee per year. All 13 modules included. Net prices, no set-up fee. |
| CAT-3-EN | WA-Katalogname | RALK licence – more than 10,000 employees |
| CAT-3-EN-T | Katalogtext | USD 45 per employee per year. All 13 modules included. Net prices, no set-up fee. |

Links je Katalog-Artikel:

| Artikel | Link FR | Link EN |
|---|---|---|
| bis 1.000 | `https://ralk.io/order?lang=fr&seats=250&utm_source=whatsapp&utm_medium=catalog&utm_content=band1` | `https://ralk.io/order?lang=en&seats=250&utm_source=whatsapp&utm_medium=catalog&utm_content=band1` |
| 1.001–10.000 | `https://ralk.io/order?lang=fr&seats=2000&utm_source=whatsapp&utm_medium=catalog&utm_content=band2` | `https://ralk.io/order?lang=en&seats=2000&utm_source=whatsapp&utm_medium=catalog&utm_content=band2` |
| über 10.000 | `https://ralk.io/order?lang=fr&seats=12000&utm_source=whatsapp&utm_medium=catalog&utm_content=band3` | `https://ralk.io/order?lang=en&seats=12000&utm_source=whatsapp&utm_medium=catalog&utm_content=band3` |

(Die Mitarbeiterzahl im Link ist nur ein Startwert; der Kunde ändert sie im Formular.)

### Begrüßungsnachricht (wird bei erster Nachricht automatisch gesendet)

```text
Bonjour et merci pour votre message ! Ici RALK, formation en ligne à la conformité (fraude, corruption, sanctions, LBC/FT, données, cyber).
• Check de risque gratuit (10 min) : https://check.ralk.io/?lang=fr&utm_source=whatsapp&utm_medium=greeting
• Tarifs et commande : https://ralk.io/fr
Dites-nous le nom de votre organisation et le nombre de collaborateurs, nous revenons vers vous rapidement.

Hello and thank you for your message! This is RALK, online compliance training (fraud, bribery, sanctions, AML, data protection, cyber).
• Free 10-minute risk check: https://check.ralk.io/?lang=en&utm_source=whatsapp&utm_medium=greeting
• Pricing and ordering: https://ralk.io
Tell us your organisation's name and number of employees and we will get back to you shortly.
```

### Abwesenheitsnachricht (außerhalb der Geschäftszeiten)

```text
Merci pour votre message. Nous répondons du lundi au vendredi. En attendant, le check gratuit est ici : https://check.ralk.io/?lang=fr&utm_source=whatsapp&utm_medium=away

Thank you for your message. We reply Monday to Friday. In the meantime, the free check is here: https://check.ralk.io/?lang=en&utm_source=whatsapp&utm_medium=away
```

### Schnellantworten

In WhatsApp Business: Einstellungen → Unternehmenstools → Schnellantworten. Im Chat „/“ tippen
und das Kürzel wählen.

| ID | Feld | Text |
|---|---|---|
| QR-FR-1 | WA-Kürzel | /prix |
| QR-FR-1 | WA-Schnellantwort | Nos tarifs sont publics et identiques pour tous : 65 USD par collaborateur et par an jusqu'à 1 000 collaborateurs, 55 USD de 1 001 à 10 000, 45 USD au-delà. Licence annuelle minimum 5 000 USD, sans frais de mise en place. Calculateur : https://ralk.io/fr#pricing |
| QR-FR-2 | WA-Kürzel | /check |
| QR-FR-2 | WA-Schnellantwort | Le check de risque gratuit prend 10 minutes et montre où vos équipes sont exposées : https://check.ralk.io/?lang=fr&utm_source=whatsapp&utm_medium=chat |
| QR-FR-3 | WA-Kürzel | /commande |
| QR-FR-3 | WA-Schnellantwort | Vous pouvez commander directement en ligne : https://ralk.io/order?lang=fr&utm_source=whatsapp&utm_medium=chat – vous recevez ensuite la facture, l'accès est activé au paiement. |
| QR-FR-4 | WA-Kürzel | /modules |
| QR-FR-4 | WA-Schnellantwort | 13 thèmes inclus : sanctions, LBC/FT et KYC, bénéficiaires effectifs, PPE, déclarations de soupçon, crypto-actifs, fraude, anti-corruption, protection des données, cybersécurité, IA, gouvernance, lanceurs d'alerte. |
| QR-FR-5 | WA-Kürzel | /paiement |
| QR-FR-5 | WA-Schnellantwort | Paiement sur facture par virement en USD (EUR sur demande), à 14 jours. Les prix sont nets : une éventuelle retenue à la source est à la charge du client. |
| QR-FR-6 | WA-Kürzel | /essai |
| QR-FR-6 | WA-Schnellantwort | Nous pouvons ouvrir un accès d'essai pour 3 collaborateurs. Envoyez-nous le nom de votre organisation et les adresses e-mail des 3 personnes. |
| QR-FR-7 | WA-Kürzel | /prixfixe |
| QR-FR-7 | WA-Schnellantwort | Nos prix sont les mêmes pour tous les clients et ne se négocient pas : les remises de volume sont déjà comprises dans les tranches. |
| QR-EN-1 | WA-Kürzel | /price |
| QR-EN-1 | WA-Schnellantwort | Our prices are public and the same for everyone: USD 65 per employee per year up to 1,000 employees, USD 55 from 1,001 to 10,000, USD 45 above. Minimum annual licence USD 5,000, no set-up fee. Calculator: https://ralk.io/#pricing |
| QR-EN-2 | WA-Kürzel | /check |
| QR-EN-2 | WA-Schnellantwort | The free risk check takes 10 minutes and shows where your staff are exposed: https://check.ralk.io/?lang=en&utm_source=whatsapp&utm_medium=chat |
| QR-EN-3 | WA-Kürzel | /order |
| QR-EN-3 | WA-Schnellantwort | You can order directly online: https://ralk.io/order?lang=en&utm_source=whatsapp&utm_medium=chat – you then receive the invoice and access is activated on payment. |
| QR-EN-4 | WA-Kürzel | /modules |
| QR-EN-4 | WA-Schnellantwort | 13 topics included: sanctions, AML/CFT and KYC, beneficial ownership, PEPs, suspicious transaction reports, crypto assets, fraud, anti-bribery, data protection, cyber security, AI, governance, whistleblowing. |
| QR-EN-5 | WA-Kürzel | /payment |
| QR-EN-5 | WA-Schnellantwort | Payment by invoice and bank transfer in USD (EUR on request), due within 14 days. Prices are net: any withholding tax is borne by the customer. |
| QR-EN-6 | WA-Kürzel | /trial |
| QR-EN-6 | WA-Schnellantwort | We can open a trial access for 3 employees. Send us your organisation's name and the email addresses of the 3 people. |
| QR-EN-7 | WA-Kürzel | /fixedprice |
| QR-EN-7 | WA-Schnellantwort | Our prices are the same for every customer and are not negotiated: volume discounts are already built into the size bands. |

**Wichtig:** Das Testzugang-Angebot (/essai, /trial) nur aktivieren, wenn Testzugänge in
app.ralk.io tatsächlich angelegt werden können (siehe startplan.md).
