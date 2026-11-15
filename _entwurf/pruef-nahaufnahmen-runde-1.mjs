// Nahaufnahmen für die Design-Prüfung Runde 1 (Agent 4)
// Aufruf: node _entwurf/pruef-nahaufnahmen-runde-1.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = 'http://localhost:4173';
const out = '_entwurf/screenshots/runde-1';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();

// 1. Mobile Navigation geöffnet (360 px), Startseite und Leistungen
for (const seite of ['index', 'leistungen']) {
  const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
  await page.goto(`${base}/${seite}.html`, { waitUntil: 'networkidle' });
  await page.click('[data-menue-knopf]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/nah-menue-offen-360-${seite}.png` });
  // Fokus nach Tab im Menü
  await page.keyboard.press('Tab');
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${out}/nah-menue-offen-fokus-360-${seite}.png` });
  await page.close();
}

// 2. Primärbutton Hover und Fokus (1440 px, Header + Hero)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  const btn = page.locator('.hero .knopf--primaer');
  const box = await btn.boundingBox();
  const clip = { x: Math.max(0, box.x - 40), y: Math.max(0, box.y - 40), width: 640, height: box.height + 80 };
  await page.screenshot({ path: `${out}/nah-button-normal-1440.png`, clip });
  await btn.hover();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/nah-button-hover-1440.png`, clip });
  await page.mouse.move(5, 500);
  await page.waitForTimeout(300);
  // Fokus per Tastatur: bis zum Hero-Button tabben
  await page.keyboard.press('Tab'); // Skip-Link
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const ist = await page.evaluate(() => document.activeElement?.closest('.hero') && document.activeElement.classList.contains('knopf--primaer'));
    if (ist) break;
  }
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/nah-button-fokus-1440.png`, clip });
  // Sekundärbutton hover
  const sek = page.locator('.hero .knopf--sekundaer');
  await sek.hover();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/nah-button-sekundaer-hover-1440.png`, clip });
  // Header-Bereich
  await page.screenshot({ path: `${out}/nah-header-1440.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });
  // Hover Leistungsindex-Zeile
  await page.locator('.index__zeile').nth(1).scrollIntoViewIfNeeded();
  await page.locator('.index__zeile').nth(1).hover();
  await page.waitForTimeout(400);
  const z = await page.locator('.index__liste').boundingBox();
  await page.screenshot({ path: `${out}/nah-index-hover-1440.png`, clip: { x: z.x - 20, y: z.y - 20, width: z.width + 40, height: 360 } });
  // Abschlussband-Buttons Fokus
  await page.close();
}
{
  // Fokus auf dunklem Grund (Abschlussband) und Hover
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  const p = page.locator('.abschluss .knopf--primaer');
  await p.scrollIntoViewIfNeeded();
  await p.focus();
  await page.evaluate(() => document.activeElement.classList.add('x'));
  // focus() via Skript setzt :focus-visible nur bei Tastatur – darum Tab-Sequenz
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await page.waitForTimeout(300);
  const a = await page.locator('.abschluss').boundingBox();
  await page.screenshot({ path: `${out}/nah-abschluss-fokus-1440.png`, clip: { x: 0, y: a.y, width: 1440, height: a.height } });
  await page.close();
}

// 3. Formular mit Fehlermeldungen nach leerem Absenden (360 und 1440)
for (const breite of [360, 1440]) {
  const page = await browser.newPage({ viewport: { width: breite, height: breite < 768 ? 800 : 900 } });
  await page.goto(`${base}/kontakt.html`, { waitUntil: 'networkidle' });
  await page.click('[data-senden]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/nah-formular-fehler-${breite}-oben.png` });
  const f = await page.locator('.formular-box').boundingBox();
  const sy = await page.evaluate(() => window.scrollY);
  await page.screenshot({
    path: `${out}/nah-formular-fehler-${breite}-ganz.png`,
    fullPage: true,
    clip: { x: Math.max(0, f.x - 8), y: f.y + sy - 8, width: Math.min(breite, f.width + 16), height: f.height + 16 },
  });
  // Feld-Fokus-Zustand
  await page.locator('#f-name').focus();
  await page.keyboard.type('A');
  await page.keyboard.press('Backspace');
  await page.waitForTimeout(200);
  await page.close();
}

// 4. Formular Feldfokus per Tastatur (1440)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}/kontakt.html#anfrage`, { waitUntil: 'networkidle' });
  await page.locator('#f-name').click();
  await page.keyboard.press('Tab');
  await page.waitForTimeout(200);
  const f = await page.locator('.formular-box').boundingBox();
  await page.screenshot({ path: `${out}/nah-formular-feldfokus-1440.png`, clip: { x: f.x, y: Math.max(0, f.y), width: f.width, height: 700 } });
  await page.close();
}

// 5. Leistungen mit ?leistung=fassade (Vorauswahl) – nur Kontrolle
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}/kontakt.html?leistung=fassade#anfrage`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/nah-kontakt-anker-1440.png` });
  await page.close();
}

// 6. Ohne JavaScript, mobil (Navigation ohne JS)
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${out}/nah-ohne-js-360.png` });
  await ctx.close();
}

await browser.close();
console.log('Nahaufnahmen gespeichert.');
