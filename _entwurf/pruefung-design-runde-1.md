# Design-Prüfung – Runde 1 (Agent 4)

Grundlage: `PROMPT.md` (1–4, 6, 7, Phase 4), `_entwurf/annahmen.md`, `_entwurf/design-brief.md`, `_entwurf/inhalte.md`, Code (`*.html`, `css/style.css`, `js/main.js`).
Referenz-Screenshots: keine vorhanden (keine Referenzen geliefert).
Eigene Aufnahmen: `_entwurf/screenshots/runde-1/` (alle 9 Seiten in 360/768/1440 px, je erster Bildschirm und Abschnitte) und Nahaufnahmen `nah-*.png`, erstellt mit `_entwurf/pruef-nahaufnahmen-runde-1.mjs` und `_entwurf/pruef-header-runde-1.mjs`.
Hinweis: Im automatisierten Browser sind die Scroll-Einblendungen absichtlich aus; die Animationen habe ich anhand des Codes geprüft.

---

## Gesamturteil

Die Seite hat ein **eigenständiges, schlüssiges Konzept**. „Die saubere Kante“ ist sichtbar umgesetzt: Farbtonkarten-Etiketten (MW-01 bis MW-06), die Ablauf-Treppe als Schichtaufbau, harte Flächenkanten, die Streifenmarke und das Kantenband im Footer. Die Erdpigment-Palette ist ruhig, das Rot steht konsequent für Handlungen, und Archivo mit Breitenachse trägt die Marke. Es gibt keine KI-Muster (keine Verläufe, keine Glows, keine Icon-Kacheln, keine Emojis). Die Bildplatzhalter sind gut gestaltet: wie ein Probeanstrich mit Format-Etikett, Motivtext und Marke. Die Seite wirkt dadurch auch ohne Fotos hochwertig.

Zur Abnahme fehlt der Feinschliff im Layout. Es gibt mehrere zu große Leerflächen, und auf 768 px laufen die Fließtextzeilen zu lang. Dazu kommen eine Silbentrennung/ein Umbruch mit Gedankenstrich am Zeilenanfang in der H1 der Startseite (768 px), eine falsch ausgerichtete Textspalte im Impressum und ein doppelter Handlungsblock am Ende der Leistungsseite. Kein Mangel ist kritisch. Alle Punkte lassen sich mit kleinen CSS- und HTML-Änderungen beheben.

---

## Bewertung (1–5)

| Kategorie | Punkte | Begründung |
|---|---|---|
| **Eigenständigkeit** | **4** | Klare, branchenspezifische Gestaltungsidee: Farbtonkarten-Index, Ablauf als versetzte „Schichten“, Musterflächen-Platzhalter, Streifenmarke und Kantenband. Keine Muster aus 7.1. Abzug, weil auf Unterseiten (Leistungen: viermal Text neben Bild, Arbeiten/Über uns) die Signaturen zurücktreten und das Raster austauschbarer wirkt als die Startseite. |
| **Branchenpassung** | **4** | Hell, ruhig, sauber, wie ein frisch gestrichener Raum. Die Tonalität passt zu Privatkunden im Handwerk. Branchenklischees (Kleckse, Pinsel, Farbfächer) wurden laut Filtertabelle verworfen und kommen auch nicht vor. Der Vorher/Nachher-Bereich ist sinnvoll vorbereitet. Es fehlt nur der Beleg durch echte Fotos, und das ist kein Gestaltungsfehler. |
| **Gesamteindruck Agenturniveau** | **3** | Hochwertige Basis, aber noch nicht ohne Nacharbeit abnahmefähig: große Leerflächen (Leistungen-Kopf, Startseite Sorgfalt/Arbeiten-Vorschau), Impressum aus der Achse, doppelte CTA-Blöcke auf Leistungen, ungleich gestapelte Hero-Buttons, Umbrüche (P2-Liste). |
| **Typografie** | **3** | Sehr gute Grundlage: eine Familie, Breitenachse als Gestaltungsmittel, saubere Skala mit `clamp()`, `balance`/`pretty`, korrekte „…“ und –, `&nbsp;` bei z. B. und §. Sichtbare Schwächen: Der Gedankenstrich steht in der H1 auf 768 px am Zeilenanfang, „in“ hängt bei 1024/1440 am Zeilenende. Fließtext auf 768 px hat 85–95 Zeichen pro Zeile (über 66 ch). „E-Mail“ wird in einer H2 umbrochen. Platzhalter in H2 verlieren die Überschriften-Hierarchie. |
| **Spacing und Layout** | **3** | Das 8-px-System ist konsequent als Variablen umgesetzt, und die Layouts wechseln gut (Index-Liste, Treppe, Überlappung, Asymmetrie, Band). Schwächen: rund 220 px Leerraum zwischen Sprungleiste und MW-01, große Leerflächen auf der Startseite (rechts neben dem Sorgfalt-Panel, links über der Arbeiten-Vorschau), Impressum-Textspalte zentriert statt auf der linken Achse, Inhaltsverzeichnis im Datenschutz nicht oben bündig, eine einzelne Sprungleisten-Kachel in zweiter Zeile. |
| **Farbe und Bild** | **4** | Die Palette ist stimmig, 60-30-10 wird eingehalten, und Rot ist fast nur Handlung. Platzhalter rotieren sinnvoll durch die Töne. Abzüge: Englischrot als dekorative Kante am Telefonblock (Kontakt), der fast unsichtbare Grünerde-hell-Streifen am Datenblatt Projekt 03 und Ocker-Großflächen, die nebeneinander sehr laut wirken (Arbeiten, Vorher-Bild). |
| **Responsive** | **4** | Auf keiner Breite gibt es Überlappungen oder horizontales Scrollen. Mobile Aktionsleiste, Menü-Panel und Formular sind sauber. Schwächen: Footer-Kontaktspalte bei 768 px gequetscht, Sprungleiste mobil als 300 px hoher Stapel, das Grünerde-Feld im Hero läuft bei 768 px nicht bis an den Rand, und alle Leistungsabschnitte sind bei 768 px gleich (Bild über Text). |
| **Texte** | **4** | Konkret, sachlich, ohne Floskeln und ohne erfundene Fakten. Ich habe gezielt nach Qualität, Profi, Experte, Partner, Leidenschaft, „seit“, Meister, Garantie und Ausrufezeichen gesucht: nur Treffer in Platzhaltern. Kurze Sätze, klare Handlungsaufrufe. Kleinigkeiten: „so sieht unsere Arbeit aus“ und „Hier zeigen wir ausgewählte Aufträge“ stehen über reinen Platzhaltern. „wirken schnell wie neu“ grenzt an ein Versprechen. Fehlermeldungen werden mobil mitten im Wort getrennt. |
| **Zielerreichung** | **4** | Die Haupthandlung ist überall in einem Schritt erreichbar: Header-CTA (sticky), mobile Aktionsleiste (auf Kontakt „Zum Formular“), Abschlussband, „Diese Leistung anfragen“ mit Vorauswahl, 404 mit beiden Handlungen. Das Formular ist vorbildlich (Zusammenfassung mit Sprunglinks, Feldfehler mit Icon). Abzug: Die Hero-Buttons stapeln sich ungleich breit, und auf Leistungen stehen zwei CTA-Blöcke direkt hintereinander. |

**Ergebnis:** 3 Kategorien unter 4 (Gesamteindruck, Typografie, Spacing). Nicht bestanden. Mit den P2-Punkten ist voraussichtlich überall 4 erreichbar.

---

## Mängelliste

### P1 – kritisch
Keine.

### P2 – wichtig

**P2-1 Zu lange Fließtextzeilen auf 768 px (über 66 ch)**
- Wo: `leistungen.html` alle `.leistung__text p` (z. B. MW-04: rund 90 Zeichen pro Zeile), `index.html` `.index__kopf p`, `.sorgfalt__panel .fluss p`, `.vorschau__kopf p`; ebenso `ueber-uns.html` `.betrieb__text`, `kontakt.html` `.formular__hinweis`. Screenshots: `leistungen-768-teil-3.png`, `index-768-teil-3.png`/`-teil-4.png`.
- Wie: In `css/style.css` eine Regel ergänzen: `.sektion p, .sektion li { max-width: var(--measure); }`. Ausnahmen über `max-width: none` nur dort, wo bewusst schmaler gesetzt ist. Alternativ gezielt: `.leistung__text, .index__kopf, .sorgfalt__panel, .vorschau__kopf, .betrieb__text { max-width: var(--measure); }`.

**P2-2 Umbruch in der H1 der Startseite**
- Wo: `index.html` `#hero-titel`. Bei 768 px steht „– in Musterstadt“ mit dem Strich am Zeilenanfang (`index-768-teil-1.png`). Bei 1024/1440 px endet die Zeile auf „lackieren – in“, „Musterstadt“ steht allein (`index-1440-teil-1.png`, `nah-header-hero-1024.png`).
- Wie: `Streichen, tapezieren, lackieren&nbsp;– in&nbsp;Musterstadt`. Dieselbe Regel (geschütztes Leerzeichen vor dem Halbgeviertstrich) auch in `leistungen.html` H2 „Tapezieren&nbsp;– vom Untergrund …“ und `ueber-uns.html` H1 „Malerwerk&nbsp;– Malerbetrieb …“ anwenden.

**P2-3 Impressum: Textspalte zentriert statt auf der linken Hauptachse**
- Wo: `impressum.html`, `<div class="container rechtstext">`. `.rechtstext { max-width: var(--measure) }` überschreibt die Containerbreite, und `margin-inline: auto` zentriert die Spalte. Der Text beginnt bei x = 380 statt 100 (`impressum-1440-teil-1.png`). Auf der Datenschutzseite steht der Text dagegen richtig links. Das ist inkonsistent.
- Wie: Struktur wie im Datenschutz: `<div class="container"><div class="rechtstext">…</div></div>`. Oder in CSS: `.container.rechtstext { max-width: none; } .container.rechtstext > * { max-width: var(--measure); }`.

**P2-4 Leistungen: Leerraum über MW-01 und mittig ausgerichtete Bilder**
- Wo: `leistungen.html`, zwischen Sprungleiste und MW-01 rund 220 px (Seitenkopf unten 96 px plus Sektion oben 128 px). Dazu sitzt das Bild durch `.leistung__raster { align-items: center }` rund 110 px tiefer als das Etikett, was den Leerraum noch vergrößert (`leistungen-1440-teil-1.png`).
- Wie: `.seitenkopf + .leistung { padding-top: var(--section-y-kompakt); }` und ab 1024 px `.leistung__raster { align-items: start; }`. Das Bild bekommt dann `margin-top: var(--space-6)`, damit es auf Höhe der H2 beginnt, nicht des Etiketts.

**P2-5 Leistungen: zwei CTA-Blöcke direkt hintereinander**
- Wo: `leistungen.html`, Sektion „Angebot nach Besichtigung“ (Leinen, mit Primär- und Sekundärbutton), direkt gefolgt vom Abschlussband mit denselben zwei Buttons. Mobil stehen dadurch vier Buttons auf rund 900 px (`leistungen-1440-teil-5.png`, `leistungen-360-teil-7.png`).
- Wie: Im Angebot-Block die `.knopfreihe` entfernen. Er wird zum reinen Info-Absatz, die Handlung übernimmt das Abschlussband darunter. Alternative: Angebot-Block weglassen und seinen Kerngedanken (Text aus inhalte 3.3) als Absatz in das Abschlussband übernehmen. Das muss der Orchestrator entscheiden, weil es von `inhalte.md` abweicht.

**P2-6 Hero: Handlungsbuttons ungleich gestapelt**
- Wo: `index.html` `.hero .knopfreihe`. Der Sekundärbutton „Anrufen: [PLATZHALTER: Telefonnummer]“ ist so breit, dass er bei 1440 px unter den Primärbutton rutscht. Mobil ist er doppelt so breit wie der Primärbutton und hat zwei Textzeilen (`index-1440-teil-1.png`, `index-360-oben.png`).
- Wie: (a) Im Hero-Button nur „Anrufen“ und darunter `<p class="meta">` mit der Nummer, wie im Mobilmenü. Oder (b) ab 1024 px `.hero .knopfreihe { flex-wrap: nowrap; }` und unter 480 px `.hero .knopfreihe .knopf { flex: 1 1 100%; }`, damit beide Buttons mobil gleich breit sind. Bevorzugt (a), weil auch die echte Nummer mit „Anrufen:“ mobil knapp wird.

### P3 – Feinschliff

1. **Startseite, Leerflächen bei 1440 px:** Rechts neben dem Sorgfalt-Panel bleiben rund 700 × 450 px leer (`index-1440-teil-4.png`). Darunter bleibt über der Arbeiten-Vorschau die linke Hälfte rund 300 px leer. Vorschlag für die Vorschau: `.vorschau__gross { grid-row: 1 / span 2; }`, `.vorschau__kopf { grid-column: 9 / span 4; }`, `.vorschau__klein { grid-column: 9 / span 4; grid-row: 2; margin-top: var(--space-5); }`. Dann steht der Kopf neben dem großen Bild. Für Sorgfalt: das Panel auf `grid-column: 1 / span 6` und den unteren Sektionsabstand auf `--section-y-kompakt`.
2. **Sprungleiste Leistungen:** Bei 1440 px rutscht die Kachel MW-06 allein in Zeile 2 (`leistungen-1440-teil-1.png`). Mobil entsteht ein Stapel von 6 Kacheln mit 300 px Höhe (`leistungen-360-teil-1.png`). Vorschlag: `.sprungleiste ul { display: grid; grid-template-columns: repeat(2, 1fr); }`, ab 768 px `repeat(3, 1fr)`, ab 1280 px `repeat(6, 1fr)`, dazu `.sprungleiste a { width: 100%; }`.
3. **Ablauf, Band 03:** Nur dieses Band hat eine 4 px breite Grünerde-Kante links (`.band-3 --band-kontur`). Das wirkt wie ein Fehler (`index-1440-teil-3.png`). Entweder entfernen (Band 2 und 3 gleich lassen) oder Band 3 als eigenen Zwischenton gestalten (Fläche `--farbe-leinen` mit `--rand-fein`).
4. **Datenschutz:** Das Inhaltsverzeichnis beginnt erst unter dem Prüfhinweis (y = 777 statt 516, `datenschutz-1440-teil-1.png`). Den `.pruefhinweis` in `.datenschutz__text` verschieben, damit das sticky Verzeichnis oben bündig mit dem Inhalt startet.
5. **Umbruch „E-Mail“ in Überschriften:** `datenschutz.html` H2 „5. Kontakt per E-‖Mail“ (360 px, `datenschutz-360-teil-4.png`). Das geschützte Trennzeichen `E&#8209;Mail` in Überschriften und im Inhaltsverzeichnis verwenden.
6. **Fehlermeldungen mit Silbentrennung (360 px):** „was ge-‖macht“, „Telefon-‖nummer“ (`nah-formular-fehler-360-ganz.png`). `.fehlertext, .meldung { hyphens: manual; }`.
7. **Formular, Lage der Hilfetexte uneinheitlich:** Bei Telefon, PLZ/Ort und Zeitraum steht der Hilfetext über dem Feld, bei der Nachricht darunter (`kontakt-1440-teil-2.png`). Einheitlich über das Feld setzen (`.feld__hilfe--unten` entfernen), `aria-describedby` bleibt.
8. **Platzhalter in Überschriften verlieren die Hierarchie:** Projekttitel-H2 auf `arbeiten.html` erscheinen in Gewicht 500 und 0,875 em (`arbeiten-1440-teil-1.png`). `h1 .platzhalter, h2 .platzhalter, h3 .platzhalter { font-weight: inherit; font-size: 0.8em; }`.
9. **Musterkarte MW-05, doppelte Beschriftung:** „Motiv: Kalkputz“ steht in der Fläche und „KALKPUTZ“ noch einmal darunter (`leistungen-1440-teil-4.png`). Ab 768 px `.musterkarte .motiv__text { display: none; }` (der Name steht in der Bildunterschrift). Die Kacheln mit `align-self: start` oben bündig zur H2 setzen.
10. **Datenblatt Projekt 03:** Der Streifen in Grünerde hell ist auf Leinen kaum sichtbar (`arbeiten-1440-teil-3.png`). Projektfarben sinnvoller verteilen: 01 Grünerde, 02 Ocker, 03 Umbra.
11. **Arbeiten, Seitenkopf-Hinweis:** Laut Briefing gehört er „rechts unten“, er steht aber rechts oben auf Höhe des Etiketts (`arbeiten-1440-teil-1.png`). `.seitenkopf__hinweis { align-self: end; }`.
12. **Kontakt, Telefonblock:** 4 px Englischrot als dekorative Kante. Das widerspricht Briefing 14.8 (Rot nur für Handlungen). Die Kante in `--farbe-gruenerde` oder `--farbe-umbra` setzen.
13. **Footer bei 768 px:** Die Kontaktspalte ist nur 2 von 6 Spalten breit, die Adresse bricht dreizeilig, und die Zeilen fluchten nicht mit den Seiten-Links (`index-768-teil-6.png`). Bei 768 px `.fuss__kontakt-box { grid-column: 1 / span 3; } .fuss__seiten { grid-column: 4 / span 2; } .fuss__recht { grid-column: 6; }`.
14. **Hero bei 768 px:** Das Grünerde-Feld läuft nicht bis zum Viewport-Rand (`.hero__bild` Sp. 2–5), es wirkt wie ein versetzter Schatten (`index-768-teil-1.png`). `.hero__bild { grid-column: 2 / -1; }` bei 768–1023 px, damit `right: calc(var(--gutter) * -1)` greift.
15. **MW-03 Fassade (Band):** Etikett und Bild stehen nur 16 px auseinander, sonst gelten 32 px oder mehr (`leistungen-1440-teil-3.png`). `.leistung--band .motiv { margin-bottom: var(--space-6); }`.
16. **Über uns, Team bei 1440 px:** Die kleinen Porträts sind nur rund 180 px breit, die Namensplatzhalter brechen zweizeilig, und links bleiben rund 500 px leer (`ueber-uns-1440-teil-3.png`). Vorschlag: `.team__bilder { grid-template-columns: 3fr 2fr; }` mit großem Bild links und den beiden kleinen untereinander rechts.
17. **Texte über leeren Platzhaltern:** „Fertige Räume, Fassaden und Details aus der Nähe – so sieht unsere Arbeit aus.“ (Startseite) und „Hier zeigen wir ausgewählte Aufträge …“ (Arbeiten) behaupten Inhalte, die noch fehlen. Nichts ändern, aber in die Launch-Checkliste aufnehmen: Ohne echte Referenzfotos zum Start die Arbeiten-Vorschau auf der Startseite ausblenden und „Arbeiten“ aus der Navigation nehmen. Leistungen MW-04 „wirken schnell wie neu“ ist ein leichtes Versprechen. Vorschlag an den Texter: „sehen frisch lackiert wieder gepflegt aus“.
18. **Active-Zustände:** Navigations-, Footer- und Sprungleisten-Links haben kein `:active`. Ergänzen: `.hauptnav__link:active, .fuss__liste a:active, .sprungleiste a:active { color: var(--farbe-rot-dunkel); }` (bzw. `transform: translateY(1px)` bei Kacheln).

---

## Geprüft und in Ordnung (Auswahl)

- **Mobile Navigation** (`nah-menue-offen-360-*.png`): vollflächiges Kalk-Panel, große Links mit Trennlinien, aktiver Punkt unterstrichen, „Direkt erreichen“ mit beiden Handlungen. Der Fokus bleibt im Panel, Escape schließt das Menü, die Aktionsleiste ist ausgeblendet. Ohne JS erscheint die Navigation als Zeile (`nah-ohne-js-360.png`).
- **Buttons** (`nah-button-*.png`, `nah-abschluss-fokus-1440.png`): Hover dunkelt ab und der Pfeil wandert. Der Fokusrahmen ist 3 px bei 3 px Abstand und auf Umbra in Kalk gut sichtbar. Sekundär-Hover kehrt die Farben um.
- **Formular-Fehlerzustand** (`nah-formular-fehler-*.png`): Zusammenfassung mit Sprunglinks, Feldrahmen in Rot dunkel, Meldungen mit Icon in Klartext, Gruppenfehler an der Erreichbarkeits-Gruppe. Stark umgesetzt.
- **Animationen (Code):** Einblendung mit `opacity`/`translateY` 16 px, 600 ms, `--ease-out`, Stagger 80 ms, einmalig per IntersectionObserver. Flächen-Reveal per `scaleX` 700 ms. Ausgangszustände nur mit JS und nur unterhalb des ersten Bildschirms. `prefers-reduced-motion` wird respektiert. Keine Parallax- oder Endlosanimationen.
- **404 und Danke** gestaltet und markentypisch („Diese Wand ist noch nicht fertig“).
- **Keine erfundenen Fakten** in den sichtbaren Texten gefunden. Alle Firmendaten sind als `[PLATZHALTER]` gekennzeichnet, und der Platzhalter-Stil (Leinen, gestrichelt) ist gut lesbar und nicht alarmierend.
