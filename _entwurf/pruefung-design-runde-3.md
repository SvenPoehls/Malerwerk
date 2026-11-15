# Design-Prüfung Runde 3 (Agent 4, frischer Prüfer)

Grundlage: PROMPT.md (Abschnitte 1–4, 6, 7, Phase 4), `annahmen.md`, `design-brief.md`, `inhalte.md`, Code (`*.html`, `css/style.css`, `js/main.js`). Nicht gelesen: `abweichungen.md`, frühere Prüfberichte, Builder-Screenshots.

## Screenshots (final)

Alle unter `_entwurf/screenshots/runde-3/`:
- Seiten (je 360, 768, 1440 px: `-oben` + `-teil-n`): index, leistungen, arbeiten, ueber-uns, kontakt, danke, impressum, datenschutz, 404 (142 Aufnahmen, mit `_entwurf/screenshot.mjs`).
- Nahaufnahmen (Skript `_entwurf/pruef-nahaufnahmen-runde-3.mjs`):
  - Mobilnavigation: `nah-mobilnav-index-360-zu/-offen/-offen-fokus.png`, `nah-mobilnav-leistungen-360-*.png` (aktiver Punkt), `nah-mobilnav-index-768-offen.png`
  - Buttons: `nah-knopf-normal/-hover/-fokus/-active-1440.png`, `nah-knopf-sekundaer-hover/-fokus-1440.png`, `nah-abschlussband-fokus-1440.png` (Fokus auf Umbra)
  - Formular: `nah-formular-leer-360/1440.png`, `nah-formular-fehler-360/1440.png` (+ `-sicht`), `nah-formular-fehler-email-360/1440.png` (ungültige E-Mail)
  - Sonstiges: `nah-header-gescrollt-1440.png`, `nah-leistungsindex-hover-1440.png`

Hinweis: Im automatisierten Browser sind Scroll-Einblendungen deaktiviert (`navigator.webdriver`); Animationen wurden im Code geprüft.

## Gesamturteil

Die Seite hat eine klare, eigene Idee („Die saubere Kante“) und setzt sie konsequent um: Streifenmarke, Farbtonkarten-Etiketten MW-01 bis MW-06, Schichtaufbau-Treppe im Ablauf, harte Flächenkanten, Grünerde → Umbra als zwei Anstrichschichten, Footer-Kantenband. Die Bildplatzhalter sind als Probeanstrich mit 88/12-Kante gestaltet und wirken bewusst, nicht wie Lücken. Typografie (Archivo mit Breitenachse) trägt die Marke. Formularzustände, Fokus, Hover und Mobilnavigation sind sauber. Es gibt keine KI-Muster aus 7.1 und keine erfundenen Fakten. Die verbleibenden Mängel betreffen einzelne Kompositionen und Feinheiten, aber keine grundsätzlichen Fehler.

## Bewertung

| Kategorie | Punkte | Begründung |
|---|---|---|
| Eigenständigkeit | 5 | Unverwechselbares System aus Kante, Farbtonkarte und Schichtaufbau. Die Streifenmarke funktioniert als Logo, als Bildsignatur und als Favicon. Keine Verläufe, Glows, Emojis oder 3er-Icon-Karten. Die Layouts wechseln ab: Index-Liste, Treppe, Overlap-Panel, Asymmetrie, Datenblatt, Musterkarte. |
| Branchenpassung | 5 | Ruhig, hell und handwerklich präzise. Die Erdpigment-Palette passt zu einem Malerbetrieb ohne Klischees (keine Kleckse, kein Pinsel-Logo). Für Privatkunden liegt der Schwerpunkt auf Vorbereitung, Schutz der Wohnung und Ablauf. |
| Gesamteindruck Agenturniveau | 4 | Abnahmefähig. Abzüge gibt es für einzelne Kompositionen: die umgekehrte Bildhierarchie in der Arbeiten-Vorschau, die Leerfläche im Sorgfalt-Block und ein Rasterbruch beim Vorher/Nachher-Paar. Dazu kommt mobil eine stellenweise sehr dichte Silbentrennung. |
| Typografie | 4 | Klare Hierarchie, gute Skala, Etiketten sauber gesperrt und Überschriften gut ausbalanciert. Mobil trennt `hyphens: auto` in schmalen Spalten zu oft (z. B. „ge-macht“, „Ergeb-nis“, „Ih-nen“, „Gara-gen-“). |
| Spacing und Layout | 4 | Konsequentes 8-px-System über Variablen, ruhiger Sektionsrhythmus, saubere Achsen. Einzelne Brüche: Vorher/Nachher-Paar endet bei Sp. 10, das Datenblatt darunter bei Sp. 12. Der Sorgfalt-Block hat rechts unter dem Bild eine große Leerfläche. |
| Farbe und Bild | 4 | Die 60-30-10-Regel ist eingehalten, Rot nur für Handlungen. Die Platzhalter sind gut gestaltet. Die Ocker-Flächen sind groß und laut, z. B. das „Fassade“-Bild der Startseite in Ocker mit der Beschriftung MW-03 (Grünerde). Dadurch bricht die Farblogik. |
| Responsive | 4 | Auf allen drei Breiten nichts abgeschnitten oder überlappend. Kleinigkeiten: unter dem Footer-Kantenband bleibt mobil ein Kalk-Streifen (Innenabstand für die Aktionsleiste). Im Mobilmenü bei 768 px sind die Buttons 712 px breit. Bei 768 px steht das Hero-Bild rechtsbündig vor einer toten Fläche. |
| Texte | 5 | Konkret, sachlich, in der Sie-Form, ohne Floskeln, ohne erfundene Fakten. Platzhalter sind sauber gekennzeichnet. Typografie stimmt („…“, –, geschützte Leerzeichen). Einzige Abweichung: Der Lackierarbeiten-Absatz weicht von `inhalte.md` ab (inhaltlich besser, aber nicht synchronisiert). |
| Zielerreichung | 5 | „Anfrage senden“ und „Anrufen“ stehen überall: Header-CTA ab 1024 px, mobile Aktionsleiste, Hero, Abschlussband, „Diese Leistung anfragen“ mit Vorauswahl. Die Kontaktseite zeigt „Zum Formular“. Fehlermeldungen im Formular sind verständlich, mit Zusammenfassung und Sprunglinks. |

**Keine Kategorie unter 4.**

## Mängelliste

### P1 (blockiert Abnahme)
Keine.

### P2 (sichtbare Schwäche, vor Launch beheben)

**P2-1 – Startseite, Arbeiten-Vorschau: Bildhierarchie umgekehrt, Farblogik falsch** (`index-1440-teil-4.png`, `-teil-5.png`)
- Problem: Das „kleine“ 4:5-Bild (rechts, ca. 500 × 620 px) ist höher und dominanter als das „große“ 3:2-Bild (ca. 710 × 470 px). Es beginnt außerdem auf Höhe der Überschrift statt versetzt. Laut Briefing 12.1/5 gilt: großes Bild Sp. 1–7, kleines Bild Sp. 9–12, um `--space-8` nach unten versetzt. Zusätzlich steht das Fassaden-Bild in Ocker, die Beschriftung lautet aber „MW-03 · Fassade“ (Grünerde-Quadrat).
- Änderung (`index.html` Arbeiten-Vorschau, `css/style.css` Vorschau-Raster ab 1024 px):
  - Großes Bild `grid-column: 1 / 8`.
  - Kleines Bild `grid-column: 9 / 13; margin-top: var(--space-8)`.
  - Kopf (Etikett, H2, Text, Link) über dem kleinen Bild in Sp. 9–12 oder über beiden Bildern volle Breite.
  - Danach ist das 4:5-Bild bei 1440 px ca. 400 px breit, also kleiner als das 3:2-Bild.
  - Ton des Fassaden-Platzhalters auf `ton-gruen-hell` setzen oder Etikett-Quadrat und Fläche aufeinander abstimmen. Ocker eher für das kleine Detailbild verwenden.

**P2-2 – Mobile Silbentrennung zu dicht** (`index-360-teil-2.png` bis `-teil-4.png`, `leistungen-360-oben.png`, `datenschutz-360-teil-1.png`)
- Problem: In den schmalen Textspalten der Ablauf-Bänder (Text ab x ≈ 110 px) und des Leistungsindex trennt fast jede zweite Zeile, z. B. „ge-macht“, „of-fene“, „Ih-nen“, „Ergeb-nis“, „Unter-grund“, „Gara-gen-“. Das wirkt unruhig und billig.
- Änderung in `css/style.css`:
  - Für Fließtext mobil `hyphenate-limit-chars: 10 4 4;` ergänzen (Chromium/Safari mit `-webkit-`-Präfix `-webkit-hyphenate-limit-before/after` als Fallback).
  - Für `.index__zeile p` und die Ablauf-Band-Texte `hyphens: manual` setzen. Diese Sätze sind kurz und brechen auch ohne Trennung gut.
  - Prüfen in `index-360-teil-3/4.png`.

### P3 (Feinschliff)

**P3-1 – Startseite, Sorgfalt-Block: Leerfläche rechts** (`index-1440-teil-4.png`)
Rechts neben dem überlappenden Panel (x 704–1340) bleiben unter dem Bild ca. 450 px leer. Zwei Lösungen:
- (a) Panel auf Sp. 1–6 verbreitern und Bild 21:9 etwas niedriger, damit die Überlappung zum Schwerpunkt wird.
- (b) Rechts in Sp. 8–12, unten bündig zum Panel, eine kurze Etikett-Liste der Schutzmaßnahmen („Boden · Möbel · Fenster · Steckdosen“) als typografisches Gegengewicht. Nur Inhalte aus `inhalte.md` verwenden.

**P3-2 – Arbeiten, Vorher/Nachher-Paar endet bei Sp. 10, Datenblatt bei Sp. 12** (`arbeiten-1440-teil-2.png`)
Rechte Kanten fluchten nicht (1133 px vs. 1340 px). Entweder `.paar` wieder volle Breite (Briefing: Sp. 1–6 / 7–12), oder Datenblatt und Projekttitel ebenfalls auf `width: calc(100% * 10 / 12)` begrenzen (`css/style.css` Zeile 1134).

**P3-3 – Footer mobil: Kalk-Streifen unter dem Kantenband** (`index-360-teil-7.png`)
Der `body`-Innenabstand für die Aktionsleiste zeigt Kalk unter dem Footer. Den Abstand stattdessen als `padding-bottom` an den Footer bzw. unter das Kantenband in Leinen legen. Alternativ `body { background: var(--farbe-leinen) }` und `main` in Kalk, damit das Kantenband optisch den Abschluss bildet.

**P3-4 – Erster Bildschirm mobil: CTAs doppelt** (`index-360-oben.png`, `index-768-oben.png`)
Hero-Buttons und Aktionsleiste zeigen gleichzeitig dieselben zwei Handlungen. Die Aktionsleiste erst einblenden, wenn die Hero-Knopfreihe den Viewport verlässt: per `IntersectionObserver` in `js/main.js` eine Klasse auf `body` setzen, mit `transform: translateY(100%)` und `opacity` animiert. Ohne JS bleibt die Leiste sichtbar. Auf Unterseiten ohne Hero-CTA immer sichtbar.

**P3-5 – Mobilmenü bei 768 px: Buttons 712 px breit** (`nah-mobilnav-index-768-offen.png`)
`.menue__direkt .knopfreihe` ab 480 px auf `max-width: 28rem` begrenzen oder beide Buttons nebeneinander (je `1fr`) setzen.

**P3-6 – Startseite 768 px: Hero-Bild rechtsbündig, links ca. 250 px tote Fläche** (`index-768-teil-1.png`)
Zwischen 768 und 1023 px das Bild volle Containerbreite (4:3) mit dem Grünerde-Streifen rechts setzen, wie mobil. Alternativ links daneben die Bildbeschriftung oder die USP-Zeile platzieren.

**P3-7 – Leistungen, Wandgestaltung mobil: Bildunterschriften ohne Etikett-Stil** (`leistungen-360-teil-5.png`)
Desktop zeigt die Unterschriften „KALKPUTZ / SPACHTELTECHNIK / LASUR“ mit Farbquadrat und Versalien, mobil stehen sie in normaler Schrift ohne Quadrat. Den Etikett-Stil (`.etikett`, Quadrat 12 px) bei der 3er-Reihe unter 768 px beibehalten. Bei Platzmangel nur die Schriftbreite auf 100 % reduzieren.

**P3-8 – Leistungen, „Angebot nach Besichtigung“ ohne Handlungen** (`leistungen-1440-teil-5.png`)
Briefing 12.2/3 und `inhalte.md` 3.3 sehen „Anfrage senden“ und „Anrufen“ inline vor. Im Code fehlen sie (`leistungen.html` ca. Zeile 258). Wegen des direkt folgenden Abschlussbands vertretbar. Dann aber `inhalte.md` und Briefing anpassen oder einen schlichten Textlink „Besichtigung anfragen“ ergänzen, damit der Block nicht als reiner Textabsatz endet.

**P3-9 – Textsynchronität `inhalte.md`** (`leistungen.html` MW-04)
Im HTML steht: „…sehen frisch lackiert wieder gepflegt aus“. In `inhalte.md` steht: „…wirken schnell wie neu, wenn sie frisch lackiert sind“. Die HTML-Fassung ist besser, weil sie kein Versprechen „wie neu“ macht. Bitte `inhalte.md` angleichen, damit die Quelle der Wahrheit stimmt. Gleiches gilt für den VSBG-Absatz im Impressum und den SSL-Hinweis in der Datenschutzerklärung, die im HTML als Platzhalter gesetzt sind.

**P3-10 – Footer: Adress-Platzhalter brechen unschön** (`index-1440-teil-6.png`)
„[PLATZHALTER: Straße und / Hausnummer]“ bricht in der Spalte Sp. 5–7. Die Kontakt-Spalte auf Sp. 5–8 verbreitern oder Straße und PLZ/Ort in zwei eigene Zeilen setzen (wie in der Kontakt-Seitenspalte). Das passt auch für die spätere echte Adresse.

## Prüfung Texte gegen 7.1 / 7.3 und erfundene Fakten
- Keine Floskeln aus 7.1 oder der Verbotsliste im Briefing gefunden (Suche nach Partner, Leidenschaft, Qualität, Profi, Experte, Entdecken, Traum, Erfahrung, Garantie, Ausrufezeichen in sichtbarem Text). „Meisterbetrieb“ kommt nur im Platzhaltertext vor.
- Keine erfundenen Zahlen, Jahre, Preise, Fristen, Siegel oder Kundenstimmen. Alle fehlenden Daten sind als `[PLATZHALTER: …]` gekennzeichnet und als gestrichelte Leinen-Markierung gut, aber nicht alarmierend sichtbar.
- Deutsche Typografie korrekt: „…“, Halbgeviertstrich, `&nbsp;` in „z. B.“ und „§ 5“.

## Code-Notizen Animation/Interaktion
- Reveal per `IntersectionObserver` (threshold 0.15, einmalig), 600 ms `--ease-out`, Versatz 16 px, Stagger 80 ms, Ausgangszustand nur mit `.js` – entspricht 7.5.
- Flächen-Reveal „Band abziehen“ (`scaleX`, 700 ms) nur am Hero-Feld.
- `prefers-reduced-motion` wird vollständig respektiert.
- Micro-Interaktionen laufen mit 150–200 ms. Ein paar Übergänge animieren `background-color`, `color` und `box-shadow`. Das ist bei Buttons und Links üblich und unkritisch, weicht aber streng genommen von „nur transform und opacity“ ab. Keine Änderung nötig.
- Hover, Fokus und Active sind sichtbar und stimmig: Primärbutton dunkler mit Pfeilversatz, Sekundärbutton gefüllt, Fokusring rot-dunkel bzw. auf Umbra kalkweiß (`nah-knopf-*.png`, `nah-abschlussband-fokus-1440.png`).
