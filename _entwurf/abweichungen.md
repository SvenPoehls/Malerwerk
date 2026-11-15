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
| Zeilenlänge (`--measure`) | `max-width: 66ch` | `56ch` | Archivo ist schmal: 66ch ergaben 80–95 Zeichen pro Zeile. 56ch ergeben rund 65–72 Zeichen (PROMPT: 60–75). Gilt jetzt für allen Fließtext in Sektionen (`:where()`-Regel mit Spezifität 0). |
| Ablauf, Band 03 | Grünerde hell mit 4-px-Kante | eigener Zwischenton `--farbe-gruenerde-mittel` (#ABB4A2, Mischung Grünerde hell/Grünerde 65/35) ohne Kante | Die Kante wirkte wie ein Fehler; die Schichtfolge hell → dunkel bleibt stufenlos. Kontrast Umbra auf #ABB4A2 ≈ 7,4 : 1. |
| Arbeiten-Vorschau (Startseite) ab 1024 px | Kopf rechts über den Bildern | Kopf links oben (Sp. 1–6), großes Bild darunter (Sp. 1–7), Detailbild rechts versetzt daneben (Sp. 8–12, beginnt `--space-7` tiefer); bei 768 px Kopf Sp. 1–5 | Vermeidet die große Leerfläche links neben dem Kopf (Prüfung Design P3-1). |
| Sorgfalt-Panel ab 1024 px | Panel Sp. 1–5/6 | Panel Sp. 1–9 (ab 1280 px Sp. 1–8), die zwei Absätze nebeneinander; Sektion unten kompakt | Vermeidet die Leerfläche rechts neben dem Panel. |
| Leistungen ab 1024 px | Bild vertikal mittig zum Text | Bild oben bündig auf Höhe der H2; Abstand Sprungleiste → MW-01 reduziert | Prüfung Design P2-4. |
| Sprungleiste Leistungen | Chips in einer umbrechenden Zeile | Kachelraster 2 / 3 / 6 Spalten (mobil / ab 768 / ab 1280 px), Code oben, Name darunter | Keine einzelne Kachel in Zeile 2, mobil kompakter. |
| Musterkarte MW-05 ab 1024 px | drei gleich große Kacheln | großes Muster links, zwei kleine rechts untereinander, oben bündig mit der H2; Motivtext ab 768 px ausgeblendet (Name steht in der Bildunterschrift) | Weniger Leerfläche neben dem langen Text, keine doppelte Beschriftung. |
| Team (Über uns) ab 1024 px | großes Porträt + zwei kleinere | Spalten 2fr/1fr, Bilder Sp. 5–12, Text Sp. 1–4 | Kleine Porträts waren nur rund 180 px breit. |
| Angebot-Box (Leistungen) ab 1024 px | Box mittig Sp. 3–10 mit Buttons | zweispaltig auf der linken Achse (Etikett/H2 links, Text rechts), ohne Buttons | siehe Abweichungen von inhalte.md; Box ist jetzt eine Überleitung zum Abschlussband. |
| Kontakt, Telefonblock | 4 px Englischrot links | 4 px Grünerde | Rot nur für Handlungen (Briefing 14.8). |
| Datenblätter Arbeiten | 03 / 04 / 05 | 01 Grünerde, 02 Ocker, 03 Umbra | Grünerde hell war auf Leinen kaum sichtbar. |
| Datenschutz ab 1024 px | Text Sp. 1–8, Verzeichnis Sp. 10–12 | Prüfhinweis + Text Sp. 1–7, Verzeichnis Sp. 9–12 (ab 1280 px Sp. 8–11), oben bündig mit dem Prüfhinweis | Textspalte ist durch `--measure` schmaler; Verzeichnis rückt näher heran. |

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
| Leistungen 3.3 „Angebot nach Besichtigung“ | Button primär „Anfrage senden“ + Button sekundär „Anrufen“ | Buttons entfernt, H2 und Text bleiben als Überleitung | Entscheidung Orchestrator (Prüfung Design P2-5): Direkt darunter folgt das Abschlussband mit denselben zwei Buttons. |
| Startseite Hero, Button sekundär | „Anrufen: [PLATZHALTER: Telefonnummer]“ | Button „Anrufen“ (`aria-label` mit Nummer), darunter eine kleine Zeile „[PLATZHALTER: Telefonnummer]“ – wie im Mobilmenü (inhalte 1.2) | Entscheidung Orchestrator (Prüfung Design P2-6): gleich hohe Buttons, kein Umbruch; unter 480 px stehen beide Buttons in voller Breite untereinander. |
| Leistungen MW-04, Text | „… wirken schnell wie neu, wenn sie frisch lackiert sind.“ | „… sehen frisch lackiert wieder gepflegt aus.“ | Vorschlag der Design-Prüfung (P3-17): kein Leistungsversprechen. |
| Impressum, Verbraucherstreitbeilegung | Satz als feste Erklärung | Satz sichtbar als `[PLATZHALTER: Erklärung nach § 36 VSBG vom Betrieb bestätigen – vorbereiteter Text: „…“]` | Entscheidung Orchestrator (Prüfung Technik P1-1): rechtliche Erklärung, die der Kunde nicht geliefert hat. |
| Datenschutz 12 „Verschlüsselung“ | Text ohne Hinweis | davor Zeile „[PLATZHALTER: erst nach Einrichtung des SSL-Zertifikats und der HTTPS-Weiterleitung bestätigen]“ | Prüfung Technik P3-8 (knappe Präzisierung). |
| danke.html | Canonical | kein Canonical (und damit kein `og:url`), `noindex, follow` bleibt | Entscheidung Orchestrator / Prüfung Technik P3-6. |
| Datenschutz H2 5 und Inhaltsverzeichnis | „Kontakt per E-Mail oder Telefon“ | „E-Mail“ in `<span class="kein-umbruch">` | kein Umbruch nach „E-“ (Prüfung Design P3-5). |
| Formular, Hilfetext Nachricht | unter dem Feld | über dem Feld | einheitlich mit den anderen Feldern (Prüfung Design P3-7). |

## Technische Hinweise
- **Seitengenerator:** Alle HTML-Seiten entstehen aus `_entwurf/build.mjs` (gemeinsame Bausteine für Header, Footer, Platzhalter). Änderungen dort machen und `node _entwurf/build.mjs` ausführen – oder die HTML-Dateien direkt bearbeiten (dann Build nicht mehr ausführen).
- **Marke/Favicons/OG-Bild:** `node _entwurf/marke.mjs`. Das OG-Bild wird als SVG mit eingebetteter lokaler Archivo-Schrift von Chromium (Playwright) gerendert und mit sharp als JPEG gespeichert (librsvg kann die variable Breitenachse nicht zuverlässig). `assets/bilder/logo.svg` enthält nur das Bildzeichen (die Wortmarke wird im Header als Webschrift gesetzt).
- **JSON-LD (`HousePainter`)** auf Start- und Kontaktseite nur mit gesicherten Daten: Name, URL, Logo, Bild, Beschreibung, `areaServed` Musterstadt. **Bei Launch ergänzen:** `telephone`, `email`, `address` (PostalAddress), ggf. `openingHoursSpecification`, `geo` – in `_entwurf/build.mjs` (Konstante `JSONLD`).
- **`serve.json`** (Wurzel) ist nur für den lokalen Prüfserver (`npx serve`): schaltet „cleanUrls“ ab, weil `serve` sonst `?leistung=` und `?status=` beim Umleiten verwirft. Nicht hochladen (per `.htaccess` ohnehin gesperrt).
- **PHP:** `kontakt.php` benötigt PHP ≥ 8.1 sowie die Erweiterungen `mbstring` und `dom` (Kopfkommentar in `kontakt.php` und `kontakt-config.php`). Die Domain steht nur noch einmal in `kontakt-config.php` (`$domain`) und wird für Absender, Envelope, Betreff und Mailtext verwendet. Der Mailtext geht als `quoted-printable` (Zeilen ≤ 76 Zeichen). Getestet lokal mit `php -S`: GET → 303 auf kontakt.html; Honeypot → 303 auf danke.html; Feldfehler → 422 mit Meldungen/Werten (HTML valide); Versand mit Platzhalter-Empfänger bzw. ohne Mailserver → 503 mit Versandfehlermeldung, Werte erhalten. Der Erfolgsfall (303 → danke.html) konnte mangels Mailserver nicht real getestet werden.
- **Tastatur-/Formulartest:** `node _entwurf/tastatur-test.mjs` (Skip-Link, Menü öffnen/Fokusfalle/Escape, Vorauswahl `?leistung=`, Fehlerzusammenfassung, `aria-invalid`, `?status=fehler`).
- **`.htaccess`:** `Options -Indexes` (und `ErrorDocument 403 /404.html`) sind auskommentiert, weil die Zeile bei Hostern ohne `AllowOverride Options` einen Fehler 500 für die ganze Website auslöst. Nach dem Upload aktivieren und testen (Hinweis direkt in der Datei; Launch-Checkliste).
- **`theme-color`:** Seiten und `site.webmanifest` einheitlich `#F4F1EA` (Kopfzeilenfarbe); Quelle `_entwurf/marke.mjs`.
- **JSON-LD `logo`:** `https://malerwerk.example/assets/bilder/logo.svg` (Bildzeichen als SVG; vorher `icon-512.png`).
- **CSS:** bewusst nicht minifiziert (Lesbarkeit für den Kunden, Lighthouse 100). Ungenutzte Regeln entfernt (`.fliesstext`, `.knopf--hell`, `.meldung--erfolg`, `.feld__hilfe--unten`, `.knopf .platzhalter`, Angebot-Knopfreihe). `.motiv__bild` und `.sv-21-9` bleiben für den Fototausch (`bilder-austausch.md`).
- **`?status=fehler`:** wird von `kontakt.php` nicht genutzt (die Seite wird direkt mit Meldung ausgegeben); bleibt für eine Weiterleitungs-Variante bzw. einen externen Formulardienst (Kommentar in `js/main.js`).

## Umgesetzt in Runde 2
Grundlage: `pruefung-design-runde-1.md` (D) und `pruefung-technik-runde-1.md` (T).

| Punkt | Änderung |
|---|---|
| T P1-1 | VSBG-Satz im Impressum als sichtbarer Platzhalter mit vorbereitetem Text |
| T P2-1 | Mailtext `quoted-printable` (`quoted_printable_encode`), getestet mit 3000 Zeichen ohne Umbruch: längste Zeile 77 Zeichen inkl. CRLF |
| T P2-2 | `js/main.js`: benannte Sperre, `pageshow` (persisted) hebt Sperre, `aria-disabled` und Knopftext auf; mit Zurück-Navigation getestet |
| T P2-3 | E-Mail-Muster im JS nur ASCII (Lokalteil und Domain), deckt sich mit `FILTER_VALIDATE_EMAIL` (`müller@…` wird im Browser abgelehnt, Server 422) |
| T P3-1 | Versandfehler-Meldung wird fokussiert (wenn keine Feldfehler); `?status=fehler` dokumentiert |
| T P3-2 | PHP-Anforderungen als Kopfkommentar in `kontakt.php` und `kontakt-config.php` |
| T P3-3 | Domain aus der Config (`$domain` → `domain`, `absender`, `envelope`, `betreff`) |
| T P3-4 | nicht minifiziert (Entscheidung Orchestrator), ungenutzte Regeln entfernt |
| T P3-5 | `theme-color` einheitlich `#F4F1EA` (Manifest + `marke.mjs`) |
| T P3-6 | danke.html ohne Canonical |
| T P3-7 | `Options -Indexes` auskommentiert mit Anleitung, `ErrorDocument 403` vorbereitet |
| T P3-8 | TLS-Abschnitt mit Platzhalter-Hinweis |
| T P3-9 | `logo.svg` im JSON-LD als `logo` |
| T P3-10 | Launch-Checkliste (Orchestrator) – keine Codeänderung |
| D P2-1 | `--measure` 56ch, Regel für allen Fließtext in Sektionen/Seitenkopf/Hero sowie Haken-, Schritt- und Rechtstext-Listen |
| D P2-2 | `&nbsp;` vor dem Halbgeviertstrich in H1 Start („lackieren&nbsp;– in&nbsp;Musterstadt“), H2 Tapezieren, H1 Über uns |
| D P2-3 | Impressum: `.rechtstext` innerhalb von `.container`, Text auf der linken Achse |
| D P2-4 | Leistungen: Abstand Seitenkopf → MW-01 reduziert, ab 1024 px Bilder oben bündig auf H2-Höhe |
| D P2-5 | Angebot-Box ohne Buttons, zweispaltig auf der linken Achse, Sektion kompakt |
| D P2-6 | Hero: „Anrufen“-Button + Nummer als Zeile darunter; mobil beide Buttons volle Breite |
| D P3-1 | Startseite: Sorgfalt-Panel breiter mit zweispaltigem Text, Arbeiten-Vorschau neu angeordnet (1024+ und 768) |
| D P3-2 | Sprungleiste als Kachelraster 2/3/6 Spalten |
| D P3-3 | Band 03 als Zwischenton ohne Kante |
| D P3-4 | Prüfhinweis im Raster, Inhaltsverzeichnis oben bündig |
| D P3-5 | „E-Mail“ ohne Umbruch in H2 und Verzeichnis |
| D P3-6 | `hyphens: manual` für Fehlertexte und Meldungen |
| D P3-7 | Hilfetext Nachricht über dem Feld |
| D P3-8 | Platzhalter in Überschriften: Gewicht geerbt, 0,8 em |
| D P3-9 | Musterkarte: Motivtext ab 768 px aus, oben bündig, großes + zwei kleine Muster |
| D P3-10 | Datenblätter 01 Grünerde, 02 Ocker, 03 Umbra |
| D P3-11 | Arbeiten: Seitenkopf-Hinweis rechts unten |
| D P3-12 | Telefonblock-Kante Grünerde |
| D P3-13 | Footer 768 px: Kontakt Sp. 1–3, Seiten Sp. 4, Rechtliches Sp. 5–6 |
| D P3-14 | Hero 768 px: Bild bis zum rechten Rand (Sp. 2 bis Ende), Grünerde-Feld bis zum Viewport |
| D P3-15 | MW-03: Abstand Bild → Etikett `--space-6` |
| D P3-16 | Team ab 1024 px: 2fr/1fr, kleine Porträts rechts untereinander |
| D P3-17 | MW-04-Formulierung angepasst; Hinweise zu Texten über leeren Platzhaltern → Launch-Checkliste (Orchestrator) |
| D P3-18 | `:active` für Hauptnavigation, Footer-Links und Sprungleiste |
