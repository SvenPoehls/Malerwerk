# Design-Prüfung – Runde 2 (Agent 4, frischer Prüfer)

Datum: 2026-11-15 · Server: http://localhost:4173 (Status 200)
Grundlage: PROMPT.md (Abschnitte 1–4, 6, 7, Phase 4), `annahmen.md`, `design-brief.md`, `inhalte.md`, Code (`*.html`, `css/style.css`, `js/main.js`). Referenz-Screenshots gibt es keine.

## Aufnahmen

Alle unter `_entwurf/screenshots/runde-2/`:

- Seiten (je 360 / 768 / 1440 px, `-oben` und `-teil-n`): `index`, `leistungen`, `arbeiten`, `ueber-uns`, `kontakt`, `danke`, `impressum`, `datenschutz`, `404` (143 Dateien, alle angesehen)
- Nahaufnahmen (Skript `_entwurf/pruef-nahaufnahmen-runde-2.mjs`):
  - Mobilmenü offen: `nah-menue-offen-360-index.png`, `nah-menue-offen-360-kontakt.png`, `nah-menue-offen-768.png`
  - Primärbutton: `nah-knopf-normal.png`, `nah-knopf-hover.png`, `nah-knopf-fokus.png`
  - Sekundärbutton: `nah-knopf-sekundaer-hover.png`, `nah-knopf-sekundaer-fokus.png`
  - Weitere: `nah-abschluss-fokus.png` (Fokus auf Umbra), `nah-kopf-fokus.png`, `nah-index-hover.png`
  - Formular nach leerem Absenden: `nah-formular-fehler-360-oben.png`, `nah-formular-fehler-360-ganz.png`, `nah-formular-fehler-1440-oben.png`, `nah-formular-fehler-1440-ganz.png`

Hinweis: Auf den ganzseitigen Aufnahmen erscheinen der feste Header und die Aktionsleiste teils mitten im Bild. Das kommt vom Aufnahmeverfahren und ist kein Seitenfehler.

---

## Bewertung

| Kategorie | Punkte | Begründung |
|---|---|---|
| **Eigenständigkeit** | **4** | Das Konzept „Die saubere Kante“ ist durchgehend und erkennbar umgesetzt: Streifenmarke, Farbtonkarten-Etiketten MW-01 bis MW-06, Ablauf als Treppe von Kalk nach Umbra, Bildplatzhalter als „Probeanstrich“ mit harter Kante, 404 als „unfertige Wand“, Kantenband im Footer. Keine KI-Muster aus 7.1: keine Verläufe, keine Glows, keine Emojis und keine Dreier-Kartenreihen. Einzelne Sektionen sind konventionell, etwa die Arbeitsweise als 2×2-Nummernraster oder der Footer, deshalb keine 5. |
| **Branchenpassung** | **5** | Die Erdpigment-Palette, die ruhige helle Fläche und die Tonalität eines Handwerkers beim Ortstermin passen genau zu Privatkunden im Malerhandwerk. Klischees wie Kleckse, Farbrolle, Fächer oder Daumen-hoch-Stock sind konsequent vermieden. Das Einzugsgebiet ist typografisch statt als Karte gelöst. Die Branchenmuster wurden sinnvoll gefiltert (Brief, Abschnitt 3). |
| **Gesamteindruck Agenturniveau** | **4** | Die Seite ist sorgfältig, ruhig und hochwertig. Die Platzhalter sind sauber gestaltet und wirken nicht wie Fehler. Für die Abnahme fehlen Feinheiten: Tablet-Layouts, die Überlappung in „Sorgfalt“, einige Umbrüche und Ausrichtungen (siehe Liste). Die Seite „Arbeiten“ wirkt ohne Fotos zwangsläufig leer. Das ist gewollt, die Platzhalterflächen sind dort aber sehr dominant. |
| **Typografie** | **4** | Archivo mit Breitenachse trägt die Marke stark: breite H1/H2, gesperrte Etiketten, klare Hierarchie und Skala nach Briefing. `text-wrap`, `hyphens` und deutsche Anführungszeichen sind korrekt. Es gibt kleinere Umbruchfehler: Gedankenstrich am Zeilenanfang, getrenntes „PLATZ-HALTER“, „E-/Mail“-Umbrüche, verwaiste Mittelpunkte in der Ortsliste und schmale Zweispalter mit Flatterrand in „Sorgfalt“. |
| **Spacing und Layout** | **4** | Das 8-px-System gilt durchgehend als Variable, die Sektionsabstände von 64 bis 128 px sind großzügig. Die Layouts wechseln deutlich: asymmetrischer Hero, Indexliste mit Sticky-Kopf, Treppe, Querbild mit Panel, versetzte Vorschau, Grünerde-Band und Musterkarte. Schwächen: Das Panel in „Sorgfalt“ überlappt stärker als im Briefing (128 statt 64 px) und lässt ein unruhiges L aus Platzhalterfläche stehen. Das Datenschutz-Inhaltsverzeichnis endet nicht an der Containerkante. Ab 768 px ist fast alles einspaltig mit sehr großen Bildflächen. |
| **Farbe und Bild** | **4** | 60-30-10 ist eingehalten. Englischrot steht nur für Handlungen, aktive Zustände und Marke. Die Grünerde-/Umbra-Bänder setzen klare Kanten. Die Platzhalter sind gut gestaltet (Format-Etikett, Motiv, Streifenmarke, 88-%-Kante) und lassen sich ohne Layoutänderung austauschen. Abzug, weil die Platzhalter auf „Arbeiten“ und „Über uns“ als sehr große Ocker-Flächen (zum Beispiel Vorher/Nachher je ca. 600 × 750 px) das Bild beherrschen. |
| **Responsive** | **4** | Bei 360, 768 und 1440 px gibt es keine Überläufe und nichts ist abgeschnitten. Die mobile Aktionsleiste und das Mobilmenü sind sauber. Der Bereich 768–1023 px ist eher ein gestrecktes Mobil-Layout: Das Hero-Bild 4:5 ist etwa 740 px hoch, die Leistungsbilder laufen über die volle Breite. Dazu kommen Kleinigkeiten auf 360 px: Sprungleisten-Kacheln versetzt, „Bodenbeschich-tung“, unterschiedlich breite Buttons im Abschlussband. |
| **Texte** | **4** | Die Texte sind konkret, handwerksnah und ohne Floskeln, in Sie-Ansprache und mit klaren Handlungsaufrufen. Erfundene Fakten (Jahre, Titel, Zahlen, Preise, Bewertungen) habe ich nicht gefunden. Abläufe und Leistungen sind als Annahmen in der Checkliste geführt. Schwächen: „abdecken/abkleben“ wiederholt sich fünfmal über die Seite, der Hero-Lead endet holprig („decken wir ab und kleben ab“). |
| **Zielerreichung** | **5** | „Anfrage senden“ und „Anrufen“ sind überall in einem Schritt erreichbar: Header ab 1024 px, feste Aktionsleiste darunter (auf Kontakt „Zum Formular“), Hero, Abschlussband, „Diese Leistung anfragen“ mit Vorauswahl, Mobilmenü, 404. Das Formular ist kurz, gut beschriftet, die Fehlerführung (Zusammenfassung mit Sprunglinks und Feldmeldungen mit Icon) ist vorbildlich. |

**Ergebnis: Keine Kategorie liegt unter 4. Die Design-Prüfung ist bestanden.** Die Mängel unten sind Feinschliff auf dem Weg zur 5.

Animation (aus dem Code geprüft): Reveal 600 ms `--ease-out`, Versatz 16 px, Stagger 80 ms, `IntersectionObserver` einmalig. Die Flächen-Reveals laufen per `scaleX` (700 ms, eigene Kurve), es werden nur `transform` und `opacity` animiert. Sichtbare Inhalte werden nicht versteckt, ohne JS ist alles sichtbar, `prefers-reduced-motion` wird beachtet. Micro-Interaktionen liegen bei 150–200 ms, Hover-, Fokus- und Active-Zustände sind vorhanden (siehe Nahaufnahmen). Das entspricht 7.5.

---

## Mängelliste (priorisiert)

P1 = muss vor Abnahme, P2 = deutlich sichtbar und sollte behoben werden, P3 = Feinschliff.

### P1

Keine.

### P2

**P2-1 · Tablet 768–1023 px: Hero-Bild und Leistungsbilder übergroß**
- **Wo:** `css/style.css`, `.sv-hero` und `@media (min-width: 768px) { .hero__bild { grid-column: 2 / -1 } }`, `.leistung__bild` (768er-Block)
- **Befund:** Das Hero-Bild steht bei 768 px unter dem Text im Format 4:5 bei ca. 590 × 740 px. Die Leistungsbilder 3:2 laufen mit ca. 712 × 475 px über die volle Breite. Die Seite wirkt dort wie gestrecktes Mobil.
- **Screenshots:** `index-768-teil-1.png`, `leistungen-768-teil-1.png`, `leistungen-768-teil-5.png`
- **Änderung:**
  - Die Hero-Umschaltung auf 4:5 erst ab 1024 px vornehmen: `@media (min-width:768px){.sv-hero{--sv:4/5}}` → `@media (min-width:1024px)`. Damit bleibt es bei 768 px bei 4:3. Zusätzlich `.hero__bild { grid-column: 2 / -1 }` → `grid-column: 3 / -1` (4 von 6 Spalten).
  - Leistungsabschnitte bei 768–1023 px zweispaltig setzen: `.leistung__bild { grid-column: 1 / span 3 }`, `.leistung__text { grid-column: 4 / span 3 }`, gespiegelt entsprechend, `align-items: start`.

**P2-2 · Startseite „Sorgfalt“ (≥ 1024 px): Überlappung und Panel unruhig**
- **Wo:** `css/style.css` `.sorgfalt__panel` (1024er- und 1280er-Block), `.sorgfalt__panel .fluss`, `.sorgfalt .motiv__fuss`
- **Befund:** Das Panel überlappt das Querbild um 128 px (`--space-9`), das Briefing sieht 64 px (`--space-7`) vor. Es deckt 8 bis 9 Spalten ab. Von der Platzhalterfläche bleibt ein L-förmiger Rest, und die Motivzeile klemmt rechtsbündig im Reststreifen. Der Text läuft zweispaltig in Spalten von ca. 32 Zeichen und flattert stark („Wir decken Böden / ab, schützen …“).
- **Screenshot:** `index-1440-teil-3.png` / `index-1440-teil-4.png`
- **Änderung:**
  - Überlappung reduzieren: `margin-top: calc(var(--space-7) * -1)`.
  - Panel schmaler setzen: `grid-column: 1 / span 6` bei 1024 und 1280 px, wie im Briefing (Sp. 1–5/6).
  - Die Zweispaltigkeit von `.sorgfalt__panel .fluss` entfernen, Text einspaltig mit `max-width: var(--measure)`.
  - Die Regel `.sorgfalt .motiv__fuss { justify-content:flex-end; text-align:right }` streichen und die Motivzeile oben rechts unter das Format-Etikett setzen, damit sie nicht vom Panel verdeckt wird. Alternativ `.sorgfalt .motiv__fuss { position:absolute; top: var(--space-4); right: calc(12% + var(--space-4)); }`.

**P2-3 · Ortsliste: verwaister Mittelpunkt am Zeilenanfang**
- **Wo:** `css/style.css` `.ortsliste li + li::before`, betrifft `index.html` (Einzugsgebiet), `ueber-uns.html` (Einzugsgebiet kompakt), `kontakt.html` (Anfahrt/Einzugsgebiet)
- **Befund:** Bei 360 px bricht die Liste so um, dass „·“ allein vor dem Platzhalter in Zeile 2 steht. Das passiert auf drei Seiten.
- **Screenshots:** `index-360-teil-6.png`, `ueber-uns-360-teil-4.png`, `kontakt-360-teil-3.png`
- **Änderung:** Den Trenner ans Ende des vorherigen Eintrags hängen, damit er beim Umbruch am Zeilenende bleibt:
  ```css
  .ortsliste li + li::before { content: none; }
  .ortsliste li:not(:last-child)::after { content: "·"; margin-left: var(--space-2); }
  ```

### P3

**P3-1 · Platzhalter werden silbengetrennt („[PLATZ-HALTER: …]“)**
- **Wo:** `css/style.css` `.platzhalter`
- **Screenshot:** `impressum-360-teil-2.png`
- **Änderung:** `.platzhalter { hyphens: manual; }`. Kurze Platzhalter wie PLZ, Ort oder Jahr zusätzlich mit `white-space: nowrap` setzen, etwa über eine Klasse `.platzhalter--kurz`. Damit entfällt auch der Umbruch „[PLATZHALTER: / PLZ]“ in `kontakt.html` Anfahrt (`kontakt-1440-teil-2.png`).

**P3-2 · Gedankenstrich am Zeilenanfang**
- **Wo:** Fließtexte in allen HTML-Dateien, z. B. `leistungen.html` MW-05 („Oberfläche / – etwa im Wohnzimmer“)
- **Screenshot:** `leistungen-768-teil-5.png`
- **Änderung:** Im Fließtext „ – “ durch „&nbsp;– “ ersetzen. Das geschützte Leerzeichen gehört vor den Strich, damit dieser am vorherigen Wort hängt. In `inhalte.md` ebenso nachziehen.

**P3-3 · „E-Mail“ bricht am Bindestrich um**
- **Wo:** `kontakt.html` Seitenspalte Schritt 01, Fehlermeldung „Telefonnummer oder eine E-Mail-Adresse“, Hilfetext der Feldgruppe; `js/main.js` Fehlertexte
- **Screenshots:** `kontakt-360-teil-3.png`, `nah-formular-fehler-360-oben.png`, `kontakt-1440-teil-1.png`
- **Änderung:** Im Fließtext „E&#8209;Mail“ verwenden (geschützter Bindestrich U+2011). In `main.js` entsprechend `'E‑Mail'`. Danach prüfen, ob die Schrift U+2011 enthält; falls nicht, „E‑Mail“ in `<span class="kein-umbruch">` setzen.

**P3-4 · Sprungleiste (Leistungen) auf 360 px: Kacheln versetzt und Wort getrennt**
- **Wo:** `css/style.css` `.sprungleiste a`, `.sprungleiste__name`
- **Befund:** In „MW-05 Wandgestaltung“ sitzt der Inhalt tiefer als in der Nachbarkachel, „Bodenbeschich-tung“ ist getrennt.
- **Screenshot:** `leistungen-360-teil-1.png`
- **Änderung:** `.sprungleiste a { align-content: start; }`. Unter 480 px zusätzlich `.sprungleiste a { padding-inline: var(--space-2); } .sprungleiste__name { hyphens: manual; font-size: var(--text-xs); }`.

**P3-5 · Abschlussband mobil: Buttons unterschiedlich breit**
- **Wo:** `css/style.css`, Abschlussband
- **Befund:** Die Buttons sind 205 px und 143 px breit, linksbündig untereinander. Im Hero und im Menü sind sie vollbreit, das wirkt uneinheitlich.
- **Screenshot:** `index-360-teil-7.png`
- **Änderung:** `@media (max-width:479px){ .abschluss .knopfreihe { flex-direction:column; align-items:stretch; } .abschluss .knopf { width:100%; } }`. Dieselbe Regel gilt auch für `.wand__kalk .knopfreihe` auf der 404-Seite.

**P3-6 · Datenschutz: Inhaltsverzeichnis endet nicht an der rechten Containerkante (≥ 1280 px)**
- **Wo:** `css/style.css` `@media (min-width:1280px){ .toc { grid-column: 8 / span 4 } }`
- **Befund:** Die rechte Kante liegt bei ca. 1233 px statt bei 1340 px wie Header-Button und Footer.
- **Screenshot:** `datenschutz-1440-oben.png`
- **Änderung:** Regel löschen oder auf `grid-column: 9 / span 4` setzen.

**P3-7 · Arbeiten-Datenblatt quer (768–1023 px): uneinheitliche Trennlinie**
- **Wo:** `css/style.css` `.datenblatt dl > div:last-child`
- **Befund:** Unter „Umfang“ steht eine Linie, unter „Farbton“ keine.
- **Screenshot:** `arbeiten-768-teil-2.png`
- **Änderung:** `@media (min-width:768px) and (max-width:1023px){ .datenblatt--quer dl > div:nth-last-child(-n+2){ border-bottom:0; } }`

**P3-8 · Arbeiten (≥ 1024 px): Platzhalter-Paar Vorher/Nachher sehr dominant**
- **Wo:** `arbeiten.html` Projektblatt 2, `css/style.css` `.paar`
- **Befund:** Zwei Ocker- und Grünflächen von je ca. 600 × 750 px. Ohne Fotos wirkt der Abschnitt leer und laut.
- **Screenshot:** `arbeiten-1440-teil-2.png`
- **Änderung:** `@media (min-width:1024px){ .paar { width: calc(100% * 10 / 12); } }` (Sp. 1–10). Das Datenblatt bleibt in voller Breite darunter. Für Ocker im Paar optional `ton-leinen` statt `ton-ocker` verwenden, damit die Flächen ruhiger werden. Das Seitenverhältnis bleibt unverändert, der Austausch durch Fotos ist weiter ohne Layoutänderung möglich.

**P3-9 · Text: Wiederholung „abdecken/abkleben“**
- **Wo:** `index.html` Hero-Lead, Sorgfalt, Ablauf 04; `leistungen.html` MW-01; `ueber-uns.html` Arbeitsweise 02
- **Befund:** Fünf fast gleichlautende Stellen.
- **Änderung:** Den letzten Satz des Hero-Leads ersetzen, z. B. durch „Bevor gestrichen wird, schützen wir Böden und Möbel.“ Das löst zugleich die holprige Doppelung „decken wir ab und kleben ab“. Ablauf 04 kürzen auf: „Wir bereiten den Untergrund vor, streichen, tapezieren oder lackieren und räumen danach auf.“ Die Details zum Abdecken bleiben in „Sorgfalt“ und Arbeitsweise. Die Änderung in `inhalte.md` übernehmen.

**P3-10 · Hero ≥ 1024 px: Abstand zwischen Hero und Leistungsindex sehr groß**
- **Wo:** `css/style.css` `.hero { padding-block: … var(--section-y) }` zusammen mit `.sektion` (oben 128 px)
- **Befund:** Zwischen der Bildbeschriftung und dem Etikett „Leistungen“ liegen ca. 300 px leere Fläche mit einer Trennlinie in der Mitte.
- **Screenshot:** `index-1440-teil-1.png`
- **Änderung:** `.hero { padding-bottom: var(--section-y-kompakt); }` (96 px).

---

## Texte gegen 7.1 / 7.3 und erfundene Fakten

- **Floskeln:** keine aus 7.1 oder der Verbotsliste im Briefing gefunden. Überschriften stehen ohne Ausrufezeichen, Wortspiele mit Farbe gibt es nicht.
- **Typografie:** deutsche Anführungszeichen („…“), Halbgeviertstriche und `&nbsp;` in „z. B.“ und „§ 5“ sind korrekt. Offen sind nur P3-2 und P3-3.
- **Erfundene Fakten:** keine. Gründungsjahr, Meistertitel, Teamgröße, Preise, Fristen und Bewertungen sind konsequent als `[PLATZHALTER]` geführt. Leistungsumfang, Ablauf („schriftliches Angebot“, „Abnahme“) und Arbeitsweise („nehmen Abdeckung wieder mit“) sind Annahmen. Sie sind in `inhalte.md` als „vom Kunden zu bestätigen“ markiert und müssen in der Launch-Checkliste stehen.
- **Abweichungen von `inhalte.md`:** MW-04 ist freigegeben. „Hinweis Angebot“ auf der Leistungsseite steht ohne die zwei Buttons aus `inhalte.md` 3.3. Das ist vertretbar, weil das Abschlussband mit denselben Handlungen direkt folgt. Ich werte es nicht als Mangel.
