// Aufruf: node _entwurf/qa.mjs <Basis-URL> <Berichtsdatei> [/seite1.html /seite2.html ...]
// Prüft je Seite: externe Anfragen, Konsolenfehler, Barrierefreiheit (axe), defekte interne Links.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'node:fs';

const [, , baseUrl, out = '_entwurf/qa-bericht.json', ...pfade] = process.argv;
if (!baseUrl) {
  console.error('Aufruf: node _entwurf/qa.mjs <Basis-URL> <Berichtsdatei> [Seiten ...]');
  process.exit(1);
}
const seiten = pfade.length ? pfade : ['/'];
const host = new URL(baseUrl).host;
const browser = await chromium.launch();
const bericht = [];

for (const pfad of seiten) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const extern = new Set();
  const konsole = [];
  page.on('request', (r) => {
    try {
      const h = new URL(r.url()).host;
      if (h && h !== host) extern.add(h);
    } catch {}
  });
  page.on('console', (m) => { if (m.type() === 'error') konsole.push(m.text()); });
  page.on('pageerror', (e) => konsole.push(e.message));

  const res = await page.goto(new URL(pfad, baseUrl).href, { waitUntil: 'networkidle' });
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();

  const links = await page.$$eval('a[href]', (as) => as.map((a) => a.href));
  const kaputt = [];
  for (const link of [...new Set(links)]) {
    if (!link.startsWith('http') || new URL(link).host !== host) continue;
    const r = await page.request.get(link.split('#')[0]).catch(() => null);
    if (!r || r.status() >= 400) kaputt.push(link);
  }

  bericht.push({
    seite: pfad,
    status: res?.status(),
    externeAnfragen: [...extern],
    konsolenfehler: konsole,
    barrierefreiheit: axe.violations.map((v) => ({
      regel: v.id, schwere: v.impact, anzahl: v.nodes.length, hilfe: v.help,
    })),
    kaputteLinks: kaputt,
  });
  await context.close();
}
await browser.close();
writeFileSync(out, JSON.stringify(bericht, null, 2));
console.log(`QA-Bericht gespeichert in ${out}`);
