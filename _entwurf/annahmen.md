# Phase 0 – Projektverständnis, Materialsichtung, Annahmen (Orchestrator)

## Verständnis der Eckdaten
Malerwerk ist ein Malerbetrieb in Musterstadt, der eine mehrseitige Firmenwebsite für Privatkunden braucht. Die Seite soll nach Handwerkslogik bodenständig und vertrauenswürdig auftreten, Leistungen, Arbeitsweise, Betrieb und Einzugsgebiet zeigen und Besucher zur Kontaktaufnahme führen. Markenelemente existieren nicht und sollen neu entwickelt werden („ausdenken“). Ein Designkonzept muss nicht vorab freigegeben werden. Fast alle konkreten Unternehmensdaten (Kontakt, Impressum, USP, Leistungsbeschreibungen, Referenzen, Kundenstimmen, Bilder, Domain, Hosting) wurden nicht geliefert.

## Materialsichtung
- Ordner `material/` existiert **nicht**. Vorhanden: nichts (keine Texte, keine Bilder, kein Logo, keine Referenz-Screenshots).
- Referenz-URLs (positiv/negativ): **keine** angegeben.

## Getroffene Annahmen (verbindlich für alle Agenten)
1. **Hauptziel:** Anfragen generieren, gestützt durch Vertrauensaufbau (Standard für Handwerk mit Privatkunden).
2. **Wichtigste Handlung:** Anfrage senden (Formular für ein Angebot / einen Besichtigungstermin), gleichwertig daneben **Anrufen** (Telefonnummer als Platzhalter, `tel:`-Link vorbereitet).
3. **Alleinstellungsmerkmal:** nicht geliefert → wird **nicht erfunden**. Keine Gründungsjahre, „Familienbetrieb“, Meisterbetrieb, Mitarbeiterzahlen, Zertifikate oder Auszeichnungen. Stattdessen `[PLATZHALTER: …]` an den Stellen, an denen ein USP stehen würde. Die Gestaltung trägt die Eigenständigkeit.
4. **Markenelemente:** werden vom Design-Analysten neu entwickelt (Wortmarke/Logo als SVG, Farben, Schriften).
5. **Sprache:** Deutsch, Ansprache **„Sie“** (Privatkunden, Handwerk).
6. **Leistungen:** keine Liste geliefert. Es werden **branchenübliche Leistungsbereiche eines Malerbetriebs** angenommen (z. B. Innenanstrich, Tapezierarbeiten, Fassade, Lackier-/Holzarbeiten, dekorative Wandgestaltung/Spachteltechnik, Bodenbeschichtung o. Ä.). Beschreibungen erklären die Leistung allgemein und sachlich (was gemacht wird, welcher Nutzen), **ohne** betriebsspezifische Behauptungen (Preise, Fristen, Garantien, Materialmarken, Zahlen). Die Leistungsliste steht als „vom Kunden zu bestätigen“ in der Launch-Checkliste.
7. **Kontakt, Adresse, Öffnungszeiten, Impressumsangaben:** alles `[PLATZHALTER: …]`.
8. **Preise:** keine Preise; Formulierung „Angebot nach Besichtigung / auf Anfrage“ ist zulässig, da keine Zahl behauptet wird.
9. **Kundenstimmen:** keine → kein Bewertungsbereich mit erfundenen Zitaten. Ein Platzhalterblock darf vorbereitet werden, klar gekennzeichnet.
10. **Referenzprojekte / Bilder:** keine → **gestaltete Bildplatzhalter** mit Motivbeschreibung und festem Seitenverhältnis, später ohne Layoutänderung austauschbar. Eine `sharp`-Pipeline (`_entwurf/bilder.mjs`) wird vorbereitet, damit echte Fotos später mit einem Befehl in AVIF/WebP/JPEG in mehreren Breiten erzeugt werden.
11. **Kontaktformular-Versand:** nicht festgelegt → **PHP-Mailer auf dem eigenen Webspace wird sauber vorbereitet** (`kontakt.php`, serverseitige Validierung, Honeypot, Schutz vor Header-Injection, Erfolgs-/Fehlerseite bzw. -meldung). Empfängeradresse als Platzhalter in einer Konfigurationsdatei.
12. **Domain:** offen → Platzhalter-Domain `https://malerwerk.example` (reservierte TLD, eindeutig nicht echt) für Canonical, Open Graph, Sitemap, robots.txt und JSON-LD. Austausch per Suchen/Ersetzen; steht in der Launch-Checkliste.
13. **Hosting:** offen.
14. **Externe Dienste:** keine (keine Karte, kein Video, kein Tracking) → **kein Cookie-Banner**. Für die Anfahrt optional ein Link zu einem Kartendienst (kein eingebetteter Inhalt) oder eine Zwei-Klick-Lösung.
15. **Lokale Ressourcen:** Schriften z. B. über npm-Pakete `@fontsource/*` (enthalten WOFF2-Subsets) beziehen und nach `assets/fonts/` kopieren; Icons z. B. aus `lucide-static` nach `assets/icons/` bzw. inline als SVG.

## Werkzeuge
- `npm install -D playwright@1.63.0 @axe-core/playwright sharp html-validate lighthouse serve` erfolgreich.
- Playwright auf die vorinstallierte Version 1.63.0 gepinnt, Chromium bereits unter `/opt/pw-browsers` vorhanden → `npx playwright install` entfällt.
- `_entwurf/screenshot.mjs` getestet ✔.
- `_entwurf/qa.mjs` getestet ✔ – eine Korrektur nötig: `@axe-core/playwright` verlangt Seiten aus `browser.newContext()`; das Skript nutzt jetzt einen Kontext je Seite.
