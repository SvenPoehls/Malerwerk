// Nahaufnahmen Design-Prüfung Runde 3
// Aufruf: node _entwurf/pruef-nahaufnahmen-runde-3.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = 'http://localhost:4173';
const out = '_entwurf/screenshots/runde-3';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();

// 1. Mobile Navigation geöffnet (360 px), auf Startseite und Kontakt
for (const seite of ['index', 'leistungen']) {
  const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
  await page.goto(`${base}/${seite}.html`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${out}/nah-mobilnav-${seite}-360-zu.png` });
  await page.click('[data-menue-knopf]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/nah-mobilnav-${seite}-360-offen.png` });
  // Fokus per Tastatur im Panel
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${out}/nah-mobilnav-${seite}-360-offen-fokus.png` });
  await page.close();
}
// Mobilnav 768
{
  const page = await browser.newPage({ viewport: { width: 768, height: 900 } });
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  await page.click('[data-menue-knopf]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/nah-mobilnav-index-768-offen.png` });
  await page.close();
}

// 2. Primärer Button: Normal, Hover, Fokus, Active (1440, Hero) + Sekundärbutton
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  const knopfreihe = page.locator('.hero .knopfreihe');
  const box = await knopfreihe.boundingBox();
  const clip = { x: box.x - 24, y: box.y - 24, width: box.width + 48, height: box.height + 48 };
  await page.mouse.move(5, 5);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/nah-knopf-normal-1440.png`, clip });
  const prim = page.locator('.hero .knopf--primaer');
  await prim.hover();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/nah-knopf-hover-1440.png`, clip });
  await page.mouse.move(5, 5);
  await page.waitForTimeout(300);
  // Fokus per Tastatur: bis zum Hero-Button tabben
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  await page.locator('.hero .etikett').first().click();
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab');
    const ok = await page.evaluate(() => document.activeElement?.matches('.hero .knopf--primaer'));
    if (ok) break;
  }
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/nah-knopf-fokus-1440.png`, clip });
  await page.keyboard.press('Tab');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/nah-knopf-sekundaer-fokus-1440.png`, clip });
  await prim.hover();
  await page.mouse.down();
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${out}/nah-knopf-active-1440.png`, clip });
  await page.mouse.move(5, 5);
  await page.mouse.up();
  await page.waitForTimeout(300);
  // Header-Button und Sekundär-Hover
  await page.locator('.hero .knopf--sekundaer').hover();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/nah-knopf-sekundaer-hover-1440.png`, clip });
  // Abschlussband-Buttons auf Umbra mit Fokus
  const band = page.locator('.abschluss, .abschlussband, [class*="abschluss"]').first();
  if (await band.count()) {
    await band.scrollIntoViewIfNeeded();
    const bb = await band.boundingBox();
    const bprim = band.locator('.knopf--primaer').first();
    await bprim.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/nah-abschlussband-fokus-1440.png`, clip: { x: 0, y: bb.y, width: 1440, height: Math.min(bb.height, 700) } });
  }
  await page.close();
}

// 3. Formular: leer absenden (360 und 1440)
for (const [w, h] of [[360, 800], [1440, 900]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(`${base}/kontakt.html`, { waitUntil: 'networkidle' });
  const form = page.locator('[data-formular]');
  await form.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${out}/nah-formular-leer-${w}.png`, fullPage: false });
  await page.locator('[data-senden]').click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}/nah-formular-fehler-${w}-sicht.png` });
  const fb = await form.boundingBox();
  const scrollY = await page.evaluate(() => window.scrollY);
  await page.screenshot({
    path: `${out}/nah-formular-fehler-${w}.png`,
    fullPage: true,
    clip: { x: 0, y: Math.max(0, fb.y + scrollY - 80), width: w, height: fb.height + 160 },
  });
  // Teilweise ausgefüllt: ungültige E-Mail
  await page.fill('input[name="name"]', 'Erika Muster');
  await page.fill('input[name="email"]', 'erika@');
  await page.locator('[data-senden]').click();
  await page.waitForTimeout(600);
  const fb2 = await form.boundingBox();
  const sy2 = await page.evaluate(() => window.scrollY);
  await page.screenshot({
    path: `${out}/nah-formular-fehler-email-${w}.png`,
    fullPage: true,
    clip: { x: 0, y: Math.max(0, fb2.y + sy2 - 80), width: w, height: Math.min(fb2.height + 160, 2400) },
  });
  await page.close();
}

// 4. Header nach Scroll (1440) und Leistungszeile Hover
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/nah-header-gescrollt-1440.png`, clip: { x: 0, y: 0, width: 1440, height: 200 } });
  const zeile = page.locator('.index__zeile a, .index__zeile').first();
  await zeile.scrollIntoViewIfNeeded();
  await zeile.hover();
  await page.waitForTimeout(400);
  const zb = await page.locator('.index__liste').boundingBox();
  await page.screenshot({ path: `${out}/nah-leistungsindex-hover-1440.png`, clip: { x: zb.x - 20, y: zb.y - 20, width: zb.width + 40, height: Math.min(zb.height + 40, 800) } });
  await page.close();
}

await browser.close();
console.log('Nahaufnahmen gespeichert in', out);
