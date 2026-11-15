// Runde 3: Skip-Link-Sichtbarkeit nach Abschluss der Einblend-Transition
import { chromium } from 'playwright';
const b = await chromium.launch();
for (const vp of [{ width: 360, height: 800 }, { width: 768, height: 1024 }, { width: 720, height: 450 }, { width: 1440, height: 900 }]) {
  const p = await b.newPage({ viewport: vp });
  for (const s of ['/index.html', '/kontakt.html', '/datenschutz.html', '/404.html']) {
    await p.goto('http://localhost:4173' + s);
    await p.keyboard.press('Tab');
    const t = [];
    for (const ms of [0, 100, 250, 500]) {
      if (ms) await p.waitForTimeout(ms - (t.at(-1)?.ms ?? 0));
      t.push(await p.evaluate((ms) => { const e = document.activeElement; const r = e.getBoundingClientRect(); const k = document.querySelector('.kopf').getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + r.width / 2, Math.max(1, r.top + r.height / 2));
        return { ms, top: Math.round(r.top), bottom: Math.round(r.bottom), kopfBottom: Math.round(k.bottom), oben: hit === e || e.contains(hit), cls: e.className }; }, ms));
    }
    console.log(vp.width + 'x' + vp.height, s, JSON.stringify(t));
  }
  await p.close();
}
await b.close();
