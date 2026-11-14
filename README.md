# Malerwerk – Webseite (Entwurf 1)

Statischer Onepager (HTML, CSS, minimales JS, ohne Build-Tools). Zum Ansehen `index.html` im Browser öffnen.

```
index.html        Onepager: Hero → Anlässe → Leistungen → CTA → Ablauf → Wer wir sind → Referenzen → FAQ → Kontakt
impressum.html    Platzhalter – rechtlich prüfen!
datenschutz.html  Platzhalter – rechtlich prüfen!
css/style.css     Alle Styles; Farben & Schriften als CSS-Variablen in :root
js/main.js        Mobile Navigation, Einblenden, Jahr, Formularprüfung
assets/img/       Bilder (aktuell nur favicon.svg)
```

Geplante Unterseiten (Leistungen, Ablauf, Über uns, Referenzen, FAQ, Kontakt) sind im HTML als
Kommentar vermerkt; die Navigation springt vorerst zu den Abschnitten.

Platzhalter finden: `grep -rn "PLATZHALTER" .` – Beispieltexte sind mit `[MUSTERTEXT]` markiert.
