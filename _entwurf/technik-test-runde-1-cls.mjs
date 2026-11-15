// CLS und LCP-Element mit aktiven Einblendungen (navigator.webdriver = false), mobil 360 px.
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:4173';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
await ctx.addInitScript(() => {
  Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false });
  window.__cls = 0; window.__lcp = '';
  new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  new PerformanceObserver((l) => { const e = l.getEntries().at(-1); window.__lcp = (e.element ? e.element.tagName + '.' + e.element.className : '') + ' @' + Math.round(e.startTime) + 'ms'; }).observe({ type: 'largest-contentful-paint', buffered: true });
});
for (const s of ['/index.html', '/leistungen.html', '/arbeiten.html', '/ueber-uns.html', '/kontakt.html']) {
  const p = await ctx.newPage();
  await p.goto(base + s, { waitUntil: 'networkidle' });
  const lcp = await p.evaluate(() => window.__lcp);
  for (let i = 0; i < 40; i++) { await p.mouse.wheel(0, 400); await p.waitForTimeout(40); }
  await p.waitForTimeout(1000);
  console.log(s, 'CLS', (await p.evaluate(() => window.__cls)).toFixed(4), 'LCP', lcp);
  await p.close();
}
await b.close();
