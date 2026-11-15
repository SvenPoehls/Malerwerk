# Technik-Prüfung – Runde 2 (Agent 5, frischer Prüfer)

Datum: 15.11.2026 · Prüfgegenstand: veröffentlichter Code im Wurzelverzeichnis (9 HTML-Seiten, `css/`, `js/`, `assets/`, `kontakt.php`, `kontakt-config.php`, `.htaccess`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, Favicons).
Grundlage: PROMPT.md Abschnitte 2, 5, 9 und Agent-5-Auftrag, `_entwurf/annahmen.md`. Builder-Notizen und frühere Berichte wurden nicht gelesen.

## Ergebnis auf einen Blick

**11 von 12 technischen Abnahmekriterien erfüllt, 1 nicht erfüllt** (Tastaturbedienung: Fokus unter der mobilen Aktionsleiste verdeckt).
Mängel: **1 × P1, 1 × P2, 7 × P3.**

## Abnahmekriterien (Abschnitt 9, ohne Design-Kriterium)

| # | Kriterium | Status | Beleg |
|---|---|---|---|
| 1 | Lighthouse mobil: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95 | **erfüllt** | Alle 5 Seiten 100/100/100/100 (Tabelle unten), `_entwurf/lighthouse-runde-2-*.json` |
| 2 | axe: keine serious/critical | **erfüllt** | `qa-runde-2.json`: 0 Verstöße auf 9 Seiten. Zusätzlich 0 Verstöße mit `navigator.webdriver = false` nach Scrollen (360/1440, 9 Seiten), mit offenem Menü (360/768), mit Formularfehlern und auf der von PHP erzeugten Fehlerseite (`technik-test-runde-2.json`) |
| 3 | Keine externen Anfragen | **erfüllt** | `qa-runde-2.json`: `externeAnfragen: []` auf allen Seiten. Keine iframes, Videos oder Einbettungen. Die drei externen Links (OpenStreetMap, osmfoundation.org, gesetze-im-internet.de) sind normale Links und werden in der Datenschutzerklärung (Abschnitt 8) erklärt |
| 4 | Keine Konsolenfehler, keine defekten internen Links | **erfüllt** | `qa-runde-2.json`: keine Konsolenfehler, `kaputteLinks: []`. Eigener Tab-Durchlauf auf 18 Seite×Breite-Kombinationen ebenfalls ohne Fehler. Hinweis P3-1 betrifft nur die PHP-Fehlerantwort |
| 5 | HTML-Validierung ohne Fehler | **erfüllt** | `npx html-validate *.html` → Exit 0, keine Meldungen. Auch die von `kontakt.php` erzeugten Seiten (422 und 503) sind valide |
| 6 | 360/768/1440 ohne horizontale Scrollleiste | **erfüllt** | `technik-test-runde-2.json` → `horizontal`: 27/27 ok (`scrollWidth == clientWidth`). Einziges Element außerhalb ist der Honeypot `.honig` (links außerhalb, verursacht kein Scrollen) |
| 7 | Vollständige Tastaturbedienung inkl. mobiler Navigation und Formular | **nicht erfüllt** | Bedienbarkeit ist vollständig: Skip-Link, Menü per Enter/Space, Fokusfalle, Escape mit Rückfokus, Formular per Tab ausfüllbar und absendbar, Zurück-Navigation funktioniert. **Aber:** Unter 1024 px liegt der Fokus mehrfach **vollständig unter der festen Aktionsleiste** (E-Mail-Feld, Nachricht, Footer-Links, Inhaltsverzeichnis Datenschutz). Siehe P1-1 |
| 8 | Title, Description, Canonical, OG je Seite; JSON-LD, Sitemap, robots, Favicons, 404 | **erfüllt** | Tabelle „Metadaten“ unten. JSON-LD `HousePainter` valide (index, kontakt), ohne erfundene Daten. Sitemap mit 7 indexierbaren Seiten, robots.txt mit Sitemap-Verweis, Favicon-Set vollständig, Manifest gültig, `ErrorDocument 404 /404.html`, 404-Seite mit wurzelabsoluten Pfaden |
| 9 | Bilder optimiert, Schriften lokal | **erfüllt** | Keine Fotos geliefert, daher keine `<img>`/`<picture>`. Platzhalter mit `aspect-ratio` (`--sv`). `_entwurf/bilder.mjs` mit Testbildern geprüft: erzeugt AVIF/WebP/JPEG in den festgelegten Breiten, kein Hochskalieren, Mobil-Zuschnitt. OG-Bild 1200×630 JPEG, 14 KB, unter der OG-URL erreichbar (200). Logo und Favicon als SVG. Schrift lokal (`archivo-latin-wdth.woff2`, Preload mit `crossorigin`, `font-display: swap`) |
| 10 | Formular: Validierung, Spamschutz, Rückmeldungen | **erfüllt** | Prüfung im Browser und auf dem Server, Honeypot, Danke-Seite, Fehlerseite. Kein Header-Injection-Pfad, keine XSS-Lücke (PHP-Tests unten). Versand ist sauber vorbereitet (Empfänger als Platzhalter, ohne Empfänger gibt es eine 503-Antwort mit Meldung). Verbesserung in P2-1 |
| 11 | Impressum mit gelieferten Pflichtangaben; Datenschutzerklärung prüfpflichtig gekennzeichnet | **erfüllt** | Impressum enthält alle Punkte nach § 5 DDG (Name/Rechtsform, Anschrift, Vertretung, Kontakt, Register, USt-IdNr., Kammer/Berufsbezeichnung/Berufsrecht, Verantwortlicher nach § 18 Abs. 2 MStV, VSBG). Jede fehlende Angabe ist als `[PLATZHALTER: …]` gekennzeichnet. Die Datenschutzerklärung beginnt mit einem hervorgehobenen Kasten „Wichtiger Hinweis: Dieser Text muss vor der Veröffentlichung geprüft werden“ (Generator oder Anwalt). Beschrieben werden nur die tatsächlich eingesetzten Verarbeitungen |
| 12 | Keine erfundenen Fakten, Platzhalter gesammelt | **erfüllt** | Gezielte Suche nach Jahreszahlen, „Meister“, „Familie“, Garantie, Fristen, Zahlen, Zertifikaten und „Erfahrung“: keine Treffer außerhalb von Platzhaltern. 55 verschiedene Platzhalter, alle sichtbar mit `<mark class="platzhalter">`. Ablaufversprechen sollte der Kunde bestätigen (P3-3). Ob alle Platzhalter in der Launch-Checkliste stehen, prüft der Orchestrator in Phase 6 |

## Testergebnisse

### Lighthouse mobil (Runde 2)

| Seite | Performance | Barrierefreiheit | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| index | 100 | 100 | 100 | 100 | 0,8 s | 0 | 0 ms |
| leistungen | 100 | 100 | 100 | 100 | 0,8 s | 0 | 0 ms |
| arbeiten | 100 | 100 | 100 | 100 | 0,8 s | 0 | 0 ms |
| ueber-uns | 100 | 100 | 100 | 100 | 0,8 s | 0 | 0 ms |
| kontakt | 100 | 100 | 100 | 100 | 0,8 s | 0 | 0 ms |

Einzelaudits unter 0,9: `unminified-css` (gewollt: CSS bleibt auf Kundenwunsch unminifiziert), `cache-insight` (lokaler `serve`; `.htaccess` setzt Expires-Header) sowie `render-blocking`/`network-dependency-tree` (nur informativ, eine CSS-Datei).

### QA-Skript (`_entwurf/qa-runde-2.json`)
Alle 9 Seiten: Status 200, keine externen Anfragen, keine Konsolenfehler, 0 axe-Verstöße, keine defekten Links.

### HTML-Validierung
`npx html-validate *.html` → keine Fehler. Die PHP-Ausgaben (`kontakt.php` bei leeren Feldern, ungültiger E-Mail, XSS-Versuch, Versandfehler) sind ebenfalls ohne Fehler.

### Eigene Playwright-Tests (`_entwurf/technik-test-runde-2.mjs` → `_entwurf/technik-test-runde-2.json`, Nachtest `_entwurf/technik-nachtest-runde-2.mjs`)
- **Horizontales Scrollen:** 9 Seiten × 360/768/1440: keine Scrollleiste.
- **Skip-Link:** erster Tab-Stopp auf allen Seiten. Nach dem Übergang (400 ms) sichtbar bei top 8 px (`screenshots/runde-2-technik/skip-360.png`). Enter setzt den Fokus auf `main#inhalt`, der nächste Tab landet im Inhalt.
- **Fokus sichtbar:** Alle Tab-Stopps auf 9 Seiten bei 360 und 1440 haben einen Outline-Ring. **Verdeckung unter 1024 px:** siehe P1-1.
- **Mobile Navigation (360 und 768):** Menü-Knopf ist der 3. Tab-Stopp. Geschlossene Menülinks sind nicht fokussierbar. Enter öffnet das Menü (`aria-expanded=true`, Fokus auf „Leistungen“). Tab bleibt im Kreis Menü↔Knopf, Shift+Tab funktioniert. Escape schließt das Menü und setzt den Fokus zurück auf den Knopf. Space öffnet, Enter auf einem Link navigiert. axe mit offenem Menü: 0. Bei 1440 ist der Menü-Knopf ausgeblendet und die Navigation liegt direkt in der Tab-Reihenfolge.
- **Formular per Tastatur (360/1440, PHP-Server mit Fake-Sendmail):** Reihenfolge Name → Telefon → E-Mail → Ort → Leistung (Pfeiltasten) → Nachricht → Zeitraum → Datenschutz-Link → Senden. Der Honeypot wird übersprungen. Enter sendet ab und führt zu `danke.html`. Mit „Zurück“ erscheint `kontakt.html`, der Knopf ist wieder „Anfrage senden“ (ohne `aria-disabled`), ein zweites Absenden funktioniert.
- **Validierung im Browser:** Leeres Absenden zeigt die Zusammenfassung mit 3 Meldungen und setzt den Fokus darauf. `aria-invalid` an Name, Telefon, E-Mail und Nachricht, `aria-describedby` zeigt auf die Fehlermeldung. Sprunglinks fokussieren das Feld. Ungültige E-Mail und ungültiges Telefon erhalten eigene Meldungen. Nach der Korrektur werden Meldungen und `aria-invalid` live entfernt. `?leistung=fassade` wählt die Leistung vor. axe: 0.
- **`navigator.webdriver = false`:** Die Einblend-Animation ist aktiv (bis zu 20 wartende Elemente pro Seite). Nach langsamem Scrollen haben alle `.reveal`/`.kante`-Elemente opacity 1. Nach einem Sprung mit der Taste „Ende“ bleibt nichts im sichtbaren Bereich verborgen. axe auf 9 Seiten × 2 Breiten: 0 Verstöße.

### PHP (`kontakt.php`, PHP 8.3.6, `php -S`)
| Test | Ergebnis |
|---|---|
| `php -l` (beide Dateien) | keine Syntaxfehler |
| GET `kontakt.php` | 303 → `kontakt.html` |
| GET `kontakt-config.php` direkt | 404, leerer Body (zusätzlich in `.htaccess` gesperrt) |
| POST leer | 422, Formular mit 3 Feldmeldungen, Zusammenfassung, `aria-invalid`, `noindex` |
| ungültige E-Mail | 422, E-Mail-Meldung |
| CR/LF in Name/E-Mail/„Betreff“ | Steuerzeichen werden durch Leerzeichen ersetzt. Die E-Mail ist danach ungültig und gibt 422. Der Name steht nur im Mailtext, ein Betreff-Feld wird nicht ausgewertet (fester Betreff) |
| Honeypot gefüllt | 303 → `danke.html`, kein Versand |
| gültige Daten, Empfänger = Platzhalter | 503, Versandfehler-Meldung, Werte bleiben erhalten (Umlaute korrekt), Leistung vorausgewählt, Logeintrag |
| XSS (`"><script>`, `</textarea><script>`, `<img onerror>`) | sauber escaped (DOM `setAttribute`/`textContent`), kein ausführbares Skript |
| Felder als Array (`name[]=`) | als leer behandelt, 422, keine PHP-Warnung |
| Fake-Sendmail (Kopie mit gültigem Empfänger) | 303 → danke. Mail: `From` fest (`kontakt@domain`, RFC-2047-kodiert), `Reply-To` nur geprüfte Adresse, `Subject` RFC-2047, `Content-Type: text/plain; charset=UTF-8`, `quoted-printable`, CRLF, **längste Zeile 77 Zeichen** bei 1500 Zeichen ohne Umbruch, Envelope `-f` gesetzt, Umlaute korrekt dekodiert |

Code-Durchsicht: Nutzereingaben gelangen nicht in Header (außer der geprüften Reply-To-Adresse), die Leistung wird gegen eine Whitelist geprüft, es gibt Längenlimits, `Cache-Control: no-store` und `nosniff`. Die Konfiguration bricht mit 404 ab, wenn sie direkt aufgerufen wird.

### Metadaten

| Seite | Title (Zeichen) | Description | Canonical | OG/Twitter | robots |
|---|---|---|---|---|---|
| index | 47 | 155 | `/` | ✓ | – |
| leistungen | 58 | 142 | ✓ | ✓ | – |
| arbeiten | 49 | 147 | ✓ | ✓ | – |
| ueber-uns | 50 | 153 | ✓ | ✓ | – |
| kontakt | 52 | 155 | ✓ | ✓ | – |
| impressum | 34 | 147 | ✓ | ✓ | – |
| datenschutz | 45 | 153 | ✓ | ✓ | – |
| danke | 28 | 144 | – (noindex) | ✓ | noindex, follow |
| 404 | 32 | 150 | – (noindex) | ✓ | noindex, follow |

Die Titles sind ohne `&amp;`-Entität gezählt. Alle Seiten haben `theme-color #F4F1EA` (identisch mit dem Manifest), JS mit `defer` und einen Schrift-Preload. Favicons: `favicon.ico` (16+32), `favicon.svg` (mit Dark-Mode), `apple-touch-icon.png` 180×180, Icons 192/512, Manifest-JSON gültig.

## Mängel (priorisiert)

### P1 – muss vor Abnahme behoben werden

**P1-1 – Tastaturfokus unter der mobilen Aktionsleiste vollständig verdeckt (< 1024 px)**
- *Beleg:* `technik-test-runde-2.json` → `verdeckt` und `formularTab[0].verdeckt`. Bei 360 px liegt das fokussierte E-Mail-Feld bei y 752–800, die Leiste bei y 736–800, das Feld ist also komplett verdeckt (`_entwurf/screenshots/runde-2-technik/verdeckt-email-360.png`). Weitere Fälle: Nachricht (Textarea), „Tapezierarbeiten“ (index), Footer-Links „Arbeiten“ und „Über uns“, Logo-Link im Footer, Inhaltsverzeichnis 8–12 (datenschutz), „Anrufen“ (404, ueber-uns). Bei 720×450 (≈ 1440-Desktop mit 200 % Zoom) waren 6 von 40 Tab-Stopps verdeckt.
- *Ursache:* `html` hat nur `scroll-padding-top` (style.css, Z. 115). Beim Tabben scrollt der Browser das Element an den unteren Rand, und dort liegt die feste `.aktionsleiste`.
- *Änderung:* In `css/style.css` nach der Regel mit `scroll-padding-top` ergänzen:
  ```css
  @media (max-width: 1023.98px) {
    html { scroll-padding-bottom: calc(var(--aktionsleiste-hoehe) + env(safe-area-inset-bottom, 0px) + var(--space-3)); }
  }
  ```
  Danach `node _entwurf/technik-test-runde-2.mjs http://localhost:4173 <PHP-URL> …` erneut ausführen: `verdeckt` muss leer sein.

### P2 – sollte vor dem Livegang behoben werden

**P2-1 – Nach der Fehlerseite von `kontakt.php` landet der Fokus auf `<body>` statt auf der Meldung**
- *Beleg:* `technik-test-runde-2.json` → `validierung[0].serverFokus: ""`. Im Nachtest ruft `main.js` zwar `focus()` auf `#fehler-zusammenfassung` auf, aber danach ist `document.activeElement` wieder `BODY`. Ursache: Das Formular sendet an `kontakt.php#anfrage`. Das Fragment-Ziel `section#anfrage` ist nicht fokussierbar, und beim Scrollen zum Fragment setzt der Browser den Fokus nachträglich auf den Viewport. Dasselbe gilt für `#meldung-versand` (503). Weil eine `role="alert"`-Meldung, die schon beim Laden im DOM steht, von Screenreadern meist nicht angesagt wird, erfahren Screenreader-Nutzer den Fehler nicht direkt.
- *Änderung:* In `js/main.js` den Fokus erst nach dem Fragment-Scroll setzen:
  ```js
  var fokussiereMeldung = function (el) { window.addEventListener('load', function () { window.setTimeout(function () { el.focus(); }, 0); }); };
  ```
  Damit `vorhanden.focus()` bzw. `versand.focus()` ersetzen. Alternativ das Formular an `kontakt.php` ohne Fragment senden. Danach in Abschnitt 5 des Testskripts prüfen: `serverFokus` muss `fehler-zusammenfassung` sein.

### P3 – Empfehlungen / Launch-Checkliste

- **P3-1 – Konsolenmeldung auf der PHP-Fehlerseite:** Chrome meldet bei 422/503 „Failed to load resource: … 422“. Das ist fachlich korrekt und betrifft keine statische Seite. Wer den Hinweis vermeiden will, gibt die Formularseite mit Fehlern mit Status 200 aus (`formularAusgeben(..., 200)`) und behält 503 nur für den Versandfehler.
- **P3-2 – Fragment wird an die Danke-Seite weitergegeben:** Nach dem Versand lautet die URL `danke.html#anfrage`, weil der Browser das Fragment der Formular-Action an die 303-Weiterleitung anhängt. In `kontakt.php` `weiterleiten('danke.html#inhalt')` verwenden. Das erledigt sich auch, wenn bei P2-1 das Fragment entfällt.
- **P3-3 – Ablaufversprechen vom Kunden bestätigen lassen (Launch-Checkliste):** Diese Aussagen sind keine Zahlen oder Fakten im engeren Sinn, aber vom Kunden nicht belegt: „Bevor gestrichen wird, decken wir ab und kleben ab“ und „schriftliches Angebot“ (index, ueber-uns, kontakt), „Jeder Auftrag folgt denselben Schritten“, „gemeinsame Abnahme“ und „nehmen unser Material mit“. Außerdem setzen das Bildmotiv „Das Team bei der Arbeit“ und die drei Team-Porträts auf `ueber-uns.html` mehrere Mitarbeiter voraus. Diese Punkte gehören zusammen mit der angenommenen Leistungsliste in die Launch-Checkliste. Wenn der Betrieb eine Ein-Personen-Firma ist, wird der Team-Block entfernt.
- **P3-4 – JSON-LD vervollständigen, sobald Daten vorliegen:** `telephone`, `email`, `address` (PostalAddress) und `openingHoursSpecification` in `index.html` und `kontakt.html` ergänzen. Die Domain `malerwerk.example` kommt in Canonical, OG, Sitemap, robots, JSON-LD und `kontakt-config.php` vor und wird beim Domain-Tausch per Suchen/Ersetzen geändert.
- **P3-5 – Schriftdatei verkleinern (optional):** `archivo-latin-wdth.woff2` hat 90 KB und deckt wdth 62–125 % und wght 100–900 ab. Genutzt werden nur wdth 100–125 % und wght 400–700. Mit `fonttools varLib.instancer` (`wdth=100:125 wght=400:700`) lässt sich die Datei deutlich verkleinern. Lighthouse zeigt aktuell keinen Engpass.
- **P3-6 – `index.html` und `/` sind doppelt erreichbar:** Die interne Navigation verlinkt `index.html`, der Canonical zeigt auf `/`. Das ist durch den Canonical abgedeckt. Sauberer wäre es, Logo- und Startseiten-Links auf `/` bzw. `./` zu setzen.
- **P3-7 – Härtung nach SSL-Einrichtung (optional):** In `.htaccess` die HTTPS-Weiterleitung aktivieren, `Strict-Transport-Security` setzen und eine einfache `Content-Security-Policy` ergänzen (`default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self' 'sha256-…'` für das Inline-Skript `classList.add("js")`). Optional für `kontakt.php`: eine Zeitsperre (Mindestzeit zwischen Seitenaufruf und Absenden) als zweite Spam-Hürde ohne Drittanbieter.

## Nicht als Mangel gewertet
- CSS nicht minifiziert (Kundenwunsch).
- Fehlende Kundendaten (Telefon, Adresse, Impressum, Bilder usw.), weil sie durchgehend sichtbar als Platzhalter gekennzeichnet sind. Das gilt auch für den `tel:`-Link mit Platzhalter.
- `cache-insight` in Lighthouse (lokaler Server; `.htaccess` setzt die Header).
- Bewegungsprüfung: Mit `navigator.webdriver === true` wird die Einblend-Animation abgeschaltet. Mit `false` wurde sie separat geprüft und ist in Ordnung.

## Erzeugte Dateien
`_entwurf/qa-runde-2.json`, `_entwurf/lighthouse-runde-2-{index,leistungen,arbeiten,ueber-uns,kontakt}.json`, `_entwurf/technik-test-runde-2.mjs`, `_entwurf/technik-test-runde-2.json`, `_entwurf/technik-nachtest-runde-2.mjs`, `_entwurf/screenshots/runde-2-technik/`.
