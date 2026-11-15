# Inhalte Malerwerk – finale Texte

Agent 2 (Texter), Phase 2. Grundlage: `PROMPT.md` Abschnitte 1, 2, 4, 6; `_entwurf/annahmen.md`; `_entwurf/design-brief.md` (Abschnitte 2, 10, 12, 13, 14).
Alle Texte sind final und werden vom Builder **unverändert** übernommen. Reihenfolge der Seiten und Sektionen folgt `design-brief.md` Abschnitt 12.

---

## 0. Konventionen für den Builder

- **Platzhalter:** `[PLATZHALTER: …]` wird als `<mark class="platzhalter">…</mark>` ausgegeben (Stil: design-brief 12.7). Der Text in der Klammer bleibt sichtbar stehen, bis echte Daten vorliegen.
- **Geschützte Leerzeichen:** Wo `&nbsp;` steht, wird genau dieses Entity ins HTML übernommen (z.&nbsp;B. „z.&nbsp;B.“, „§&nbsp;5“, „Art.&nbsp;6“). In `<title>`, Meta-Description und Open-Graph-Tags stehen **keine** Entities, dort normale Leerzeichen.
- **Telefonnummer:** überall `[PLATZHALTER: Telefonnummer]`; `href="tel:[PLATZHALTER: Telefonnummer im Format +49…]"`. Beim Einsetzen die Nummer mit geschützten Leerzeichen gliedern (z.&nbsp;B. `0123&nbsp;456789`).
- **E-Mail:** überall `[PLATZHALTER: E-Mail-Adresse]`; `href="mailto:[PLATZHALTER: E-Mail-Adresse]"`.
- **Domain:** `https://malerwerk.example` (Annahme 12) für Canonical und Open Graph.
- **Etiketten (Farbtonkarte):** werden per CSS in Versalien gesetzt (`text-transform: uppercase`). In dieser Datei in Normalschreibung notiert, damit Screenreader sie korrekt vorlesen.
- **Bildplatzhalter:** Je Platzhalter stehen hier
  - `Motiv (sichtbar):` – Text unten links in der Musterfläche, eingeleitet mit „Motiv:“ (max. ca. 36 Zeichen),
  - `aria-label:` – für `div.motiv__flaeche` (`role="img"`),
  - `Alt-Text (für das spätere Foto):` – wird beim Austausch gegen `<picture>` übernommen,
  - `Bildbeschriftung:` – nur wo eine sichtbare `figcaption`/Etikett-Zeile vorgesehen ist.
  Das Format-Etikett („Bild · 4:5“) erzeugt der Builder aus dem Seitenverhältnis.
- **Hinweise in eckigen Klammern mit „Builder:“** sind Anweisungen und werden **nicht** ausgegeben.
- **Vom Kunden zu bestätigen** (für die Launch-Checkliste, nicht ausgeben): Leistungsliste (Annahme 6), Ablauf (Startseite, Kontakt-Seitenspalte), Arbeitsweise (Über uns), Datenschutz- und Impressumsinhalte.

### Leistungen (Annahme 6 – vom Kunden zu bestätigen)

| Code | Name | Slug / Anker | Etikett-Farbe |
|---|---|---|---|
| MW-01 | Innenanstrich | `innenanstrich` | Kalkweiß |
| MW-02 | Tapezierarbeiten | `tapezierarbeiten` | Leinen |
| MW-03 | Fassade | `fassade` | Grünerde |
| MW-04 | Lackierarbeiten | `lackierarbeiten` | Ocker |
| MW-05 | Wandgestaltung | `wandgestaltung` | Grünerde hell |
| MW-06 | Bodenbeschichtung | `bodenbeschichtung` | Umbra |

---

## 1. Seitenübergreifende Elemente

### 1.1 Skip-Link
- Text: Zum Inhalt springen
- Ziel: `#inhalt` (auf `<main id="inhalt">`)

### 1.2 Header
- Logo-Link `aria-label`: Malerwerk – zur Startseite
- Wortmarke (sichtbar): MALERWERK
- Hauptnavigation `aria-label` (auf `<nav>`): Hauptnavigation
- Navigationspunkte (Reihenfolge):
  1. Leistungen → `leistungen.html`
  2. Arbeiten → `arbeiten.html`
  3. Über uns → `ueber-uns.html`
  4. Kontakt → `kontakt.html`
- Telefon-Textlink (≥ 1024&nbsp;px), sichtbar: [PLATZHALTER: Telefonnummer]
- Telefon-Textlink `aria-label`: Anrufen: [PLATZHALTER: Telefonnummer]
- Button primär: Anfrage senden → `kontakt.html#anfrage`

### 1.3 Mobilmenü (< 1024&nbsp;px)
- Menü-Button sichtbarer Text: Menü
- Menü-Button `aria-label` geschlossen: Menü öffnen
- Menü-Button `aria-label` geöffnet: Menü schließen
- Sichtbarer Text im geöffneten Zustand: Schließen
- Panel `aria-label`: Hauptmenü
- Links im Panel: wie Hauptnavigation (Leistungen, Arbeiten, Über uns, Kontakt)
- Unten im Panel:
  - Etikett: Direkt erreichen
  - Button sekundär: Anrufen → `tel:` (darunter kleine Zeile: [PLATZHALTER: Telefonnummer])
  - Button primär: Anfrage senden → `kontakt.html#anfrage`

### 1.4 Mobile Aktionsleiste (< 1024&nbsp;px, fest unten)
- `aria-label` (auf `<nav>` bzw. Container): Schnellkontakt
- Standard (alle Seiten außer Kontakt):
  - Links, Button sekundär: Anrufen → `tel:` · `aria-label`: Anrufen: [PLATZHALTER: Telefonnummer]
  - Rechts, Button primär: Anfrage senden → `kontakt.html#anfrage`
- Auf `kontakt.html`:
  - Links: Anrufen (wie oben)
  - Rechts, Button primär: Zum Formular → `#anfrage`

### 1.5 Abschlussband (Umbra) – Grundaufbau
Steht am Ende von Startseite, Leistungen, Arbeiten und Über uns. Die H2 und der Satz wechseln je Seite (siehe dort), der Rest ist gleich:
- Telefon (groß, `tel:`-Link): [PLATZHALTER: Telefonnummer]
- Zeile unter der Nummer (`--text-sm`): [PLATZHALTER: Erreichbarkeit, z.&nbsp;B. Wochentage und Uhrzeiten]
- Button primär: Anfrage senden → `kontakt.html#anfrage`
- Button sekundär: Anrufen → `tel:`

### 1.6 Footer
- Zone 1 (Marke):
  - Logo (wie Header, Link zur Startseite, `aria-label`: Malerwerk – zur Startseite)
  - Etikett/Unterzeile: Malerbetrieb · Musterstadt
  - Kurzsatz: Malerarbeiten innen und außen für Privatkunden in Musterstadt und Umgebung.
- Zone 2 (Kontakt):
  - Überschrift (H2, visuell klein): Kontakt
  - Telefon: [PLATZHALTER: Telefonnummer]
  - E-Mail: [PLATZHALTER: E-Mail-Adresse]
  - Adresse: [PLATZHALTER: Straße und Hausnummer], [PLATZHALTER: PLZ] Musterstadt
  - Erreichbarkeit: [PLATZHALTER: Erreichbarkeit]
- Zone 3 (Seiten):
  - Überschrift (H2, visuell klein): Seiten
  - Links: Startseite · Leistungen · Arbeiten · Über uns · Kontakt
  - `<nav>`-`aria-label`: Seiten im Footer
- Zone 4 (Rechtliches):
  - Überschrift (H2, visuell klein): Rechtliches
  - Links: Impressum · Datenschutz
  - `<nav>`-`aria-label`: Rechtliches
- Copyright-Zeile: © [PLATZHALTER: Jahr] Malerwerk

### 1.7 Open-Graph-Standard (alle Seiten)
- `og:site_name`: Malerwerk
- `og:locale`: de_DE
- `og:type`: website
- `og:image`: `https://malerwerk.example/assets/bilder/og-malerwerk.jpg` (1200 × 630)
- `og:image:alt`: Malerwerk – Malerbetrieb in Musterstadt. Wortmarke und Streifenmarke auf hellem Grund neben einem grünen Farbfeld.
- `twitter:card`: summary_large_image (Titel/Beschreibung wie Open Graph)

---

## 2. Startseite (`index.html`)

### SEO
- Title (47 Zeichen): Maler in Musterstadt – Malerwerk | Malerbetrieb
- Meta-Description (155 Zeichen): Maler in Musterstadt: Malerwerk streicht Wände, Decken und Fassaden, tapeziert und lackiert. Erst die Besichtigung vor Ort, dann ein schriftliches Angebot.
- OG-Titel: Malerwerk – Malerbetrieb in Musterstadt
- OG-Beschreibung: Innenanstrich, Tapezierarbeiten, Fassade und Lackierarbeiten für Privatkunden in Musterstadt und Umgebung. Besichtigung vor Ort, Angebot schriftlich.
- Canonical: `https://malerwerk.example/`

### 2.1 Hero – „Musterfläche“
- Etikett: Malerbetrieb in Musterstadt
- H1: Streichen, tapezieren, lackieren – in Musterstadt
- Lead: Malerwerk übernimmt Malerarbeiten in Wohnungen, Häusern und an Fassaden in Musterstadt und Umgebung. Wir sehen uns Ihre Räume vor Ort an und schicken Ihnen danach ein schriftliches Angebot. Bevor gestrichen wird, decken wir ab und kleben ab.
- Button primär: Anfrage senden → `kontakt.html#anfrage`
- Button sekundär: Anrufen: [PLATZHALTER: Telefonnummer] → `tel:`
- Zeile darunter (`--text-sm`, Umbra 70): [PLATZHALTER: Alleinstellungsmerkmal in einem Satz, z.&nbsp;B. Meisterbetrieb oder Gründungsjahr – nur wenn belegt]
- Bild 4:5 (mobil 4:3):
  - Motiv (sichtbar): Frisch gestrichenes Wohnzimmer
  - aria-label: Bildplatzhalter: Frisch gestrichenes, leeres Wohnzimmer im Tageslicht mit gerader Farbkante an der Decke
  - Alt-Text (für das spätere Foto): Frisch gestrichenes, leeres Wohnzimmer bei Tageslicht – die Wand in einem gedeckten Grünton, darüber eine gerade Kante zur weißen Decke.
  - Bildbeschriftung (Etikett unter dem Bild): MW-01 · Innenanstrich

### 2.2 Leistungsindex
- Etikett: Leistungen
- H2: Was wir für Sie streichen, tapezieren und lackieren
- Text: Von der einzelnen Wand bis zur ganzen Fassade. Wählen Sie eine Leistung, um zu sehen, was dazugehört und wie wir vorgehen.
- Textlink: Alle Leistungen im Detail → `leistungen.html`
- Liste (je Zeile ganz als Link auf `leistungen.html#<slug>`; Code als Etikett, Name als H3, ein Satz):
  1. MW-01 · H3: Innenanstrich – Text: Wände und Decken in Wohnräumen, Fluren und Treppenhäusern, gleichmäßig und mit sauberen Kanten. → `#innenanstrich`
  2. MW-02 · H3: Tapezierarbeiten – Text: Alte Tapeten entfernen, Untergrund glätten, neue Tapete Bahn für Bahn auf Stoß kleben. → `#tapezierarbeiten`
  3. MW-03 · H3: Fassade – Text: Außenwände reinigen, Risse ausbessern und mit wetterbeständiger Fassadenfarbe neu streichen. → `#fassade`
  4. MW-04 · H3: Lackierarbeiten – Text: Türen, Zargen, Fensterrahmen, Heizkörper und Geländer schleifen und neu lackieren. → `#lackierarbeiten`
  5. MW-05 · H3: Wandgestaltung – Text: Spachteltechnik, Lasur oder Kalkputz für Wände mit sichtbarer Struktur. → `#wandgestaltung`
  6. MW-06 · H3: Bodenbeschichtung – Text: Beschichtung für Keller-, Garagen- und Nutzböden, die sich leichter reinigen lassen. → `#bodenbeschichtung`
- Link-`aria-label` je Zeile (falls der Linktext sonst zu lang wird): z.&nbsp;B. „Innenanstrich – mehr erfahren“ (analog für alle sechs)

### 2.3 Ablauf als Schichtaufbau
- Etikett: So läuft es ab
- H2: Von Ihrer Anfrage bis zur fertigen Wand
- Einleitungssatz (optional, unter der H2): Jeder Auftrag folgt denselben Schritten. So wissen Sie vorher, was als Nächstes passiert.
- Bänder (Nummer groß, H3, ein Satz):
  1. 01 · H3: Anfrage – Text: Sie schreiben uns über das Formular oder rufen an und schildern kurz, was gemacht werden soll.
  2. 02 · H3: Rückruf und Besichtigung – Text: Wir melden uns, klären offene Fragen und sehen uns Räume oder Fassade bei Ihnen vor Ort an.
  3. 03 · H3: Schriftliches Angebot – Text: Sie erhalten ein schriftliches Angebot mit allen besprochenen Arbeiten und entscheiden in Ruhe.
  4. 04 · H3: Ausführung – Text: Wir decken ab, bereiten den Untergrund vor, streichen und räumen danach wieder auf.
  5. 05 · H3: Abnahme – Text: Zum Schluss gehen wir gemeinsam durch die Räume und sehen uns das Ergebnis an.
- [Builder: Fünf Bänder; Farbfolge Kalk → Grünerde hell → Grünerde hell → Grünerde → Umbra oder nach Briefing verteilen.]

### 2.4 Sorgfalt – großes Querbild mit Textpanel
- Bild 21:9 (mobil 4:3):
  - Motiv (sichtbar): Abgedeckter Raum vor dem Streichen
  - aria-label: Bildplatzhalter: Raum vor dem Streichen – Boden mit Malervlies abgedeckt, Möbel in Folie, Fenster und Steckdosen abgeklebt
  - Alt-Text (für das spätere Foto): Wohnraum vor dem Anstrich: Der Boden ist mit Malervlies abgedeckt, die Möbel stehen in der Raummitte unter Folie, Fensterrahmen und Steckdosen sind abgeklebt.
- Panel:
  - Etikett: Vorbereitung
  - H2: Erst schützen, dann streichen
  - Text (Absatz 1): Ein guter Anstrich beginnt lange vor der ersten Rolle. Wir decken Böden ab, schützen Möbel mit Folie und kleben Fensterrahmen, Leisten und Steckdosen ab.
  - Text (Absatz 2): Danach prüfen wir den Untergrund: Löcher und Risse werden gespachtelt, saugende Flächen grundiert – damit die Farbe gleichmäßig hält. Nach der Arbeit nehmen wir Abdeckung und Klebeband wieder mit.
  - Textlink: So arbeiten wir → `ueber-uns.html#arbeitsweise`

### 2.5 Arbeiten-Vorschau
- Etikett: Arbeiten
- H2: Arbeiten aus Musterstadt und Umgebung
- Text: Fertige Räume, Fassaden und Details aus der Nähe – so sieht unsere Arbeit aus.
- Textlink: Alle Arbeiten ansehen → `arbeiten.html`
- Bild groß 3:2:
  - Motiv (sichtbar): Neu gestrichene Hausfassade
  - aria-label: Bildplatzhalter: Neu gestrichene Fassade eines Wohnhauses bei Tageslicht
  - Alt-Text (für das spätere Foto): Neu gestrichene Fassade eines Wohnhauses in [PLATZHALTER: Ort] bei Tageslicht, mit sauber abgesetztem Sockel und Fensterlaibungen.
  - Bildbeschriftung (Etikett): MW-03 · Fassade
- Bild klein 4:5:
  - Motiv (sichtbar): Kante zwischen zwei Farbtönen
  - aria-label: Bildplatzhalter: Nahaufnahme einer geraden Kante zwischen zwei Wandfarben
  - Alt-Text (für das spätere Foto): Nahaufnahme einer Wand: Ein gedeckter Grünton trifft an einer geraden, scharfen Kante auf hellen Kalkton.
  - Bildbeschriftung (Etikett): Detail · Farbkante

### 2.6 Einzugsgebiet
- Etikett: Einzugsgebiet
- H2: In Musterstadt und Umgebung unterwegs
- Text: Wir arbeiten in Musterstadt und den Orten im Umkreis. Ihr Ort ist nicht dabei? Fragen Sie trotzdem an – wir sagen Ihnen ehrlich, ob wir den Auftrag übernehmen können.
- Ortsliste (Inline-Liste mit Mittelpunkten): Musterstadt · [PLATZHALTER: weitere Orte im Einzugsgebiet]
- Textlink (Kalk): Anfrage für Ihren Ort senden → `kontakt.html#anfrage`
- Ortsname groß (rechts, mit `map-pin`): Musterstadt
- [Builder: Ortsname groß ist dekorativ-typografisch; als `<p>` mit `aria-hidden="true"`, da „Musterstadt“ bereits in H2 und Liste steht.]

### 2.7 Abschlussband
- H2: Welche Räume sollen neu gestrichen werden?
- Text: Beschreiben Sie kurz Ihr Vorhaben. Wir melden uns und vereinbaren einen Termin zur Besichtigung.
- Telefon, Erreichbarkeit, Buttons: wie 1.5

---

## 3. Leistungen (`leistungen.html`)

### SEO
- Title (58 Zeichen): Leistungen: Innenanstrich, Tapezieren, Fassade | Malerwerk
- Meta-Description (142 Zeichen): Innenanstrich, Tapezierarbeiten, Fassade streichen, Lackierarbeiten, Wandgestaltung und Bodenbeschichtung in Musterstadt – Ablauf und Anfrage.
- OG-Titel: Leistungen von Malerwerk in Musterstadt
- OG-Beschreibung: Was zu Innenanstrich, Tapezierarbeiten, Fassade, Lackierarbeiten, Wandgestaltung und Bodenbeschichtung gehört – und wie Sie anfragen.
- Canonical: `https://malerwerk.example/leistungen.html`

### 3.1 Seitenkopf
- Etikett: Leistungen
- H1: Malerarbeiten innen und außen
- Intro: Hier finden Sie alle Leistungen von Malerwerk auf einen Blick. Zu jeder Leistung steht, was dazugehört und wie wir vorgehen. Den genauen Umfang besprechen wir bei der Besichtigung.
- Sprungleiste `aria-label` (auf `<nav>`): Leistungen auf dieser Seite
- Sprungleiste Chips:
  - MW-01 Innenanstrich → `#innenanstrich`
  - MW-02 Tapezierarbeiten → `#tapezierarbeiten`
  - MW-03 Fassade → `#fassade`
  - MW-04 Lackierarbeiten → `#lackierarbeiten`
  - MW-05 Wandgestaltung → `#wandgestaltung`
  - MW-06 Bodenbeschichtung → `#bodenbeschichtung`

### 3.2 Leistungsabschnitte MW-01 bis MW-06

#### MW-01 Innenanstrich (`id="innenanstrich"`)
- Etikett: MW-01 · Innenanstrich
- H2: Innenanstrich für Wände und Decken
- Text: Ob nach dem Umzug, vor der Wohnungsübergabe oder weil das Kinderzimmer eine neue Farbe bekommen soll: Wir streichen Wände und Decken in Wohnräumen, Fluren und Treppenhäusern. Vorher werden Böden und Möbel abgedeckt und Kanten abgeklebt. Kleine Löcher und Risse spachteln wir, damit die Fläche nach dem Anstrich glatt wirkt.
- H3 (Listenüberschrift): Dazu gehört
- Liste:
  - Boden, Möbel und Fenster abdecken
  - Löcher und Risse spachteln und schleifen
  - Untergrund grundieren, wo nötig
  - Wände und Decken streichen
  - Abdeckung entfernen und aufräumen
- Textlink: Diese Leistung anfragen → `kontakt.html?leistung=innenanstrich#anfrage`
- Bild 3:2:
  - Motiv (sichtbar): Wand wird mit der Rolle gestrichen
  - aria-label: Bildplatzhalter: Malerin oder Maler streicht eine Wohnzimmerwand mit der Rolle, Boden abgedeckt
  - Alt-Text (für das spätere Foto): Eine Wohnzimmerwand wird mit der Farbrolle gestrichen, der Boden darunter ist mit Malervlies abgedeckt.

#### MW-02 Tapezierarbeiten (`id="tapezierarbeiten"`)
- Etikett: MW-02 · Tapezierarbeiten
- H2: Tapezieren – vom Untergrund bis zur letzten Bahn
- Text: Eine Tapete sieht nur so gut aus wie die Wand darunter. Deshalb entfernen wir zuerst alte Tapeten und Kleberreste und glätten den Untergrund. Danach kleben wir die neue Tapete Bahn für Bahn – auf Stoß und mit passendem Muster. Ob Raufaser, Vliestapete oder Mustertapete: Wir beraten Sie bei der Besichtigung.
- H3 (Listenüberschrift): Dazu gehört
- Liste:
  - Alte Tapeten und Kleberreste entfernen
  - Wand spachteln und glätten
  - Neue Tapete zuschneiden und kleben
  - Muster an den Stößen anpassen
  - Tapete auf Wunsch überstreichen
- Textlink: Diese Leistung anfragen → `kontakt.html?leistung=tapezierarbeiten#anfrage`
- Bild 3:2:
  - Motiv (sichtbar): Tapetenbahn wird angesetzt
  - aria-label: Bildplatzhalter: Eine Tapetenbahn wird an der Wand angesetzt und glatt gestrichen
  - Alt-Text (für das spätere Foto): Eine neue Tapetenbahn wird an der Wand angesetzt und mit der Tapezierbürste glatt gestrichen, daneben die bereits geklebte Bahn.

#### MW-03 Fassade (`id="fassade"`) – Grünerde-Band, Text Kalk
- Etikett: MW-03 · Fassade
- H2: Fassade streichen und ausbessern
- Text (links): Sonne, Regen und Frost setzen jeder Fassade zu. Abblätternde Farbe, Risse oder grüner Belag sind ein Zeichen, dass ein neuer Anstrich fällig ist. Wir prüfen den Zustand der Außenwände, reinigen sie, bessern Schäden aus und streichen mit Fassadenfarbe für außen. Fenster, Türen und Pflanzen werden vorher geschützt.
- H3 (Listenüberschrift, rechts): Dazu gehört
- Liste (rechts):
  - Zustand von Putz und Anstrich prüfen
  - Fassade reinigen
  - Risse und Putzschäden ausbessern
  - Grundieren und Fassadenfarbe auftragen
  - Sockel, Laibungen und Gesimse absetzen
- Textlink (Kalk): Diese Leistung anfragen → `kontakt.html?leistung=fassade#anfrage`
- Bild 21:9 (oben, über Containerbreite):
  - Motiv (sichtbar): Wohnhaus nach dem Fassadenanstrich
  - aria-label: Bildplatzhalter: Wohnhaus mit frisch gestrichener Fassade
  - Alt-Text (für das spätere Foto): Wohnhaus mit frisch gestrichener, heller Fassade bei Tageslicht; Sockel und Fensterlaibungen sind in einem dunkleren Ton abgesetzt.
- [Builder: Hinweis zum Gerüst bewusst nicht im Text – ob Malerwerk Gerüste stellt, ist nicht bekannt.]

#### MW-04 Lackierarbeiten (`id="lackierarbeiten"`)
- Etikett: MW-04 · Lackierarbeiten
- H2: Lackierarbeiten an Türen, Fenstern und Heizkörpern
- Text: Abgegriffene Türen, vergilbte Heizkörper oder ein verwitterter Fensterrahmen wirken schnell wie neu, wenn sie frisch lackiert sind. Wir schleifen die Flächen an, füllen Macken und tragen den Lack in dünnen Schichten auf. Das gilt für Holz ebenso wie für Metall.
- H3 (Listenüberschrift): Dazu gehört
- Liste:
  - Türen, Zargen und Fensterrahmen lackieren
  - Heizkörper und Rohre lackieren
  - Geländer und Metallteile lackieren
  - Altanstrich anschleifen, Macken füllen
  - Lack in mehreren dünnen Schichten auftragen
- Textlink: Diese Leistung anfragen → `kontakt.html?leistung=lackierarbeiten#anfrage`
- Bild 3:2:
  - Motiv (sichtbar): Türzarge wird lackiert
  - aria-label: Bildplatzhalter: Eine Türzarge wird mit dem Pinsel lackiert, die Wand daneben ist abgeklebt
  - Alt-Text (für das spätere Foto): Nahaufnahme einer Türzarge, die mit einem feinen Pinsel weiß lackiert wird; die angrenzende Wand ist mit Klebeband abgeklebt.

#### MW-05 Wandgestaltung (`id="wandgestaltung"`) – drei 1:1-Musterflächen
- Etikett: MW-05 · Wandgestaltung
- H2: Wandgestaltung mit Struktur
- Text: Nicht jede Wand muss einfarbig glatt sein. Mit Spachteltechnik, Lasur oder Kalkputz bekommt eine Fläche Tiefe und eine spürbare Oberfläche – etwa im Wohnzimmer, im Flur oder hinter dem Bett. Welche Technik zu Ihrem Raum passt, zeigen wir Ihnen an Mustern.
- H3 (Listenüberschrift): Dazu gehört
- Liste:
  - Beratung mit Mustern vor Ort
  - Spachteltechnik für glatte, feine Flächen
  - Lasuren für lebendige Farbwirkung
  - Kalkputz für matte, mineralische Wände
  - Akzentwände und abgesetzte Flächen
- Textlink: Diese Leistung anfragen → `kontakt.html?leistung=wandgestaltung#anfrage`
- Musterfläche 1 (1:1):
  - Motiv (sichtbar): Kalkputz
  - aria-label: Bildplatzhalter: Nahaufnahme einer Wand mit mattem, leicht wolkigem Kalkputz
  - Alt-Text (für das spätere Foto): Nahaufnahme einer Wand mit mattem Kalkputz in einem warmen Naturton, die Oberfläche leicht wolkig.
  - Bildbeschriftung: Kalkputz
- Musterfläche 2 (1:1):
  - Motiv (sichtbar): Spachteltechnik
  - aria-label: Bildplatzhalter: Nahaufnahme einer Spachteltechnik mit feinen, glänzenden Zügen
  - Alt-Text (für das spätere Foto): Nahaufnahme einer gespachtelten Wandfläche mit feinen, leicht glänzenden Spachtelzügen.
  - Bildbeschriftung: Spachteltechnik
- Musterfläche 3 (1:1):
  - Motiv (sichtbar): Lasur
  - aria-label: Bildplatzhalter: Nahaufnahme einer lasierten Wand mit sichtbaren Pinselspuren in zwei Tönen
  - Alt-Text (für das spätere Foto): Nahaufnahme einer lasierten Wand, auf der zwei ähnliche Farbtöne ineinander übergehen.
  - Bildbeschriftung: Lasur

#### MW-06 Bodenbeschichtung (`id="bodenbeschichtung"`)
- Etikett: MW-06 · Bodenbeschichtung
- H2: Bodenbeschichtung für Keller und Garage
- Text: Unbehandelter Estrich oder Beton staubt, nimmt Flecken auf und lässt sich schlecht reinigen. Eine Bodenbeschichtung schließt die Oberfläche. Wir reinigen den Boden gründlich, schleifen ihn an, grundieren und tragen die Beschichtung auf. Danach braucht der Boden Zeit zum Aushärten, bevor er wieder belastet wird.
- H3 (Listenüberschrift): Dazu gehört
- Liste:
  - Boden reinigen und anschleifen
  - Risse und Ausbrüche ausbessern
  - Grundierung auftragen
  - Beschichtung auftragen
  - Sockel und Wandanschlüsse absetzen
- Textlink: Diese Leistung anfragen → `kontakt.html?leistung=bodenbeschichtung#anfrage`
- Bild 3:2:
  - Motiv (sichtbar): Beschichteter Kellerboden
  - aria-label: Bildplatzhalter: Frisch beschichteter, grauer Kellerboden mit abgesetztem Sockel
  - Alt-Text (für das spätere Foto): Frisch beschichteter Kellerboden in Grau, gleichmäßig matt glänzend, mit sauber abgesetztem Sockel an der Wand.

### 3.3 Hinweis Angebot
- Etikett: Angebot
- H2: Angebot nach Besichtigung
- Text: Wie viel Arbeit in einem Raum oder an einer Fassade steckt, hängt vom Untergrund, von der Fläche und vom gewünschten Ergebnis ab. Deshalb sehen wir uns alles zuerst vor Ort an. Danach erhalten Sie ein schriftliches Angebot.
- Button primär: Anfrage senden → `kontakt.html#anfrage`
- Button sekundär: Anrufen → `tel:`

### 3.4 Abschlussband
- H2: Sie wissen schon, was gemacht werden soll?
- Text: Dann schreiben Sie uns kurz, um welche Räume oder Flächen es geht. Wir melden uns für einen Termin.
- Telefon, Erreichbarkeit, Buttons: wie 1.5

---

## 4. Arbeiten (`arbeiten.html`)

### SEO
- Title (49 Zeichen): Arbeiten & Referenzen aus Musterstadt | Malerwerk
- Meta-Description (147 Zeichen): Arbeiten von Malerwerk in Musterstadt und Umgebung: fertige Räume, Fassaden und Details sowie Vorher-Nachher-Vergleiche. Fragen Sie Ihr Projekt an.
- OG-Titel: Arbeiten von Malerwerk – Musterstadt und Umgebung
- OG-Beschreibung: Fertige Räume, Fassaden, Details und Vorher-Nachher-Vergleiche aus Musterstadt und Umgebung.
- Canonical: `https://malerwerk.example/arbeiten.html`

### 4.1 Seitenkopf
- Etikett: Arbeiten
- H1: Arbeiten aus Musterstadt und Umgebung
- Intro: Hier zeigen wir ausgewählte Aufträge – fertige Räume, Fassaden und Details aus der Nähe. Bei Vorher-Nachher-Bildern ist jeweils dieselbe Stelle aus gleicher Position fotografiert. So sehen Sie, was sich verändert hat.
- Hinweis rechts unten (Etikett-Stil): [PLATZHALTER: Referenzprojekte mit Fotos und Freigabe der Kunden]

### 4.2 Projektblatt 1
- Bild 3:2:
  - Motiv (sichtbar): Fertig gestrichener Wohnraum
  - aria-label: Bildplatzhalter: Hauptbild Projekt 1 – fertig gestrichener Wohnraum bei Tageslicht
  - Alt-Text (für das spätere Foto): [PLATZHALTER: Beschreibung des Fotos, z.&nbsp;B. Raum, Farbton, Blickrichtung]
- Datenblatt (`<dl>`, Farbstreifen oben in Projektfarbe):
  - Etikett: Projekt 01
  - Ort: [PLATZHALTER: Ort]
  - Leistung: [PLATZHALTER: Leistung]
  - Umfang: [PLATZHALTER: Umfang, z.&nbsp;B. Räume oder Fläche]
  - Farbton: [PLATZHALTER: Farbton]
- H2: [PLATZHALTER: Projekttitel, z.&nbsp;B. „Altbauwohnung, neu gestrichen“]
- Text: [PLATZHALTER: zwei bis drei Sätze zu Ausgangslage, ausgeführten Arbeiten und Ergebnis]

### 4.3 Projektblatt 2 – Vorher/Nachher
- Etikett (über dem Paar, optional): Projekt 02 · Vorher und nachher
- Bild links 4:5:
  - Etikett auf dem Bild: Vorher
  - Motiv (sichtbar): Wand vor der Renovierung
  - aria-label: Bildplatzhalter: Vorher – Wand mit Rissen, Flecken und alter Tapete
  - Alt-Text (für das spätere Foto): Vorher: [PLATZHALTER: Zustand vor der Arbeit, z.&nbsp;B. Wand mit Rissen und alter Tapete]
- Bild rechts 4:5:
  - Etikett auf dem Bild: Nachher
  - Motiv (sichtbar): Dieselbe Wand nach der Arbeit
  - aria-label: Bildplatzhalter: Nachher – dieselbe Wand aus gleicher Position, glatt und frisch gestrichen
  - Alt-Text (für das spätere Foto): Nachher: [PLATZHALTER: Zustand nach der Arbeit, gleiche Position wie das Vorher-Bild]
- Datenblatt (quer, vier Spalten): Ort: [PLATZHALTER: Ort] · Leistung: [PLATZHALTER: Leistung] · Umfang: [PLATZHALTER: Umfang] · Farbton: [PLATZHALTER: Farbton]
- H2: [PLATZHALTER: Projekttitel]
- Text: [PLATZHALTER: zwei bis drei Sätze zu Ausgangslage, ausgeführten Arbeiten und Ergebnis]

### 4.4 Projektblatt 3 (gespiegelt)
- Datenblatt (links):
  - Etikett: Projekt 03
  - Ort: [PLATZHALTER: Ort]
  - Leistung: [PLATZHALTER: Leistung]
  - Umfang: [PLATZHALTER: Umfang]
  - Farbton: [PLATZHALTER: Farbton]
- H2: [PLATZHALTER: Projekttitel]
- Text: [PLATZHALTER: zwei bis drei Sätze zu Ausgangslage, ausgeführten Arbeiten und Ergebnis]
- Hauptbild 3:2:
  - Motiv (sichtbar): Treppenhaus nach dem Anstrich
  - aria-label: Bildplatzhalter: Hauptbild Projekt 3 – frisch gestrichenes Treppenhaus mit lackiertem Geländer
  - Alt-Text (für das spätere Foto): [PLATZHALTER: Beschreibung des Fotos]
- Detailbild 1 (4:5):
  - Motiv (sichtbar): Lackiertes Treppengeländer
  - aria-label: Bildplatzhalter: Detail – frisch lackiertes Treppengeländer
  - Alt-Text (für das spätere Foto): [PLATZHALTER: Beschreibung des Detailfotos]
- Detailbild 2 (4:5):
  - Motiv (sichtbar): Kante an der Treppenwange
  - aria-label: Bildplatzhalter: Detail – gerade Farbkante zwischen Wand und Treppenwange
  - Alt-Text (für das spätere Foto): [PLATZHALTER: Beschreibung des Detailfotos]
- [Builder: Die Motivbeschreibungen der Projekte 1 und 3 sind Vorschläge für die Bildauswahl, keine Projektaussagen. Sie werden durch die echten Motive ersetzt.]

### 4.5 Abschlussband
- H2: Soll Ihr Projekt das nächste sein?
- Text: Erzählen Sie uns, was Sie vorhaben. Wir sehen es uns vor Ort an und schicken Ihnen ein Angebot.
- Telefon, Erreichbarkeit, Buttons: wie 1.5

---

## 5. Über uns (`ueber-uns.html`)

### SEO
- Title (50 Zeichen): Über uns – Malerbetrieb in Musterstadt | Malerwerk
- Meta-Description (153 Zeichen): Malerwerk ist ein Malerbetrieb in Musterstadt. So arbeiten wir: klare Absprache vorab, Schutz Ihrer Wohnung, gründliche Vorbereitung, gemeinsame Abnahme.
- OG-Titel: Über Malerwerk – Malerbetrieb in Musterstadt
- OG-Beschreibung: Wer hinter Malerwerk steht und wie wir arbeiten: Absprache, Schutz Ihrer Wohnung, Vorbereitung des Untergrunds und gemeinsame Abnahme.
- Canonical: `https://malerwerk.example/ueber-uns.html`

### 5.1 Seitenkopf
- Etikett: Über uns
- H1: Malerwerk – Malerbetrieb in Musterstadt
- Lead: Wer zu Ihnen nach Hause kommt, sollte vorher bekannt sein. Hier erfahren Sie, wer hinter Malerwerk steht und wie wir arbeiten – vom ersten Gespräch bis zur Abnahme.
- Querbild 21:9 (mobil 4:3):
  - Motiv (sichtbar): Das Team bei der Arbeit
  - aria-label: Bildplatzhalter: Das Team von Malerwerk bei der Arbeit in einem hellen, abgedeckten Raum
  - Alt-Text (für das spätere Foto): [PLATZHALTER: Beschreibung des Teamfotos, z.&nbsp;B. wer zu sehen ist und bei welcher Arbeit]

### 5.2 Der Betrieb
- Etikett (Randnotiz links): Der Betrieb
- H2: Wer hinter Malerwerk steht
- Text (Absatz 1): Malerwerk ist ein Malerbetrieb aus Musterstadt. Wir arbeiten für Privatkunden – in Wohnungen, Häusern, Treppenhäusern und an Fassaden.
- Text (Absatz 2): [PLATZHALTER: Geschichte des Betriebs, Inhaberin oder Inhaber, Qualifikation (z.&nbsp;B. Meistertitel) – zwei bis vier Sätze, nur belegte Angaben]
- Text (Absatz 3): [PLATZHALTER: Alleinstellungsmerkmal – was Malerwerk von anderen Betrieben unterscheidet]

### 5.3 Arbeitsweise (`id="arbeitsweise"`)
- Etikett: Arbeitsweise
- H2: So arbeiten wir bei Ihnen zu Hause
- Liste (Nummer, H3, zwei Sätze):
  1. 01 · H3: Erst reden, dann streichen – Text: Bevor wir anfangen, klären wir mit Ihnen Farbtöne, Umfang und Ablauf. Was besprochen ist, steht im schriftlichen Angebot.
  2. 02 · H3: Ihre Wohnung wird geschützt – Text: Böden, Möbel und Fenster decken wir ab, Kanten und Steckdosen kleben wir ab. Was nicht gestrichen werden soll, bleibt sauber.
  3. 03 · H3: Der Untergrund kommt zuerst – Text: Wir prüfen Wände und Flächen und bereiten sie vor: spachteln, schleifen, grundieren. Erst dann wird gestrichen, tapeziert oder lackiert.
  4. 04 · H3: Aufräumen und gemeinsame Abnahme – Text: Nach der Arbeit entfernen wir Abdeckung und Klebeband und nehmen unser Material mit. Zum Schluss sehen wir uns das Ergebnis gemeinsam mit Ihnen an.

### 5.4 Team
- Etikett: Team
- H2: Die Menschen, die zu Ihnen kommen
- Text: [PLATZHALTER: kurze Vorstellung des Teams – Namen, Aufgaben und Qualifikationen, nur mit Einverständnis der Personen]
- Porträt groß 4:5:
  - Motiv (sichtbar): Porträt bei der Arbeit
  - aria-label: Bildplatzhalter: Porträt einer Person aus dem Team bei der Arbeit
  - Alt-Text (für das spätere Foto): [PLATZHALTER: Name und Tätigkeit der abgebildeten Person]
  - Bildbeschriftung: [PLATZHALTER: Name · Funktion]
- Porträt klein 1 (4:5):
  - Motiv (sichtbar): Porträt bei der Arbeit
  - aria-label: Bildplatzhalter: Porträt einer weiteren Person aus dem Team
  - Alt-Text (für das spätere Foto): [PLATZHALTER: Name und Tätigkeit der abgebildeten Person]
  - Bildbeschriftung: [PLATZHALTER: Name · Funktion]
- Porträt klein 2 (4:5):
  - Motiv (sichtbar): Porträt bei der Arbeit
  - aria-label: Bildplatzhalter: Porträt einer weiteren Person aus dem Team
  - Alt-Text (für das spätere Foto): [PLATZHALTER: Name und Tätigkeit der abgebildeten Person]
  - Bildbeschriftung: [PLATZHALTER: Name · Funktion]

### 5.5 Einzugsgebiet (kompakt)
- Etikett: Einzugsgebiet
- H2: Wir arbeiten in Musterstadt und Umgebung
- Ortsliste: Musterstadt · [PLATZHALTER: weitere Orte im Einzugsgebiet]
- Textlink (Kalk): Anfrage für Ihren Ort senden → `kontakt.html#anfrage`

### 5.6 Abschlussband
- H2: Sollen wir uns Ihre Räume ansehen?
- Text: Schreiben Sie uns oder rufen Sie an. Wir vereinbaren einen Termin zur Besichtigung.
- Telefon, Erreichbarkeit, Buttons: wie 1.5

---

## 6. Kontakt (`kontakt.html`)

### SEO
- Title (52 Zeichen): Kontakt & Anfrage – Maler in Musterstadt | Malerwerk
- Meta-Description (155 Zeichen): Anfrage an Malerwerk, Malerbetrieb in Musterstadt: Formular ausfüllen oder anrufen. Wir melden uns, vereinbaren eine Besichtigung und schicken ein Angebot.
- OG-Titel: Anfrage an Malerwerk – Malerbetrieb in Musterstadt
- OG-Beschreibung: Schildern Sie kurz Ihr Vorhaben oder rufen Sie an. Wir melden uns, sehen uns alles vor Ort an und schicken Ihnen ein schriftliches Angebot.
- Canonical: `https://malerwerk.example/kontakt.html`

### 6.1 Seitenkopf
- Etikett: Kontakt
- H1: Anfrage senden oder anrufen
- Text: Beschreiben Sie kurz, was gemacht werden soll. Wir melden uns bei Ihnen und vereinbaren einen Termin zur Besichtigung.
- Telefonblock:
  - Etikett: Anrufen
  - Nummer groß (`tel:`): [PLATZHALTER: Telefonnummer]
  - Erreichbarkeit: [PLATZHALTER: Erreichbarkeit, z.&nbsp;B. Wochentage und Uhrzeiten]
  - E-Mail-Link: [PLATZHALTER: E-Mail-Adresse]
  - E-Mail-Link `aria-label`: E-Mail schreiben an [PLATZHALTER: E-Mail-Adresse]

### 6.2 Anfrage (`id="anfrage"`)

#### Formular-Kopf
- H2: Ihre Anfrage
- Pflichtfeld-Hinweis (über den Feldern): Felder mit * sind Pflichtfelder.
- [Builder: Das Sternchen in Labels mit `aria-hidden="true"` ausgeben; das Feld erhält `required` bzw. `aria-required="true"`. Formular `novalidate` nur, wenn eigene JS-Validierung mit diesen Meldungen läuft.]

#### Fehler-Zusammenfassung (oben im Formular, `role="alert"`, bei Fehlern nach dem Absenden)
- Überschrift: Bitte prüfen Sie Ihre Angaben
- Text: Einige Felder sind noch nicht richtig ausgefüllt. Die Hinweise stehen direkt am jeweiligen Feld.
- [Builder: Darunter Liste der fehlerhaften Felder als Sprunglinks zum Feld, Linktext = Fehlermeldung des Feldes.]

#### Felder (Reihenfolge)

1. **Name** (`name="name"`, `autocomplete="name"`, Pflicht)
   - Label: Name *
   - Platzhalter-Attribut: – (keins)
   - Fehler leer: Bitte geben Sie Ihren Namen an.
   - Fehler zu lang (serverseitig): Bitte kürzen Sie Ihren Namen.

2. **Gruppe Erreichbarkeit** (`<fieldset>`)
   - Legend: Wie erreichen wir Sie? *
   - Hilfetext (unter der Legend, `aria-describedby` für beide Felder): Bitte geben Sie mindestens eine Telefonnummer oder eine E-Mail-Adresse an.
   - **Telefon** (`name="telefon"`, `type="tel"`, `autocomplete="tel"`)
     - Label: Telefon
     - Hilfetext: Für Rückfragen und zur Terminabsprache.
     - Platzhalter-Attribut: – (keins)
     - Fehler ungültig: Bitte geben Sie eine gültige Telefonnummer an – nur Ziffern, Leerzeichen und die Zeichen + ( ) / -.
   - **E-Mail** (`name="email"`, `type="email"`, `autocomplete="email"`)
     - Label: E-Mail
     - Platzhalter-Attribut: – (keins)
     - Fehler ungültig: Bitte geben Sie eine gültige E-Mail-Adresse an, zum Beispiel name@beispiel.de.
   - Fehler, wenn beide leer (an der Gruppe): Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an.

3. **Ort des Objekts** (`name="ort"`, `autocomplete="postal-code"` nicht setzen – Freitext; optional)
   - Label: PLZ und Ort des Objekts
   - Hilfetext: Wo sollen die Arbeiten stattfinden?
   - Platzhalter-Attribut: – (keins)
   - Fehler zu lang (serverseitig): Bitte kürzen Sie die Ortsangabe.

4. **Leistung** (`name="leistung"`, `<select>`, optional)
   - Label: Um welche Leistung geht es?
   - Optionen (Wert → Text):
     - `""` → Bitte wählen
     - `innenanstrich` → Innenanstrich
     - `tapezierarbeiten` → Tapezierarbeiten
     - `fassade` → Fassade
     - `lackierarbeiten` → Lackierarbeiten
     - `wandgestaltung` → Wandgestaltung
     - `bodenbeschichtung` → Bodenbeschichtung
     - `sonstiges` → Sonstiges / weiß ich noch nicht
   - Fehler unbekannter Wert (serverseitig, Manipulation): Bitte wählen Sie eine Leistung aus der Liste.
   - [Builder: Vorauswahl per `?leistung=<slug>` (design-brief 9).]

5. **Nachricht** (`name="nachricht"`, `<textarea>`, Pflicht)
   - Label: Was soll gemacht werden? *
   - Hilfetext: Zum Beispiel: welche Räume oder Flächen, ungefähre Größe, gewünschte Farbe, Besonderheiten wie hohe Decken oder Altbau.
   - Platzhalter-Attribut: – (keins; der Hilfetext steht sichtbar darunter)
   - Fehler leer: Bitte beschreiben Sie kurz, was gemacht werden soll.
   - Fehler zu lang (serverseitig): Ihre Nachricht ist zu lang. Bitte kürzen Sie sie auf höchstens {max} Zeichen.
   - [Builder: `{max}` durch die technische Obergrenze aus der PHP-Konfiguration ersetzen, z.&nbsp;B. 5000.]

6. **Gewünschter Zeitraum** (`name="zeitraum"`, optional)
   - Label: Gewünschter Zeitraum (optional)
   - Hilfetext: Zum Beispiel „vor dem Umzug Ende März“ oder „flexibel“.
   - Platzhalter-Attribut: – (keins)
   - Fehler zu lang (serverseitig): Bitte kürzen Sie die Angabe zum Zeitraum.

7. **Honeypot** (`name="website"`, visuell und für Screenreader ausgeblendet, `tabindex="-1"`, `autocomplete="off"`)
   - Label: Dieses Feld bitte leer lassen
   - [Builder: Container mit `aria-hidden="true"` und Klasse zum Ausblenden (nicht `display:none` am Input allein). Ist das Feld gefüllt, verwirft der Server die Nachricht stillschweigend und leitet trotzdem auf `danke.html` weiter – keine Fehlermeldung, die Bots einen Hinweis gibt.]

#### Datenschutzhinweis (über dem Absende-Button, `--text-sm`)
- Text: Ihre Angaben verwenden wir nur, um Ihre Anfrage zu beantworten und gegebenenfalls ein Angebot zu erstellen. Sie werden nicht an Dritte weitergegeben. Mehr dazu in unserer <a href="datenschutz.html#kontaktformular">Datenschutzerklärung</a>.
- [Builder: Kein Pflicht-Häkchen. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO (vorvertragliche Maßnahme), siehe Datenschutzerklärung.]

#### Absenden
- Button primär: Anfrage senden
- Button während des Sendens (nur mit JS): Wird gesendet …
- Kleine Zeile unter dem Button (optional): Lieber direkt sprechen? Rufen Sie an: [PLATZHALTER: Telefonnummer]

#### Meldungen nach dem Absenden
- **Erfolg:** Weiterleitung auf `danke.html` (Text siehe Abschnitt 7).
- **Erfolg inline** (falls ohne Weiterleitung, Kalkweiß-Box mit Grünerde-Kante, `role="status"`):
  - Überschrift: Vielen Dank – Ihre Anfrage ist angekommen
  - Text: Wir melden uns bei Ihnen, um einen Termin zur Besichtigung abzustimmen. Bei Eiligem erreichen Sie uns unter [PLATZHALTER: Telefonnummer].
- **Allgemeiner Fehler** (Versand fehlgeschlagen, Box mit Englischrot-dunkel-Kante, `role="alert"`, eingegebene Werte bleiben erhalten):
  - Überschrift: Ihre Anfrage konnte nicht gesendet werden
  - Text: Leider ist beim Versand ein technischer Fehler aufgetreten. Ihre Eingaben sind noch da – bitte versuchen Sie es in einigen Minuten erneut. Oder rufen Sie uns an: [PLATZHALTER: Telefonnummer]. Per E-Mail erreichen Sie uns unter [PLATZHALTER: E-Mail-Adresse].
- **Sitzung/Token abgelaufen** (falls CSRF-/Zeitprüfung eingesetzt wird):
  - Text: Das Formular war zu lange geöffnet. Bitte senden Sie es noch einmal ab.
- **Aufruf ohne Formular** (direkter Aufruf von `kontakt.php` per GET): Weiterleitung auf `kontakt.html`, keine Meldung.

#### Seitenspalte (sticky)
- H2: Was nach Ihrer Anfrage passiert
- Liste (nummeriert):
  1. Wir melden uns per Telefon oder E-Mail und klären erste Fragen.
  2. Wir vereinbaren einen Termin und sehen uns alles vor Ort an.
  3. Sie erhalten ein schriftliches Angebot und entscheiden in Ruhe.
- H3: Adresse
- Text: Malerwerk<br>[PLATZHALTER: Straße und Hausnummer]<br>[PLATZHALTER: PLZ] Musterstadt
- H3: Erreichbarkeit
- Text: [PLATZHALTER: Erreichbarkeit, z.&nbsp;B. Wochentage und Uhrzeiten]

### 6.3 Anfahrt
- Etikett: Anfahrt
- H2: So finden Sie uns
- Adresse: Malerwerk · [PLATZHALTER: Straße und Hausnummer] · [PLATZHALTER: PLZ] Musterstadt
- Textlink extern: Route in OpenStreetMap öffnen → `https://www.openstreetmap.org/search?query=[PLATZHALTER: Adresse URL-kodiert]` (`target="_blank"`, `rel="noopener noreferrer"`)
- Hinweis unter dem Link (`--text-sm`): Externer Dienst, öffnet in einem neuen Fenster. Erst mit dem Klick werden Daten an OpenStreetMap übertragen.
- Link-`aria-label`: Route in OpenStreetMap öffnen (externer Dienst, öffnet neues Fenster)
- Rechts – H3: Einzugsgebiet
- Text: Wir arbeiten in Musterstadt und Umgebung:
- Ortsliste: Musterstadt · [PLATZHALTER: weitere Orte im Einzugsgebiet]
- Zusatzsatz: Ihr Ort ist nicht dabei? Fragen Sie trotzdem an.

---

## 7. Danke (`danke.html`, `noindex`)

### SEO
- Title (28 Zeichen): Anfrage gesendet | Malerwerk
- Meta-Description (144 Zeichen): Vielen Dank für Ihre Anfrage bei Malerwerk in Musterstadt. Wir melden uns bei Ihnen, um die nächsten Schritte und eine Besichtigung abzustimmen.
- Robots: `noindex, follow`
- OG: entfällt (Seite wird nicht geteilt); Canonical: `https://malerwerk.example/danke.html`

### 7.1 Bestätigung
- Streifenmarke 64&nbsp;px (dekorativ, `aria-hidden="true"`)
- Etikett: Anfrage gesendet
- H1: Vielen Dank für Ihre Anfrage
- Text (Absatz 1): Ihre Nachricht ist bei uns angekommen. Wir melden uns bei Ihnen per Telefon oder E-Mail, um Ihre Fragen zu klären und einen Termin zur Besichtigung zu vereinbaren.
- Text (Absatz 2): Ist es eilig? Dann rufen Sie uns gern an: [PLATZHALTER: Telefonnummer] (`tel:`-Link).
- Textlink: Zurück zur Startseite → `index.html`
- Textlink (zweiter, optional): Leistungen ansehen → `leistungen.html`

---

## 8. Impressum (`impressum.html`)

### SEO
- Title (34 Zeichen): Impressum | Malerwerk, Musterstadt
- Meta-Description (147 Zeichen): Impressum von Malerwerk, Malerbetrieb in Musterstadt: Anbieterkennzeichnung nach § 5 DDG mit Anschrift, Kontaktdaten, Kammer und Berufsbezeichnung.
- OG-Titel: Impressum – Malerwerk
- Canonical: `https://malerwerk.example/impressum.html`

### 8.1 Seitenkopf
- Etikett: Rechtliches
- H1: Impressum

### 8.2 Inhalt
- H2: Angaben gemäß §&nbsp;5 DDG
- Text:
  Malerwerk [PLATZHALTER: vollständiger Firmenname mit Rechtsformzusatz, z.&nbsp;B. „Inhaber Vorname Nachname e.&nbsp;K.“ oder „Malerwerk GmbH“]<br>
  [PLATZHALTER: Straße und Hausnummer]<br>
  [PLATZHALTER: PLZ] Musterstadt<br>
  Deutschland

- H2: Vertreten durch
- Text: [PLATZHALTER: Inhaberin/Inhaber bzw. vertretungsberechtigte Person(en), z.&nbsp;B. Geschäftsführer bei einer GmbH]

- H2: Rechtsform
- Text: [PLATZHALTER: Rechtsform, z.&nbsp;B. Einzelunternehmen, e.&nbsp;K., GbR, GmbH]

- H2: Kontakt
- Text:
  Telefon: [PLATZHALTER: Telefonnummer]<br>
  E-Mail: [PLATZHALTER: E-Mail-Adresse]

- H2: Registereintrag
- Text: Eintragung im Handelsregister<br>Registergericht: [PLATZHALTER: Amtsgericht – entfällt, wenn keine Eintragung]<br>Registernummer: [PLATZHALTER: HRA/HRB-Nummer – entfällt, wenn keine Eintragung]
- [Builder: Ganzen Abschnitt entfernen, wenn kein Registereintrag besteht.]

- H2: Umsatzsteuer-Identifikationsnummer
- Text: Umsatzsteuer-Identifikationsnummer gemäß §&nbsp;27&nbsp;a Umsatzsteuergesetz: [PLATZHALTER: USt-IdNr. – entfällt, wenn keine vorhanden]
- [Builder: Ganzen Abschnitt entfernen, wenn keine USt-IdNr. vorhanden ist. Steuernummer gehört nicht ins Impressum.]

- H2: Berufsbezeichnung und berufsrechtliche Regelungen
- Text:
  Berufsbezeichnung: [PLATZHALTER: Berufsbezeichnung, z.&nbsp;B. Maler und Lackierer bzw. Maler- und Lackierermeister/-in – nur die tatsächlich geführte Bezeichnung]<br>
  Verliehen in: [PLATZHALTER: Staat, in dem die Berufsbezeichnung verliehen wurde, z.&nbsp;B. Deutschland]<br>
  Zuständige Kammer: [PLATZHALTER: Name und Anschrift der zuständigen Handwerkskammer]<br>
  Eintragung in die Handwerksrolle: [PLATZHALTER: Handwerkskammer und Betriebsnummer, falls angegeben werden soll]<br>
  Es gelten folgende berufsrechtliche Regelungen: Gesetz zur Ordnung des Handwerks (Handwerksordnung), einsehbar unter <a href="https://www.gesetze-im-internet.de/hwo/">www.gesetze-im-internet.de/hwo</a>.
- [Builder: externer Link mit `rel="noopener noreferrer"`; kein `target="_blank"` nötig.]

- H2: Redaktionell verantwortlich
- Text: Verantwortlich für den Inhalt nach §&nbsp;18 Abs.&nbsp;2 MStV:<br>[PLATZHALTER: Vorname Nachname]<br>[PLATZHALTER: Anschrift, falls abweichend von oben]

- H2: Verbraucherstreitbeilegung
- Text: Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
- [Builder/Launch-Checkliste: Vorbereiteter Text nach §&nbsp;36 VSBG. Vom Kunden zu bestätigen. Pflicht zur Angabe besteht für Betriebe mit mehr als zehn Beschäftigten oder wenn AGB verwendet werden; nimmt der Betrieb an Schlichtungen teil, Text ersetzen durch: „Wir nehmen an Streitbeilegungsverfahren vor folgender Verbraucherschlichtungsstelle teil: [PLATZHALTER: Name, Anschrift und Website der Schlichtungsstelle].“ Ein Link zur EU-Plattform zur Online-Streitbeilegung ist nicht mehr anzugeben – die Plattform wurde am 20.&nbsp;Juli 2025 eingestellt.]

- H2: Bildnachweise
- Text: [PLATZHALTER: Bildnachweise – entfällt, wenn alle Fotos aus dem eigenen Betrieb stammen]

- H2: Gestaltung
- Text: Schrift: Archivo, lizenziert unter der SIL Open Font License&nbsp;1.1. Icons: Lucide, lizenziert unter der ISC-Lizenz.

---

## 9. Datenschutzerklärung (`datenschutz.html`)

### SEO
- Title (45 Zeichen): Datenschutzerklärung | Malerwerk, Musterstadt
- Meta-Description (153 Zeichen): Datenschutz bei Malerwerk in Musterstadt: welche Daten beim Besuch der Website und bei einer Anfrage verarbeitet werden – ohne Cookies und ohne Tracking.
- OG-Titel: Datenschutzerklärung – Malerwerk
- Canonical: `https://malerwerk.example/datenschutz.html`

### 9.1 Seitenkopf
- Etikett: Rechtliches
- H1: Datenschutzerklärung
- Zeile darunter: Stand: [PLATZHALTER: Monat und Jahr]

### 9.2 Prüfpflicht-Hinweis (Leinen-Box mit Ocker-Kante, ganz oben, `role="note"`)
- Überschrift (fett, kein H2): Wichtiger Hinweis: Dieser Text muss vor der Veröffentlichung geprüft werden
- Text: Diese Datenschutzerklärung ist eine vorbereitete Struktur auf Grundlage der tatsächlich eingesetzten Technik dieser Website. Sie ersetzt keine Rechtsberatung. Vor der Veröffentlichung muss der Text mit einem Datenschutz-Generator (z.&nbsp;B. eRecht24 oder Datenschutz-Generator.de) erstellt bzw. abgeglichen oder anwaltlich geprüft werden. Alle mit Platzhalter gekennzeichneten Angaben sind zu ergänzen.
- [Builder: Box nach der rechtlichen Prüfung entfernen. Steht in der Launch-Checkliste.]

### 9.3 Inhaltsverzeichnis (sticky ab 1024&nbsp;px)
- `<nav>`-`aria-label`: Inhalt der Datenschutzerklärung
- Überschrift (visuell als Etikett): Inhalt
- Einträge (Anker):
  1. Verantwortlicher → `#verantwortlicher`
  2. Überblick → `#ueberblick`
  3. Hosting und Server-Logfiles → `#hosting`
  4. Kontaktformular → `#kontaktformular`
  5. Kontakt per E-Mail oder Telefon → `#kontakt`
  6. Keine Cookies, kein Tracking → `#cookies`
  7. Schriften und Icons → `#schriften`
  8. Links zu externen Diensten → `#externe-links`
  9. Speicherdauer → `#speicherdauer`
  10. Ihre Rechte → `#rechte`
  11. Beschwerderecht → `#beschwerde`
  12. Verschlüsselung → `#verschluesselung`

### 9.4 Inhalt

#### H2: 1. Verantwortlicher (`id="verantwortlicher"`)
Text: Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:<br>
Malerwerk [PLATZHALTER: vollständiger Firmenname]<br>
[PLATZHALTER: Inhaberin/Inhaber bzw. vertretungsberechtigte Person]<br>
[PLATZHALTER: Straße und Hausnummer]<br>
[PLATZHALTER: PLZ] Musterstadt<br>
Telefon: [PLATZHALTER: Telefonnummer]<br>
E-Mail: [PLATZHALTER: E-Mail-Adresse]

Text: Einen Datenschutzbeauftragten haben wir [PLATZHALTER: nicht benannt, da keine gesetzliche Pflicht besteht – oder Name und Kontakt des Datenschutzbeauftragten].

#### H2: 2. Überblick (`id="ueberblick"`)
Text: Personenbezogene Daten sind alle Angaben, mit denen Sie persönlich identifiziert werden können, etwa Ihr Name, Ihre Telefonnummer oder Ihre IP-Adresse. Auf dieser Website verarbeiten wir nur die Daten, die für den Betrieb der Seite und für die Beantwortung Ihrer Anfrage nötig sind.

Text: Im Einzelnen sind das:
- technische Zugriffsdaten, die beim Aufruf jeder Website anfallen (Server-Logfiles),
- die Angaben, die Sie uns über das Kontaktformular, per E-Mail oder am Telefon mitteilen.

Text: Wir setzen keine Cookies, keine Analyse- oder Tracking-Werkzeuge und keine eingebundenen Inhalte von Drittanbietern ein. Rechtsgrundlagen der Verarbeitung sind die Datenschutz-Grundverordnung (DSGVO) und das Bundesdatenschutzgesetz (BDSG); die jeweilige Rechtsgrundlage nennen wir bei den einzelnen Verarbeitungen.

#### H2: 3. Hosting und Server-Logfiles (`id="hosting"`)
Text: Diese Website wird bei folgendem Anbieter gehostet: [PLATZHALTER: Name und Anschrift des Hosters]. Mit dem Hoster besteht ein Vertrag zur Auftragsverarbeitung nach Art.&nbsp;28 DSGVO [PLATZHALTER: bestätigen].

Text: Bei jedem Aufruf der Website speichert der Server automatisch Informationen, die Ihr Browser übermittelt (Server-Logfiles):
- IP-Adresse des anfragenden Geräts,
- Datum und Uhrzeit des Zugriffs,
- aufgerufene Seite bzw. Datei,
- Website, von der aus Sie zu uns gekommen sind (Referrer-URL),
- verwendeter Browser und Betriebssystem,
- übertragene Datenmenge und Statuscode der Anfrage.

Text: Diese Daten sind technisch nötig, um die Website auszuliefern sowie Stabilität und Sicherheit zu gewährleisten. Eine Zusammenführung mit anderen Datenquellen findet nicht statt. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO; unser berechtigtes Interesse liegt im sicheren und fehlerfreien Betrieb der Website. Die Logfiles werden nach [PLATZHALTER: Speicherdauer laut Hoster] gelöscht.

#### H2: 4. Kontaktformular (`id="kontaktformular"`)
Text: Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir die Angaben, die Sie eintragen: Name, Telefonnummer und/oder E-Mail-Adresse, Ort des Objekts, gewünschte Leistung, Ihre Nachricht und den gewünschten Zeitraum. Pflichtangaben sind Ihr Name, Ihre Nachricht und mindestens eine Möglichkeit, Sie zu erreichen.

Text: Das Formular wird auf unserem eigenen Webspace verarbeitet und Ihre Angaben werden per E-Mail an uns weitergeleitet. Dabei werden keine externen Dienste eingesetzt. Zum Schutz vor automatisierten Spam-Nachrichten verwenden wir ein unsichtbares Prüffeld; dafür werden keine zusätzlichen Daten erhoben und keine Drittanbieter eingebunden.

Text: Wir nutzen Ihre Angaben ausschließlich, um Ihre Anfrage zu beantworten, einen Besichtigungstermin zu vereinbaren und gegebenenfalls ein Angebot zu erstellen. Eine Weitergabe an Dritte findet nicht statt. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO (Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage hin) sowie Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO für allgemeine Anfragen; unser berechtigtes Interesse liegt in der Beantwortung Ihres Anliegens.

#### H2: 5. Kontakt per E-Mail oder Telefon (`id="kontakt"`)
Text: Wenn Sie uns per E-Mail schreiben oder anrufen, verarbeiten wir die Angaben, die Sie uns dabei mitteilen – etwa Ihren Namen, Ihre Kontaktdaten und Ihr Anliegen –, um Ihre Anfrage zu bearbeiten. Die Rechtsgrundlagen sind dieselben wie beim Kontaktformular (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b bzw. lit.&nbsp;f DSGVO). Für E-Mails nutzen wir [PLATZHALTER: E-Mail-Anbieter bzw. Postfach beim Hoster].

#### H2: 6. Keine Cookies, kein Tracking (`id="cookies"`)
Text: Diese Website setzt keine Cookies und verwendet keine Analyse-, Werbe- oder Tracking-Dienste. Es werden keine Nutzungsprofile erstellt. Aus diesem Grund zeigen wir auch kein Cookie-Banner an.

#### H2: 7. Schriften und Icons (`id="schriften"`)
Text: Schriften und Icons sind lokal auf unserem Server gespeichert und werden von dort geladen. Beim Aufruf der Website wird keine Verbindung zu Servern von Drittanbietern wie Google Fonts oder Content-Delivery-Netzwerken hergestellt.

#### H2: 8. Links zu externen Diensten (`id="externe-links"`)
Text: Auf der Kontaktseite finden Sie einen Link, mit dem Sie eine Route in OpenStreetMap öffnen können. Es handelt sich um einen einfachen Link, keine eingebettete Karte. Erst wenn Sie ihn anklicken, wird die Website von OpenStreetMap in einem neuen Fenster geöffnet und Ihr Browser überträgt Daten wie Ihre IP-Adresse an den Betreiber. Betreiber ist die OpenStreetMap Foundation, St John’s Innovation Centre, Cowley Road, Cambridge, CB4&nbsp;0WS, Vereinigtes Königreich. Für die Verarbeitung dort gilt deren Datenschutzerklärung: <a href="https://osmfoundation.org/wiki/Privacy_Policy">osmfoundation.org/wiki/Privacy_Policy</a>.

Text: Das Impressum enthält zudem einen Link zur Handwerksordnung auf gesetze-im-internet.de. Auch hier werden Daten erst nach Ihrem Klick übertragen.

[Builder/Launch-Checkliste: Anschrift der OpenStreetMap Foundation vor Veröffentlichung prüfen.]

#### H2: 9. Speicherdauer (`id="speicherdauer"`)
Text: Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck nötig ist. Anfragen löschen wir, wenn sie abschließend bearbeitet sind und kein Auftrag zustande kommt [PLATZHALTER: konkrete Löschfrist für Anfragen ohne Auftrag]. Kommt ein Auftrag zustande, bewahren wir die Daten auf, solange gesetzliche Aufbewahrungspflichten bestehen, etwa nach Handels- und Steuerrecht.

#### H2: 10. Ihre Rechte (`id="rechte"`)
Text: Sie haben gegenüber uns jederzeit folgende Rechte bezüglich Ihrer personenbezogenen Daten:
- Recht auf Auskunft (Art.&nbsp;15 DSGVO),
- Recht auf Berichtigung (Art.&nbsp;16 DSGVO),
- Recht auf Löschung (Art.&nbsp;17 DSGVO),
- Recht auf Einschränkung der Verarbeitung (Art.&nbsp;18 DSGVO),
- Recht auf Datenübertragbarkeit (Art.&nbsp;20 DSGVO),
- Recht auf Widerspruch gegen die Verarbeitung (Art.&nbsp;21 DSGVO).

Text (hervorgehoben, fett): Widerspruchsrecht: Verarbeiten wir Ihre Daten auf Grundlage von Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO, können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen.

Text: Für alle Anliegen genügt eine formlose Nachricht an die oben unter „Verantwortlicher“ genannten Kontaktdaten.

#### H2: 11. Beschwerderecht (`id="beschwerde"`)
Text: Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt (Art.&nbsp;77 DSGVO). Zuständig ist in der Regel die Aufsichtsbehörde des Bundeslandes, in dem unser Betrieb sitzt: [PLATZHALTER: Name, Anschrift und Website der zuständigen Landesdatenschutzbehörde].

#### H2: 12. Verschlüsselung (`id="verschluesselung"`)
Text: Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers. Daten, die Sie über das Kontaktformular senden, können so nicht von Dritten mitgelesen werden.
- [Builder/Launch-Checkliste: Nur stehen lassen, wenn das SSL-Zertifikat beim Hoster aktiv ist.]

---

## 10. Seite nicht gefunden (`404.html`)

### SEO
- Title (32 Zeichen): Seite nicht gefunden | Malerwerk
- Meta-Description (150 Zeichen): Diese Seite gibt es bei Malerwerk nicht oder nicht mehr. Von hier aus finden Sie Leistungen, Arbeiten und den Kontakt zum Malerbetrieb in Musterstadt.
- Robots: `noindex, follow`
- Canonical: keins

### 10.1 „Unfertige Wand“
- Große Zahl (auf Grünerde, Kalk; `aria-hidden="true"`, da in der H1 enthalten): 404
- H1: Diese Wand ist noch nicht fertig
- Text: Die Seite, die Sie suchen, gibt es nicht oder nicht mehr. Vielleicht hat sich die Adresse geändert. Von hier aus geht es weiter:
- [Builder: Für Screenreader H1 mit vorangestelltem, visuell verstecktem „Fehler 404:“ ausgeben.]
- Rechts – Linkliste (`<nav>`-`aria-label`: Weiter zu):
  - Startseite → `index.html`
  - Leistungen → `leistungen.html`
  - Arbeiten → `arbeiten.html`
  - Über uns → `ueber-uns.html`
  - Kontakt → `kontakt.html`
- Button primär: Anfrage senden → `kontakt.html#anfrage`
- Button sekundär: Anrufen → `tel:`

---

## 11. Sonstige Kleintexte und aria-Labels

| Element | Text |
|---|---|
| Skip-Link | Zum Inhalt springen |
| Logo-Link | Malerwerk – zur Startseite |
| Menü-Button (zu / offen) | `aria-label`: Menü öffnen / Menü schließen · sichtbar: Menü / Schließen |
| Hauptnavigation | `aria-label`: Hauptnavigation |
| Mobilmenü-Panel | `aria-label`: Hauptmenü |
| Mobile Aktionsleiste | `aria-label`: Schnellkontakt |
| Sprungleiste Leistungen | `aria-label`: Leistungen auf dieser Seite |
| Footer-Navigation | `aria-label`: Seiten im Footer / Rechtliches |
| Breadcrumb (falls eingesetzt) | `aria-label`: Brotkrümelnavigation · Startseite › [Seitenname] |
| Aktiver Navigationspunkt | `aria-current="page"` (kein zusätzlicher Text) |
| Externer Link (Zusatz, visuell versteckt) | (öffnet neues Fenster) |
| Telefon-Link | `aria-label`: Anrufen: [PLATZHALTER: Telefonnummer] |
| E-Mail-Link | `aria-label`: E-Mail schreiben an [PLATZHALTER: E-Mail-Adresse] |
| Bildplatzhalter | `aria-label`: Bildplatzhalter: [Motiv] (siehe jeweilige Seite) |
| Dekorative Elemente (Streifenmarke, Farbfelder, Etikett-Quadrate, Kantenband, Icons neben Text) | `aria-hidden="true"`, kein Text |
| Pflichtfeld-Stern | `aria-hidden="true"`; Hinweis über dem Formular: Felder mit * sind Pflichtfelder. |
| Fehler-Icon vor Feldmeldung | `aria-hidden="true"`; Meldung selbst als Text, per `aria-describedby` am Feld |
| `<html lang>` | de |
| Noscript-Hinweis Formular (falls JS für Vorauswahl fehlt) | – keiner nötig, Formular funktioniert ohne JS |
