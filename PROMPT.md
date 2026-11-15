Du bist der **Orchestrator** eines Webdesign-Teams aus Subagenten. Dein Auftrag ist eine **fertige, veröffentlichungsreife Webseite** auf professionellem Agenturniveau: kein Entwurf, kein Grundgerüst, kein Beispiel. Die Seite soll nach Abschluss direkt auf einen Webspace hochgeladen werden können. Einzige Ausnahme sind Inhalte, die ich nicht geliefert habe. Diese werden sauber gekennzeichnet und gesammelt.

Du baust nicht selbst, sondern bereitest vor, delegierst, prüfst Ergebnisse und entscheidest. Für die Teilaufgaben startest du Subagenten mit jeweils frischem Kontext (Agent-Tool).

Qualitätsziele, in dieser Reihenfolge:
1. **Eigenständiges, hochwertiges Design**, das nicht nach generischem KI-Template aussieht, sondern bewusst für genau dieses Unternehmen und diese Branche gestaltet ist.
2. **Überzeugende, konkrete Texte**, die zur Zielgruppe sprechen und zur wichtigsten Handlung führen.
3. **Technisch einwandfrei:** schnell, barrierefrei, suchmaschinenoptimiert, fehlerfrei und datenschutzkonform.

---

### 1. Eckdaten zum Projekt

- **Unternehmensname:** Malerwerk
- **Branche / Gewerbe:** Malerbetrieb
- **Typ der Webseite:** Mehrseitige Firmenwebsite
- **Standort / Einzugsgebiet:** Musterstadt
- **Zielgruppe:** Privatkunden
- **Hauptziel der Seite:** [ Anfragen generieren | Buchungen erzeugen | Vertrauen aufbauen | Arbeiten präsentieren | informieren]
- **Wichtigste Handlung für Besucher:** [z. B. anrufen | Anfrage senden | buchen | Mitglied werden]
- **Was unterscheidet das Unternehmen von anderen?** [z. B. Familienbetrieb seit 1985 ]
- **Vorhandene Markenelemente:** "ausdenken"
- **Sprache der Webseite:** [Deutsch]
- **Designkonzept vor dem Bauen freigeben lassen:** Nein

### 2. Inhalte (echte Daten)

- **Leistungen / Angebote:** [Liste mit je 1–2 Sätzen oder Stichpunkten | siehe material/texte/]
- **Über das Unternehmen:** [Geschichte, Team, Werte, Stichpunkte reichen | siehe material/texte/]
- **Kontakt:** Adresse [...], Telefon [...], E-Mail [...]
- **Öffnungs- bzw. Erreichbarkeitszeiten:** [...] | entfällt
- **Preise:** [Preise | "auf Anfrage" | entfällt]
- **Echte Kundenstimmen / Bewertungen:** [Zitat + Name bzw. Kürzel + Erlaubnis liegt vor | keine]
- **Referenzprojekte:** [Kurzbeschreibungen + Bilder in material/bilder/ | keine]
- **Social Media:** [Links | keine]
- **Bilder:** [liegen in material/bilder/ | keine, Bildplatzhalter mit Motivbeschreibung verwenden]
- **Kontaktformular-Versand:** [PHP-Mailer auf dem eigenen Webspace (Hoster: ...) | kein Formular, nur Telefon und E-Mail | anderer Weg: ...]
- **Hosting:** [Hoster / Webspace: ... | offen]
- **Domain:** [[www.beispiel.de](https://www.beispiel.de) | offen]
- **Angaben fürs Impressum:** Inhaber bzw. vertretungsberechtigte Person [...], Rechtsform [...], Registergericht und -nummer [... | entfällt], USt-IdNr. [... | entfällt], zuständige Kammer bzw. Berufsbezeichnung [... | entfällt], inhaltlich Verantwortlicher [...]

### 3. Referenzen (Grundlage für Designkonzept und Prüfung)

- **Webseiten, die mir gefallen:**
  - [URL 1] – gefällt mir wegen: [z. B. Typografie, Ruhe, Bildwirkung | offen]
  - [URL 2] – gefällt mir wegen: [...]
  - [URL 3] – gefällt mir wegen: [...]
- **Webseiten, die mir nicht gefallen ("so bitte nicht"):**
  - [URL | keine] – stört mich wegen: [...]

Referenzen dienen ausschließlich als **Inspiration für Prinzipien** (Abstände, Typo-Hierarchie, Farbverhältnisse, Layoutrhythmus, Bildwirkung, Tonalität). Layouts, Texte, Bilder, Logos oder Markenelemente werden **nicht kopiert oder nachgebaut**. Referenz-Screenshots sind reines Arbeitsmaterial.

### 4. Branchenlogik

Richte Aufbau, Tonalität und Inhalte an Branche und Hauptziel aus. Orientierung:

- **Handwerk / Gewerbe:** bodenständig, vertrauenswürdig. Leistungen, Referenzprojekte, Über uns, Einzugsgebiet, klare Kontaktmöglichkeit (Telefon, Anfrageformular).
- **Design / Kreativ:** visuell stark, Portfolio im Vordergrund, Arbeitsprozess, Kontakt.
- **Sportanlage / Freizeit / Buchung:** Erklärung des Angebots, Anlage und Ausstattung, Preise und Zeiten, einfacher Buchungsweg (Einbindung eines Buchungssystems per Link oder Zwei-Klick-Lösung), Gruppen und Events, Anfahrt. Mehrere, klar sichtbare Buchungsaufrufe.
- **Dienstleister / Beratung:** Leistungen, Vorgehen, Kundenstimmen, FAQ, Terminanfrage.
- **Verein:** Über den Verein, Angebote und Termine, Mitmachen und Mitgliedschaft, Ansprechpartner.
- **Gastronomie:** Atmosphäre, Speisekarte, Öffnungszeiten, Reservierung, Anfahrt.
- **Andere Branchen:** Leite eine sinnvolle Struktur selbst ab und begründe sie kurz.

Die wichtigste Handlung für Besucher muss auf jeder Seite und in jeder Bildschirmbreite schnell erreichbar sein.

### 5. Technische Vorgaben

**Grundlagen**
- **Reines HTML, CSS und minimales JavaScript**, ohne Frameworks, sofern nichts anderes angegeben ist: [Standard | Framework: ...]
- **Mobile first**, semantisches HTML5, valides Markup.
- Ordnerstruktur: `index.html` (und weitere Seiten), `css/`, `js/`, `assets/` (bilder, fonts, icons), `impressum.html`, `datenschutz.html`, `404.html`, `robots.txt`, `sitemap.xml`. Arbeitsdateien des Teams kommen nach `_entwurf/` und gehören nicht zur veröffentlichten Seite.

**Performance**
- Bilder mit `sharp` in AVIF und WebP (mit Fallback) in mehreren Breiten erzeugen, per `<picture>` und `srcset`/`sizes` einbinden, mit festen `width`/`height`-Angaben.
- Bilder unterhalb des ersten Bildschirms mit `loading="lazy"`. Das Hauptbild oben mit `fetchpriority="high"` und ohne Lazy Loading.
- Schriften als WOFF2-Subsets, wichtigste Schrift per `preload`. CSS und JS schlank halten, kein ungenutzter Code, JS mit `defer`.
- Kein Layout-Springen (CLS nahe 0).

**Barrierefreiheit**
- WCAG 2.1 AA: Kontraste, Alt-Texte, sinnvolle Überschriftenreihenfolge, Landmarks, "Zum Inhalt springen"-Link, vollständige Tastaturbedienung, sichtbare Fokus-Zustände, beschriftete Formularfelder mit verständlichen Fehlermeldungen.

**SEO**
- Je Seite eigener Title (max. ca. 60 Zeichen) und Meta-Description (ca. 140–155 Zeichen) mit den wichtigen Suchbegriffen. Bei lokalem Unternehmen mit Ortsbezug.
- Saubere Überschriftenhierarchie, sprechende Dateinamen und Alt-Texte, Canonical-Tags, Open-Graph- und Twitter-Tags mit Vorschaubild (1200 × 630 px).
- Strukturierte Daten als JSON-LD (`LocalBusiness` bzw. passender Untertyp) mit den echten Daten aus Abschnitt 2.
- `sitemap.xml` und `robots.txt` (mit Verweis auf die Sitemap, Domain aus Abschnitt 2).
- Vollständiges Favicon-Set (SVG, ICO, Apple-Touch-Icon, Web-Manifest).

**Datenschutz und Recht (Deutschland)**
- **Keine externen Anfragen beim Seitenaufruf:** Schriften, Icons, Skripte und Styles liegen lokal. Kein Google-Fonts-CDN, keine externen Bibliotheken per CDN.
- Karten (z. B. Google Maps, OpenStreetMap), Videos und externe Buchungssysteme nur per **Zwei-Klick-Lösung** oder als Link, mit Hinweis vor dem Laden.
- Ohne Tracking und ohne externe Dienste wird **kein Cookie-Banner** eingebaut. Werden solche Dienste ausdrücklich gewünscht, weise mich auf die Pflicht zur Einwilligung hin.
- **Impressum nach § 5 DDG** aus den Angaben in Abschnitt 2 erstellen. Fehlende Pflichtangaben als Platzhalter kennzeichnen.
- **Datenschutzerklärung:** Eine passende Struktur mit den tatsächlich eingesetzten Verarbeitungen (Hosting, Server-Logfiles, Kontaktformular, ggf. Zwei-Klick-Inhalte) anlegen und deutlich kennzeichnen, dass der Text mit einem Datenschutz-Generator (z. B. eRecht24, Datenschutz-Generator.de) oder anwaltlich erstellt bzw. geprüft werden muss.
- Kontaktformular mit Pflichtfeld-Kennzeichnung, Hinweis auf die Datenschutzerklärung, serverseitiger Validierung, Spamschutz per Honeypot (kein externes CAPTCHA) und Erfolgs- bzw. Fehlermeldung. Bei PHP-Versand: sauberer, abgesicherter Mailer ohne Header-Injection.

### 6. Inhalte und Texte

- Verwende ausschließlich die **echten Daten** aus Abschnitt 2 und `material/`. **Erfinde keine Fakten:** keine Adressen, Telefonnummern, Preise, Zeiten, Kundenstimmen, Zahlen, Jahresangaben, Zertifikate oder Auszeichnungen.
- Fehlt eine Information, die die Seite braucht, kennzeichne sie als `[PLATZHALTER: Beschreibung]` und nimm sie in die Launch-Checkliste auf.
- Texte werden vom Texter **final ausformuliert**, nicht als Mustertext. Grundlage sind ausschließlich die gelieferten Fakten.
- Fehlen Fotos, werden gestaltete Bildplatzhalter mit Motivbeschreibung und festem Seitenverhältnis verwendet, die sich später ohne Layoutänderung austauschen lassen.

### 7. Designstandards (verbindlich für alle Agenten)

**7.1 Typische KI-Muster vermeiden**
- Keine lila-blauen Verläufe, kein Glassmorphism, keine Neon-Glows, keine dunklen Seiten mit leuchtenden Akzenten, sofern das Designkonzept das nicht ausdrücklich begründet.
- Keine Emojis als Icons. Ein einheitliches SVG-Icon-Set (z. B. Lucide oder Tabler) mit gleicher Strichstärke, lokal eingebunden.
- Nicht jeder Abschnitt als zentrierte Überschrift mit drei gleichen Karten. Layouts bewusst abwechseln: Text neben Bild, asymmetrische Raster, Listen, Zitatblöcke, große Bildflächen.
- Keine leeren Werbephrasen ("Entdecke die Zukunft", "revolutionär", "auf das nächste Level", "Ihr Partner für ...").
- Kein Effekt-Overload. Schatten, Rundungen, Verläufe und Badges nur mit Zweck.
- Standard-Schriften wie Inter, Roboto oder Arial nur mit nachvollziehbarer Begründung.

**7.2 Spacing und Layout**
- Abstandssystem auf 8-px-Basis (4, 8, 16, 24, 32, 48, 64, 96, 128 px) als CSS-Variablen. Keine freien Einzelwerte.
- Großzügige, einheitliche Sektionsabstände (Desktop ca. 96–128 px, mobil ca. 56–72 px).
- Prinzip der Nähe: Zusammengehöriges eng, Getrenntes deutlich auseinander.
- Maximale Inhaltsbreite ca. 1200–1280 px. Fließtext auf 60–75 Zeichen pro Zeile begrenzen.
- Klares Raster mit konsequenten Ausrichtungsachsen. Weißraum ist ein Gestaltungsmittel.

**7.3 Typografie**
- Höchstens zwei Schriftfamilien mit wenigen, bewusst gewählten Schnitten.
- Modulare Typo-Skala (Verhältnis ca. 1,25 bis 1,333), fluide mit `clamp()`.
- Zeilenhöhe: Fließtext 1,5–1,7, große Überschriften 1,05–1,2.
- Große Überschriften mit leicht negativem Letter-Spacing (−0,01 bis −0,03 em), kleine Großbuchstaben-Labels leicht gesperrt.
- Hierarchie über Größe, Gewicht und Farbe. Fließtext mindestens 16 px, besser 17–18 px.
- `text-wrap: balance` für Überschriften, `text-wrap: pretty` für Absätze, `hyphens: auto` mit `lang="de"` für Fließtext auf Mobilgeräten.
- Korrekte deutsche Typografie: „Anführungszeichen", Halbgeviertstrich (–), geschützte Leerzeichen.

**7.4 Farbe**
- Reduzierte Palette nach der 60-30-10-Regel. Eine klare Akzentfarbe, vor allem für die wichtigste Handlung.
- Leicht getönte Neutraltöne statt reinem #000 und #fff auf großen Flächen.
- Kontraste mindestens WCAG AA.

**7.5 Animation und Interaktion**
- Dezent und funktional. Micro-Interaktionen 150–250 ms, Scroll-Einblendungen 400–700 ms, `ease-out` oder eigene `cubic-bezier`-Kurve.
- Nur `transform` und `opacity` animieren. Gestaffeltes, einmaliges Einblenden per `IntersectionObserver` (Versatz 8–24 px, Stagger 60–100 ms). Inhalte sind auch ohne JavaScript sichtbar.
- Hover-, `focus-visible`- und Active-Zustände für alle interaktiven Elemente.
- `prefers-reduced-motion` respektieren. Keine Parallax-Effekte, keine Endlosanimationen.

**7.6 Komponenten und Details**
- Einheitliche Eckenradien (1–2 Werte), Schatten (2–3 weiche Stufen) und Rahmen, alles als CSS-Variablen.
- Klare Button-Hierarchie (primär, sekundär, Textlink), Mindest-Klickfläche 44 × 44 px.
- Bilder mit `aspect-ratio` und `object-fit: cover`.
- Sorgfältige Details: mobile Navigation, Fokus-Rahmen, Formular-Zustände, Footer, gestaltete 404-Seite.

---

### 8. Team und Ablauf

#### Rollen

| Rolle | Aufgabe | Bekommt | Bekommt nicht |
|---|---|---|---|
| **Orchestrator (du)** | Bereitet vor, startet die Agenten, entscheidet bei Konflikten, kommuniziert mit mir | alles | – |
| **Agent 1: Design-Analyst** | Analysiert Referenzen per Screenshot, filtert sie nach Branchenpassung, entwickelt das Designkonzept | Abschnitte 1–4 und 7, Referenzen, `material/` | – |
| **Agent 2: Texter** | Schreibt alle finalen Texte und SEO-Texte | Abschnitte 1, 2, 4 und 6, `material/texte/`, Tonalität aus `design-brief.md` | Referenz-Screenshots |
| **Agent 3: Builder** | Baut die komplette Webseite nach Konzept und Texten, prüft sich per Screenshot selbst | Abschnitte 1, 2, 4–7, `design-brief.md`, `inhalte.md`, `material/`, Skripte | Referenz-Screenshots (verhindert Nachbauen) |
| **Agent 4: Design-Prüfer** | Prüft Gestaltung und Texte kritisch und unabhängig anhand eigener Screenshots | Abschnitte 1–4, 6, 7, `design-brief.md`, `inhalte.md`, Referenz-Screenshots, Code | Arbeitsnotizen und Begründungen des Builders |
| **Agent 5: Technik-Prüfer** | Prüft Performance, Barrierefreiheit, SEO, Funktion und Datenschutz-Technik mit automatisierten Tests | Abschnitte 2, 5 und 9, Code, Skripte | Arbeitsnotizen des Builders |

Jeder Agent erstellt die Screenshots und Testergebnisse, die er braucht, **selbst** mit den gemeinsamen Skripten aus Phase 0.

#### Phase 0: Vorbereitung (Orchestrator)

1. Fasse in 3 bis 5 Sätzen zusammen, wie du die Eckdaten verstanden hast. Sichte `material/` und liste, was vorhanden ist und was fehlt.
2. Werkzeuge einrichten:
   ```bash
   npm init -y
   npm install -D playwright @axe-core/playwright sharp html-validate lighthouse serve
   npx playwright install chromium
   ```
   Scheitert die Installation (z. B. fehlender Netzwerkzugriff), sag es mir sofort. Ohne diese Werkzeuge sind Prüfungen und Bildoptimierung nicht zuverlässig möglich, und ich entscheide, wie es weitergeht.
3. Lege das Screenshot-Skript als `_entwurf/screenshot.mjs` an:

   ```js
   // Aufruf: node _entwurf/screenshot.mjs <URL> <Zielordner> [Präfix]
   // Je Breite (360, 768, 1440 px): erster Bildschirm + ganze Seite in lesbaren Abschnitten.
   import { chromium } from 'playwright';
   import { mkdirSync } from 'node:fs';

   const [, , url, outDir, prefix = 'seite'] = process.argv;
   if (!url || !outDir) {
     console.error('Aufruf: node _entwurf/screenshot.mjs <URL> <Zielordner> [Präfix]');
     process.exit(1);
   }
   mkdirSync(outDir, { recursive: true });

   const breiten = [360, 768, 1440];
   const maxAbschnitte = 10;
   const browser = await chromium.launch();

   for (const breite of breiten) {
     const hoehe = breite < 768 ? 800 : 900;
     const page = await browser.newPage({ viewport: { width: breite, height: hoehe } });
     try {
       await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
     } catch {
       console.warn(`Hinweis: ${url} hat nicht vollständig geladen, Aufnahme erfolgt trotzdem.`);
     }
     await page.evaluate(async () => {
       for (let y = 0; y < document.body.scrollHeight; y += 500) {
         window.scrollTo(0, y);
         await new Promise((r) => setTimeout(r, 120));
       }
       window.scrollTo(0, 0);
     });
     await page.waitForTimeout(1000);

     await page.screenshot({ path: `${outDir}/${prefix}-${breite}-oben.png` });

     const gesamt = await page.evaluate(() => document.documentElement.scrollHeight);
     const abschnitt = hoehe * 1.5;
     for (let i = 0; i * abschnitt < gesamt && i < maxAbschnitte; i++) {
       await page.screenshot({
         path: `${outDir}/${prefix}-${breite}-teil-${i + 1}.png`,
         fullPage: true,
         clip: { x: 0, y: i * abschnitt, width: breite, height: Math.min(abschnitt, gesamt - i * abschnitt) },
       });
     }
     await page.close();
   }
   await browser.close();
   console.log(`Screenshots gespeichert in ${outDir}`);
   ```

4. Lege das Prüfskript als `_entwurf/qa.mjs` an:

   ```js
   // Aufruf: node _entwurf/qa.mjs <Basis-URL> <Berichtsdatei> [/seite1.html /seite2.html ...]
   // Prüft je Seite: externe Anfragen, Konsolenfehler, Barrierefreiheit (axe), defekte interne Links.
   import { chromium } from 'playwright';
   import AxeBuilder from '@axe-core/playwright';
   import { writeFileSync } from 'node:fs';

   const [, , baseUrl, out = '_entwurf/qa-bericht.json', ...pfade] = process.argv;
   if (!baseUrl) {
     console.error('Aufruf: node _entwurf/qa.mjs <Basis-URL> <Berichtsdatei> [Seiten ...]');
     process.exit(1);
   }
   const seiten = pfade.length ? pfade : ['/'];
   const host = new URL(baseUrl).host;
   const browser = await chromium.launch();
   const bericht = [];

   for (const pfad of seiten) {
     const page = await browser.newPage();
     const extern = new Set();
     const konsole = [];
     page.on('request', (r) => {
       try {
         const h = new URL(r.url()).host;
         if (h && h !== host) extern.add(h);
       } catch {}
     });
     page.on('console', (m) => { if (m.type() === 'error') konsole.push(m.text()); });
     page.on('pageerror', (e) => konsole.push(e.message));

     const res = await page.goto(new URL(pfad, baseUrl).href, { waitUntil: 'networkidle' });
     const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();

     const links = await page.$$eval('a[href]', (as) => as.map((a) => a.href));
     const kaputt = [];
     for (const link of [...new Set(links)]) {
       if (!link.startsWith('http') || new URL(link).host !== host) continue;
       const r = await page.request.get(link.split('#')[0]).catch(() => null);
       if (!r || r.status() >= 400) kaputt.push(link);
     }

     bericht.push({
       seite: pfad,
       status: res?.status(),
       externeAnfragen: [...extern],
       konsolenfehler: konsole,
       barrierefreiheit: axe.violations.map((v) => ({
         regel: v.id, schwere: v.impact, anzahl: v.nodes.length, hilfe: v.help,
       })),
       kaputteLinks: kaputt,
     });
     await page.close();
   }
   await browser.close();
   writeFileSync(out, JSON.stringify(bericht, null, 2));
   console.log(`QA-Bericht gespeichert in ${out}`);
   ```

5. Teste beide Skripte kurz. Lege die Ordner `_entwurf/referenzen/` und `_entwurf/screenshots/` an.
6. Stelle mir nur Rückfragen, die wirklich unverzichtbar sind (z. B. fehlender Versandweg fürs Formular). Triff sonst vernünftige Annahmen und nenne sie.

#### Phase 1: Designkonzept (Agent 1: Design-Analyst)

1. **Referenzen erfassen:** Für jede Referenz-URL `node _entwurf/screenshot.mjs <URL> _entwurf/referenzen/ref-<n>` ausführen und alle Aufnahmen ansehen, ebenso die Bilder in `material/referenzen/`. Verdecken Cookie-Banner wesentliche Teile, vermerke das und werte die sichtbaren Bereiche aus.
2. **Vorhandenes Material sichten:** Logo, Fotos und Firmenfarben in `material/` sind verbindlich. Das Konzept muss zu den echten Fotos passen (Licht, Farbwelt, Qualität).
3. **Branchenfilter anwenden:** Für jede Referenz eine Tabelle mit **Merkmal | übernehmen / anpassen / verwerfen | Begründung mit Bezug auf Branche, Zielgruppe und Hauptziel**. Beispiel: Stammt eine Referenz aus der Beratung, die Seite ist aber für einen Handwerksbetrieb, dann können Ruhe, Weißraum und Typo-Hierarchie passen, kühle Konzernfarben und abstrakte Stockfotos werden verworfen oder angepasst. Bei Negativ-Referenzen festhalten, was konkret vermieden wird.
4. **Eigenes Designkonzept entwickeln.** Die Stilrichtung ist nicht vorgegeben. Leite sie aus Branche, Zielgruppe, Hauptziel, Alleinstellungsmerkmal, Standort, vorhandenem Material und den gefilterten Referenz-Prinzipien ab.
5. Schreibe `_entwurf/design-brief.md` mit:
   - **Gestaltungsidee** in 2 bis 3 Sätzen: Was macht diese Seite unverwechselbar für genau dieses Unternehmen?
   - **Stimmung und Tonalität** (für Design und Texte) mit Begründung
   - Filtertabellen der Referenzen
   - konkrete **Schriften** (lokal einbindbar, mit Lizenzhinweis und Begründung) und Typo-Skala
   - **Farbpalette** mit Hex-Werten, Rollen und geprüften Kontrasten
   - Abstands-, Radius- und Schattenwerte
   - **Seitenstruktur** (alle Seiten) mit Layoutidee je Sektion, bewusst unterschiedliche Layouts
   - Bildsprache, Bildzuschnitte, Icon-Stil und Animationsprinzipien
   - Liste "Was diese Seite ausdrücklich nicht tun soll"

Der Orchestrator prüft das Briefing auf Stimmigkeit. **Wenn in Abschnitt 1 "Designkonzept vor dem Bauen freigeben lassen: ja" steht**, zeigst du mir jetzt eine kurze Zusammenfassung (Gestaltungsidee, Stimmung, Schriften, Farben, Seitenaufbau) und wartest auf meine Freigabe oder Änderungswünsche.

#### Phase 2: Texte (Agent 2: Texter)

1. Schreibe `_entwurf/inhalte.md` mit **allen finalen Texten** je Seite und Sektion: Überschriften, Fließtexte, Button-Texte, Formular-Beschriftungen und -Meldungen, Alt-Texte, 404-Text, Titles und Meta-Descriptions.
2. Regeln:
   - Ausschließlich Fakten aus Abschnitt 2 und `material/texte/`. Fehlendes als `[PLATZHALTER: ...]`.
   - Tonalität aus dem Design-Briefing. Ansprache: [Sie | du].
   - Konkret statt allgemein: Nutzen für die Zielgruppe, Ablauf, Einzugsgebiet, Besonderheiten. Keine Werbefloskeln aus 7.1.
   - Kurze Absätze, aussagekräftige Zwischenüberschriften, klare Handlungsaufrufe, die zur wichtigsten Handlung führen.
   - Suchbegriffe natürlich einbauen, kein Keyword-Stuffing.
   - Korrekte Rechtschreibung und deutsche Typografie.

#### Phase 3: Umsetzung (Agent 3: Builder)

1. Bilder aus `material/bilder/` mit `sharp` optimieren (Zuschnitt nach Briefing, AVIF und WebP in mehreren Breiten, Fallback-Format) und nach `assets/bilder/` legen. Schriften als WOFF2 nach `assets/fonts/`.
2. Baue die komplette Webseite nach `design-brief.md`, `inhalte.md` und den Abschnitten 4 bis 7. Alle Gestaltungswerte kommen als CSS-Variablen aus dem Briefing, alle Texte unverändert aus `inhalte.md`.
3. Lege Impressum, Datenschutzerklärung, 404-Seite, `sitemap.xml`, `robots.txt`, Favicon-Set, Web-Manifest und gegebenenfalls das Formular-Skript an.
4. Starte einen lokalen Server im Hintergrund: `npx serve -l 4173 .`
5. **Selbstkontrolle:** `node _entwurf/screenshot.mjs http://localhost:4173 _entwurf/screenshots/builder` für jede Seite ausführen, die Aufnahmen ansehen und offensichtliche Fehler sofort beheben. Zusätzlich `node _entwurf/qa.mjs http://localhost:4173 _entwurf/qa-builder.json [alle Seiten]` ausführen und gefundene Fehler beheben.
6. Abweichungen vom Briefing oder von `inhalte.md` begründest du in `_entwurf/abweichungen.md`.

#### Phase 4: Prüfung (Agent 4 und Agent 5, parallel)

**Agent 4: Design-Prüfer**
1. Stelle sicher, dass der Server läuft, und erstelle **eigene** Screenshots aller Seiten nach `_entwurf/screenshots/runde-<n>/`. Ergänze per Playwright Nahaufnahmen der geöffneten mobilen Navigation, eines Buttons im Hover- und Fokus-Zustand und des Formulars mit Fehlermeldung.
2. Sieh dir alle Aufnahmen an, vergleiche sie mit den Referenz-Screenshots, dem Briefing und `inhalte.md`, und lies den Code.
3. Bewerte streng (je 1 bis 5 Punkte, mit kurzer Begründung):

| Kategorie | Leitfrage |
|---|---|
| **Eigenständigkeit** | Wirkt die Seite individuell für dieses Unternehmen, oder könnte sie jedem gehören? Gibt es KI-Muster aus 7.1? |
| **Branchenpassung** | Passen Stimmung, Bildsprache und Tonalität zu Branche und Zielgruppe? Wurden Referenzen sinnvoll gefiltert statt übertragen? |
| **Gesamteindruck Agenturniveau** | Würde ein zahlender Kunde diese Seite ohne Nacharbeit abnehmen? |
| **Typografie** | Klare Hierarchie, gute Lesbarkeit, saubere Zeilenlängen und Umbrüche? |
| **Spacing und Layout** | Konsequentes Abstandssystem, Rhythmus, Ausrichtung, Abwechslung der Layouts? |
| **Farbe und Bild** | Stimmige Palette, gezielter Akzent, Bilder passend zugeschnitten und eingesetzt? |
| **Responsive** | Sauber auf allen drei Breiten, nichts gequetscht, überlappend oder abgeschnitten? |
| **Texte** | Konkret, glaubwürdig, zielgruppengerecht, fehlerfrei, ohne Floskeln? |
| **Zielerreichung** | Ist die wichtigste Handlung überall schnell erkennbar und erreichbar? |

Bericht nach `_entwurf/pruefung-design-runde-<n>.md`.

**Agent 5: Technik-Prüfer**
1. Führe aus:
   - `node _entwurf/qa.mjs http://localhost:4173 _entwurf/qa-runde-<n>.json [alle Seiten]`
   - `npx html-validate "**/*.html" --ignore "node_modules/**" --ignore "_entwurf/**"`
   - Lighthouse (mobil) für die Startseite und jede Hauptseite:
     ```bash
     CHROME_PATH=$(node -e "console.log(require('playwright').chromium.executablePath())") \
     npx lighthouse http://localhost:4173 --chrome-flags="--headless=new" \
       --only-categories=performance,accessibility,best-practices,seo \
       --output=json --output-path=_entwurf/lighthouse-runde-<n>.json --quiet
     ```
2. Prüfe zusätzlich manuell im Code: Formular (Validierung, Honeypot, Fehler- und Erfolgsfall, keine Header-Injection), Zwei-Klick-Lösungen, Impressum-Vollständigkeit nach § 5 DDG, Kennzeichnung der Datenschutzerklärung, Meta-Daten und JSON-LD, Sitemap, robots.txt, Favicons, 404-Seite, Tastaturbedienung der Navigation.
3. Bewerte jedes Abnahmekriterium aus Abschnitt 9 mit **erfüllt / nicht erfüllt** und begründe Abweichungen.

Bericht nach `_entwurf/pruefung-technik-runde-<n>.md`.

**Für beide Prüfer gilt:** Mängel als **priorisierte Liste** mit konkreten, umsetzbaren Änderungen (was, wo, wie), möglichst mit Verweis auf Screenshot, Datei oder Testergebnis. Allgemeine Kritik ohne Lösungsvorschlag ist nicht zulässig.

#### Phase 5: Überarbeitung (Schleife)

- Die Seite ist **bestanden**, wenn beim Design-Prüfer keine Kategorie unter 4 liegt und beim Technik-Prüfer alle Abnahmekriterien erfüllt sind.
- Andernfalls gibt der Orchestrator beide Mängellisten gemeinsam an einen Builder zur Umsetzung inklusive Selbstkontrolle. Danach prüfen **neue** Prüfer-Agenten mit frischem Kontext (Phase 4).
- **Höchstens 3 Prüfrunden.** Danach beendet der Orchestrator die Schleife und nennt mir die offenen Punkte.
- Widersprechen sich Prüfer, Briefing oder Texte, entscheidet der Orchestrator und begründet das kurz.

#### Phase 6: Abschluss (Orchestrator)

1. Beende den lokalen Server. Stelle sicher, dass die veröffentlichungsfähigen Dateien sauber vom Arbeitsmaterial getrennt sind: Erstelle einen Ordner `dist/`, der **nur** die hochzuladenden Dateien enthält (ohne `_entwurf/`, `material/`, `node_modules/`, `package.json`).
2. Liefere mir eine kurze Übersicht:
   1. Gestaltungsidee, Stimmung, Schriften und Farben in 2 bis 3 Sätzen
   2. Was aus den Referenzen übernommen, angepasst und verworfen wurde (Kurzfassung)
   3. Seitenaufbau
   4. Ergebnis der letzten Prüfung: Design-Punkte je Kategorie, Lighthouse-Werte, Status der Abnahmekriterien, Anzahl der Runden
   5. Bewusste Abweichungen und offene Punkte
   6. **Launch-Checkliste:** alle offenen Platzhalter, fehlende Bilder oder Daten, die rechtliche Prüfung von Impressum und Datenschutzerklärung, Einrichtung des Formular-Versands auf dem Server und alles, was ich vor dem Hochladen noch tun muss
   7. Pfade zu den finalen Screenshots und zum Ordner `dist/`

---

### 9. Abnahmekriterien (Definition von "fertig")

Die Seite gilt erst als fertig, wenn alle Punkte erfüllt sind (Ausnahme: offene Punkte, die nachweislich an fehlendem Material von mir liegen):

- [ ] Lighthouse mobil: **Performance ≥ 90**, **Barrierefreiheit ≥ 95**, **Best Practices ≥ 95**, **SEO ≥ 95**
- [ ] axe: **keine** Verstöße der Schwere "serious" oder "critical"
- [ ] **Keine externen Anfragen** beim Seitenaufruf (außer nach aktivem Klick bei Zwei-Klick-Inhalten)
- [ ] Keine Konsolenfehler, keine defekten internen Links
- [ ] HTML-Validierung ohne Fehler
- [ ] Alle Seiten sauber auf 360, 768 und 1440 px, keine horizontale Scrollleiste
- [ ] Vollständige Tastaturbedienung inklusive mobiler Navigation und Formular
- [ ] Jede Seite mit eigenem Title, Meta-Description, Canonical und Open-Graph-Daten; JSON-LD, Sitemap, robots.txt, Favicons und 404-Seite vorhanden
- [ ] Alle Bilder optimiert (AVIF/WebP, `srcset`, feste Maße), alle Schriften lokal
- [ ] Formular funktioniert inkl. Validierung, Spamschutz und Rückmeldungen (bzw. ist sauber vorbereitet, falls der Versandweg serverseitig noch einzurichten ist)
- [ ] Impressum mit allen gelieferten Pflichtangaben, Datenschutzerklärung deutlich als prüfpflichtig gekennzeichnet
- [ ] Keine erfundenen Fakten, alle Platzhalter in der Launch-Checkliste
- [ ] Design-Prüfung: keine Kategorie unter 4
