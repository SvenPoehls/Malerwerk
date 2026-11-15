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
