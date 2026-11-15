# Technik-Prüfung – Runde 3 (Agent 5, frischer Prüfer)

Datum: 15.11.2026 · Prüfgegenstand: veröffentlichter Code im Wurzelverzeichnis (9 Seiten, `css/`, `js/`, `assets/`, `kontakt.php`, `kontakt-config.php`, `.htaccess`, robots, sitemap, Manifest, Favicons).
Server: `npx serve` auf Port 4173 (lief bereits, HTTP 200), PHP 8.3.6 mit `php -S` auf 127.0.0.1:8099 (Original) und 8098 (Kopie mit Test-Empfänger und Fake-Sendmail im Scratchpad, Seiten-Code unverändert).

Eigene Testskripte und Rohdaten:
- `_entwurf/technik-test-runde-3.mjs` → `_entwurf/technik-test-runde-3.json` (Querscrollen, Tab-Stopps, Skip-Link, mobile Navigation, Formular per Tastatur, Browser-Validierung, Einblendungen mit `navigator.webdriver = false` + axe, PHP-Fehlerseite im Browser)
- `_entwurf/technik-skiplink-runde-3.mjs` (Skip-Link nach Ende der Einblend-Transition)
- `_entwurf/technik-menue-runde-3.mjs` (mobiles Menü bei niedrigen Viewports)
- `_entwurf/technik-nojs-runde-3.mjs` (Seiten ohne JavaScript)
- `_entwurf/qa-runde-3.json`, `_entwurf/lighthouse-runde-3-<seite>.json`

---

## 1. Abnahmekriterien (Abschnitt 9)

| # | Kriterium | Status | Beleg |
|---|---|---|---|
| 1 | Lighthouse mobil: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95 | **erfüllt** | Alle 5 Hauptseiten 100 / 100 / 100 / 100, LCP 0,8 s, TBT 0 ms, CLS 0 (Tabelle unten) |
| 2 | axe: keine Verstöße „serious“/„critical“ | **erfüllt** | `qa-runde-3.json`: 0 Verstöße auf allen 9 Seiten (WCAG 2.0/2.1 A/AA). Zusätzlich mit `navigator.webdriver = false` nach vollständigem Scrollen (360 und 1440 px, inkl. `wcag22aa`): 0 Verstöße auf allen 9 Seiten |
| 3 | Keine externen Anfragen beim Seitenaufruf | **erfüllt** | `qa-runde-3.json`: `externeAnfragen: []` auf allen Seiten. Externe Ziele nur als Links (OpenStreetMap mit Hinweis „Externer Dienst, öffnet in einem neuen Fenster …“, gesetze-im-internet.de, osmfoundation.org in der Datenschutzerklärung). Keine Einbettungen, kein CDN; CSS enthält nur lokale Schrift und ein Data-URI-Icon |
| 4 | Keine Konsolenfehler, keine defekten internen Links | **erfüllt** | `qa-runde-3.json`: keine Konsolenfehler, keine kaputten Links. Alle `seite.html#anker`- und `#anker`-Ziele per Skript gegengeprüft: vorhanden. Startseiten-Links `./` (bzw. `/` auf der 404) lösen auf `/` auf; Menü-Link per Tastatur getestet (navigiert korrekt) |
| 5 | HTML-Validierung ohne Fehler | **erfüllt** | `npx html-validate *.html` → Exit 0, keine Meldungen. Auch die von `kontakt.php` erzeugten Fehlerseiten (422/503, inkl. XSS-Eingaben) validieren fehlerfrei |
| 6 | Alle Seiten sauber auf 360/768/1440, keine horizontale Scrollleiste | **erfüllt** | 27 Messungen (9 Seiten × 3 Breiten): `scrollWidth ≤ clientWidth` überall, keine über den Rand ragenden Elemente. Auch ohne JS bei 360 px kein Querscrollen |
| 7 | Vollständige Tastaturbedienung inkl. mobiler Navigation und Formular | **erfüllt** | Alle Tab-Stopps aller 9 Seiten bei 360×800, 768×1024, 720×450 (je 18–30 Stopps): Fokus immer im Bild, Fokusanzeige vorhanden, **nicht** von Header oder Aktionsleiste überdeckt (Rechteckvergleich + `elementFromPoint` an Mitte und 4 Ecken). Einzige Auffälligkeit des Hauptlaufs (Skip-Link oberhalb des Viewports) war ein Messartefakt der 200-ms-Transition; Nachtest: nach 250 ms bei allen Viewports top = 8 px, oberstes Element, über dem Header. Skip-Link: Enter → Fokus auf `main#inhalt`, nächster Tab im Hauptinhalt (9/9 Seiten). Mobiles Menü: per Tab erreichbar, Enter öffnet (`aria-expanded=true`, Fokus auf erstem Link), Fokus bleibt im Menü (Kreis über 12 Tabs), Escape schließt und setzt Fokus auf den Knopf, Menü danach unsichtbar. Bei 720×450 / 360×480 / 1023×400 scrollt das Menü intern, alle Stopps erreichbar (siehe P3-2). Formular komplett per Tab ausgefüllt und per Enter abgesendet (360 und 1440 px) |
| 8 | Je Seite Title, Description, Canonical, OG; JSON-LD, Sitemap, robots, Favicons, 404 | **erfüllt** | Titles 28–58 Zeichen, Descriptions 142–155 Zeichen, alle mit Ortsbezug; Canonical + `og:url` auf allen indexierbaren Seiten; danke/404 `noindex, follow` ohne Canonical (gewollt). OG + Twitter (`summary_large_image`) auf allen 9 Seiten; OG-Bild 1200×630 JPEG, HTTP 200. JSON-LD `HousePainter` auf index/kontakt, valides JSON, nur belegte Daten. sitemap.xml (7 indexierbare URLs), robots.txt mit Sitemap-Verweis. favicon.ico (16+32), favicon.svg (mit Dark-Mode), apple-touch-icon 180×180, icon-192/512, Manifest (`application/manifest+json`). 404.html mit wurzelrelativen Pfaden + `ErrorDocument 404 /404.html` |
| 9 | Alle Bilder optimiert (AVIF/WebP, srcset, feste Maße), Schriften lokal | **erfüllt** (soweit Material vorhanden) | Keine Fotos geliefert → gestaltete Platzhalter mit festem `aspect-ratio`. Pipeline `_entwurf/bilder.mjs` mit Testfoto geprüft: erzeugt AVIF/WebP/JPEG in 480/800/1200 (+ Mobil-Art-Direction, kein Hochskalieren); Einbau-Muster mit `<picture>`, `srcset`, `sizes`, `width`/`height`, `loading`/`fetchpriority` in `_entwurf/bilder-austausch.md`; `.motiv__bild` im CSS vorbereitet. Logo SVG, OG-Bild 14 KB, PNG-Icons < 4 KB. Schrift Archivo lokal als WOFF2-Subset (latin, variabel), `preload` mit `crossorigin`, `font-display: swap` |
| 10 | Formular funktioniert inkl. Validierung, Spamschutz, Rückmeldungen (bzw. sauber vorbereitet) | **erfüllt** | Browser: leeres Absenden → Zusammenfassung fokussiert, 3 Feldfehler, Sprunglinks; ungültige E-Mail/Telefon, Nur-Leerzeichen abgefangen; nur Telefon bzw. nur E-Mail gültig; Live-Korrektur blendet Fehler aus; `?leistung=fassade` vorausgewählt; Honeypot kein Tab-Stopp, POST enthält `website=""`. Ohne JS greift native Validierung. Server (curl): GET → 303 kontakt.html; leer/ungültig → 422 mit Meldungen und erhaltenen Werten; Honeypot → 303 danke.html (still verworfen); Platzhalter-Empfänger → 503 mit Versandfehler-Meldung; Array-Felder und ungültiges UTF-8 robust. Fokus der PHP-Fehlerseite (mit JS) auf `#fehler-zusammenfassung` bzw. `#meldung-versand`, sichtbar, nicht verdeckt. Fake-Sendmail: fester From, Subject/From-Name RFC-2047-kodiert, `charset=UTF-8`, quoted-printable, max. Zeilenlänge 74, `-f`-Envelope gesetzt |
| 11 | Impressum mit allen gelieferten Pflichtangaben, Datenschutz prüfpflichtig gekennzeichnet | **erfüllt** (mit Hinweis P2-1) | Impressum „Angaben gemäß § 5 DDG“: Firmenname/Rechtsform, Anschrift, Vertretung, Telefon, E-Mail, Register, USt-IdNr., Berufsbezeichnung/Staat/Kammer/Handwerksrolle/HwO, V.i.S.d. § 18 Abs. 2 MStV, VSBG – jede unbelegte Angabe sichtbar als `<mark class="platzhalter">`. Datenschutzerklärung mit hervorgehobenem Prüfhinweis (`role="note"`, „muss vor der Veröffentlichung geprüft werden“, Generator/anwaltlich), Stand als Platzhalter, nur tatsächlich eingesetzte Verarbeitungen |
| 12 | Keine erfundenen Fakten, alle Platzhalter in der Launch-Checkliste | **erfüllt** | Gezielte Suche (Meister, Familie, Garantie, Gewährleistung, Jahr/Jahreszahlen, Tage/Wochen/Fristen, Prozent, Zertifikat, Erfahrung, „seit“, Mitarbeiter, Festpreis, kostenlos, unverbindlich, schnell, pünktlich): Treffer nur innerhalb von Platzhaltern. Texte beschreiben Leistungen und Ablauf allgemein (Besichtigung → schriftliches Angebot, laut Annahme 8 zulässig). Copyright-Jahr, USP, Team, Referenzen, Erreichbarkeit: Platzhalter. JSON-LD ohne Adresse/Telefon (Ergänzung beim Launch festgelegt) |

Design-Kriterium: nicht Gegenstand dieser Prüfung.

---

## 2. Testergebnisse

### Lighthouse mobil (Standard-Mobilprofil mit Drosselung)

| Seite | Performance | Barrierefreiheit | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| index | 100 | 100 | 100 | 100 | 0,8 s | 0,8 s | 0 ms | 0 |
| leistungen | 100 | 100 | 100 | 100 | 0,8 s | 0,8 s | 0 ms | 0 |
| arbeiten | 100 | 100 | 100 | 100 | 0,8 s | 0,8 s | 0 ms | 0 |
| ueber-uns | 100 | 100 | 100 | 100 | 0,8 s | 0,8 s | 0 ms | 0 |
| kontakt | 100 | 100 | 100 | 100 | 0,8 s | 0,8 s | 0 ms | 0 |

Keine gewichteten Audits unter Score 1.

### QA-Skript (`qa-runde-3.json`)
9/9 Seiten HTTP 200, 0 externe Anfragen, 0 Konsolenfehler, 0 axe-Verstöße, 0 defekte Links.

### html-validate
`npx html-validate *.html` → 0 Fehler, 0 Warnungen.

### Eigene Playwright-Tests (`technik-test-runde-3.json`)
- Querscrollen: 27/27 ohne Überlauf.
- Tab-Stopps: 27 Läufe (9 Seiten × 3 Viewports), 0 echte Probleme (Skip-Link-Befund = Transition-Artefakt, im Nachtest widerlegt).
- Skip-Link: 9/9 springt auf `main#inhalt`.
- Mobile Navigation: 3/3 Seiten ok (Öffnen, Fokusfalle, Escape, Fokus zurück, Link folgen).
- Formular per Tastatur: 2/2 Viewports ok; Tab-Reihenfolge Name > Telefon > E-Mail > Ort > Leistung > Nachricht > Zeitraum > Datenschutz-Link > Senden; Absenden führt auf `danke.html#inhalt`, Fokus dort auf `#inhalt`.
- Einblendungen mit `webdriver = false`: 2–20 Elemente anfangs wartend, nach langsamem Scrollen und nach Taste „Ende“ alle mit opacity 1; keine Konsolenfehler; axe 0 serious/critical.
- Ohne JavaScript (360 px): Navigation sichtbar (4 Links), Menü-Knopf ausgeblendet, alle Inhalte sichtbar.

### PHP (`php -l`, `php -S`)
- `php -l`: beide Dateien ohne Syntaxfehler.
- `kontakt-config.php` direkt: leere Antwort, HTTP 404 (Guard-Konstante) + Sperre in `.htaccess`.
- Header-Injection: CR/LF in E-Mail → Adresse ungültig (422), kein Versand; CR/LF im Namen → in Leerzeichen umgewandelt, landet nur im Mailtext, nie im Header. Fake-Mail ohne `Bcc:`-Zeile. Reply-To nur mit geprüfter Adresse.
- XSS: `"><script>`, `</textarea><script>`, `<img onerror>` werden über DOM-`setAttribute`/`textContent` sicher maskiert ausgegeben; ungültige Leistung wird verworfen. XPath-Abfragen nutzen nur feste IDs.
- Fehlerseite ohne JS: Meldung (`role="alert"`) sichtbar, Seite springt per `#anfrage` zum Formular, Fokus bleibt technisch auf `body` (ohne JS nicht anders lösbar, kein Mangel).

---

## 3. Mängel (priorisiert)

### P1 – blockierend
Keine.

### P2 – sollte vor dem Launch behoben werden

**P2-1 Impressum: Platzhalter für die Wirtschafts-Identifikationsnummer fehlt**
- Wo: `impressum.html`, Abschnitt „Umsatzsteuer-Identifikationsnummer“.
- Warum: § 5 Abs. 1 Nr. 6 DDG verlangt neben der USt-IdNr. auch die Wirtschafts-Identifikationsnummer nach § 139c AO, sofern vorhanden (wird seit Ende 2024 schrittweise vergeben). Alle anderen Pflichtangaben sind als Platzhalter vorbereitet, diese nicht.
- Änderung: Abschnitt umbenennen in „Umsatzsteuer-ID und Wirtschafts-ID“ und ergänzen:
  `<br>Wirtschafts-Identifikationsnummer gemäß §&nbsp;139c AO: <mark class="platzhalter">[PLATZHALTER: W-IdNr.&nbsp;– entfällt, wenn nicht zugeteilt]</mark>`; Punkt in die Launch-Checkliste aufnehmen.

### P3 – Verbesserungen

**P3-1 PHP-Fehlerseite: JSON-LD wird beim Ausgeben verfälscht**
- Beleg: Die Ausgabe von `kontakt.php` (422/503) enthält im `<script type="application/ld+json">` `"… f&uuml;r Privatkunden …"` statt `für` (`DOMDocument::saveHTML()` kodiert Nicht-ASCII auch in Script-Inhalten als Entity; in Script-Elementen werden Entities nicht aufgelöst). Auswirkung gering (Seite ist `noindex`), aber die strukturierten Daten sind dort fehlerhaft.
- Änderung in `formularAusgeben()` vor `saveHTML()`: `foreach (iterator_to_array($xp->query('//script[@type="application/ld+json"]')) as $s) { $s->parentNode?->removeChild($s); }` (die noindex-Antwortseite braucht kein JSON-LD).

**P3-2 Mobiles Menü bei niedriger Viewport-Höhe: Fokusrahmen des untersten Knopfs abgeschnitten**
- Beleg: `technik-menue-runde-3.mjs` – bei 720×450 liegt „Anrufen“ fokussiert bei 402–450 px (Viewport 450), bei 360×480 bei 430–478 px. Das Element ist sichtbar, der Fokusrahmen (3 px + 3 px Abstand) wird am unteren Rand des scrollenden Menüs abgeschnitten.
- Ursache: `.js .menue` (css/style.css, ab Zeile 469) hat zwar `padding-bottom`, beim Fokussieren scrollt der Browser aber nur so weit, bis das Element selbst sichtbar ist, nicht bis zum Innenabstand.
- Änderung: in der Regel `.js .menue` `scroll-padding-block: var(--space-4);` ergänzen (mindestens 6 px plus Reserve für Rahmen und Abstand).

**P3-3 Zeitstempel in der Anfrage-Mail in Serverzeit (oft UTC)**
- Beleg: Fake-Mail „Gesendet am 15.11.2026 um 16:14 Uhr“ mit `date_default_timezone_get()` = UTC; bei Hostern mit UTC-Einstellung weicht die Uhrzeit um 1–2 Stunden ab.
- Änderung: in `kontakt.php` nach `declare(strict_types=1);` `date_default_timezone_set('Europe/Berlin');` ergänzen.

**P3-4 JSON-LD `logo` als SVG**
- Wo: `index.html`, `kontakt.html` (`"logo": ".../assets/bilder/logo.svg"`).
- Warum: Google empfiehlt für das Logo in strukturierten Daten ein Rasterformat (mind. 112×112 px).
- Änderung: `"logo": "https://malerwerk.example/icon-512.png"` (vorhandenes 512×512-PNG) oder eigenes Logo-PNG.

Keine weiteren Mängel. Die Orchestrator-Festlegungen (nicht minifiziertes CSS, HTTP 422/503, JSON-LD-Kontaktdaten, HTTPS/HSTS und `Options -Indexes` erst beim Launch) wurden nicht als Mangel gewertet.
