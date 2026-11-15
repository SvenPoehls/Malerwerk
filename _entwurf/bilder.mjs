// Bild-Pipeline Malerwerk: echte Fotos -> AVIF, WebP und JPEG in mehreren Breiten.
//
// Aufruf:  node _entwurf/bilder.mjs [Quellordner] [Zielordner]
//          Standard: material/bilder -> assets/bilder
//
// Dateinamen-Konvention in material/bilder/:
//   <sprechender-name>@<zuschnitt>.jpg   z. B.  wohnzimmer-gruen@hero.jpg
//   Ohne @<zuschnitt> wird "leistung" (3:2) verwendet.
//   Zuschnitte mit Art Direction (hero, quer) erzeugen zusätzlich die Mobil-Variante (4:3)
//   mit dem Suffix "-mobil".
//
// Ausgabe:  assets/bilder/<name>-<breite>.avif | .webp | .jpg
//           (Mobil-Variante: <name>-mobil-<breite>.*)
// Zuschnitte und Breiten laut _entwurf/design-brief.md, Abschnitt 10. Motiv mittig halten
// (position: "attention" sucht den Bildschwerpunkt; bei Bedarf auf "centre" stellen).
import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, parse } from 'node:path';

const [, , quelle = 'material/bilder', ziel = 'assets/bilder'] = process.argv;

export const ZUSCHNITTE = {
  hero:     { verhaeltnis: [4, 5],  breiten: [480, 800, 1200], mobil: { verhaeltnis: [4, 3], breiten: [480, 800] } },
  quer:     { verhaeltnis: [21, 9], breiten: [800, 1280, 1920], mobil: { verhaeltnis: [4, 3], breiten: [480, 800] } },
  leistung: { verhaeltnis: [3, 2],  breiten: [480, 800, 1200] },
  projekt:  { verhaeltnis: [3, 2],  breiten: [800, 1200, 1600] },
  hoch:     { verhaeltnis: [4, 5],  breiten: [480, 800] },
  quadrat:  { verhaeltnis: [1, 1],  breiten: [480, 800] },
};

const QUALITAET = { avif: { quality: 50, effort: 6 }, webp: { quality: 76, effort: 5 }, jpeg: { quality: 78, mozjpeg: true, progressive: true } };

async function erzeuge(datei, name, { verhaeltnis: [vb, vh], breiten }) {
  const meta = await sharp(datei).metadata();
  const ergebnisse = [];
  for (const breite of breiten) {
    if (meta.width && breite > meta.width) {
      console.warn(`  Hinweis: ${name} ist nur ${meta.width} px breit – ${breite} px wird übersprungen (kein Hochskalieren).`);
      continue;
    }
    const hoehe = Math.round((breite * vh) / vb);
    const basis = sharp(datei).rotate().resize(breite, hoehe, { fit: 'cover', position: sharp.strategy.attention }).withMetadata({ orientation: undefined });
    await basis.clone().avif(QUALITAET.avif).toFile(join(ziel, `${name}-${breite}.avif`));
    await basis.clone().webp(QUALITAET.webp).toFile(join(ziel, `${name}-${breite}.webp`));
    await basis.clone().jpeg(QUALITAET.jpeg).toFile(join(ziel, `${name}-${breite}.jpg`));
    ergebnisse.push(`${breite}×${hoehe}`);
  }
  console.log(`  ${name}: ${ergebnisse.join(', ') || '–'}`);
}

if (!existsSync(quelle)) {
  console.error(`Quellordner ${quelle} fehlt. Fotos als <name>@<zuschnitt>.jpg dort ablegen.`);
  process.exit(1);
}
mkdirSync(ziel, { recursive: true });
const dateien = readdirSync(quelle).filter((d) => /\.(jpe?g|png|tiff?|webp)$/i.test(d));
if (!dateien.length) console.warn(`Keine Bilder in ${quelle} gefunden.`);

for (const d of dateien) {
  const { name: roh } = parse(d);
  const [name, zuschnittName = 'leistung'] = roh.split('@');
  const zuschnitt = ZUSCHNITTE[zuschnittName];
  if (!zuschnitt) {
    console.warn(`Unbekannter Zuschnitt "${zuschnittName}" bei ${d} – erlaubt: ${Object.keys(ZUSCHNITTE).join(', ')}`);
    continue;
  }
  console.log(`${d} -> Zuschnitt ${zuschnittName} (${zuschnitt.verhaeltnis.join(':')})`);
  await erzeuge(join(quelle, d), name, zuschnitt);
  if (zuschnitt.mobil) await erzeuge(join(quelle, d), `${name}-mobil`, zuschnitt.mobil);
}
console.log('Fertig.');
