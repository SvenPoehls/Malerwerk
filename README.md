# Malerwerk – Webseite (Entwurf)

Statischer Onepager mit reinem HTML, CSS und minimalem JavaScript – ohne Build-Tools.
Zum Ansehen `index.html` im Browser öffnen.

```
index.html        Onepager: Hero → Anlässe → Leistungen → Bildfläche/Zitat → Ablauf
                  → Wer wir sind → Referenzen → Fragen → Kontakt
impressum.html    Platzhalter – rechtlich prüfen!
datenschutz.html  Platzhalter – rechtlich prüfen!
404.html          Fehlerseite (beim Hoster als 404-Seite eintragen)
css/style.css     Alle Styles. Design-Tokens (Farben, Schriften, Abstände, Radien,
                  Schatten, Animation) zentral in :root
js/main.js        Mobile Navigation, Einblenden, Jahr, Formularprüfung
assets/img/       Bilder (aktuell nur favicon.svg)
```

## Hinweise

- **Unterseiten:** geplante Unterseiten (Leistungen, Ablauf, Über uns, Referenzen, FAQ,
  Kontakt) sind im HTML als Kommentar vermerkt; die Navigation springt vorerst zu den Abschnitten.
- **Icons:** Auswahl aus [Lucide](https://lucide.dev) (ISC-Lizenz) als SVG-Sprite am Anfang von `index.html`.
- **Bilder:** Platzhalter `<div class="ph">` innerhalb von `<figure class="media …">` durch
  `<img src="…" alt="…">` ersetzen – Seitenverhältnis und Zuschnitt regelt das CSS.
- **Formular:** prüft nur Pflichtfelder; Versand muss noch angebunden werden.
- **Schriften:** für den Livebetrieb (DSGVO) lokal einbinden statt über Google Fonts.

Offene Inhalte finden: `grep -rn "PLATZHALTER" .` – Beispieltexte sind mit `[MUSTERTEXT]` markiert.
