# Abschluss Malerwerk – Übersicht und Launch-Checkliste

## 1. Gestaltung
„Die saubere Kante“: matte Erdpigment-Flächen stoßen an harten, geraden Kanten aneinander – wie nach dem Abziehen des Klebebands. Farbtonkarten-Etiketten (MW-01 …) gliedern die Inhalte, der Ablauf erscheint als gestaffelter „Schichtaufbau“. Ruhig, genau, handfest und hell. Schrift: Archivo (Variable, Gewichts- und Breitenachse, OFL, lokal als WOFF2). Farben: Kalkweiß #F4F1EA / Leinen #E8E1D3 (60 %), Umbra #25221E und Grünerde #5E6B57 (30 %), Akzent Englischrot #A63A20 (10 %, nur für „Anfrage senden“ und „Anrufen“).

## 2. Referenzen
Es wurden keine Referenz-URLs geliefert. Ersatzweise wurden 17 branchenübliche Muster von Maler-Websites gefiltert (`design-brief.md`, Abschnitt 3): verworfen u. a. Farbkleckse, Pinsel/Rolle als Logo, Daumen-hoch-Stockfotos, Dunkelblau-Orange-Baukastenoptik; angepasst der Farbfächer (→ Farbtonkarten-Etiketten); übernommen das Vorher/Nachher-Prinzip.

## 3. Seitenaufbau
Start · Leistungen (6 Leistungen mit Sprungmarken) · Arbeiten (Referenzen) · Über uns · Kontakt (Formular) · Danke · Impressum · Datenschutz · 404. „Anfrage senden“ und „Anrufen“ stehen ab 1024 px im festen Header, darunter in einer festen Aktionsleiste unten, und am Seitenende in einem Abschlussband.

## 4. Ergebnis der letzten Prüfung (Runde 3 von 3 – bestanden)
- **Design:** Eigenständigkeit 5 · Branchenpassung 5 · Gesamteindruck 4 · Typografie 4 · Spacing/Layout 4 · Farbe/Bild 4 · Responsive 4 · Texte 5 · Zielerreichung 5
- **Lighthouse mobil** (index, leistungen, arbeiten, ueber-uns, kontakt): je 100/100/100/100, LCP 0,8 s, CLS 0
- **Abnahmekriterien:** alle erfüllt (axe 0 Verstöße, 0 externe Anfragen, 0 Konsolenfehler/kaputte Links, HTML valide, kein Querscrollen, Tastatur inkl. 1128 Fokus-Stopps ohne Verdeckung, Formular inkl. Honeypot und Header-Injection-Schutz)
- **Runden:** 3 (R1: Design 3er-Kategorien + VSBG-Satz; R2: Fokus hinter Aktionsleiste; R3: bestanden)

## 5. Bewusste Abweichungen und offene Punkte
Bewusste Abweichungen: siehe `abweichungen.md` (u. a. kein CSS-Minify zugunsten der Wartbarkeit; Scroll-Einblendungen im automatisierten Prüfbrowser aus; Angebot-Box auf der Leistungsseite ohne Buttons; Statuscodes 422/503 bei Formularfehlern).

Offene Feinschliff-Punkte aus Runde 3 (nicht mehr umgesetzt, Schleife nach 3 Runden beendet):
- Design P2-1: Arbeiten-Vorschau auf der Startseite – kleines 4:5-Bild wirkt dominanter als das große 3:2-Bild; Fassadenfläche ocker, aber Etikett MW-03 (Grünerde).
- Design P2-2: Mobil zu häufige Silbentrennung in Ablauf-Bändern und Leistungsindex (`hyphenate-limit-chars: 8 4 4` ergänzen).
- Design P3: Leerfläche neben dem Sorgfalt-Panel bei 1440 px, Kantenflucht Vorher/Nachher vs. Datenblatt, heller Streifen unter dem Footer mobil, Hero-Buttons + Aktionsleiste gleichzeitig sichtbar, breite Menü-Buttons bei 768 px, Hero-Bild bei 768 px rechtsbündig, Bildunterschriften Wandgestaltung mobil, `inhalte.md` an drei Stellen nicht mehr synchron mit dem HTML, Umbruch der Adress-Platzhalter im Footer.
- Technik P3: JSON-LD wird auf den PHP-Fehlerseiten mit HTML-Entities ausgegeben; Fokusrahmen des untersten Menü-Knopfs bei sehr niedriger Fensterhöhe angeschnitten; Mail-Zeitstempel in Serverzeit (`date_default_timezone_set('Europe/Berlin')`); JSON-LD-Logo besser als PNG (`icon-512.png`).

Details: `pruefung-design-runde-3.md`, `pruefung-technik-runde-3.md`.

## 6. Launch-Checkliste

**Daten liefern / Platzhalter ersetzen** (alle sichtbar als `[PLATZHALTER: …]`, Quelle: `_entwurf/build.mjs`, danach `node _entwurf/build.mjs` und `_entwurf/dist.sh`)
- [ ] Telefonnummer (Anzeige und `tel:`-Format +49…), E-Mail-Adresse, Straße/Hausnummer, PLZ, Ort
- [ ] Erreichbarkeit (Wochentage/Uhrzeiten)
- [ ] Alleinstellungsmerkmal (nur belegte Angaben, z. B. Meisterbetrieb, Gründungsjahr)
- [ ] Über uns: Geschichte des Betriebs, Inhaber/in, Qualifikation; Team (Namen, Aufgaben – nur mit Einverständnis)
- [ ] Weitere Orte im Einzugsgebiet
- [ ] Referenzprojekte: Titel, Ort, Leistung, Umfang, Farbton, Beschreibung – mit Kundenfreigabe
- [ ] Jahresangabe im Footer (Copyright)
- [ ] **Leistungsliste, Ablauf und Arbeitsweise bestätigen** (sechs Leistungen und Aussagen wie Abdecken/Abkleben, schriftliches Angebot, gemeinsame Abnahme wurden branchenüblich angenommen)

**Bilder**
- [ ] Fotos liefern (Hero, Leistungen, Referenzen inkl. Vorher/Nachher, Team, Details – Motive stehen in den Platzhaltern)
- [ ] Fotos nach `material/bilder/` legen, `node _entwurf/bilder.mjs` ausführen, Platzhalter durch `<picture>`-Snippets aus `_entwurf/bilder-austausch.md` ersetzen
- [ ] Bildnachweise im Impressum ergänzen oder streichen
- [ ] Optional: OG-Vorschaubild durch ein echtes Foto ersetzen (1200 × 630)

**Recht**
- [ ] Impressum: Firmenname mit Rechtsform, Inhaber/vertretungsberechtigte Person, Anschrift, Kontakt, Registergericht/-nummer (oder streichen), USt-IdNr. (oder streichen), **Wirtschafts-Identifikationsnummer ergänzen, falls vorhanden** (§ 5 Abs. 1 Nr. 6 DDG – Platzhalter fehlt noch), Berufsbezeichnung + Verleihungsstaat, Handwerkskammer, Verantwortlicher nach § 18 Abs. 2 MStV
- [ ] Erklärung zur Verbraucherstreitbeilegung (§ 36 VSBG) bestätigen oder anpassen
- [ ] **Impressum rechtlich prüfen lassen**
- [ ] **Datenschutzerklärung mit Generator (eRecht24, Datenschutz-Generator.de) oder anwaltlich erstellen/prüfen**, dabei: Hoster, Speicherdauer der Logfiles, Löschfrist für Anfragen, E-Mail-Anbieter, Landesdatenschutzbehörde, ggf. Datenschutzbeauftragter, Stand (Monat/Jahr); Anschrift der OpenStreetMap Foundation prüfen; Hinweis-Kasten danach entfernen
- [ ] Auftragsverarbeitungsvertrag (AVV) mit dem Hoster abschließen

**Domain, Server, Formular**
- [ ] Domain festlegen und `https://malerwerk.example` überall ersetzen (alle HTML-Dateien, `sitemap.xml`, `robots.txt`, `kontakt-config.php`, JSON-LD, OG-Bild-URLs)
- [ ] JSON-LD (`build.mjs`, Konstante `JSONLD`) um Telefon, E-Mail, Adresse, Öffnungszeiten ergänzen; Logo auf `icon-512.png` umstellen
- [ ] Webspace mit PHP ≥ 8.1 (mbstring, dom) und funktionierendem `mail()`
- [ ] `kontakt-config.php`: Empfänger-Adresse eintragen, Absender auf eine Adresse der eigenen Domain setzen (SPF/DKIM der Domain prüfen); Test-Anfrage senden und Eingang, Antwort-an und Umlaute prüfen
- [ ] In `kontakt.php` `date_default_timezone_set('Europe/Berlin');` ergänzen
- [ ] SSL-Zertifikat einrichten, danach in `.htaccess` HTTPS-Weiterleitung und HSTS aktivieren; SSL-Hinweis in der Datenschutzerklärung bestätigen
- [ ] `Options -Indexes` in `.htaccess` aktivieren, wenn der Hoster es erlaubt (sonst Fehler 500 → wieder auskommentieren)
- [ ] Inhalt von `dist/` per FTP/SFTP ins Webroot hochladen (inkl. der versteckten Datei `.htaccess`)
- [ ] Nach dem Upload: 404-Seite, Formular, alle Links und die Startseite unter `/` testen; Seite in der Google Search Console anmelden und Sitemap einreichen

## 7. Pfade
- Hochzuladende Dateien: `dist/` (neu erzeugen mit `_entwurf/dist.sh`)
- Finale Screenshots: `_entwurf/screenshots/runde-3/`
- Prüfberichte: `_entwurf/pruefung-design-runde-3.md`, `_entwurf/pruefung-technik-runde-3.md`
