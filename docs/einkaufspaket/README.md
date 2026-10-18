# RALK Einkaufspaket (Procurement Pack)

Unterlagen für die Einkaufs- und Compliance-Abteilung eines Kunden, damit RALK ohne Rückfragen als Lieferant angelegt werden kann. Jede Unterlage gibt es auf Englisch (`-en`) und Französisch (`-fr`), als A4-PDF.

| Datei | Seiten | Wofür |
|---|---|---|
| `company-profile-en.pdf` / `-fr.pdf` | 1 / 1 | Wer RALK ist: 9 Module, Zielgruppen, Ablauf, Firmendaten laut Impressum, Gründerin |
| `price-sheet-en.pdf` / `-fr.pdf` | 1 / 1 | Preisstufen, Mindestlizenz, Rechenbeispiele, Zahlungsbedingungen, Quellensteuer-Klausel |
| `licence-terms-en.pdf` / `-fr.pdf` | 2 / 3 | Lizenzbedingungen, erzeugt aus `ralk-site/licence.html` |
| `security-and-quality-factsheet-en.pdf` / `-fr.pdf` | 1 / 1 | Hosting, Sicherheit, Datenschutz, Unterauftragnehmer, Content-Qualität; nur geprüfte Fakten |

Pitch Deck: nicht in diesem Ordner. Als PDF aus dem Deck-Artifact laden: https://claude.ai/artifact/DgUpUeTXxyCDALvgJsJJW5 → Download → PDF.

## Noch offen (bitte nachliefern)

- **Bankverbindung:** Auf dem Preisblatt steht „Bank details: provided on the invoice“. Sobald die Bankdaten feststehen, auf der Rechnung angeben (oder hier ergänzen lassen).
- **Zahlung:** nur per Karte über einen Zahlungslink zur Rechnung (keine Überweisung), zahlbar bei Erhalt; Freischaltung nach Zahlungseingang.
- **Steuernummer / USt-IdNr.:** steht nirgends; Einkaufsabteilungen fragen meist danach.

## Neu erzeugen

Quellen liegen in `src/` (HTML + `pack.css`). Die Lizenzbedingungen werden bei jedem Lauf frisch aus `ralk-site/licence.html` übernommen.

```
NODE_PATH=$(npm root -g) node docs/einkaufspaket/src/build.js
```
