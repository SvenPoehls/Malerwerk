// Erzeugt Logo-SVG, Favicon-Set, Web-Manifest und das Open-Graph-Bild.
// Aufruf (im Projektwurzelverzeichnis): node _entwurf/marke.mjs
// Geometrie und Farben laut _entwurf/design-brief.md, Abschnitt 4.
import sharp from 'sharp';
import { chromium } from 'playwright';
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';

const F = { kalk: '#F4F1EA', umbra: '#25221E', rot: '#A63A20', gruen: '#5E6B57' };
mkdirSync('assets/bilder', { recursive: true });

// Streifenmarke als Gruppe (viewBox 0 0 48 48)
const marke = (aussen = F.umbra, mitte = F.rot) =>
  `<rect x="0" y="0" width="12" height="48" fill="${aussen}"/>` +
  `<rect x="18" y="14" width="12" height="34" fill="${mitte}"/>` +
  `<rect x="36" y="0" width="12" height="48" fill="${aussen}"/>`;

// 1. Logo (Bildzeichen) als eigenständige Datei
writeFileSync('assets/bilder/logo.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><title>Malerwerk</title>${marke()}</svg>\n`);

// 2. favicon.svg – Zeichen ohne Hintergrund, im dunklen Browser-Thema Außenstreifen in Kalkweiß
writeFileSync('favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><style>.a{fill:${F.umbra}}.m{fill:${F.rot}}@media (prefers-color-scheme:dark){.a{fill:${F.kalk}}}</style>` +
  `<rect class="a" x="0" y="0" width="12" height="48"/><rect class="m" x="18" y="14" width="12" height="34"/><rect class="a" x="36" y="0" width="12" height="48"/></svg>\n`);

// 3. PNG-Icons: Kalkweiß-Fläche, Zeichen zentriert mit 60 % der Kantenlänge
const iconSvg = (groesse, anteil = 0.6) => {
  const z = groesse * anteil;
  const o = (groesse - z) / 2;
  const s = z / 48;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${groesse}" height="${groesse}" viewBox="0 0 ${groesse} ${groesse}">` +
    `<rect width="${groesse}" height="${groesse}" fill="${F.kalk}"/><g transform="translate(${o} ${o}) scale(${s})">${marke()}</g></svg>`);
};
const png = (g, anteil) => sharp(iconSvg(g, anteil)).png({ compressionLevel: 9 }).toBuffer();

writeFileSync('apple-touch-icon.png', await png(180));
writeFileSync('icon-192.png', await png(192));
writeFileSync('icon-512.png', await png(512));

// 4. favicon.ico aus PNG-Einträgen (16, 32, 48 px) – ICO-Container selbst zusammengebaut.
// Bei 16/32 px wird das Zeichen größer gesetzt (80 %), damit es lesbar bleibt.
const eintraege = [];
for (const g of [16, 32, 48]) eintraege.push({ g, daten: await png(g, g <= 32 ? 0.8 : 0.7) });
const kopf = Buffer.alloc(6);
kopf.writeUInt16LE(0, 0); kopf.writeUInt16LE(1, 2); kopf.writeUInt16LE(eintraege.length, 4);
let versatz = 6 + 16 * eintraege.length;
const verzeichnis = eintraege.map(({ g, daten }) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(g >= 256 ? 0 : g, 0); e.writeUInt8(g >= 256 ? 0 : g, 1);
  e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(daten.length, 8); e.writeUInt32LE(versatz, 12);
  versatz += daten.length;
  return e;
});
writeFileSync('favicon.ico', Buffer.concat([kopf, ...verzeichnis, ...eintraege.map((e) => e.daten)]));

// 5. Web-Manifest
writeFileSync('site.webmanifest', JSON.stringify({
  name: 'Malerwerk – Malerbetrieb in Musterstadt',
  short_name: 'Malerwerk',
  lang: 'de',
  start_url: '/',
  display: 'browser',
  theme_color: F.kalk, // wie <meta name="theme-color"> der Seiten (Kopfzeilenfarbe)
  background_color: F.kalk,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
}, null, 2) + '\n');

// 6. Open-Graph-Bild 1200 × 630: SVG im Markenstil mit lokal eingebetteter Archivo-Schrift
// (als Data-URI, keine Systemschrift). Chromium rendert das SVG, sharp schreibt das JPEG.
const font = readFileSync('assets/fonts/archivo-latin-wdth.woff2').toString('base64');
const feld = 480; // 40 % von 1200
const mz = 200; const ms = mz / 48;
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<style>
@font-face{font-family:"ArchivoOG";src:url(data:font/woff2;base64,${font}) format("woff2");font-weight:100 900;font-stretch:62% 125%}
.wort{font-family:"ArchivoOG";font-weight:700;font-stretch:125%;letter-spacing:0.02em;fill:${F.umbra}}
.unter{font-family:"ArchivoOG";font-weight:600;font-stretch:125%;letter-spacing:0.08em;fill:#5B554C}
</style>
<rect width="1200" height="630" fill="${F.kalk}"/>
<rect width="${feld}" height="630" fill="${F.gruen}"/>
<g transform="translate(${(feld - mz) / 2} ${(630 - mz) / 2}) scale(${ms})">${marke(F.kalk, F.rot)}</g>
<text class="wort" x="560" y="318" font-size="60">MALERWERK</text>
<rect x="560" y="352" width="14" height="14" fill="${F.rot}"/>
<text class="unter" x="586" y="366" font-size="20">MALERBETRIEB · MUSTERSTADT</text>
</svg>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(`<!doctype html><html><body style="margin:0">${ogSvg}</body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
const shot = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
await sharp(shot).jpeg({ quality: 86, mozjpeg: true }).toFile('assets/bilder/og-malerwerk.jpg');

console.log('Marke, Favicons, Manifest und OG-Bild erzeugt.');
