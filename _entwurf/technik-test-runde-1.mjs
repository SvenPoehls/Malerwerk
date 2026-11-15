// Technik-Prüfung Runde 1 (Agent 5): Overflow, Tastatur, Formular, Einblendungen ohne webdriver-Ausnahme.
// Aufruf: node _entwurf/technik-test-runde-1.mjs http://localhost:4173 _entwurf/technik-test-runde-1.json
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'node:fs';

const [, , base = 'http://localhost:4173', out = '_entwurf/technik-test-runde-1.json'] = process.argv;
const seiten = ['/index.html', '/leistungen.html', '/arbeiten.html', '/ueber-uns.html', '/kontakt.html',
  '/danke.html', '/impressum.html', '/datenschutz.html', '/404.html'];
const breiten = [360, 768, 1440];
const browser = await chromium.launch();
const erg = { overflow: [], tastatur: {}, formular: {}, reveal: [] };

// ---------- 1. Horizontales Scrollen ----------
for (const w of breiten) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  for (const s of seiten) {
    await page.goto(base + s, { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => {
      const d = document.documentElement;
      const breiter = [...document.querySelectorAll('body *')].filter((el) => {
        const b = el.getBoundingClientRect();
        return b.width > 0 && (b.right > d.clientWidth + 1 || b.left < -1) && getComputedStyle(el).position !== 'absolute' && !el.closest('.honig, .skip-link, .visuell-versteckt');
      }).slice(0, 5).map((el) => el.tagName.toLowerCase() + '.' + [...el.classList].join('.') + ' right=' + Math.round(el.getBoundingClientRect().right));
      return { scrollWidth: d.scrollWidth, clientWidth: d.clientWidth, bodyScroll: document.body.scrollWidth, breiter };
    });
    erg.overflow.push({ breite: w, seite: s, ...r, ok: r.scrollWidth <= r.clientWidth });
  }
  await ctx.close();
}

// ---------- 2. Tastatur ----------
const fokusInfo = (page) => page.evaluate(() => {
  const el = document.activeElement;
  if (!el) return null;
  const cs = getComputedStyle(el);
  const b = el.getBoundingClientRect();
  let ringSichtbar = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
  // Sonderfall: Ring auf Elternzeile (.index__zeile:has(:focus-visible))
  if (!ringSichtbar) {
    const z = el.closest('.index__zeile');
    if (z) { const zs = getComputedStyle(z); ringSichtbar = zs.outlineStyle !== 'none' && parseFloat(zs.outlineWidth) > 0; }
  }
  if (!ringSichtbar && cs.boxShadow && cs.boxShadow !== 'none') ringSichtbar = true;
  return {
    tag: el.tagName.toLowerCase(), id: el.id, cls: el.className && typeof el.className === 'string' ? el.className : '',
    text: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40),
    ringSichtbar, imViewport: b.bottom > 0 && b.top < innerHeight && b.width > 0 && b.height > 0,
  };
});

{
  // 2a Skip-Link (Desktop + Mobil)
  for (const w of [360, 1440]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(base + '/leistungen.html', { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    const erst = await fokusInfo(page);
    const skipSichtbar = await page.evaluate(() => { const b = document.querySelector('.skip-link').getBoundingClientRect(); return b.top >= 0 && b.bottom <= innerHeight; });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    const nach = await page.evaluate(() => ({ id: document.activeElement.id, hash: location.hash }));
    await page.keyboard.press('Tab');
    const danach = await fokusInfo(page);
    erg.tastatur['skip-' + w] = { erst, skipSichtbar, nachEnter: nach, naechsterFokus: danach };
    await ctx.close();
  }

  // 2b Mobile Navigation
  const ctx = await browser.newContext({ viewport: { width: 360, height: 780 } });
  const page = await ctx.newPage();
  await page.goto(base + '/index.html', { waitUntil: 'networkidle' });
  const knopf = page.locator('[data-menue-knopf]');
  let tabs = 0; let gefunden = false;
  while (tabs < 10) { await page.keyboard.press('Tab'); tabs++; if (await knopf.evaluate((k) => k === document.activeElement)) { gefunden = true; break; } }
  const knopfFokus = await fokusInfo(page);
  const menueVorher = await page.locator('[data-menue]').isVisible();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(400);
  const offen = { expanded: await knopf.getAttribute('aria-expanded'), sichtbar: await page.locator('[data-menue]').isVisible(), fokus: await fokusInfo(page) };
  // Fokusfalle prüfen: 15× Tab, alle im Menü oder Knopf?
  const tabFolge = [];
  for (let i = 0; i < 12; i++) { await page.keyboard.press('Tab'); tabFolge.push(await page.evaluate(() => { const a = document.activeElement; return (a.closest('[data-menue]') ? 'menue:' : a.matches('[data-menue-knopf]') ? 'knopf:' : 'AUSSERHALB:') + (a.textContent || '').trim().slice(0, 20); })); }
  const shiftTab = []; for (let i = 0; i < 3; i++) { await page.keyboard.press('Shift+Tab'); shiftTab.push(await page.evaluate(() => (document.activeElement.textContent || '').trim().slice(0, 20))); }
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  const zu = { expanded: await knopf.getAttribute('aria-expanded'), sichtbar: await page.locator('[data-menue]').isVisible(), fokusAufKnopf: await knopf.evaluate((k) => k === document.activeElement) };
  // Wieder öffnen per Space und per Enter auf Knopf schließen
  await page.keyboard.press('Space'); await page.waitForTimeout(300);
  const offen2 = await knopf.getAttribute('aria-expanded');
  await knopf.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(300);
  const zu2 = await knopf.getAttribute('aria-expanded');
  // Link im Menü per Tastatur auslösen
  await page.keyboard.press('Enter'); await page.waitForTimeout(300);
  await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
  await page.waitForLoadState('networkidle');
  const navigiert = page.url();
  erg.tastatur.mobilnav = { knopfPerTabErreicht: gefunden, tabs, knopfFokus, menueVorherSichtbar: menueVorher, offen, tabFolge, shiftTab, zuNachEscape: zu, offenPerSpace: offen2, zuPerEnter: zu2, navigiertPerEnter: navigiert };
  await ctx.close();

  // 2c Fokus sichtbar: alle fokussierbaren Elemente aller Seiten (Desktop & Mobil)
  const ohneRing = [];
  for (const w of [360, 1440]) {
    const c = await browser.newContext({ viewport: { width: w, height: 900 } });
    const p = await c.newPage();
    for (const s of seiten) {
      await p.goto(base + s, { waitUntil: 'networkidle' });
      const gesehen = new Set();
      for (let i = 0; i < 120; i++) {
        await p.keyboard.press('Tab');
        const f = await fokusInfo(p);
        if (!f || f.tag === 'body') break;
        const key = f.tag + f.id + f.text + f.cls;
        if (gesehen.has(key)) break;
        gesehen.add(key);
        if (!f.ringSichtbar || !f.imViewport) ohneRing.push({ breite: w, seite: s, ...f });
      }
    }
    await c.close();
  }
  erg.tastatur.fokusOhneRingOderAusserhalb = ohneRing;
}

// ---------- 3. Formular ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  const anfragen = [];
  page.on('request', (r) => { if (r.method() === 'POST') anfragen.push(r.url() + ' ' + r.postData()); });
  await page.route('**/kontakt.php*', (route) => route.fulfill({ status: 303, headers: { location: '/danke.html' } }));
  await page.goto(base + '/kontakt.html', { waitUntil: 'networkidle' });
  // Leer absenden per Tastatur
  await page.focus('#f-name');
  const reihenfolge = [];
  for (let i = 0; i < 10; i++) { const a = await page.evaluate(() => document.activeElement.id || document.activeElement.tagName); reihenfolge.push(a); if (a === 'BUTTON' || (await page.evaluate(() => document.activeElement.matches('[data-senden]')))) break; await page.keyboard.press('Tab'); }
  const honeypotImTab = reihenfolge.includes('f-website');
  await page.focus('[data-senden]');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  const leer = await page.evaluate(() => ({
    zusammenfassungSichtbar: !document.getElementById('fehler-zusammenfassung').hidden,
    fokus: document.activeElement.id,
    fehler: [...document.querySelectorAll('.fehlertext:not([hidden]) .fehlertext__text')].map((e) => e.textContent),
    invalid: [...document.querySelectorAll('[aria-invalid="true"]')].map((e) => e.id),
    describedName: document.getElementById('f-name').getAttribute('aria-describedby'),
    links: [...document.querySelectorAll('[data-fehlerliste] a')].map((a) => a.getAttribute('href')),
  }));
  // Sprunglink per Tastatur
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  const nachSprung = await page.evaluate(() => document.activeElement.id);
  const axeFehler = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations.map((v) => v.id + ':' + v.impact);
  // Ungültige Werte
  await page.fill('#f-name', 'Max Test');
  await page.fill('#f-email', 'keine-mail');
  await page.fill('#f-telefon', 'abc');
  await page.fill('#f-nachricht', 'Wohnzimmer streichen');
  await page.focus('[data-senden]'); await page.keyboard.press('Enter'); await page.waitForTimeout(300);
  const ungueltig = await page.evaluate(() => [...document.querySelectorAll('.fehlertext:not([hidden]) .fehlertext__text')].map((e) => e.textContent));
  // Korrigieren -> Meldungen verschwinden live
  await page.fill('#f-telefon', '');
  await page.fill('#f-email', 'max@example.org');
  await page.waitForTimeout(200);
  const nachKorrektur = await page.evaluate(() => ({ fehler: [...document.querySelectorAll('.fehlertext:not([hidden])')].map((e) => e.id), zus: !document.getElementById('fehler-zusammenfassung').hidden }));
  // Komplett per Tastatur ausfüllen und absenden
  await page.goto(base + '/kontakt.html', { waitUntil: 'networkidle' });
  anfragen.length = 0;
  await page.focus('#f-name');
  await page.keyboard.type('Erika Muster');
  await page.keyboard.press('Tab'); await page.keyboard.type('0123 456789');
  await page.keyboard.press('Tab'); await page.keyboard.type('erika@example.org');
  await page.keyboard.press('Tab'); await page.keyboard.type('12345 Musterstadt');
  await page.keyboard.press('Tab'); await page.keyboard.press('ArrowDown'); await page.keyboard.press('ArrowDown');
  const leistung = await page.inputValue('#f-leistung');
  await page.keyboard.press('Tab'); await page.keyboard.type('Zwei Zimmer neu streichen.');
  await page.keyboard.press('Tab'); await page.keyboard.type('flexibel');
  await page.keyboard.press('Tab');
  const nachZeitraum = await page.evaluate(() => document.activeElement.id || document.activeElement.tagName + ' ' + (document.activeElement.textContent || '').trim().slice(0, 30));
  await page.keyboard.press('Tab');
  const davor = await page.evaluate(() => document.activeElement.matches('[data-senden]') ? 'senden' : (document.activeElement.textContent || '').trim().slice(0, 30));
  if (davor !== 'senden') await page.focus('[data-senden]');
  await Promise.all([page.waitForURL('**/danke.html').catch(() => null), page.keyboard.press('Enter')]);
  erg.formular = { tabReihenfolge: reihenfolge, honeypotImTab, leer, nachSprung, axeNachFehlern: axeFehler, ungueltig, nachKorrektur, leistung, nachZeitraum, tabNachZeitraum2: davor, endUrl: page.url(), post: anfragen };
  // Leistungs-Vorauswahl ?leistung=
  await page.goto(base + '/kontakt.html?leistung=fassade#anfrage', { waitUntil: 'networkidle' });
  erg.formular.vorauswahl = await page.inputValue('#f-leistung');
  await ctx.close();

  // Ohne JS: native Pflichtfeldprüfung
  const ctx2 = await browser.newContext({ javaScriptEnabled: false });
  const p2 = await ctx2.newPage();
  await p2.goto(base + '/kontakt.html', { waitUntil: 'networkidle' });
  erg.formular.ohneJS = await p2.evaluate(() => ({ valid: document.getElementById('anfrageformular').checkValidity(), required: [...document.querySelectorAll('[required]')].map((e) => e.id) }));
  await ctx2.close();
}

// ---------- 4. Einblendungen ohne webdriver-Ausnahme ----------
for (const w of [360, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 } });
  await ctx.addInitScript(() => { Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false }); });
  for (const s of seiten) {
    const page = await ctx.newPage();
    await page.goto(base + s, { waitUntil: 'networkidle' });
    const wd = await page.evaluate(() => navigator.webdriver);
    const wartendStart = await page.evaluate(() => document.querySelectorAll('.ist-wartend').length);
    // schrittweise scrollen
    const hoehe = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= hoehe; y += 300) { await page.mouse.wheel(0, 300); await page.waitForTimeout(60); }
    await page.waitForTimeout(1500);
    const r = await page.evaluate(() => {
      const unsichtbar = [...document.querySelectorAll('.reveal, .kante')].filter((el) => parseFloat(getComputedStyle(el).opacity) < 1 || el.classList.contains('ist-wartend'));
      return { gesamt: document.querySelectorAll('.reveal, .kante').length, wartendEnde: document.querySelectorAll('.ist-wartend').length, opacityUnter1: unsichtbar.map((e) => e.className).slice(0, 5) };
    });
    const axe = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => v.id + ':' + v.impact + ':' + v.nodes.length);
    // Sprung ans Ende (Taste End) – Test der Absicherung
    await page.goto(base + s, { waitUntil: 'networkidle' });
    await page.keyboard.press('End');
    await page.waitForTimeout(1500);
    const nachEnde = await page.evaluate(() => {
      const unt = [...document.querySelectorAll('.reveal')].filter((el) => el.getBoundingClientRect().bottom < innerHeight && parseFloat(getComputedStyle(el).opacity) < 1);
      return unt.length;
    });
    erg.reveal.push({ breite: w, seite: s, webdriver: wd, wartendStart, ...r, axeSeriousCritical: axe, sichtbarAberTransparentNachEnd: nachEnde });
    await page.close();
  }
  await ctx.close();
}

await browser.close();
writeFileSync(out, JSON.stringify(erg, null, 2));
console.log('gespeichert', out);
