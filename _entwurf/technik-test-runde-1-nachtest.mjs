// Nachtest: Skip-Link nach Transition sichtbar? Menülink per Enter navigierbar?
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:4173';
const b = await chromium.launch();
for (const w of [360, 1440]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 800 } })).newPage();
  await p.goto(base + '/index.html', { waitUntil: 'networkidle' });
  await p.keyboard.press('Tab');
  await p.waitForTimeout(600);
  const r = await p.evaluate(() => { const el = document.activeElement; const bb = el.getBoundingClientRect(); const cs = getComputedStyle(el); return { cls: el.className, top: Math.round(bb.top), bottom: Math.round(bb.bottom), transform: cs.transform, outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, bg: cs.backgroundColor, color: cs.color }; });
  console.log('skip', w, JSON.stringify(r));
}
const p = await (await b.newContext({ viewport: { width: 360, height: 780 } })).newPage();
await p.goto(base + '/index.html', { waitUntil: 'networkidle' });
await p.focus('[data-menue-knopf]');
await p.keyboard.press('Enter'); await p.waitForTimeout(300);
await p.keyboard.press('Tab');
console.log('fokus', await p.evaluate(() => document.activeElement.textContent.trim()));
await Promise.all([p.waitForURL('**/arbeiten.html', { timeout: 5000 }).catch((e) => console.log('kein Navigieren', e.message)), p.keyboard.press('Enter')]);
console.log('url', p.url());
// Aktionsleiste mobil: per Tab erreichbar?
await p.goto(base + '/leistungen.html', { waitUntil: 'networkidle' });
const ids = [];
for (let i = 0; i < 200; i++) { await p.keyboard.press('Tab'); const t = await p.evaluate(() => (document.activeElement.closest('.aktionsleiste') ? 'AKTIONSLEISTE ' : '') + document.activeElement.tagName); ids.push(t); if (t.startsWith('AKTIONSLEISTE')) break; }
console.log('aktionsleiste erreicht nach', ids.length, ids.at(-1));
// Fokus verdeckt durch Aktionsleiste/sticky Header?
await p.goto(base + '/leistungen.html', { waitUntil: 'networkidle' });
const verdeckt = [];
for (let i = 0; i < 120; i++) {
  await p.keyboard.press('Tab'); await p.waitForTimeout(30);
  const v = await p.evaluate(() => { const el = document.activeElement; if (el === document.body) return 'ende'; if (el.closest('.aktionsleiste, .kopf')) return null; const r = el.getBoundingClientRect(); const x = r.left + Math.min(r.width / 2, 20), y = r.top + r.height / 2; const top = document.elementFromPoint(Math.max(0, x), Math.max(0, Math.min(innerHeight - 1, y))); if (!top) return 'ausserhalb ' + el.textContent.trim().slice(0, 30); return (el.contains(top) || top.contains(el)) ? null : 'verdeckt: ' + el.textContent.trim().slice(0, 30) + ' von ' + top.className; });
  if (v === 'ende') break; if (v) verdeckt.push(v);
}
console.log('verdeckt', JSON.stringify(verdeckt));
await b.close();
