# Google-Anzeigen für RALK – Schritt für Schritt

Alles ist vorbereitet: 2 Kampagnen, 22 Anzeigengruppen, 144 Keywords, 22 Anzeigen,
76 ausschließende Keywords. Die Kampagnen werden **pausiert** importiert – es kostet nichts,
bis Sie sie selbst einschalten.

**Budget (Dinas Vorgabe): insgesamt 50 EUR im Monat**, nur Google-Suche. Keine Meta-Anzeigen.
Damit das kleine Budget nicht verpufft, sind je Sprache nur **4 Anzeigengruppen aktiv**, die
übrigen 7 werden pausiert importiert (Vorrat für später).

## Was in den Dateien steckt

| Datei | Inhalt |
|---|---|
| `1-kampagnen.csv` | „RALK FR – Afrique francophone“ (Französisch, 1,00 EUR/Tag) und „RALK EN – Anglophone Africa“ (Englisch, 0,65 EUR/Tag). Nur Google-Suche, „Klicks maximieren“ mit max. 0,60 EUR pro Klick, Mo–Fr 07–19 Uhr. |
| `2-standorte.csv` | Länder je Kampagne (als Google-Standort-ID, Liste unten) |
| `3-anzeigengruppen.csv` | 11 Themen je Sprache. **Aktiv (4):** Compliance allgemein (e-learning), Geldwäsche (LBC-FT / AML-CFT), Korruption (Anti-corruption / Anti-bribery), Preise. **Pausiert (7):** Sanktionen, Betrug, Datenschutz, Cyber, KYC, Whistleblowing, Bergbau/Rohstoffe (Begründung unten). |
| `4-keywords.csv` | nur Suchbegriffe mit Kaufabsicht („formation …“, „… training“, „e-learning …“), je als Wortgruppe und genau passend |
| `5-auszuschliessende-keywords.csv` | Begriffe, bei denen die Anzeige **nicht** erscheint (Jobs, Praktikum, gratis, PDF, Master, Diplom, Uni …) |
| `6-anzeigen.csv` | je Anzeigengruppe eine responsive Suchanzeige mit 15 Titeln und 4 Beschreibungen |
| `validate.py` | Prüfskript: Längen, verbotene Wörter, Links (siehe unten) |

Kosten: höchstens ca. **50 EUR im Monat** (1,00 + 0,65 EUR × 30,4 Tage = 50,16 EUR). Google darf
an einzelnen Tagen etwas mehr ausgeben, im Monat aber nicht mehr als dieses Limit. Bei 0,60 EUR
pro Klick sind das nur ca. 2–3 Klicks pro Werktag – deshalb die Konzentration auf wenige Gruppen.

### Warum nur diese 4 Anzeigengruppen aktiv sind

| Gruppe | Status | Grund |
|---|---|---|
| Compliance allgemein (e-learning) | aktiv | Wer „formation conformité en ligne“ / „compliance training for employees“ sucht, sucht genau unser Produkt. |
| Geldwäsche (LBC-FT / AML-CFT) | aktiv | Gesetzliche Schulungspflicht bei Banken, Mikrofinanz, E-Geld – höchste Kaufabsicht. Die Anzeigen nennen trotzdem auch Betrug, Korruption, Sanktionen. |
| Korruption (Anti-corruption / Anti-bribery) | aktiv | Firmen aller Branchen (auch Bergbau, Energie, Telekom) suchen das als Schulung für Mitarbeiter. |
| Preise | aktiv | Wer nach Preis/Lizenz sucht, steht kurz vor der Entscheidung. |
| Betrug | pausiert | Viele Suchen kommen von Betroffenen („fraude bancaire“, „fraud report“), nicht von Firmen, die schulen wollen. Das Thema steht ohnehin in allen aktiven Anzeigen. |
| Sanktionen, KYC | pausiert | Überschneiden sich stark mit Geldwäsche; zuerst sehen, ob die Geldwäsche-Gruppe Checks bringt. |
| Datenschutz, Cyber | pausiert | Hier werben viele große Anbieter, Klicks sind teurer, Suchende wollen oft Zertifikate für sich selbst. |
| Whistleblowing | pausiert | Sehr wenige Suchen mit Kaufabsicht in den Zielländern. |
| Bergbau/Rohstoffe | pausiert (FR und EN) | Die Suchbegriffe („formation conformité secteur minier“, „mining compliance training“) haben gute Absicht, werden aber fast nie gesucht; die Variante „pétrole et gaz“ zieht eher Jobsuchende an. Bergbaufirmen erreichen wir besser direkt: die neuen Bergbau-Verzeichnisse (Chambers of Mines, Bergbauregister, EITI-Berichte) stehen in `zielkunden-priorisiert.csv` und in der Excel-Tabelle. |

Pausierte Gruppen erst einschalten, wenn eine aktive Gruppe nach der Stopp-Regel pausiert wurde
oder das Budget erhöht wird.

Links in den Anzeigen: Themen-Anzeigen führen direkt auf die passende Themenseite auf ralk.io
(z. B. `https://ralk.io/fr/formation/lbc-ft?utm_source=google&utm_medium=cpc&utm_campaign=ralk_fr&utm_content=lbc-ft`
bzw. `https://ralk.io/training/aml-cft?…`), dort kann sofort bestellt werden. Allgemeine Gruppen
(E-Learning, Bergbau) führen auf die Startseite, die Preis-Anzeigen auf `ralk.io/fr#pricing`
bzw. `ralk.io/#pricing`. Die UTM-Angaben werden bis zur Bestellung mitgenommen; in jeder
Bestell-Mail steht, aus welcher Kampagne und Anzeigengruppe der Kontakt kam.

## Technik vor dem Start (erledigt)

1. Themenseiten für alle 9 Module auf Englisch und Französisch sind online.
2. Herkunft (UTM) wird bis zur Bestellung mitgenommen.
3. Google-Tag mit Cookie-Einwilligung ist auf ralk.io eingebaut, die Conversion
   „Lizenzbestellung“ wird nach jeder erfolgreichen Bestellung gezählt.

## Schritt für Schritt

### 1. Google-Ads-Konto anlegen (ca. 15 Min.)
1. ads.google.com öffnen → „Jetzt starten“ → mit dem Google-Konto anmelden, das RALK gehören soll.
2. Google will sofort eine Kampagne erstellen: unten auf **„Zum Expertenmodus wechseln“** und dann
   **„Konto ohne Kampagne erstellen“** klicken.
3. Land der Rechnungsadresse, **Zeitzone „(GMT+01:00) Lagos“** und **Währung „Euro (EUR)“**
   wählen. Achtung: Zeitzone und Währung lassen sich später **nicht** mehr ändern. Alle Beträge in
   den Dateien (Tagesbudget, max. Klickpreis) sind EUR-Beträge – sie stimmen nur, wenn das Konto
   in EUR geführt wird.

### 2. Zahlungsmethode hinterlegen
Abrechnung → Einstellungen → Firmenkarte oder Lastschrift eintragen, „Automatische Zahlungen“.
Rechnungsadresse = Firmenadresse von RALK (wie im Impressum).

### 3. Google Ads Editor installieren
1. Download: ads.google.com/intl/de_de/home/tools/ads-editor/ → installieren (Windows oder Mac).
2. Öffnen → „Konto hinzufügen“ → im Browser mit demselben Google-Konto anmelden → Konto
   auswählen → „Herunterladen“.

### 4. Dateien importieren
Die Dateien **in dieser Reihenfolge** importieren, jeweils: Menü **Konto → Importieren →
Aus Datei** (bzw. „Änderungen importieren → Aus Datei“) → Datei wählen → „Verarbeiten“ →
„Fertigstellen und überprüfen“ → **„Behalten“**.

1. `1-kampagnen.csv`
2. `2-standorte.csv`
3. `3-anzeigengruppen.csv`
4. `4-keywords.csv`
5. `5-auszuschliessende-keywords.csv`
6. `6-anzeigen.csv`

Danach in jeder Kampagne kurz prüfen (Kampagne anklicken, rechts die Einstellungen):
- **Netzwerke:** nur „Google-Suche“; „Suchnetzwerk-Partner“ und „Displaynetzwerk“ **aus**.
- **Sprache:** FR-Kampagne Französisch, EN-Kampagne Englisch.
- **Standorte:** Liste unten; Option „Präsenz: Personen, die sich an Ihren Zielorten befinden
  oder regelmäßig dort aufhalten“.
- **Gebotsstrategie:** „Klicks maximieren“, **maximales CPC-Gebot 0,60 EUR**.
- **Budget:** FR 1,00 EUR/Tag, EN 0,65 EUR/Tag.
- **Anzeigengruppen:** je Kampagne genau 4 aktiv (siehe Tabelle oben), 7 pausiert.
- **Werbezeitplaner:** Montag–Freitag, 07:00–19:00.
- **Geräte:** nichts ändern (die Kampagnen sind reine Suchkampagnen, App-Platzierungen gibt es
  dort nicht).
Fehlt ein Wert nach dem Import (der Editor kennt nicht jede Spalte), einfach von Hand eintragen.

Zum Schluss oben rechts **„Veröffentlichen“** – die Kampagnen sind dann im Konto, aber pausiert.

### 5. Einschalten
Erst wenn Punkt 1 bei „Vor dem Start klären“ erledigt ist: im Browser (ads.google.com) die
EN-Kampagne aktivieren, die FR-Kampagne direkt danach. Google prüft die Anzeigen
(meist innerhalb eines Werktags).

### 6. Conversions verknüpfen (wichtig für später)
1. In Google Ads: **Ziele → Conversions → Neue Conversion-Aktion → Website** → Domain
   `check.ralk.io` eingeben → „Manuell einrichten“ → zwei Aktionen anlegen:
   - „Check abgeschlossen“ (Kategorie „Lead senden“, Wert 0)
   - „Lizenzbestellung“ (Kategorie „Kauf“, Domain `ralk.io`)
2. Google zeigt eine **Conversion-ID** (AW-…) und je ein **Label**. Diese beiden Angaben an
   Claude geben – der Google-Tag wird dann im Check (nach dem Absenden des Formulars) und auf
   der Bestellseite (nach erfolgreicher Bestellung) eingebaut, **mit Cookie-Einwilligung**.
3. Bis dahin zählen wir von Hand: Jede Check-/Bestell-Mail enthält `utm_source=google` und die
   Anzeigengruppe (`utm_content`).
4. **Ab 30 Conversions** in 30 Tagen: Gebotsstrategie auf **„Conversions maximieren“** umstellen
   (Kampagne → Einstellungen → Gebote). Vorher nicht – Google hat sonst zu wenig Daten.

## Jede Woche (10 Minuten, z. B. montags)

1. **Suchbegriffe:** Kampagne → Keywords → **Suchbegriffe**. Alles, was nicht passt (Jobsuche,
   Studium, kostenlos, falsches Thema), markieren → „Als ausschließendes Keyword hinzufügen“
   (Ebene: Kampagne).
2. **Stopp-Regel:** Jede Anzeigengruppe, die **nach 10 EUR Ausgaben keinen einzigen Check**
   gebracht hat, pausieren (Checks = Mails mit dieser Anzeigengruppe in `utm_content`). Statt ihr
   eine pausierte Gruppe derselben Sprache einschalten (Vorschlag der Reihenfolge: Sanktionen,
   Betrug, Datenschutz).
3. **Zahlen notieren** (Tabelle in startplan.md): Kosten, Klicks, Checks, Bestellungen,
   Kosten pro Check.
4. **Anzeigen-Status:** „Abgelehnt“ oder „Eingeschränkt“? Grund anklicken und an Claude geben.
5. Keine Budgeterhöhung, solange nicht klar ist, welche Anzeigengruppe Checks bringt.

## Standorte

| FR-Kampagne | ID | EN-Kampagne | ID |
|---|---|---|---|
| Senegal | 2686 | Nigeria | 2566 |
| Côte d'Ivoire | 2384 | Kenia | 2404 |
| Kamerun | 2120 | Ghana | 2288 |
| Benin | 2204 | Uganda | 2800 |
| Togo | 2768 | Tansania | 2834 |
| Burkina Faso | 2854 | Ruanda | 2646 |
| Mali | 2466 | Sambia | 2894 |
| Niger | 2562 | Südafrika | 2710 |
| Gabun | 2266 | Botswana | 2072 |
| Kongo (Brazzaville) | 2178 | Malawi | 2454 |
| DR Kongo | 2180 | Sierra Leone | 2694 |
| Guinea | 2324 | Gambia | 2270 |
| Madagaskar | 2450 | Liberia | 2430 |
| Tschad | 2148 | Namibia | 2516 |
| Zentralafrikanische Rep. | 2140 | Simbabwe | 2716 |
| Burundi | 2108 | Mauritius | 2480 |

Die Kampagnennamen enthalten „Afrique/Africa“ nur intern (sieht kein Kunde). In den
Anzeigentexten, Pfaden und Links kommt das Wort nicht vor – das prüft `validate.py`.

## Texte ändern

Anzeigentexte direkt in `6-anzeigen.csv` (oder im Editor) ändern und danach prüfen:

```
python3 docs/kundengewinnung/google-ads/validate.py
```

Grenzen: Titel ≤ 30 Zeichen, Beschreibung ≤ 90, Pfad ≤ 15, kein „!“ im Titel, kein
„Africa/Afrique/African/africain“, kein Hinweis auf KI-Erstellung, jede Anzeige nennt mehr als
nur Geldwäsche. Das Skript prüft auch die Texte in `meta-whatsapp.md` und `email-sequenz.md`.
