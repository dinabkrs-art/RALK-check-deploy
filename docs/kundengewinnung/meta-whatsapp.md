# WhatsApp Business (organisch, ohne bezahlte Anzeigen)

Erklärungen auf Deutsch, alle Kundentexte auf Französisch (FR) und Englisch (EN).
(Der Dateiname enthält noch „meta“, weil das Prüfskript ihn so erwartet.)
Alle Texte in den Tabellen „ID | Feld | Text“ und in den grauen Textblöcken werden von
`google-ads/validate.py` auf Länge und verbotene Wörter geprüft.

**Regeln für alle Texte**
- Kein „Africa/Afrique/African/africain“ im Kundentext (die Länder stehen nur im Targeting).
- Breit auftreten: Fraude, Korruption, Sanktionen, Datenschutz, Cyber – Geldwäsche (LBC/FT, AML)
  ist ein Thema unter 9, nicht die Hauptbotschaft.
- Keine erfundenen Zahlen, Kunden oder Zitate, kein Hinweis auf KI, keine Behörden-„Empfehlung“.
- Preise nur so, wie sie auf ralk.io stehen (65 / 55 / 45 USD, Minimum 5.000 USD, keine Rabatte).

---

## 1. Keine Meta-Anzeigen

Dinas Entscheidung: **keine bezahlten Meta-Anzeigen** (auch kein Test „Klick zu WhatsApp“).
Das gesamte Werbebudget (50 EUR/Monat) geht in die Google-Suche (`google-ads/LIESMICH.md`).
WhatsApp Business wird nur **organisch** genutzt: Profil, Katalog, Begrüßung und
Schnellantworten unten; die Nummer kann in Mail-Signaturen, LinkedIn-Beiträgen und auf ralk.io genannt werden.

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
| WA-DESC | WA-Beschreibung | RALK forme vos collaborateurs à la conformité : fraude, corruption, sanctions, LBC/FT, protection des données, cybersécurité et 3 autres thèmes. Modules courts par fonction, certificats et rapports d'audit. RALK trains your staff in financial-crime compliance: fraud, bribery, sanctions, AML, data protection, cyber and 3 more topics. Short role-based modules, certificates and audit reports. ralk.io |

- **Kategorie:** „Bildung“ (oder „Professionelle Dienstleistungen“).
- **Website:** `https://ralk.io` und `https://check.ralk.io` · **E-Mail:** info@ralk.io
- **Info-Zeile:** nur eine ist möglich – die Sprache wählen, in der die meisten Anfragen kommen
  (Vorschlag: FR).

### Katalog (3 Preisstufen)

Preis-Feld in WhatsApp: der Preis **pro Mitarbeiter und Jahr**. Link mit UTM, damit Bestellungen
aus WhatsApp erkennbar sind (die Bestellseite übernimmt `seats` und `lang`).

| ID | Feld | Text |
|---|---|---|
| CAT-1-FR | WA-Katalogname | Licence RALK – jusqu'à 1 000 collaborateurs |
| CAT-1-FR-T | Katalogtext | 65 USD par collaborateur et par an. Les 9 modules inclus. Licence annuelle minimum : 5 000 USD. Prix nets, sans frais de mise en place. |
| CAT-2-FR | WA-Katalogname | Licence RALK – 1 001 à 10 000 collaborateurs |
| CAT-2-FR-T | Katalogtext | 55 USD par collaborateur et par an. Les 9 modules inclus. Prix nets, sans frais de mise en place. |
| CAT-3-FR | WA-Katalogname | Licence RALK – plus de 10 000 collaborateurs |
| CAT-3-FR-T | Katalogtext | 45 USD par collaborateur et par an. Les 9 modules inclus. Prix nets, sans frais de mise en place. |
| CAT-1-EN | WA-Katalogname | RALK licence – up to 1,000 employees |
| CAT-1-EN-T | Katalogtext | USD 65 per employee per year. All 9 modules included. Minimum annual licence: USD 5,000. Net prices, no set-up fee. |
| CAT-2-EN | WA-Katalogname | RALK licence – 1,001 to 10,000 employees |
| CAT-2-EN-T | Katalogtext | USD 55 per employee per year. All 9 modules included. Net prices, no set-up fee. |
| CAT-3-EN | WA-Katalogname | RALK licence – more than 10,000 employees |
| CAT-3-EN-T | Katalogtext | USD 45 per employee per year. All 9 modules included. Net prices, no set-up fee. |

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
| QR-FR-4 | WA-Schnellantwort | 9 modules inclus : prévention de la fraude, anti-corruption, sanctions et embargos, LBC/FT, KYC et PPE, protection des données, cybersécurité, IA et criminalité financière, crypto et actifs virtuels, protection des lanceurs d'alerte. |
| QR-FR-5 | WA-Kürzel | /paiement |
| QR-FR-5 | WA-Schnellantwort | Paiement sur facture par virement en USD (EUR sur demande), à 14 jours. Les prix sont nets : une éventuelle retenue à la source est à la charge du client. |
| QR-FR-6 | WA-Kürzel | /essai |
| QR-FR-6 | WA-Schnellantwort | Nous pouvons ouvrir un accès d'essai gratuit de 14 jours aux 2 premiers modules, pour 3 collaborateurs au maximum. Envoyez-nous le nom de votre organisation et les adresses e-mail des personnes (3 au maximum). |
| QR-FR-7 | WA-Kürzel | /prixfixe |
| QR-FR-7 | WA-Schnellantwort | Nos prix sont les mêmes pour tous les clients et ne se négocient pas : les remises de volume sont déjà comprises dans les tranches. |
| QR-EN-1 | WA-Kürzel | /price |
| QR-EN-1 | WA-Schnellantwort | Our prices are public and the same for everyone: USD 65 per employee per year up to 1,000 employees, USD 55 from 1,001 to 10,000, USD 45 above. Minimum annual licence USD 5,000, no set-up fee. Calculator: https://ralk.io/#pricing |
| QR-EN-2 | WA-Kürzel | /check |
| QR-EN-2 | WA-Schnellantwort | The free risk check takes 10 minutes and shows where your staff are exposed: https://check.ralk.io/?lang=en&utm_source=whatsapp&utm_medium=chat |
| QR-EN-3 | WA-Kürzel | /order |
| QR-EN-3 | WA-Schnellantwort | You can order directly online: https://ralk.io/order?lang=en&utm_source=whatsapp&utm_medium=chat – you then receive the invoice and access is activated on payment. |
| QR-EN-4 | WA-Kürzel | /modules |
| QR-EN-4 | WA-Schnellantwort | 9 modules included: fraud prevention, anti-bribery and corruption, sanctions and embargoes, AML/CFT, KYC and PEP, data protection, cybersecurity, AI and financial crime, crypto and virtual assets, whistleblower protection. |
| QR-EN-5 | WA-Kürzel | /payment |
| QR-EN-5 | WA-Schnellantwort | Payment by invoice and bank transfer in USD (EUR on request), due within 14 days. Prices are net: any withholding tax is borne by the customer. |
| QR-EN-6 | WA-Kürzel | /trial |
| QR-EN-6 | WA-Schnellantwort | We can open a free 14-day trial of the first 2 modules for up to 3 employees. Send us your organisation's name and the email addresses of the people (up to 3). |
| QR-EN-7 | WA-Kürzel | /fixedprice |
| QR-EN-7 | WA-Schnellantwort | Our prices are the same for every customer and are not negotiated: volume discounts are already built into the size bands. |

**Testzugang (Dinas Vorgabe):** nur die **ersten 2 Module**, für **höchstens 3 Mitarbeiter**,
**14 Tage**. Nie „alle Module“ anbieten. Die Schnellantworten /essai und /trial erst aktivieren,
wenn solche Testzugänge in app.ralk.io tatsächlich angelegt werden können (siehe startplan.md).
