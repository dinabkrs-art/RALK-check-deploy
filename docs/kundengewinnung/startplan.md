# RALK Kundengewinnung – Startplan

Ziel: mit möglichst wenig Geld möglichst viele passende Firmen erreichen. Zuerst die
**kostenlosen Kanäle**, bezahlte Anzeigen nur klein und mit Stopp-Regel.

**Dinas Vorgaben (Stand 17.10.2026):** Werbebudget insgesamt **50 EUR pro Monat**, nur
Google-Suche, **keine Meta-Anzeigen**. Testzugang nur **erste 2 Module, höchstens 3 Mitarbeiter,
14 Tage**. Erstkontakt-Mails **persönlich aus contact@ralk.io** (max. ca. 30/Tag), Brevo nur für
Personen mit Einwilligung. Keine Prüfung durch eine Kanzlei; die rechtliche Checkliste in
`email-sequenz.md` ist Dinas eigene Prüfliste.

## 1. Was fertig ist

| Was | Datei |
|---|---|
| Google-Anzeigen zum Import (FR + EN, pausiert, 50 EUR/Monat, je Sprache 4 aktive Anzeigengruppen) + Anleitung | `google-ads/` (Anleitung: `LIESMICH.md`) |
| WhatsApp-Profil, Katalog, Schnellantworten (FR + EN, organisch) | `meta-whatsapp.md` |
| 3-Schritt-E-Mail-Serie (FR + EN, persönlicher Versand) + Brevo für Opt-in + rechtliche Checkliste | `email-sequenz.md` |
| Zielkunden-Liste aus den Registern, priorisiert (A/B/C), inkl. Bergbau (Segment „Mining/Extractives“) | `zielkunden-priorisiert.csv` und Blatt „Zielkunden – Register“ in `docs/RALK_Preise_Plaene_Vertrieb.xlsx` |
| Prüfskript für alle Werbetexte | `google-ads/validate.py` |

## 2. Was Sie selbst tun müssen

Konten legt nur die Inhaberin an (Zahlungsdaten, Identität, 2FA). Überall 2FA einschalten.

| # | Aufgabe | Kosten | Dauer |
|---|---|---|---|
| 1 | **Bestellformular-Aktivierung prüfen** (siehe unten) | 0 | 5 Min. |
| 2 | **WhatsApp Business** App mit eigener Firmennummer einrichten, Texte aus `meta-whatsapp.md` | 0 | 30 Min. |
| 3 | **Kontaktliste** (Tabelle) und **Mail-Vorlagen** im Postfach contact@ralk.io anlegen (`email-sequenz.md`, Abschnitt 2a). Später: **Brevo**-Konto nur für Personen mit Einwilligung, Domain ralk.io bestätigen (DNS-Einträge bei Hostinger) | 0 | 45 Min. |
| 4 | **Google Search Console**: search.google.com/search-console → „Domain“ → `ralk.io` → angezeigten **TXT-Eintrag** bei Hostinger → Domains → ralk.io → DNS-Zone eintragen → „Bestätigen“. Danach unter „Sitemaps“ `https://ralk.io/sitemap.xml` einreichen. | 0 | 20 Min. |
| 5 | **Google-Ads-Konto in EUR** + Zahlungsmethode (Schritte in `google-ads/LIESMICH.md`) | max. ca. 50 EUR/Monat | 45 Min. |

DNS-Einträge bei Hostinger ändern Sie selbst (bestehende Einträge nicht löschen, nur neue
hinzufügen).

### Bestellformular: einmalige Aktivierung bei formsubmit.co

Das Bestellformular auf ralk.io/order und das Formular des Checks senden an
`https://formsubmit.co/ajax/contact@ralk.io`. formsubmit.co liefert erst aus, wenn im Postfach
**contact@ralk.io** einmal der Bestätigungslink geklickt wurde – möglicherweise einmal pro
Website (ralk.io und check.ralk.io).

So prüfen:
1. Auf ralk.io/order eine Testbestellung absenden (Bemerkung: „TEST – bitte ignorieren“).
2. Im Postfach contact@ralk.io (auch **Spam**) nach einer Mail von FormSubmit suchen
   („Activate Form“/„Confirm your email“) → Link klicken.
3. Testbestellung noch einmal senden → sie muss als normale Mail ankommen.
4. Dasselbe mit einem Test-Check auf check.ralk.io.

**Ohne diese Bestätigung gehen Bestellungen und Leads verloren.** Vor dem Start jeder Werbung
erledigen.

## 3. Kanäle in dieser Reihenfolge

**Kostenlos (zuerst):**
1. **Register-E-Mails, persönlich aus contact@ralk.io** (kein Massenversand): Priorität A aus
   `zielkunden-priorisiert.csv` – frankophone Banken, Mikrofinanz und E-Geld-Institute
   (BCEAO/Commission Bancaire, COBAC/BEAC, BCC DR Kongo) sowie Banken/Fintechs in Nigeria,
   Kenia, Ghana. Danach Priorität B, darunter **Bergbau** (Chambers of Mines, EITI-Berichte;
   Mail 2 in der Bergbau-Variante). Adressen nur aus öffentlichen Quellen, **höchstens ca. 30
   Firmen pro Tag**. Brevo erst für Personen, die eingewilligt haben (z. B. nach dem Quick-Check).
2. **Partner:** Anwalts-Empfehlungsnetz (18 Kanzleien) bitten, den Check-Link an Mandanten zu
   geben; Verbände (Priorität B in der Liste, z. B. Bankenverbände) eine kostenlose
   Mitglieder-Info oder ein Webinar anbieten. Preise bleiben dabei fest.
3. **WhatsApp Business App:** Profil, Katalog, Schnellantworten; Check-Link in jede Unterhaltung.
4. **LinkedIn (ohne Anzeigen):** Firmenseite RALK + 1–2 Beiträge pro Woche (FR/EN) zu einem
   Thema (Betrug, Korruption, Sanktionen, Datenschutz …) mit Check-Link. Zahlen nur aus echten
   Check-Ergebnissen.
5. **Google Search Console:** damit ralk.io und ralk.io/fr in der normalen Google-Suche
   gefunden werden und Sie sehen, mit welchen Suchwörtern.

**Bezahlt (danach, klein):**
6. **Google-Suchanzeigen:** FR 1,00 EUR/Tag, EN 0,65 EUR/Tag (max. ca. 50 EUR/Monat), max.
   0,60 EUR pro Klick, nur Mo–Fr zu Bürozeiten, nur Google-Suche. Je Sprache nur 4 aktive
   Anzeigengruppen: Compliance allgemein, Geldwäsche, Korruption, Preise.
7. **Keine Meta-Anzeigen** (Dinas Entscheidung). WhatsApp nur organisch.

**Stopp-Regel für Anzeigen:** Jede Anzeigengruppe, die nach **10 EUR** Ausgaben **keinen
einzigen Check** gebracht hat, wird pausiert; dafür kann eine pausierte Gruppe derselben Sprache
eingeschaltet werden (`google-ads/LIESMICH.md`).

## 4. Die ersten 14 Tage

| Tag | Was |
|---|---|
| 1 | formsubmit-Aktivierung prüfen (oben). WhatsApp Business einrichten. |
| 2 | Kontaktliste (Tabelle) und Mail-Vorlagen in contact@ralk.io anlegen. Search Console + TXT-Eintrag. |
| 3 | Kontaktliste FR bauen: 5 A-Register öffnen (BCEAO, Commission Bancaire, COBAC, BCC), öffentliche Funktions-Adressen der Institute abschreiben, Quelle notieren. |
| 4 | Mail 1 FR persönlich senden (max. ca. 30 Firmen/Tag). Anwaltsnetz + 2 Verbände anschreiben. |
| 5 | Kontaktliste EN (CBN Nigeria, Central Bank of Kenya, Bank of Ghana), Mail 1 EN persönlich senden. |
| 6 | Google-Ads-Konto, Editor, Import (pausiert). Website-Session: Check auf Französisch (`?lang=fr`), UTM bis zur Bestellung, Google-Tag. |
| 7 | Erster LinkedIn-Beitrag. Wochenzahlen notieren. |
| 8 | Google-Anzeigen EN einschalten; FR, sobald der Check auf Französisch öffnet. |
| 9 | Bergbau-Liste anlegen: Mitgliederlisten der Chambers of Mines (Ghana, Sambia, Botswana, Namibia, Südafrika) und EITI-Berichte (Senegal, Guinea, Mali …) aus der Zielkunden-Liste. |
| 10 | Antworten aus Mail 1/2 beantworten, Testzugänge anlegen (erste 2 Module, max. 3 Mitarbeiter, 14 Tage). |
| 11 | Google: Suchbegriffe prüfen, unpassende ausschließen. |
| 12 | Nächste Firmen anschreiben (Priorität A, weitere Länder; max. ca. 30/Tag). |
| 13 | Zweiter LinkedIn-Beitrag. |
| 14 | Wochenzahlen, Stopp-Regel (10 EUR ohne Check) anwenden, entscheiden: welcher Kanal bekommt Woche 3–4 mehr Zeit? |

## 5. Wochenzahlen (jeden Montag)

| Kennzahl | Woher |
|---|---|
| Checks abgeschlossen (gesamt und je Quelle) | Check-Mails im Postfach, Feld `utm_source`/`utm_content` |
| Kosten pro Check | Google-Anzeigenkosten ÷ Checks aus Anzeigen |
| Bestellungen | Bestell-Mails von ralk.io/order |
| Kosten pro Kunde | Anzeigenkosten ÷ bezahlte Bestellungen |
| E-Mail-Serie: gesendet, Antworten, „stop“ | eigene Kontaktliste (Tabelle) |
| WhatsApp-Gespräche mit Firmen | WhatsApp Business |
| Testzugänge | eigene Liste |

## 6. Entschieden und noch offen

**Entschieden (Dina):**
1. **Budget:** Google max. ca. 50 EUR/Monat (FR 1,00 EUR/Tag, EN 0,65 EUR/Tag), Konto in EUR.
   Kein Meta.
2. **Testzugang:** nur die ersten 2 Module, höchstens 3 Mitarbeiter, 14 Tage. Mail 3 und die
   WhatsApp-Schnellantworten /essai und /trial sagen genau das – nie „alle Module“.
3. **Versand:** Erstkontakt persönlich aus contact@ralk.io (max. ca. 30/Tag); Brevo nur für
   Personen mit Einwilligung (z. B. nach dem Quick-Check).
4. **Keine Kanzlei-Prüfung** der Mails; die rechtliche Checkliste in `email-sequenz.md` ist
   Dinas eigene Prüfliste.
5. **Bergbau:** öffentliche Verzeichnisse (Chambers of Mines, Bergbauregister, EITI-Berichte)
   sind recherchiert und stehen in `zielkunden-priorisiert.csv` (Segment „Mining/Extractives“)
   und im Blatt „Zielkunden – Register“ der Excel-Datei. Die Google-Anzeigengruppe Bergbau ist
   pausiert (zu wenige Suchen); Bergbau läuft über persönliche Mails.

**Noch offen:**
1. **Testzugang technisch:** Kann app.ralk.io einen Zugang auf die ersten 2 Module, 3 Personen
   und 14 Tage begrenzen? Wer legt ihn an? Vorher Mail 3 und /essai, /trial nicht verwenden.
2. **Website-Änderungen** (Check auf Französisch, UTM bis zur Bestellung, Google-Tag mit
   Cookie-Einwilligung, Einwilligungs-Kästchen im Quick-Check für Brevo) – erst nach Abschluss
   von PR #2.
3. **Preise im alten Plan:** `docs/vertrieb-remote.md` (Abschnitt 4) nennt noch alte Preisstufen
   (bis 4.000 / 4.001–7.999 / ab 8.000) und einen „Mitgliederrabatt“ für Verbände. Gültig sind
   die Preise auf ralk.io (65 / 55 / 45 USD, ohne Rabatte). Alle neuen Texte nutzen diese.
