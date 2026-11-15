// Fokus-Verdeckungstest (Runde 3): geht bei mehreren Viewports alle Tab-Stopps jeder Seite durch
// (vorwärts und rückwärts) und prüft, ob das fokussierte Element von der festen Aktionsleiste oder
// dem Header verdeckt ist (Rechteckvergleich + elementFromPoint an der Elementmitte).
// Zusätzlich: Fokus per focus() aus den Sprunglinks der Fehlerzusammenfassung (Kontaktformular).
// Aufruf: node _entwurf/fokus-test-r3.mjs http://localhost:4173 _entwurf/fokus-test-r3.json
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const [, , basis = 'http://localhost:4173', ausgabe = '_entwurf/fokus-test-r3.json'] = process.argv;
const seiten = ['index', 'leistungen', 'arbeiten', 'ueber-uns', 'kontakt', 'danke', 'impressum', 'datenschutz', '404'];
const viewports = [[360, 800], [768, 1024], [720, 450]];

const pruefeFokus = () => {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return null;
  const r = el.getBoundingClientRect();
  const name = (el.id ? '#' + el.id : '') + ' ' + el.tagName.toLowerCase() + ' „' + (el.getAttribute('aria-label') || el.textContent || el.name || '').trim().replace(/\s+/g, ' ').slice(0, 40) + '“';
  const befunde = [];
  const ueberlapp = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  const flaeche = Math.max(1, r.width * r.height);
  for (const sel of ['.aktionsleiste', '.kopf']) {
    const leiste = document.querySelector(sel);
    if (!leiste || leiste.contains(el)) continue;
    if (sel === '.kopf' && el.classList.contains('skip-link')) continue; // liegt über dem Header (z-index 100)
    const cs = getComputedStyle(leiste);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const lr = leiste.getBoundingClientRect();
    const u = ueberlapp(r, lr);
    if (u > 0) befunde.push(`${sel} überdeckt ${Math.round((u / flaeche) * 100)} %`);
  }
  // Außerhalb des sichtbaren Bereichs?
  if (r.bottom <= 0 || r.top >= innerHeight) befunde.push('außerhalb des Viewports');
  // elementFromPoint an der Mitte des sichtbaren Teils
  const x = Math.min(Math.max(r.left + r.width / 2, 0), innerWidth - 1);
  const y = Math.min(Math.max(r.top + Math.min(r.height, innerHeight) / 2, 0), innerHeight - 1);
  const oben = document.elementFromPoint(x, y);
  if (oben && !el.contains(oben) && !oben.contains(el)) {
    const verdecker = oben.closest('.aktionsleiste, .kopf');
    if (verdecker && !verdecker.contains(el) && !el.classList.contains('skip-link')) befunde.push('elementFromPoint: ' + (verdecker.className.split(' ')[0]));
  }
  return { name, top: Math.round(r.top), bottom: Math.round(r.bottom), befunde };
};

const browser = await chromium.launch();
const ergebnis = { verdeckungen: [], stopps: 0, details: {} };

for (const [w, h] of viewports) {
  for (const s of seiten) {
    for (const richtung of ['vor', 'zurueck']) {
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      await page.goto(`${basis}/${s}.html`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(200);
      const gesehen = [];
      let erstes = null;
      for (let i = 0; i < 250; i++) {
        await page.keyboard.press(richtung === 'vor' ? 'Tab' : 'Shift+Tab');
        await page.waitForTimeout(40);
        let f = await page.evaluate(pruefeFokus);
        if (!f) continue;
        if (f.befunde.length) { // Übergänge (z. B. Skip-Link, 200 ms) abwarten und erneut messen
          await page.waitForTimeout(400);
          f = await page.evaluate(pruefeFokus);
          f.scrollY = await page.evaluate(() => scrollY);
        }
        const schluessel = f.name + '|' + i;
        if (erstes && f.name === erstes && i > 3) break;
        if (!erstes) erstes = f.name;
        gesehen.push(schluessel);
        ergebnis.stopps++;
        if (f.befunde.length) ergebnis.verdeckungen.push({ seite: s, viewport: `${w}x${h}`, richtung, ...f });
      }
      ergebnis.details[`${s} ${w}x${h} ${richtung}`] = gesehen.length;
      await page.close();
    }
  }
}

// Fokus per focus(): Sprunglinks der Fehlerzusammenfassung
for (const [w, h] of viewports) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(`${basis}/kontakt.html`, { waitUntil: 'networkidle' });
  await page.click('[data-senden]');
  await page.waitForTimeout(150);
  const sum = await page.evaluate(pruefeFokus);
  ergebnis.stopps++;
  if (sum && sum.befunde.length) ergebnis.verdeckungen.push({ seite: 'kontakt (Zusammenfassung)', viewport: `${w}x${h}`, ...sum });
  const anzahl = await page.locator('[data-fehlerliste] a').count();
  for (let i = 0; i < anzahl; i++) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator('[data-fehlerliste] a').nth(i).click();
    await page.waitForTimeout(100);
    const f = await page.evaluate(pruefeFokus);
    ergebnis.stopps++;
    if (f && f.befunde.length) ergebnis.verdeckungen.push({ seite: 'kontakt (Sprunglink)', viewport: `${w}x${h}`, ...f });
  }
  await page.close();
}

await browser.close();
writeFileSync(ausgabe, JSON.stringify(ergebnis, null, 2));
console.log(`Tab-Stopps geprüft: ${ergebnis.stopps}, Verdeckungen: ${ergebnis.verdeckungen.length}`);
for (const v of ergebnis.verdeckungen.slice(0, 30)) console.log(v.seite, v.viewport, v.richtung || '', v.name, v.befunde.join('; '));
