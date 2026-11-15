// Header-Kontrolle bei 1024 und 1280 px (Design-Prüfung Runde 1)
import { chromium } from 'playwright';
const b = await chromium.launch();
for (const w of [1024, 1280]) {
  const p = await b.newPage({ viewport: { width: w, height: 800 } });
  await p.goto('http://localhost:4173/index.html', { waitUntil: 'networkidle' });
  await p.screenshot({ path: `_entwurf/screenshots/runde-1/nah-header-hero-${w}.png` });
  await p.close();
}
await b.close();
