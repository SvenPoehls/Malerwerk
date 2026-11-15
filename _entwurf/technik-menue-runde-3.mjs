// Runde 3: mobiles Menü bei niedrigen Viewports – jeder Tab-Stopp im Bild und nicht verdeckt
import { chromium } from 'playwright';
const b = await chromium.launch();
for (const vp of [{ width: 720, height: 450 }, { width: 360, height: 480 }, { width: 1023, height: 400 }]) {
  const p = await b.newPage({ viewport: vp });
  await p.goto('http://localhost:4173/leistungen.html');
  await p.focus('[data-menue-knopf]'); await p.keyboard.press('Enter'); await p.waitForTimeout(400);
  const out = [];
  for (let i = 0; i < 8; i++) {
    const r = await p.evaluate(() => { const e = document.activeElement; const r = e.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return `${(e.getAttribute('aria-label') || e.textContent).trim().slice(0, 18)} [${Math.round(r.top)}-${Math.round(r.bottom)}/${innerHeight}] ${hit === e || e.contains(hit) ? 'ok' : 'VERDECKT/AUSSERHALB'}`; });
    out.push(r);
    await p.keyboard.press('Tab'); await p.waitForTimeout(60);
  }
  const scroll = await p.evaluate(() => { const m = document.querySelector('[data-menue]'); return { overflowY: getComputedStyle(m).overflowY, scrollH: m.scrollHeight, clientH: m.clientHeight, bodyScrollGesperrt: getComputedStyle(document.documentElement).overflow }; });
  console.log(vp.width + 'x' + vp.height, out.join(' | '), JSON.stringify(scroll));
  await p.close();
}
await b.close();
