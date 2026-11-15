# Technik-Prüfung – Runde 1 (Agent 5)

Datum: 2026-11-15 · Prüfgegenstand: veröffentlichter Code im Wurzelverzeichnis (Seiten, `css/`, `js/`, `assets/`, `kontakt.php`, `kontakt-config.php`, `.htaccess`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, Favicons).
Grundlage: PROMPT.md Abschnitte 2, 5, 9 und Phase 4; `_entwurf/annahmen.md` (Domain-Platzhalter `https://malerwerk.example`, PHP-Formular vorbereitet, fehlende Kundendaten als Platzhalter gewollt).

## Ergebnis auf einen Blick

11 von 12 technischen Abnahmekriterien sind erfüllt. Nicht erfüllt ist „Keine erfundenen Fakten“, und zwar nur wegen einer sichtbaren, nicht gekennzeichneten Rechtserklärung im Impressum (P1-1). Gefunden wurden 1 × P1, 3 × P2 und 10 × P3. Messwerte, automatisierte Tests und die Sicherheit des PHP-Codes sind ohne Befund.

## 1. Abnahmekriterien (Abschnitt 9, ohne Design-Kriterium)

| # | Kriterium | Status | Begründung / Beleg |
|---|---|---|---|
| 1 | Lighthouse mobil Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95 | **erfüllt** | Alle 5 Hauptseiten erreichen 100/100/100/100 (Tabelle in 2.1). Belege: `_entwurf/lighthouse-runde-1-<seite>.json` |
| 2 | axe: keine serious/critical-Verstöße | **erfüllt** | `qa-runde-1.json`: 0 Verstöße auf allen 9 Seiten. Gegenprobe mit `navigator.webdriver = false` und aktiven Einblendungen: ebenfalls 0 serious/critical bei 360 und 1440 px. Nach einer Formular-Fehleingabe ebenfalls 0 (`technik-test-runde-1.json` → `reveal`, `formular.axeNachFehlern`) |
| 3 | Keine externen Anfragen beim Seitenaufruf | **erfüllt** | `qa-runde-1.json`: `externeAnfragen: []` auf allen 9 Seiten. Schrift lokal (WOFF2), Icons inline. OpenStreetMap ist nur ein Link mit Hinweis vorab (kontakt.html, Abschnitt „Anfahrt“) |
| 4 | Keine Konsolenfehler, keine defekten internen Links | **erfüllt** | `qa-runde-1.json`: `konsolenfehler: []`, `kaputteLinks: []`. Zusätzlich alle Sprungziele (`#…`) seitenübergreifend abgeglichen: alle vorhanden |
| 5 | HTML-Validierung ohne Fehler | **erfüllt** | `npx html-validate *.html` meldet 0 Fehler bei Exit-Code 0. Die Ignore-Syntax aus dem Prompt wird von html-validate 11.21.1 nicht unterstützt („Unknown option '--ignore'“), deshalb lief der Fallback. Der Validator arbeitet nachweislich: Eine Testdatei mit 5 Fehlern wurde erkannt. Auch die von `kontakt.php` erzeugte Fehlerseite ist valide |
| 6 | 360 / 768 / 1440 px ohne horizontale Scrollleiste | **erfüllt** | 27 Messungen (9 Seiten × 3 Breiten): überall `scrollWidth ≤ clientWidth`, kein Element ragt über den Rand (`technik-test-runde-1.json` → `overflow`) |
| 7 | Vollständige Tastaturbedienung inkl. mobiler Navigation und Formular | **erfüllt** | Skip-Link: als erstes Element erreichbar, nach der Übergangsanimation sichtbar (top 8 px), Enter springt auf `#inhalt`, der nächste Tab landet im Inhalt. Mobilmenü: per Tab erreichbar, öffnet mit Enter und Space; der Fokus springt auf den ersten Link und bleibt im Menü (Tab und Shift+Tab im Kreis); Escape schließt und setzt den Fokus auf den Knopf zurück; Menülinks lösen per Enter aus. Fokusring auf allen fokussierbaren Elementen aller Seiten vorhanden (360 und 1440 px), nichts wird von Header oder Aktionsleiste verdeckt. Formular siehe Kriterium 10 |
| 8 | Title, Description, Canonical, OG je Seite; JSON-LD, Sitemap, robots, Favicons, 404 | **erfüllt** | Titles 28–58 Zeichen, alle eindeutig. Descriptions 142–155 Zeichen (Ausnahme: danke.html mit 144, korrekt). Canonical auf allen indexierbaren Seiten; 404 bewusst ohne Canonical und mit `noindex`. OG und Twitter überall, Bild 1200×630 JPEG (14 KB), HTTP 200. JSON-LD (`HousePainter`) auf index und kontakt, `JSON.parse` fehlerfrei, ohne erfundene Daten. Sitemap mit 7 URLs (ohne danke/404), robots mit Sitemap-Verweis. Favicon-Set vollständig: SVG mit Dark-Mode, ICO 16+32, Apple-Touch 180×180, Manifest gültig mit 192 und 512. 404 gestaltet, absolute Pfade, `ErrorDocument 404 /404.html` |
| 9 | Bilder optimiert, Schriften lokal | **erfüllt** | Es gibt keine Fotos. Die gestalteten Platzhalter haben ein festes Seitenverhältnis (`aspect-ratio` über `.sv-*`, Art Direction mobil 4:3 / Desktop 4:5 bzw. 21:9) und tragen den Alt-Text für das spätere Foto als Kommentar. Die Pipeline `_entwurf/bilder.mjs` habe ich mit einem Testbild geprüft: Sie erzeugt AVIF, WebP und JPEG in 3 Breiten plus Mobil-Zuschnitt. Logo und Favicons sind SVG bzw. kleine PNG/ICO, das OG-Bild hat 14 KB. Schrift: eine variable WOFF2 (Latin-Subset, 90 KB), lokal, `preload` mit `crossorigin`, `font-display: swap`. CLS 0 auch mit aktiven Einblendungen |
| 10 | Formular: Validierung, Spamschutz, Rückmeldungen (bzw. sauber vorbereitet) | **erfüllt** | Browser: Fehler bei leerem Absenden an den Feldern und in einer Zusammenfassung mit Sprunglinks (Fokus auf die Zusammenfassung, `aria-invalid`, `aria-describedby`). Prüfung von E-Mail und Telefon, Meldungen aktualisieren sich beim Korrigieren. Das Formular lässt sich komplett per Tastatur ausfüllen und absenden; der POST enthält alle Felder, danach Weiterleitung auf danke.html. Der Honeypot liegt nicht in der Tab-Reihenfolge. Ohne JS greifen die `required`-Felder. Server (`php -S`): GET → 303; leere Felder → 422 mit Meldungen; ungültige E-Mail → 422; Honeypot → 303 danke ohne Versand; gültige Daten mit Platzhalter-Empfänger → 503 mit Versandfehler-Meldung und erhaltenen Werten. Mit Test-Sendmail → 303 danke, Mail korrekt aufgebaut. CR/LF-Injection in Name und E-Mail wirkungslos, XSS-Versuche korrekt escaped, Direktaufruf der Config → 404 und zusätzlich per `.htaccess` gesperrt |
| 11 | Impressum mit gelieferten Pflichtangaben; Datenschutz als prüfpflichtig gekennzeichnet | **erfüllt** | Impressum nach § 5 DDG vollständig gegliedert: Name/Rechtsform, Anschrift, Vertretung, Kontakt, Register, USt-IdNr., Berufsbezeichnung, Kammer, berufsrechtliche Regelungen, V.i.S.d. § 18 MStV. Alle Angaben sind als Platzhalter markiert, weil keine geliefert wurden. Datenschutz: deutlicher Hinweiskasten oben („muss vor der Veröffentlichung geprüft werden“ mit Generator- und Anwaltshinweis) und Struktur passend zur tatsächlichen Technik (Hosting/Logfiles, Formular, E-Mail, keine Cookies, lokale Schriften, OSM-Link) |
| 12 | Keine erfundenen Fakten, alle Platzhalter in der Launch-Checkliste | **nicht erfüllt** | Keine Zahlen, Jahre, Preise, Zertifikate oder Kundenstimmen; USP, Team, Projekte, Kontakt und Orte sind Platzhalter. **Grund für „nicht erfüllt“:** Das Impressum gibt die Erklärung nach § 36 VSBG („Wir sind nicht bereit und nicht verpflichtet …“) als feste Aussage des Betriebs aus. Gekennzeichnet ist sie nur in einem HTML-Kommentar, nicht sichtbar → **P1-1**. Die Launch-Checkliste stellt erst der Orchestrator in Phase 6 auf; ob sie vollständig ist, kann ich in dieser Runde nicht prüfen |

## 2. Testergebnisse

### 2.1 Lighthouse mobil (Lighthouse 13.6, Headless Chrome)

| Seite | Performance | Barrierefreiheit | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| index | 100 | 100 | 100 | 100 | 0,8 s | 0,8 s | 0 ms | 0 |
| leistungen | 100 | 100 | 100 | 100 | 0,8 s | 0,8 s | 0 ms | 0 |
| arbeiten | 100 | 100 | 100 | 100 | 0,8 s | 0,8 s | 0 ms | 0 |
| ueber-uns | 100 | 100 | 100 | 100 | 0,8 s | 0,8 s | 0 ms | 0 |
| kontakt | 100 | 100 | 100 | 100 | 0,8 s | 0,8 s | 0 ms | 0 |

Hinweise von Lighthouse (ohne Punktabzug): `unminified-css` (style.css 51 KB unminifiziert) und `cache-insight`. Der zweite Hinweis entsteht nur durch den lokalen Testserver; die Cache-Regeln stehen in der `.htaccess`.

Gegenprobe zu den Einblendungen: Headless Chrome meldet `navigator.webdriver = true`, deshalb lief auch Lighthouse ohne Einblendungen. Mit `webdriver = false` und aktiven Einblendungen (`_entwurf/technik-test-runde-1-cls.mjs`) liegt der CLS auf allen 5 Seiten bei 0,0000. Das LCP-Element ist jeweils Text oberhalb der Falz und wird nicht ausgeblendet. Die Ausnahme verdeckt also kein Problem.

### 2.2 Weitere automatisierte Tests

- `node _entwurf/qa.mjs … (9 Seiten)` → `_entwurf/qa-runde-1.json`: alle Seiten HTTP 200, 0 externe Anfragen, 0 Konsolenfehler, 0 axe-Verstöße (jeder Schweregrad), 0 defekte Links.
- `npx html-validate *.html` → 0 Fehler. Gegenprobe mit der von `kontakt.php` erzeugten 422-Seite → 0 Fehler.
- `_entwurf/technik-test-runde-1.mjs` → `_entwurf/technik-test-runde-1.json`: Überlauf, Tastatur, Formular und Einblendungen.
  - Einblendungen mit `webdriver = false`: nach vollständigem Scrollen und 1,5 s Wartezeit sind auf allen 9 Seiten bei 360 und 1440 px alle `.reveal`/`.kante`-Elemente auf opacity 1, kein Element bleibt im Zustand `ist-wartend`. Auch nach einem Sprung ans Seitenende (Taste End) ist alles sichtbar. axe meldet in diesem Zustand 0 serious/critical.
- `_entwurf/technik-test-runde-1-nachtest.mjs`: Skip-Link nach der Transition sichtbar (der erste Lauf maß während der 200-ms-Animation). Der Menülink navigiert per Enter. Die Aktionsleiste ist mobil per Tab erreichbar. Kein fokussiertes Element ist verdeckt.
- PHP 8.3.6: `php -l` meldet für beide Dateien keine Fehler. Die curl-Tests stehen unter Kriterium 10.
  - Test mit Fake-Sendmail und einer Kopie mit gültigem Empfänger: Header sind nur `From` (fest), `MIME-Version`, `Content-Type`, `Content-Transfer-Encoding`, `X-Mailer` und `Reply-To` (nur mit gültiger Adresse). Ein Name mit `\nBcc:` erscheint nur einzeilig im Mailtext, eine Nachricht mit `\r\nBcc:` nur im Body. `-f` kommt aus der Config.

### 2.3 Manuelle Code-Prüfung (Sicherheit kontakt.php)

- **XSS bei Wiederausgabe:** Die Werte werden per `DOMElement::setAttribute` bzw. `textContent` gesetzt und damit vom DOM escaped. Test mit `"><script>`, `</textarea><script>` und `<svg onload>`: alles wird escaped ausgegeben. Unbekannte Werte für `leistung` werden verworfen (Whitelist).
- **Header-Injection:** Nutzereingaben gelangen nur in `Reply-To`, und zwar erst nach `FILTER_VALIDATE_EMAIL` plus `strpbrk("\r\n")`. Alle einzeiligen Felder entfernen Steuerzeichen. Der Betreff ist fest und MIME-kodiert.
- **Config:** `kontakt-config.php` endet beim Direktaufruf ohne Konstante mit 404 und wird zusätzlich per `.htaccess` (`FilesMatch`) gesperrt.
- **Arrays:** `name[]=…` wird zu einem leeren String und führt zu 422 statt zu einer Warnung.
- Fehlerpfade liefern saubere 422/503-Seiten mit `noindex` und `Cache-Control: no-store`. `error_log` meldet nur den Grund, keine Personendaten.

## 3. Mängel (priorisiert)

### P1 – blockiert ein Abnahmekriterium

**P1-1 · Erklärung nach VSBG als ungekennzeichnete Tatsachenbehauptung** (Kriterium 12)
- **Wo:** `impressum.html`, Abschnitt „Verbraucherstreitbeilegung“
- **Problem:** Der Satz „Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren … teilzunehmen.“ ist eine rechtliche Erklärung des Betriebs, die der Kunde nicht geliefert hat. Gekennzeichnet ist sie nur im HTML-Kommentar; Besucher sehen sie als feste Aussage.
- **Änderung:** Den Satz sichtbar kennzeichnen, z. B. `<mark class="platzhalter">[PLATZHALTER: Erklärung nach § 36 VSBG vom Betrieb bestätigen – Vorschlag: „Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.“]</mark>`. Danach in die Launch-Checkliste aufnehmen.

### P2 – sollte vor dem Launch behoben werden

**P2-1 · Mail-Body ohne Zeilenlängenbegrenzung**
- **Wo:** `kontakt.php`, Aufbau von `$text` mit `Content-Transfer-Encoding: 8bit`
- **Problem:** Eine Nachricht mit bis zu 5000 Zeichen ohne Umbruch ergibt eine Mailzeile über der SMTP-Grenze von 998 Zeichen (RFC 5322). Manche MTAs brechen dann hart um, andere lehnen die Mail ab. Die Anfrage geht in diesem Fall verloren, obwohl der Besucher die Danke-Seite sieht.
- **Änderung:** Den Body als `quoted-printable` senden, also `'Content-Transfer-Encoding' => 'quoted-printable'` und `$text = quoted_printable_encode($text);`. Alternativ jede Zeile per `wordwrap($zeile, 900, "\r\n", true)` umbrechen.

**P2-2 · Formular bleibt nach „Zurück“ gesperrt (bfcache)**
- **Wo:** `js/main.js`, Submit-Handler, Bereich „Doppeltes Absenden verhindern“
- **Problem:** Nach erfolgreichem Absenden registriert das Skript einen weiteren Listener mit `preventDefault`, und der Knopf zeigt „Wird gesendet …“. Kehrt der Besucher per Zurück-Taste zurück, stellt der Back/Forward-Cache genau diesen Zustand wieder her. Das Formular lässt sich dann nicht mehr absenden, ohne dass eine Meldung erscheint.
- **Änderung:**
  1. Den Sperr-Listener benannt ablegen (`var sperre = function (ev) { ev.preventDefault(); };`).
  2. Ergänzen: `window.addEventListener('pageshow', function (e) { if (e.persisted) { formular.removeEventListener('submit', sperre); senden.removeAttribute('aria-disabled'); text.textContent = 'Anfrage senden'; } });`.

**P2-3 · Client- und Server-Prüfung der E-Mail weichen ab**
- **Wo:** `js/main.js` (`MAIL_MUSTER = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`) gegenüber `kontakt.php` (`FILTER_VALIDATE_EMAIL`)
- **Problem:** Eine Adresse wie `müller@beispiel.de` besteht die Browser-Prüfung, der Server lehnt sie mit 422 ab. Das Ergebnis ist ein unnötiger Seitenwechsel mit Fehlermeldung.
- **Änderung:** Variante a: Im JS-Muster nur ASCII-Lokalteile zulassen, `/^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[^\s@]+\.[^\s@]{2,}$/`. Variante b: Im PHP `FILTER_FLAG_EMAIL_UNICODE` ergänzen und im Hinweistext erwähnen.

### P3 – Feinschliff / Launch-Vorbereitung

1. **Versandfehler-Meldung nicht fokussiert** (`js/main.js`): Bei der 503-Antwort wird nur die Fehlerzusammenfassung fokussiert. Ergänzen: `var vm = document.getElementById('meldung-versand'); if (vm && !vm.hidden) { vm.tabIndex = -1; vm.focus(); }`. Hinweis: Der Code für `?status=fehler` wird von `kontakt.php` nie genutzt; entweder entfernen oder dokumentieren.
2. **PHP-Mindestversion dokumentieren** (`kontakt.php`, Kopfkommentar): Der Code nutzt `never` und `?->`, braucht also **PHP ≥ 8.1** sowie die Erweiterungen `mbstring` und `dom`. In den Kopfkommentar und die Launch-Checkliste aufnehmen; auf älterem PHP endet das Formular mit einem Fatal Error (500).
3. **Hart codierte Domain im Mailtext** (`kontakt.php`, Zeile „Neue Anfrage über das Formular auf malerwerk.example“): Durch `$config['betreff']` oder einen neuen Config-Schlüssel `'domain'` ersetzen, damit der Domain-Tausch nur in der Config nötig ist.
4. **CSS nicht minifiziert** (`css/style.css`, 51 KB): Für `dist/` eine minifizierte Kopie erzeugen, z. B. `npx lightningcss --minify css/style.css -o dist/css/style.css`, oder per esbuild. Erspart etwa 30 % (Lighthouse `unminified-css`).
5. **`theme-color` uneinheitlich:** Die Seiten nutzen `#F4F1EA`, `site.webmanifest` dagegen `#25221E`. Einen Wert festlegen, sinnvoll ist `#F4F1EA` (Kopfzeilenfarbe), und im Manifest angleichen.
6. **`danke.html` mit Canonical und `noindex`:** widersprüchliche Signale. Canonical auf danke.html entfernen (wie bei 404.html).
7. **`.htaccess` – `Options -Indexes`:** Erlauben Hoster `AllowOverride Options` nicht, führt die Zeile zu Fehler 500 für die ganze Seite. Kommentar ergänzen („bei 500-Fehler diese Zeile auskommentieren“) und in die Launch-Checkliste aufnehmen. Optional `ErrorDocument 403 /404.html` ergänzen.
8. **Datenschutz Abschnitt 12 „Verschlüsselung“:** behauptet TLS, obwohl die HTTPS-Weiterleitung in `.htaccess` auskommentiert ist. Als Platzhalter kennzeichnen („[PLATZHALTER: erst nach Einrichtung des SSL-Zertifikats bestätigen]“) und HTTPS-Aktivierung in die Launch-Checkliste aufnehmen.
9. **Ungenutzte bzw. nicht zu veröffentlichende Dateien:**
   - `assets/bilder/logo.svg` wird nirgends referenziert. Entweder entfernen oder als Logo-Datei für Kunde und Druck dokumentieren (288 B, nur eine Ordnungsfrage).
   - `serve.json`, `package.json`, `package-lock.json` und `node_modules/` gehören nicht in `dist/`. Das ist in Phase 6 vorgesehen; hier nur zur Kontrolle vermerkt.
10. **Aussagen ohne Kundenbeleg in die Launch-Checkliste („vom Kunden bestätigen“):**
    - Arbeitsweise (`ueber-uns.html` #arbeitsweise, `index.html` „Erst schützen, dann streichen“, Ablauf mit „gemeinsamer Abnahme“)
    - Leistungsliste (Annahme 6)
    - Team-Bereich mit drei Porträt-Slots (`ueber-uns.html`), der ein mehrköpfiges Team nahelegt; bei Ein-Personen-Betrieb anpassen
    - Kein Fehler, aber zur Vollständigkeit der Checkliste: Platzhalter in `tel:`- und `mailto:`-Links sowie im OSM-Link (`kontakt.html`)
    - JSON-LD nach Datenlieferung um `address`, `telephone` und `email` ergänzen

## 4. Belege / Dateien

- `_entwurf/qa-runde-1.json`
- `_entwurf/lighthouse-runde-1-index.json`, `-leistungen.json`, `-arbeiten.json`, `-ueber-uns.json`, `-kontakt.json`
- `_entwurf/technik-test-runde-1.mjs` → `_entwurf/technik-test-runde-1.json` (Überlauf, Tastatur, Formular, Einblendungen + axe ohne webdriver-Ausnahme)
- `_entwurf/technik-test-runde-1-nachtest.mjs` (Skip-Link nach Transition, Menülink, Aktionsleiste, Verdeckung)
- `_entwurf/technik-test-runde-1-cls.mjs` (CLS/LCP mit aktiven Einblendungen)
- PHP-Tests per curl gegen `php -S 127.0.0.1:8099`. Den Versand habe ich mit einer Kopie in einem Scratch-Verzeichnis und Fake-Sendmail getestet; der Seiten-Code blieb unverändert.
