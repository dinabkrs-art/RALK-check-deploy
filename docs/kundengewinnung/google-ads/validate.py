# -*- coding: utf-8 -*-
"""
RALK – Prüfskript für alle Werbetexte in docs/kundengewinnung/.

Aufruf (aus dem Repo-Hauptordner):
    python3 docs/kundengewinnung/google-ads/validate.py

Prüft:
  Google Ads (CSV-Dateien in diesem Ordner)
    - Anzeigentitel (Headlines) <= 30 Zeichen, Beschreibungen <= 90, Pfade <= 15
      (gezählt in Unicode-Zeichen nach NFC-Normalisierung, also „é“ = 1 Zeichen)
    - 15 Titel und 4 Beschreibungen je Anzeige, keine doppelten Titel
    - kein „!“ in Titeln (Google-Richtlinie), höchstens ein „!“ je Beschreibung
    - Final URL: https, mit utm_source, utm_medium, utm_campaign, utm_content
    - Keywords <= 80 Zeichen und <= 10 Wörter; kein Keyword wird durch ein
      eigenes ausschließendes Keyword blockiert
    - jede Anzeige nennt mindestens ein Thema außer Geldwäsche (keine reine AML-Botschaft)
  Meta / WhatsApp / E-Mail (Markdown-Dateien im Ordner darüber)
    - Tabellen mit Kopfzeile „| ID | Feld | Text |“: Längengrenze je Feld (siehe LIMITS)
    - alle Textblöcke in ```text … ``` und alle Tabellentexte: verbotene Wörter
  Überall in Werbetexten verboten:
    - „Africa“, „Afrique“, „African“, „africain(e)(s)“ … (Regel von Dina)
    - Hinweise, dass Inhalte KI-generiert seien

Ergebnis: Exit-Code 0 = alles in Ordnung, 1 = Fehler (werden aufgelistet).
"""
import csv
import os
import re
import sys
import unicodedata
from urllib.parse import urlparse, parse_qs

HERE = os.path.dirname(os.path.abspath(__file__))
PARENT = os.path.dirname(HERE)

HEADLINE_MAX, DESC_MAX, PATH_MAX = 30, 90, 15
LIMITS = {  # Feld -> maximale Zeichen (Markdown-Tabellen)
    "Primärtext": 125,          # Meta: empfohlen, damit nichts abgeschnitten wird
    "Überschrift": 40,          # Meta
    "Beschreibung": 30,         # Meta
    "WA-Info": 139,             # WhatsApp Business „Info“
    "WA-Beschreibung": 512,     # WhatsApp Business Unternehmensbeschreibung
    "WA-Kürzel": 25,            # WhatsApp Schnellantwort-Kürzel
    "WA-Katalogname": 60,
    "Betreff": 60,              # E-Mail-Betreff (Empfehlung, sonst abgeschnitten)
}

FORBIDDEN = [
    (re.compile(r"afri\w*", re.I), "Wort mit „Afri…“ (Africa/Afrique/African/africain) ist in Werbetexten nicht erlaubt"),
    (re.compile(r"\b(ai|ia|ki)[\s-]*(generated|g[ée]n[ée]r[ée]e?s?|generiert)", re.I), "Hinweis „KI-generiert“ nicht erlaubt"),
    (re.compile(r"g[ée]n[ée]r[ée]e?s?\s+(par|avec)\s+(l['’])?(ia|intelligence artificielle)", re.I), "Hinweis „KI-generiert“ nicht erlaubt"),
    (re.compile(r"generated\s+(by|with)\s+(ai|artificial intelligence)", re.I), "Hinweis „KI-generiert“ nicht erlaubt"),
]
NON_AML_TOPICS = re.compile(r"fraud|fraude|corruption|bribery|sanction|cyber|données|data|phishing|alerte|whistleblow", re.I)

errors = []


def n(s):
    return len(unicodedata.normalize("NFC", s or ""))


def forbid(text, where):
    for rx, msg in FORBIDDEN:
        m = rx.search(text or "")
        if m:
            snippet = (text[max(0, m.start() - 30):m.end() + 30]).replace("\n", " ")
            errors.append(f"{where}: {msg}: „…{snippet}…“")


def read_csv(name):
    with open(os.path.join(HERE, name), encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


# ---------- Google Ads ----------
ads = read_csv("6-anzeigen.csv")
for r in ads:
    where = f"Anzeige [{r['Campaign']} / {r['Ad Group']}]"
    heads = [r.get(f"Headline {i}", "") for i in range(1, 16)]
    descs = [r.get(f"Description {i}", "") for i in range(1, 5)]
    if sum(1 for h in heads if h) != 15:
        errors.append(f"{where}: nicht genau 15 Titel")
    if sum(1 for d in descs if d) != 4:
        errors.append(f"{where}: nicht genau 4 Beschreibungen")
    low = [h.lower() for h in heads if h]
    if len(set(low)) != len(low):
        errors.append(f"{where}: doppelte Titel")
    for i, h in enumerate(heads, 1):
        if n(h) > HEADLINE_MAX:
            errors.append(f"{where}: Titel {i} hat {n(h)} Zeichen (max {HEADLINE_MAX}): „{h}“")
        if "!" in h:
            errors.append(f"{where}: Titel {i} enthält „!“")
        forbid(h, f"{where} Titel {i}")
    for i, d in enumerate(descs, 1):
        if n(d) > DESC_MAX:
            errors.append(f"{where}: Beschreibung {i} hat {n(d)} Zeichen (max {DESC_MAX}): „{d}“")
        if d.count("!") > 1:
            errors.append(f"{where}: Beschreibung {i} hat mehr als ein „!“")
        forbid(d, f"{where} Beschreibung {i}")
    for p in ("Path 1", "Path 2"):
        if n(r[p]) > PATH_MAX:
            errors.append(f"{where}: {p} hat {n(r[p])} Zeichen (max {PATH_MAX}): „{r[p]}“")
        if " " in r[p]:
            errors.append(f"{where}: {p} enthält Leerzeichen")
        forbid(r[p], f"{where} {p}")
    url = r["Final URL"]
    u = urlparse(url)
    q = parse_qs(u.query)
    if u.scheme != "https":
        errors.append(f"{where}: Final URL ohne https")
    for k in ("utm_source", "utm_medium", "utm_campaign", "utm_content"):
        if k not in q:
            errors.append(f"{where}: Final URL ohne {k}")
    forbid(url, f"{where} Final URL")
    if not NON_AML_TOPICS.search(" ".join(heads + descs)):
        errors.append(f"{where}: nur Geldwäsche-Botschaft – mindestens ein weiteres Thema nennen")

kws = read_csv("4-keywords.csv")
negs = read_csv("5-auszuschliessende-keywords.csv")
neg_by_campaign = {}
for r in negs:
    neg_by_campaign.setdefault(r["Campaign"], []).append(r["Keyword"].lower())
for r in kws:
    k = r["Keyword"]
    where = f"Keyword [{r['Campaign']} / {r['Ad Group']}] „{k}“"
    if n(k) > 80 or len(k.split()) > 10:
        errors.append(f"{where}: zu lang")
    if r["Criterion Type"] not in ("Phrase", "Exact", "Broad"):
        errors.append(f"{where}: unbekannter Match-Typ {r['Criterion Type']}")
    padded = f" {k.lower()} "
    for neg in neg_by_campaign.get(r["Campaign"], []):
        if f" {neg} " in padded:
            errors.append(f"{where}: wird durch ausschließendes Keyword „{neg}“ blockiert")

ag = read_csv("3-anzeigengruppen.csv")
ag_keys = {(r["Campaign"], r["Ad Group"]) for r in ag}
for r in ads + kws:
    if (r["Campaign"], r["Ad Group"]) not in ag_keys:
        errors.append(f"Anzeigengruppe fehlt in 3-anzeigengruppen.csv: {r['Campaign']} / {r['Ad Group']}")
camps = {r["Campaign"] for r in read_csv("1-kampagnen.csv")}
for f in ("2-standorte.csv", "3-anzeigengruppen.csv", "4-keywords.csv", "5-auszuschliessende-keywords.csv", "6-anzeigen.csv"):
    for r in read_csv(f):
        if r["Campaign"] not in camps:
            errors.append(f"{f}: Kampagne „{r['Campaign']}“ fehlt in 1-kampagnen.csv")

# ---------- Markdown (Meta, WhatsApp, E-Mail) ----------
md_counts = {}
for md in ("meta-whatsapp.md", "email-sequenz.md"):
    path = os.path.join(PARENT, md)
    if not os.path.exists(path):
        errors.append(f"{md}: Datei fehlt")
        continue
    text = open(path, encoding="utf-8").read()
    # Textblöcke
    for i, block in enumerate(re.findall(r"```text\n(.*?)```", text, re.S), 1):
        forbid(block, f"{md} Textblock {i}")
    # Tabellen | ID | Feld | Text |
    in_tab, cnt = False, 0
    for line in text.splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")] if line.strip().startswith("|") else None
        if cells is None:
            in_tab = False
            continue
        if cells[:3] == ["ID", "Feld", "Text"]:
            in_tab = True
            continue
        if not in_tab or set(cells[0]) <= set("-: "):
            continue
        if len(cells) < 3:
            continue
        rid, feld, val = cells[0], cells[1], cells[2]
        cnt += 1
        forbid(val, f"{md} {rid}")
        lim = LIMITS.get(feld)
        if lim and n(val) > lim:
            errors.append(f"{md} {rid} ({feld}): {n(val)} Zeichen, max {lim}: „{val}“")
    md_counts[md] = cnt

# ---------- Ergebnis ----------
print(f"Google Ads: {len(ads)} Anzeigen, {len(ag)} Anzeigengruppen, {len(kws)} Keywords, "
      f"{len(negs)} ausschließende Keywords, {len(camps)} Kampagnen geprüft.")
for md, c in md_counts.items():
    print(f"{md}: {c} Tabellen-Texte geprüft (plus alle ```text-Blöcke).")
if errors:
    print(f"\n{len(errors)} FEHLER:")
    for e in errors:
        print(" -", e)
    sys.exit(1)
print("\nOK – alle Längen und Wortregeln eingehalten.")
