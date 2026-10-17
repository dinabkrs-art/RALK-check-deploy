# E-Mail-Sequenz an Firmen aus öffentlichen Registern (FR + EN)

Drei kurze, persönliche E-Mails an Institute aus `zielkunden-priorisiert.csv` (Priorität A zuerst),
wie in `docs/vertrieb-remote.md` (Kanal C) geplant:

| Mail | Wann | Inhalt |
|---|---|---|
| 1 | Tag 0 | Schulungspflicht und Risiko breit (Betrug, Korruption, Sanktionen, Geldwäsche …) + Link zum kostenlosen Check |
| 2 | Tag 4 | Ein konkretes Praxisbeispiel aus einem öffentlichen FATF-Bericht (keine erfundenen Fälle) |
| 3 | Tag 8 | Angebot: Testzugang für 3 Mitarbeiter |

Wer antwortet, den Check macht oder „stop“ schreibt, bekommt **keine** weitere Mail der Sequenz.

---

## 1. Rechtliche Hygiene (bitte einhalten)

Keine Rechtsberatung – vor dem ersten Versand kurz von einer Partnerkanzlei gegenlesen lassen.

- **Nur B2B:** ausschließlich Firmen und Institute, keine Privatpersonen.
- **Nur zulässige Adressen:** allgemeine Funktions-Adressen (z. B. contact@, info@, compliance@)
  oder geschäftliche Kontakte, die die Firma **selbst öffentlich** auf ihrer Website oder im
  amtlichen Register angibt. Keine geratenen Adressen (vorname.nachname@…), **keine gekauften
  Listen**, keine Adressen aus Datenhändler-Tools.
- **Herkunft notieren:** Für jede Adresse in Brevo im Feld `QUELLE` festhalten, wo sie steht
  (URL). Das brauchen wir für Auskunftsanfragen.
- **Abmeldung sofort beachten:** Jede Mail hat eine Abmeldezeile. Wer „stop“ antwortet oder den
  Link klickt, wird sofort gesperrt (Brevo macht das beim Link automatisch; bei „stop“-Antworten
  den Kontakt in Brevo von Hand auf „gesperrt“ setzen).
- **Absender klar erkennbar:** Name, Firma, E-Mail und Link zu Impressum/Datenschutz in jeder Mail.
- **Datenschutz:** RALK sitzt in der EU, daher gilt die DSGVO (Werbung an Firmen auf Grundlage des
  berechtigten Interesses, Information über die Datenherkunft – steht in der Fußzeile). Zusätzlich
  gelten die Datenschutzgesetze der Empfängerländer (z. B. Nigeria Data Protection Act 2023,
  Kenya Data Protection Act 2019, Senegal Loi 2008-12, Côte d'Ivoire Loi 2013-450).
- **Menge klein halten:** am Anfang höchstens 30–50 neue Firmen pro Tag. Das schützt die
  Absender-Domain ralk.io vor dem Spam-Ordner.
- **Brevo-Regeln beachten:** Brevo verlangt in seinen Nutzungsbedingungen grundsätzlich eine
  Einwilligung der Empfänger für Marketing-Mails; Kaltakquise kann zur Sperrung des Kontos
  führen. **Vor dem Start beim Brevo-Support schriftlich nachfragen**, ob B2B-Erstkontakte an
  öffentliche Funktions-Adressen erlaubt sind. Wenn nein: Mail 1–3 als einzelne, persönliche
  Mails aus dem Postfach contact@ralk.io senden (≤ 30 pro Tag) und Brevo nur für Personen
  nutzen, die geantwortet oder den Check gemacht haben.

## 2. Tool: Brevo (EU-Anbieter, kostenloser Tarif)

Kostenloser Tarif: bis 300 E-Mails pro Tag, ausreichend für den Start.

1. Auf **brevo.com** ein Konto mit contact@ralk.io anlegen (Firma: RALK, Land: Deutschland bzw.
   Firmensitz).
2. **Absender-Domain ralk.io bestätigen:** Brevo → „Absender, Domains & dedizierte IPs“ →
   „Domain hinzufügen“ → Brevo zeigt 2–3 DNS-Einträge (TXT für Brevo-Code, DKIM, DMARC).
   Diese bei **Hostinger** → Domains → ralk.io → DNS-Zone eintragen. (DNS-Änderung = Dina macht
   sie selbst bzw. gibt sie ausdrücklich frei.) Nach ein paar Stunden in Brevo „Bestätigen“.
3. **Absender anlegen:** Name „Dina Boyele Kraus – RALK“, Adresse contact@ralk.io.
4. **Kontakt-Felder anlegen** (Kontakte → Einstellungen → Attribute): `FIRMA`, `LAND`,
   `REGISTER` (z. B. „Commission Bancaire de l'UMOA“), `QUELLE` (URL), `SPRACHE` (FR/EN).
5. **Zwei Listen** anlegen: „Register FR“ und „Register EN“. Kontakte als CSV importieren
   (Spalten: EMAIL, FIRMA, LAND, REGISTER, QUELLE, SPRACHE).
6. **Automatisierung** anlegen (Automatisierungen → „Eigenes Szenario“): Auslöser „Kontakt wird
   zur Liste hinzugefügt“ → Mail 1 → 4 Tage warten → Bedingung „hat nicht geantwortet / nicht
   abgemeldet“ → Mail 2 → 4 Tage warten → Mail 3. Pro Sprache ein Szenario.
7. **Als Text-Mail gestalten:** im Editor „Einfacher Text“/„Rich Text“ wählen, kein Newsletter-
   Design, keine Bilder. Wirkt persönlich und landet seltener im Spam.
8. **A/B-Betreff:** für Mail 1 die zwei Betreffzeilen unten im A/B-Test laufen lassen; nach
   100 Versendungen die Variante mit mehr Antworten/Klicks behalten.
9. **Test:** jede Mail zuerst an die eigene Adresse senden, Links anklicken.

Platzhalter unten in Brevo-Schreibweise: `{{ contact.FIRMA }}`, `{{ contact.REGISTER }}`,
Abmeldelink `{{ unsubscribe }}`.

Alle Links tragen UTM-Parameter, damit in den Check- und Bestell-Mails sichtbar ist, dass der
Kontakt aus dieser Sequenz kommt (`utm_source=email&utm_medium=outreach`).

---

## 3. Französisch

### Betreffzeilen

| ID | Feld | Text |
|---|---|---|
| FR-M1-A | Betreff | Formation conformité de vos équipes |
| FR-M1-B | Betreff | {{ contact.FIRMA }} : où vos équipes sont-elles exposées ? |
| FR-M2-A | Betreff | Un cas type décrit par le GAFI |
| FR-M2-B | Betreff | Faux fournisseur, vrai virement |
| FR-M3-A | Betreff | Un accès d'essai pour 3 collaborateurs ? |
| FR-M3-B | Betreff | Dernier message de ma part |

### Mail 1 (Tag 0)

```text
Bonjour,

J'ai trouvé {{ contact.FIRMA }} dans la liste publiée par {{ contact.REGISTER }} et je me permets de vous écrire directement.

Fraude, corruption, sanctions, blanchiment, fuite de données, cyberattaques : ce sont vos collaborateurs qui voient les signaux en premier. Les standards du GAFI (Recommandation 18) et les lois nationales prévoient leur formation régulière, et les autorités de contrôle demandent à en voir la preuve.

Nous avons créé un check gratuit de 10 minutes qui montre où votre organisation est la plus exposée :
https://check.ralk.io/?lang=fr&utm_source=email&utm_medium=outreach&utm_campaign=register_fr&utm_content=mail1

Si le résultat montre des points faibles, RALK forme ensuite chaque collaborateur en ligne, selon sa fonction, sur 13 thèmes, avec certificats et rapports d'audit.

Bien cordialement,
Dina Boyele Kraus
Fondatrice, RALK – experte en conformité financière, MBA Compliance & Risk Management
contact@ralk.io · https://ralk.io/fr

Votre adresse provient du site web public de votre organisation ou du registre cité ci-dessus. Pour ne plus recevoir de messages : répondez « stop » ou cliquez ici : {{ unsubscribe }}
Mentions légales : https://ralk.io/imprint · Données personnelles : https://check.ralk.io/privacy
```

### Mail 2 (Tag 4) – Praxisbeispiel aus einem FATF-Bericht

Quelle: FATF-Bericht „Illicit Financial Flows from Cyber-Enabled Fraud“ (FATF mit INTERPOL und
Egmont Group, November 2023, frei auf fatf-gafi.org). Die Mail beschreibt nur die dort genannte
Masche (Geschäfts-E-Mail-Betrug, Weiterleitung über „Money Mules“), **keinen erfundenen Fall**
und keine Zahlen. Vor dem Start einmal den Bericht öffnen und den Link einsetzen.

```text
Bonjour,

Un exemple concret, tiré du rapport du GAFI de novembre 2023 sur la fraude facilitée par le numérique (« Illicit Financial Flows from Cyber-Enabled Fraud », disponible sur fatf-gafi.org) :

Un « fournisseur » habituel écrit au service comptable : ses coordonnées bancaires ont changé. Le message ressemble aux précédents, la facture aussi. Le virement part. Le rapport décrit ensuite comment les fonds sont transférés rapidement à travers plusieurs comptes de « mules » pour brouiller les pistes.

Ce qui arrête ce scénario n'est pas un logiciel, c'est un collaborateur qui vérifie le changement par un autre canal. C'est exactement ce que RALK entraîne : des cas réels, par fonction, en quelques minutes.

Le check gratuit de 10 minutes reste disponible :
https://check.ralk.io/?lang=fr&utm_source=email&utm_medium=outreach&utm_campaign=register_fr&utm_content=mail2

Bien cordialement,
Dina Boyele Kraus
RALK · contact@ralk.io · https://ralk.io/fr

Pour ne plus recevoir de messages : répondez « stop » ou cliquez ici : {{ unsubscribe }}
```

**Variante für Bergbau/Rohstoffe** (nur wenn die Firma im Rohstoffsektor ist), statt des
Absatzes mit dem Beispiel. Quelle: FATF/APG-Bericht „Money laundering and terrorist financing
risks and vulnerabilities associated with gold“ (Juli 2015):

```text
Le GAFI a consacré un rapport aux risques liés à l'or (« Money laundering and terrorist financing risks and vulnerabilities associated with gold », 2015). Il décrit notamment les achats en espèces, la contrebande et les intermédiaires qui permettent de faire entrer de l'argent illicite dans la chaîne d'approvisionnement. Dans ces situations, ce sont vos équipes achats, logistique et finance qui voient les signaux d'alerte en premier.
```

### Mail 3 (Tag 8)

```text
Bonjour,

Dernier message de ma part sur ce sujet : souhaitez-vous que j'ouvre un accès d'essai gratuit pour 3 collaborateurs de {{ contact.FIRMA }} ? Ils pourront suivre les modules (fraude, corruption, sanctions, LBC/FT, données, cyber…) et vous verrez les rapports.

Une simple réponse « oui » suffit, avec les adresses e-mail des 3 personnes.

Nos tarifs sont publics et identiques pour tous : https://ralk.io/fr?utm_source=email&utm_medium=outreach&utm_campaign=register_fr&utm_content=mail3#pricing

Bien cordialement,
Dina Boyele Kraus
RALK · contact@ralk.io · https://ralk.io/fr

Pour ne plus recevoir de messages : répondez « stop » ou cliquez ici : {{ unsubscribe }}
```

---

## 4. Englisch

### Betreffzeilen

| ID | Feld | Text |
|---|---|---|
| EN-M1-A | Betreff | Compliance training for your staff |
| EN-M1-B | Betreff | {{ contact.FIRMA }}: where are your staff exposed? |
| EN-M2-A | Betreff | A typical case described by the FATF |
| EN-M2-B | Betreff | Fake supplier, real payment |
| EN-M3-A | Betreff | Trial access for 3 employees? |
| EN-M3-B | Betreff | My last message on this |

### Mail 1 (Tag 0)

```text
Hello,

I found {{ contact.FIRMA }} in the list published by {{ contact.REGISTER }} and wanted to write to you directly.

Fraud, bribery, sanctions, money laundering, data leaks, cyber attacks: your employees are the first to see the warning signs. The FATF standards (Recommendation 18) and national laws expect them to be trained regularly, and supervisors ask to see the evidence.

We built a free 10-minute check that shows where your organisation is most exposed:
https://check.ralk.io/?lang=en&utm_source=email&utm_medium=outreach&utm_campaign=register_en&utm_content=mail1

If the result shows gaps, RALK trains every employee online, by role, across 13 topics, with certificates and audit reports.

Kind regards,
Dina Boyele Kraus
Founder, RALK – financial-crime compliance expert, MBA Compliance & Risk Management
contact@ralk.io · https://ralk.io

Your address comes from your organisation's public website or the register named above. To stop receiving messages, reply "stop" or click here: {{ unsubscribe }}
Legal notice: https://ralk.io/imprint · Privacy: https://check.ralk.io/privacy
```

### Mail 2 (Tag 4)

```text
Hello,

A concrete example from the FATF's November 2023 report on cyber-enabled fraud ("Illicit Financial Flows from Cyber-Enabled Fraud", available on fatf-gafi.org):

A regular "supplier" emails the accounts team: their bank details have changed. The message looks like the previous ones, and so does the invoice. The payment goes out. The report then describes how the funds are moved quickly through several "money mule" accounts to hide the trail.

What stops this is not software, it is an employee who checks the change through another channel. That is exactly what RALK trains: real cases, by role, in a few minutes.

The free 10-minute check is still available:
https://check.ralk.io/?lang=en&utm_source=email&utm_medium=outreach&utm_campaign=register_en&utm_content=mail2

Kind regards,
Dina Boyele Kraus
RALK · contact@ralk.io · https://ralk.io

To stop receiving messages, reply "stop" or click here: {{ unsubscribe }}
```

**Variante für Bergbau/Rohstoffe** (Quelle wie oben, FATF/APG 2015):

```text
The FATF has published a report on the risks linked to gold ("Money laundering and terrorist financing risks and vulnerabilities associated with gold", 2015). It describes, among other things, cash purchases, smuggling and intermediaries that bring illicit money into the supply chain. In these situations, your procurement, logistics and finance teams are the first to see the red flags.
```

### Mail 3 (Tag 8)

```text
Hello,

My last message on this: would you like me to open a free trial access for 3 employees of {{ contact.FIRMA }}? They can take the modules (fraud, bribery, sanctions, AML, data protection, cyber…) and you will see the reports.

A simple "yes" is enough, with the email addresses of the 3 people.

Our prices are public and the same for everyone: https://ralk.io/?utm_source=email&utm_medium=outreach&utm_campaign=register_en&utm_content=mail3#pricing

Kind regards,
Dina Boyele Kraus
RALK · contact@ralk.io · https://ralk.io

To stop receiving messages, reply "stop" or click here: {{ unsubscribe }}
```

---

## 5. Antworten auf typische Rückfragen

Für Preise, Zahlung, Quellensteuer und Module die Schnellantworten aus `meta-whatsapp.md`
verwenden (gleiche Texte, per Mail). Preise sind fest – auf Rabattwünsche freundlich mit dem
Text „/prixfixe“ bzw. „/fixedprice“ antworten.
