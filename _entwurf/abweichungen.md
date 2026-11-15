# Abweichungen und Umsetzungsentscheidungen (Builder)

## Abweichungen vom Design-Briefing
| Stelle | Briefing | Umsetzung | Begründung |
|---|---|---|---|
| Header 1024–1279 px | Telefonnummer als Textlink mit Icon | Telefon als Icon-Link (44 × 44 px, `aria-label` mit Nummer); Nummer als Text erst ab 1280 px | Der Platzhalter „[PLATZHALTER: Telefonnummer]“ ist etwa doppelt so lang wie eine echte Nummer und passt zwischen 1024 und 1279 px nicht neben Navigation und Button. Mit echter Nummer kann die Grenze in `css/style.css` (`.kopf__telefon-text`) auf 1024 px gesenkt werden. |
| Mobilmenü `aria-label` „Hauptmenü“ | Panel mit Label | Panel ist ein Disclosure-Bereich (Button mit `aria-expanded`/`aria-controls`), darin `<nav aria-label="Hauptnavigation">`; Fokus bleibt im Menü, Escape schließt | `aria-label` auf einem rollenlosen `div` ist unzulässig (axe). Ein `role="dialog"` mit `aria-modal` würde den außerhalb liegenden Schließen-Knopf für Screenreader verstecken. |
| Sorgfalt-Panel (Startseite) | Panel Sp. 1–5 überlappt die untere linke Bildkante, ragt `--space-7` nach unten | Panel Sp. 1–6 (ab 1280 px Sp. 1–5) überlappt die untere Bildkante um `--space-9` und läuft darunter weiter | Bei den finalen Textlängen ist das Panel höher als das 21:9-Bild; die wörtliche Umsetzung hätte das Bild fast vollständig verdeckt. |
| Einzugsgebiet 768–1023 px | Ortsname groß rechts | Ortsname groß erst ab 1024 px rechts neben dem Text, darunter unter dem Text | „Musterstadt“ in 125 % Breite passt in die rechte Spalte erst ab 1024 px. |
| Team (Über uns) | großes Porträt + zwei kleinere darunter versetzt | großes Porträt links, zwei kleinere rechts daneben gestaffelt (versetzt) | gleiche Idee, kompakter; die Seite wird sonst sehr lang. |
| Bild-Platzhalter | Fläche endet bei 88 % an der Kante | zusätzlich 1 px Linie (`--farbe-linie`) um die gesamte Musterfläche | Auf Kalkweiß-Sektionen wäre der unbemalte 12-%-Rest sonst unsichtbar und die Bildfläche wirkte schmaler als die Spalte. Auf dem Grünerde-Band entfällt die Linie. |
| Etikett auf Grünerde | Etikett-Quadrat sonst Englischrot | Quadrat auf Grünerde in Kalkweiß | Rot auf Grünerde ist laut Briefing verboten (1,14 : 1). |
| Scroll-Einblendung | per IntersectionObserver | zusätzlich Scroll-Absicherung; Inhalte, die beim Laden schon im Bild sind, werden nicht versteckt; bei `prefers-reduced-motion` **und in automatisierten Prüfläufen (`navigator.webdriver`)** keine Einblendung | Kein LCP-Verzug, keine Zwischenzustände in Screenshots/axe-Kontrastmessung. |
| Sanftes Scrollen | – | kein `scroll-behavior: smooth` | Verzögerte programmatische Sprünge (Fehler-Sprunglinks, Prüfskripte). |

## Abweichungen von inhalte.md
| Stelle | inhalte.md | Umsetzung | Begründung |
|---|---|---|---|
| danke.html | OG entfällt | OG/Twitter-Tags vorhanden | Abnahmekriterium „jede Seite mit Open-Graph-Daten“; schadet nicht (noindex). |
| 404.html | Canonical: keins | kein Canonical, OG ohne `og:url` | Die 404-Seite wird unter beliebigen URLs ausgeliefert; ein Canonical wäre falsch. `noindex, follow`. Alle Pfade dort absolut (`/css/…`), damit sie in jeder Tiefe funktioniert. |
| Formular: Meldungen „Erfolg inline“ und „Sitzung/Token abgelaufen“ | optional | nicht verwendet | Erfolg leitet auf `danke.html` weiter; keine Token-/Zeitprüfung (würde ohne JS bzw. bei Uhrzeitabweichungen echte Anfragen blockieren). Spamschutz: Honeypot. |
| Fehlerfall Formular | „Box über dem Formular“ | `kontakt.php` gibt `kontakt.html` mit Meldungen, Fehlerzusammenfassung und allen eingegebenen Werten erneut aus (HTTP 422 bzw. 503), funktioniert ohne JS; zusätzlich zeigt `kontakt.html?status=fehler` die Versandmeldung per JS | Werte bleiben erhalten, kein Datenverlust. |
| Registereintrag / USt-IdNr. im Impressum | „entfernen, wenn nicht vorhanden“ | mit Platzhaltern stehen gelassen, HTML-Kommentar markiert die Abschnitte | Ob sie zutreffen, ist unbekannt (Launch-Checkliste). |
| Telefon in `tel:`-Links | – | sichtbarer Platzhalter mit geschütztem Leerzeichen „[PLATZHALTER:&nbsp;Telefonnummer]“ | Telefonnummern dürfen nicht umbrechen (html-validate `tel-non-breaking`). |
| OSM-Link | `query=[PLATZHALTER: Adresse URL-kodiert]` | Platzhalter selbst URL-kodiert (`%5BPLATZHALTER%3A%20Adresse%20URL-kodiert%5D`) | gültige URL. |
| Datenschutz H1 | „Datenschutzerklärung“ | mit weichem Trennzeichen `Datenschutz&shy;erklärung` | passt sonst nicht auf 360 px. |

## Technische Hinweise
- **Seitengenerator:** Alle HTML-Seiten entstehen aus `_entwurf/build.mjs` (gemeinsame Bausteine für Header, Footer, Platzhalter). Änderungen dort machen und `node _entwurf/build.mjs` ausführen – oder die HTML-Dateien direkt bearbeiten (dann Build nicht mehr ausführen).
- **Marke/Favicons/OG-Bild:** `node _entwurf/marke.mjs`. Das OG-Bild wird als SVG mit eingebetteter lokaler Archivo-Schrift von Chromium (Playwright) gerendert und mit sharp als JPEG gespeichert (librsvg kann die variable Breitenachse nicht zuverlässig). `assets/bilder/logo.svg` enthält nur das Bildzeichen (die Wortmarke wird im Header als Webschrift gesetzt).
- **JSON-LD (`HousePainter`)** auf Start- und Kontaktseite nur mit gesicherten Daten: Name, URL, Logo, Bild, Beschreibung, `areaServed` Musterstadt. **Bei Launch ergänzen:** `telephone`, `email`, `address` (PostalAddress), ggf. `openingHoursSpecification`, `geo` – in `_entwurf/build.mjs` (Konstante `JSONLD`).
- **`serve.json`** (Wurzel) ist nur für den lokalen Prüfserver (`npx serve`): schaltet „cleanUrls“ ab, weil `serve` sonst `?leistung=` und `?status=` beim Umleiten verwirft. Nicht hochladen (per `.htaccess` ohnehin gesperrt).
- **PHP:** `kontakt.php` benötigt PHP ≥ 8.1. Getestet lokal mit `php -S`: GET → 303 auf kontakt.html; Honeypot → 303 auf danke.html; Feldfehler → 422 mit Meldungen/Werten (HTML valide); Versand mit Platzhalter-Empfänger bzw. ohne Mailserver → 503 mit Versandfehlermeldung, Werte erhalten. Der Erfolgsfall (303 → danke.html) konnte mangels Mailserver nicht real getestet werden.
- **Tastatur-/Formulartest:** `node _entwurf/tastatur-test.mjs` (Skip-Link, Menü öffnen/Fokusfalle/Escape, Vorauswahl `?leistung=`, Fehlerzusammenfassung, `aria-invalid`, `?status=fehler`).
