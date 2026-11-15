// Nahaufnahmen Design-Prüfung Runde 2
import { chromium } from 'playwright';
const out = '_entwurf/screenshots/runde-2';
const base = 'http://localhost:4173';
const browser = await chromium.launch();

// 1. Mobile Navigation geöffnet (360 px) – Startseite und Kontakt
for (const seite of ['index', 'kontakt']) {
  const p = await browser.newPage({ viewport: { width: 360, height: 800 } });
  await p.goto(`${base}/${seite}.html`, { waitUntil: 'networkidle' });
  await p.click('[data-menue-knopf]');
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/nah-menue-offen-360-${seite}.png` });
  await p.close();
}
// Mobile Navigation 768
{
  const p = await browser.newPage({ viewport: { width: 768, height: 900 } });
  await p.goto(`${base}/leistungen.html`, { waitUntil: 'networkidle' });
  await p.click('[data-menue-knopf]');
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/nah-menue-offen-768.png` });
  await p.close();
}

// 2. Primärbutton Hover und Fokus (1440, Hero) + Sekundär
{
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  const btn = p.locator('.hero .knopf--primaer');
  const box = await btn.boundingBox();
  const clip = { x: box.x - 40, y: box.y - 40, width: 560, height: box.height + 120 };
  await p.screenshot({ path: `${out}/nah-knopf-normal.png`, clip });
  await btn.hover();
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/nah-knopf-hover.png`, clip });
  await p.mouse.move(0, 0);
  await p.waitForTimeout(300);
  // Fokus per Tastatur
  await p.keyboard.press('Tab');
  for (let i = 0; i < 30; i++) {
    const ist = await p.evaluate(() => document.activeElement?.closest('.hero') && document.activeElement.classList.contains('knopf--primaer'));
    if (ist) break;
    await p.keyboard.press('Tab');
  }
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${out}/nah-knopf-fokus.png`, clip });
  await p.keyboard.press('Tab');
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${out}/nah-knopf-sekundaer-fokus.png`, clip });
  // Sekundär hover
  await p.locator('.hero .knopf--sekundaer').hover();
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/nah-knopf-sekundaer-hover.png`, clip });
  // Header-Fokus
  await p.evaluate(() => document.activeElement.blur());
  await p.keyboard.press('Tab');
  await p.keyboard.press('Tab');
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${out}/nah-kopf-fokus.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });
  // Abschlussband Buttons hover/fokus
  const ab = p.locator('.abschluss .knopf--primaer');
  await ab.scrollIntoViewIfNeeded();
  await ab.focus();
  await p.waitForTimeout(300);
  const abox = await ab.boundingBox();
  await p.screenshot({ path: `${out}/nah-abschluss-fokus.png`, clip: { x: abox.x - 40, y: abox.y - 160, width: 600, height: 300 } });
  // Leistungsindex Hover
  const zeile = p.locator('.index__zeile').nth(2);
  await zeile.scrollIntoViewIfNeeded();
  await zeile.hover();
  await p.waitForTimeout(400);
  const zb = await zeile.boundingBox();
  await p.screenshot({ path: `${out}/nah-index-hover.png`, clip: { x: zb.x - 20, y: zb.y - 20, width: zb.width + 40, height: zb.height + 40 } });
  await p.close();
}

// 3. Formular mit Fehlern nach leerem Absenden (360 und 1440)
for (const w of [360, 1440]) {
  const p = await browser.newPage({ viewport: { width: w, height: w < 768 ? 800 : 900 } });
  await p.goto(`${base}/kontakt.html`, { waitUntil: 'networkidle' });
  await p.click('[data-senden]');
  await p.waitForTimeout(500);
  await p.screenshot({ path: `${out}/nah-formular-fehler-${w}-oben.png` });
  const form = p.locator('.formular-box');
  const fb = await form.boundingBox();
  await p.screenshot({ path: `${out}/nah-formular-fehler-${w}-ganz.png`, fullPage: true, clip: { x: 0, y: fb.y - 20, width: w, height: fb.height + 40 } });
  await p.close();
}
await browser.close();
console.log('fertig');
