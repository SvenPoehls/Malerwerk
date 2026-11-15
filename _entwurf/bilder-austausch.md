# Bilder austauschen – Platzhalter „Musterfläche“ → echtes Foto

## 1. Fotos vorbereiten
1. Originalfotos (JPEG, möglichst ≥ 2000 px breit) nach `material/bilder/` legen, Dateiname nach Muster
   `<sprechender-name>@<zuschnitt>.jpg`, z. B. `wohnzimmer-gruen@hero.jpg`.
   Zuschnitte: `hero` (4:5 + mobil 4:3), `quer` (21:9 + mobil 4:3), `leistung` (3:2), `projekt` (3:2, größere Breiten), `hoch` (4:5), `quadrat` (1:1).
2. `node _entwurf/bilder.mjs` ausführen → `assets/bilder/<name>-<breite>.avif|webp|jpg` (bei hero/quer zusätzlich `<name>-mobil-<breite>.*`).

## 2. Im HTML ersetzen
In jedem Platzhalter steht ein Kommentar mit dem fertigen Alt-Text. Ersetzt wird **nur** das `div.motiv__flaeche` (inkl. Inhalt).
`figure`, die Klasse für das Seitenverhältnis (`sv-…`) und eine evtl. `figcaption` bleiben – dadurch ändert sich das Layout nicht.

### Standard (z. B. Leistungsabschnitt 3:2, unterhalb des ersten Bildschirms)
```html
<figure class="motiv sv-3-2">
  <picture>
    <source type="image/avif" srcset="assets/bilder/innenanstrich-480.avif 480w, assets/bilder/innenanstrich-800.avif 800w, assets/bilder/innenanstrich-1200.avif 1200w" sizes="(min-width: 1024px) 50vw, 100vw">
    <source type="image/webp" srcset="assets/bilder/innenanstrich-480.webp 480w, assets/bilder/innenanstrich-800.webp 800w, assets/bilder/innenanstrich-1200.webp 1200w" sizes="(min-width: 1024px) 50vw, 100vw">
    <img class="motiv__bild" src="assets/bilder/innenanstrich-800.jpg"
         srcset="assets/bilder/innenanstrich-480.jpg 480w, assets/bilder/innenanstrich-800.jpg 800w, assets/bilder/innenanstrich-1200.jpg 1200w"
         sizes="(min-width: 1024px) 50vw, 100vw" width="1200" height="800"
         alt="Eine Wohnzimmerwand wird mit der Farbrolle gestrichen, der Boden darunter ist mit Malervlies abgedeckt."
         loading="lazy" decoding="async">
  </picture>
</figure>
```

### Hero der Startseite (Art Direction 4:5 / mobil 4:3, oberhalb des ersten Bildschirms)
Das grüne Feld (`span.hero__feld`) im `div.hero__rahmen` bleibt stehen, nur `div.motiv__flaeche` wird ersetzt:
```html
<div class="hero__rahmen"><span class="hero__feld" aria-hidden="true"></span>
  <picture>
    <source media="(min-width: 768px)" type="image/avif" srcset="assets/bilder/wohnzimmer-480.avif 480w, assets/bilder/wohnzimmer-800.avif 800w, assets/bilder/wohnzimmer-1200.avif 1200w" sizes="(min-width: 1024px) 40vw, 100vw">
    <source media="(min-width: 768px)" type="image/webp" srcset="assets/bilder/wohnzimmer-480.webp 480w, assets/bilder/wohnzimmer-800.webp 800w, assets/bilder/wohnzimmer-1200.webp 1200w" sizes="(min-width: 1024px) 40vw, 100vw">
    <source media="(min-width: 768px)" srcset="assets/bilder/wohnzimmer-480.jpg 480w, assets/bilder/wohnzimmer-800.jpg 800w, assets/bilder/wohnzimmer-1200.jpg 1200w" sizes="(min-width: 1024px) 40vw, 100vw" width="1200" height="1500">
    <source type="image/avif" srcset="assets/bilder/wohnzimmer-mobil-480.avif 480w, assets/bilder/wohnzimmer-mobil-800.avif 800w" sizes="100vw">
    <source type="image/webp" srcset="assets/bilder/wohnzimmer-mobil-480.webp 480w, assets/bilder/wohnzimmer-mobil-800.webp 800w" sizes="100vw">
    <img class="motiv__bild" src="assets/bilder/wohnzimmer-mobil-800.jpg" srcset="assets/bilder/wohnzimmer-mobil-480.jpg 480w, assets/bilder/wohnzimmer-mobil-800.jpg 800w" sizes="100vw"
         width="800" height="600" alt="Frisch gestrichenes, leeres Wohnzimmer bei Tageslicht – die Wand in einem gedeckten Grünton, darüber eine gerade Kante zur weißen Decke."
         fetchpriority="high" decoding="async">
  </picture>
</div>
```
Querbilder (`sv-quer`, 21:9 / mobil 4:3) analog mit `sizes="100vw"`.

## Regeln
- `width`/`height` = Pixelmaße der größten Variante des jeweiligen Zuschnitts (verhindert Layoutsprung; die CSS-Klasse `motiv__bild` setzt `aspect-ratio` und `object-fit: cover`).
- Nur das Hero-Bild: `fetchpriority="high"`, **kein** `loading="lazy"`. Alle anderen: `loading="lazy"`.
- Alt-Text aus dem Kommentar im Platzhalter bzw. aus `_entwurf/inhalte.md` übernehmen; `[PLATZHALTER: …]` in Alt-Texten durch die echte Beschreibung ersetzen.
- Den HTML-Kommentar des Platzhalters danach löschen.
- Die Seiten entstehen aus `_entwurf/build.mjs` – Änderungen am besten dort in der Funktion `motiv()` bzw. am jeweiligen Aufruf vornehmen und `node _entwurf/build.mjs` ausführen; alternativ direkt in den HTML-Dateien.
