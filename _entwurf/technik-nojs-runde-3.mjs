// Runde 3: Seiten ohne JavaScript (360 px) – Navigation erreichbar, Inhalte sichtbar, kein Querscrollen
import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, javaScriptEnabled: false });
const p = await ctx.newPage();
for (const s of ['/index.html', '/kontakt.html', '/impressum.html']) {
  await p.goto('http://localhost:4173' + s);
  const r = await p.evaluate(() => ({
    navSichtbar: [...document.querySelectorAll('.hauptnav__link')].filter((a) => a.getBoundingClientRect().height > 0 && getComputedStyle(a).visibility !== 'hidden').length,
    knopfSichtbar: getComputedStyle(document.querySelector('[data-menue-knopf]')).display,
    unsichtbar: [...document.querySelectorAll('main *')].filter((e) => parseFloat(getComputedStyle(e).opacity) < 1 && !e.closest('[aria-hidden=true]')).length,
    quer: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));
  console.log(s, JSON.stringify(r));
}
await b.close();
