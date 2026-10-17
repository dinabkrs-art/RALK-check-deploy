# RALK Kundengewinnung – Startplan

Ziel: mit möglichst wenig Geld möglichst viele passende Firmen erreichen. Zuerst die
**kostenlosen Kanäle**, bezahlte Anzeigen nur klein und mit Stopp-Regel.

## 1. Was fertig ist

| Was | Datei |
|---|---|
| Google-Anzeigen zum Import (FR + EN, pausiert) + Anleitung | `google-ads/` (Anleitung: `LIESMICH.md`) |
| Meta-Anzeigen, WhatsApp-Profil, Katalog, Schnellantworten (FR + EN) | `meta-whatsapp.md` |
| 3-Schritt-E-Mail-Serie (FR + EN) + Brevo-Einrichtung + Rechtliches | `email-sequenz.md` |
| Zielkunden-Liste aus den Registern, priorisiert (A/B/C) | `zielkunden-priorisiert.csv` |
| Prüfskript für alle Werbetexte | `google-ads/validate.py` |

## 2. Was Sie selbst tun müssen

Konten legt nur die Inhaberin an (Zahlungsdaten, Identität, 2FA). Überall 2FA einschalten.

| # | Aufgabe | Kosten | Dauer |
|---|---|---|---|
| 1 | **Bestellformular-Aktivierung prüfen** (siehe unten) | 0 | 5 Min. |
| 2 | **WhatsApp Business** App mit eigener Firmennummer einrichten, Texte aus `meta-whatsapp.md` | 0 | 30 Min. |
| 3 | **Brevo**-Konto anlegen, Domain ralk.io bestätigen (DNS-Einträge bei Hostinger), Brevo-Support zur Kaltakquise fragen | 0 | 45 Min. |
| 4 | **Google Search Console**: search.google.com/search-console → „Domain“ → `ralk.io` → angezeigten **TXT-Eintrag** bei Hostinger → Domains → ralk.io → DNS-Zone eintragen → „Bestätigen“. Danach unter „Sitemaps“ `https://ralk.io/sitemap.xml` einreichen. | 0 | 20 Min. |
| 5 | **Google-Ads-Konto** + Zahlungsmethode (Schritte in `google-ads/LIESMICH.md`) | Budget s. u. | 45 Min. |
| 6 | Optional: **Meta Business Suite** (business.facebook.com) mit Facebook-Seite „RALK“, Instagram verbinden, WhatsApp-Nummer verknüpfen, Zahlungsmethode | 3 USD/Tag, 14 Tage | 45 Min. |
| 7 | **Budget freigeben** (Vorschlag unten) | | |

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
1. **Register-E-Mails über Brevo** (kostenloser Tarif, 300 Mails/Tag): Priorität A aus
   `zielkunden-priorisiert.csv` – frankophone Banken, Mikrofinanz und E-Geld-Institute
   (BCEAO/Commission Bancaire, COBAC/BEAC, BCC DR Kongo) sowie Banken/Fintechs in Nigeria,
   Kenia, Ghana. Adressen nur aus öffentlichen Quellen, 30–50 Firmen pro Tag.
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
6. **Google-Suchanzeigen:** FR 7 USD/Tag, EN 5 USD/Tag (max. ca. 365 USD/Monat), max. 0,60 USD
   pro Klick, nur Mo–Fr zu Bürozeiten, nur Google-Suche.
7. **Meta, optional:** nur ein Test „Klick zu WhatsApp“, 3 USD/Tag, 14 Tage (max. ca. 42 USD).

**Stopp-Regel für Anzeigen:** Jede Anzeigengruppe, die nach **40 USD** Ausgaben **keinen
einzigen Check** gebracht hat, wird pausiert. Meta-Test: nach 20 USD ohne ein einziges
Firmengespräch beenden.

## 4. Die ersten 14 Tage

| Tag | Was |
|---|---|
| 1 | formsubmit-Aktivierung prüfen (oben). WhatsApp Business einrichten. |
| 2 | Brevo-Konto + DNS-Einträge bei Hostinger; Brevo-Support fragen. Search Console + TXT-Eintrag. |
| 3 | Kontaktliste FR bauen: 5 A-Register öffnen (BCEAO, Commission Bancaire, COBAC, BCC), öffentliche Funktions-Adressen der Institute abschreiben, in Brevo importieren. |
| 4 | E-Mail-Serie FR starten (30–50 Firmen/Tag). Anwaltsnetz + 2 Verbände anschreiben. |
| 5 | Kontaktliste EN (CBN Nigeria, Central Bank of Kenya, Bank of Ghana), E-Mail-Serie EN starten. |
| 6 | Google-Ads-Konto, Editor, Import (pausiert). Website-Session: Check auf Französisch (`?lang=fr`), UTM bis zur Bestellung, Google-Tag. |
| 7 | Erster LinkedIn-Beitrag. Wochenzahlen notieren. |
| 8 | Google-Anzeigen EN einschalten; FR, sobald der Check auf Französisch öffnet. |
| 9 | Optional: Meta-Test „Klick zu WhatsApp“ starten (Enddatum Tag 22). |
| 10 | Antworten aus Mail 1/2 beantworten, Testzugänge anlegen. |
| 11 | Google: Suchbegriffe prüfen, unpassende ausschließen. |
| 12 | Nächste 50 Firmen in Brevo (Priorität A, weitere Länder). |
| 13 | Zweiter LinkedIn-Beitrag. |
| 14 | Wochenzahlen, Stopp-Regel anwenden, entscheiden: welcher Kanal bekommt Woche 3–4 mehr Zeit? |

## 5. Wochenzahlen (jeden Montag)

| Kennzahl | Woher |
|---|---|
| Checks abgeschlossen (gesamt und je Quelle) | Check-Mails im Postfach, Feld `utm_source`/`utm_content` |
| Kosten pro Check | Anzeigenkosten (Google + Meta) ÷ Checks aus Anzeigen |
| Bestellungen | Bestell-Mails von ralk.io/order |
| Kosten pro Kunde | Anzeigenkosten ÷ bezahlte Bestellungen |
| E-Mail-Serie: Antworten, Abmeldungen | Brevo-Statistik |
| WhatsApp-Gespräche mit Firmen | WhatsApp Business |
| Testzugänge | eigene Liste |

## 6. Was Sie entscheiden müssen

1. **Budget freigeben:** Google max. ca. 365 USD/Monat, Meta-Test einmalig max. ca. 42 USD (oder weglassen).
2. **Testzugang für 3 Mitarbeiter:** Mail 3 und die WhatsApp-Schnellantwort bieten ihn an.
   Gibt es den Ablauf in app.ralk.io schon (wer legt ihn an, wie lange gilt er – der Plan sagt
   14 Tage)? Sonst Mail 3 anpassen, bevor die Serie Tag 8 erreicht.
3. **Brevo oder Einzelmails** für den Erstkontakt (je nach Antwort des Brevo-Supports).
4. **Website-Änderungen** (Check auf Französisch, UTM bis zur Bestellung, Google-Tag/Meta-Pixel
   mit Cookie-Einwilligung) – erst nach Abschluss von PR #2.
5. **Preise im alten Plan:** `docs/vertrieb-remote.md` (Abschnitt 4) nennt noch alte Preisstufen
   (bis 4.000 / 4.001–7.999 / ab 8.000) und einen „Mitgliederrabatt“ für Verbände. Gültig sind
   die Preise auf ralk.io (65 / 55 / 45 USD, ohne Rabatte). Alle neuen Texte nutzen diese.
6. **Bergbau:** In der Register-Tabelle gibt es noch keine Bergbau-Verzeichnisse (z. B.
   Chamber of Mines). Bergbau läuft vorerst nur über die Google-Anzeigengruppe
   „Mines/Mining“. Sollen solche Verzeichnisse recherchiert und in die Tabelle aufgenommen werden?
