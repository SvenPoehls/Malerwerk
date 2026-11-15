// Technik-Prüfung Runde 2 (Agent 5) – eigene Playwright-Tests.
// Aufruf: node _entwurf/technik-test-runde-2.mjs <statische Basis-URL> <PHP-Basis-URL mit Fake-Sendmail> <Berichtsdatei>
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'node:fs';

const [, , BASIS = 'http://localhost:4173', PHP = 'http://127.0.0.1:8098', OUT = '_entwurf/technik-test-runde-2.json'] = process.argv;
const SEITEN = ['/index.html', '/leistungen.html', '/arbeiten.html', '/ueber-uns.html', '/kontakt.html', '/danke.html', '/impressum.html', '/datenschutz.html', '/404.html'];
const BREITEN = [360, 768, 1440];
const ergebnis = { horizontal: [], ueberstand: [], skip: [], navigation: [], fokus: [], verdeckt: [], formularTab: [], validierung: [], reveal: [], axeOhneWebdriver: [], konsole: [] };

const browser = await chromium.launch();

// ---------- 1. Horizontales Scrollen ----------
for (const breite of BREITEN) {
  const ctx = await browser.newContext({ viewport: { width: breite, height: breite < 768 ? 800 : 900 } });
  for (const s of SEITEN) {
    const p = await ctx.newPage();
    await p.goto(BASIS + s, { waitUntil: 'networkidle' });
    const r = await p.evaluate(() => {
      const de = document.documentElement;
      const vw = de.clientWidth;
      const raus = [];
      document.querySelectorAll('body *').forEach((el) => {
        const b = el.getBoundingClientRect();
        if (!b.width || !b.height) return;
        const cs = getComputedStyle(el);
        if (cs.position === 'fixed' && cs.visibility === 'hidden') return;
        if (b.right > vw + 1 || b.left < -1) {
          // Elemente, die bewusst außerhalb liegen (Skip-Link, Honeypot, visuell versteckt) ignorieren, wenn ein Vorfahr clippt
          let clip = false;
          for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
            const o = getComputedStyle(a).overflowX;
            if (o === 'hidden' || o === 'clip' || o === 'auto' || o === 'scroll') { clip = true; break; }
          }
          if (!clip) raus.push((el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : el.tagName) + ` [${Math.round(b.left)}..${Math.round(b.right)}]`);
        }
      });
      return { scrollW: de.scrollWidth, clientW: vw, bodyScrollW: document.body.scrollWidth, raus: raus.slice(0, 8) };
    });
    ergebnis.horizontal.push({ seite: s, breite, scrollW: r.scrollW, clientW: r.clientW, ok: r.scrollW <= r.clientW });
    if (r.raus.length) ergebnis.ueberstand.push({ seite: s, breite, elemente: r.raus });
    await p.close();
  }
  await ctx.close();
}

// Hilfsfunktion: Fokus-Info
const fokusInfo = (p) => p.evaluate(() => {
  const el = document.activeElement;
  if (!el || el === document.body) return { tag: 'BODY' };
  const hatRing = (e) => {
    const cs = getComputedStyle(e);
    const ow = parseFloat(cs.outlineWidth) || 0;
    return (cs.outlineStyle !== 'none' && ow >= 1) || (cs.boxShadow && cs.boxShadow !== 'none');
  };
  let ring = hatRing(el);
  if (!ring) { for (let a = el.parentElement, i = 0; a && i < 3; a = a.parentElement, i++) if (hatRing(a)) { ring = true; break; } }
  const b = el.getBoundingClientRect();
  const cx = Math.min(Math.max(b.left + b.width / 2, 0), innerWidth - 1);
  const cy = Math.min(Math.max(b.top + b.height / 2, 0), innerHeight - 1);
  const oben = document.elementFromPoint(cx, cy);
  const verdeckt = oben && !el.contains(oben) && !oben.contains(el) ? (oben.closest('.aktionsleiste,.kopf') ? (oben.closest('.aktionsleiste') ? 'aktionsleiste' : 'kopf') : oben.tagName) : null;
  return {
    tag: el.tagName, id: el.id, text: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40),
    ring, sichtbar: b.width > 0 && b.height > 0 && b.bottom > 0 && b.top < innerHeight,
    verdeckt, top: Math.round(b.top), bottom: Math.round(b.bottom), vh: innerHeight,
  };
});

// ---------- 2. Skip-Link, Fokus sichtbar, Verdeckung ----------
for (const breite of [360, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: breite, height: breite < 768 ? 800 : 900 } });
  for (const s of SEITEN) {
    const p = await ctx.newPage();
    const konsole = [];
    p.on('console', (m) => { if (m.type() === 'error') konsole.push(m.text()); });
    p.on('pageerror', (e) => konsole.push(e.message));
    await p.goto(BASIS + s, { waitUntil: 'networkidle' });
    await p.keyboard.press('Tab');
    const skip = await fokusInfo(p);
    const skipSichtbar = await p.evaluate(() => { const b = document.activeElement.getBoundingClientRect(); return b.top >= 0 && b.bottom <= innerHeight && b.width > 0; });
    await p.keyboard.press('Enter');
    await p.waitForTimeout(400);
    const nachSkip = await p.evaluate(() => document.activeElement.id);
    await p.keyboard.press('Tab');
    const ersterInhalt = await fokusInfo(p);
    ergebnis.skip.push({ seite: s, breite, skipText: skip.text, skipSichtbar, skipRing: skip.ring, fokusNachEnter: nachSkip, naechsterStopp: ersterInhalt.text, naechsterImInhalt: await p.evaluate(() => !!document.activeElement.closest('main')) });

    // Alle Tab-Stopps durchgehen
    await p.goto(BASIS + s, { waitUntil: 'networkidle' });
    const ohneRing = []; const unsichtbar = []; const verdeckt = [];
    let n = 0; const gesehen = new Set();
    for (; n < 120; n++) {
      await p.keyboard.press('Tab');
      await p.waitForTimeout(30);
      const f = await fokusInfo(p);
      if (f.tag === 'BODY') break;
      const key = f.tag + f.id + f.text + f.top;
      if (gesehen.has(key) && n > 3) break;
      gesehen.add(key);
      if (!f.ring) ohneRing.push(f.tag + ' ' + f.text);
      if (!f.sichtbar) unsichtbar.push(f.tag + ' ' + (f.id || f.text));
      if (f.verdeckt) verdeckt.push(`${f.tag} "${f.text}" von ${f.verdeckt} (top ${f.top}, bottom ${f.bottom}, vh ${f.vh})`);
    }
    ergebnis.fokus.push({ seite: s, breite, tabStopps: n, ohneRing, unsichtbar });
    if (verdeckt.length) ergebnis.verdeckt.push({ seite: s, breite, anzahl: verdeckt.length, beispiele: verdeckt.slice(0, 5) });
    if (konsole.length) ergebnis.konsole.push({ seite: s, breite, konsole });
    await p.close();
  }
  await ctx.close();
}

// ---------- 3. Mobile Navigation per Tastatur ----------
for (const breite of [360, 768]) {
  const ctx = await browser.newContext({ viewport: { width: breite, height: 800 } });
  const p = await ctx.newPage();
  await p.goto(BASIS + '/leistungen.html', { waitUntil: 'networkidle' });
  const r = { breite };
  // Fokus auf Menü-Knopf per Tab
  for (let i = 0; i < 10; i++) {
    await p.keyboard.press('Tab');
    if (await p.evaluate(() => document.activeElement.hasAttribute('data-menue-knopf'))) { r.knopfPerTab = i + 1; break; }
  }
  // Geschlossenes Menü: Links dürfen nicht fokussierbar sein
  r.linksBeiGeschlossenSichtbar = await p.evaluate(() => [...document.querySelectorAll('[data-menue] a')].filter((a) => a.offsetParent !== null && getComputedStyle(a).visibility !== 'hidden').length);
  await p.keyboard.press('Tab');
  r.naechsterNachKnopfGeschlossen = await p.evaluate(() => (document.activeElement.textContent || '').trim().slice(0, 30) + (document.activeElement.closest('[data-menue]') ? ' (IM MENÜ!)' : ''));
  await p.keyboard.press('Shift+Tab');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(400);
  r.expandedNachEnter = await p.getAttribute('[data-menue-knopf]', 'aria-expanded');
  r.fokusNachOeffnen = await p.evaluate(() => document.activeElement.textContent.trim().slice(0, 30));
  const stopps = [];
  for (let i = 0; i < 12; i++) {
    await p.keyboard.press('Tab');
    stopps.push(await p.evaluate(() => (document.activeElement.hasAttribute('data-menue-knopf') ? '[KNOPF]' : '') + (document.activeElement.closest('[data-menue]') ? '' : '[AUSSERHALB]') + document.activeElement.textContent.trim().slice(0, 18)));
  }
  r.tabImMenue = stopps;
  r.fokusFalle = stopps.every((x) => !x.startsWith('[AUSSERHALB]') || x.includes('[KNOPF]'));
  await p.keyboard.press('Shift+Tab');
  r.shiftTab = await p.evaluate(() => document.activeElement.textContent.trim().slice(0, 18));
  await p.keyboard.press('Escape');
  await p.waitForTimeout(300);
  r.expandedNachEscape = await p.getAttribute('[data-menue-knopf]', 'aria-expanded');
  r.fokusNachEscape = await p.evaluate(() => document.activeElement.hasAttribute('data-menue-knopf'));
  // Öffnen per Space und Link per Enter
  await p.keyboard.press('Space');
  await p.waitForTimeout(300);
  r.expandedNachSpace = await p.getAttribute('[data-menue-knopf]', 'aria-expanded');
  await Promise.all([p.waitForURL((u) => !u.href.endsWith('/leistungen.html'), { timeout: 5000 }).catch(() => {}), p.keyboard.press('Enter')]); // erster Link
  await p.waitForLoadState('networkidle');
  r.urlNachLinkEnter = p.url().replace(BASIS, '');
  // axe mit offenem Menü
  await p.goto(BASIS + '/index.html', { waitUntil: 'networkidle' });
  await p.click('[data-menue-knopf]');
  await p.waitForTimeout(400);
  const axe = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  r.axeMenueOffen = axe.violations.map((v) => v.id + ':' + v.impact);
  ergebnis.navigation.push(r);
  await ctx.close();
}
// Desktop: Navigation per Tab erreichbar
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(BASIS + '/index.html', { waitUntil: 'networkidle' });
  const stopps = [];
  for (let i = 0; i < 9; i++) { await p.keyboard.press('Tab'); stopps.push(await p.evaluate(() => document.activeElement.textContent.trim().slice(0, 20))); }
  ergebnis.navigation.push({ breite: 1440, ersteTabStopps: stopps, menueKnopfSichtbar: await p.isVisible('[data-menue-knopf]') });
  await ctx.close();
}

// ---------- 4. Formular komplett per Tastatur (PHP-Server mit Fake-Sendmail) ----------
for (const breite of [360, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: breite, height: breite < 768 ? 800 : 900 } });
  const p = await ctx.newPage();
  const r = { breite };
  await p.goto(PHP + '/kontakt.html', { waitUntil: 'networkidle' });
  for (let i = 0; i < 60; i++) {
    await p.keyboard.press('Tab');
    if (await p.evaluate(() => document.activeElement.id === 'f-name')) { r.tabsBisName = i + 1; break; }
  }
  const reihenfolge = [];
  await p.keyboard.type('Erika Muster');
  const eingaben = { 'f-telefon': '0123 456789', 'f-email': 'erika@beispiel.de', 'f-ort': '12345 Musterstadt', 'f-nachricht': 'Zwei Zimmer streichen, ca. 40 m².', 'f-zeitraum': 'flexibel' };
  for (let i = 0; i < 12; i++) {
    await p.keyboard.press('Tab');
    const id = await p.evaluate(() => document.activeElement.id || document.activeElement.tagName + ':' + document.activeElement.textContent.trim().slice(0, 20));
    reihenfolge.push(id);
    const ring = (await fokusInfo(p));
    if (!ring.ring) r.ohneRing = (r.ohneRing || []).concat(id);
    if (ring.verdeckt) r.verdeckt = (r.verdeckt || []).concat(`${id} von ${ring.verdeckt}`);
    if (eingaben[id]) await p.keyboard.type(eingaben[id]);
    if (id === 'f-leistung') { await p.keyboard.press('ArrowDown'); await p.keyboard.press('ArrowDown'); }
    if (await p.evaluate(() => document.activeElement.matches('[data-senden]'))) break;
  }
  r.reihenfolge = reihenfolge;
  r.honeypotErreicht = reihenfolge.includes('f-website');
  r.leistungGewaehlt = await p.inputValue('#f-leistung');
  await Promise.all([p.waitForURL(/danke\.html/, { timeout: 8000 }).catch(() => {}), p.keyboard.press('Enter')]);
  await p.waitForLoadState('networkidle');
  r.nachSenden = p.url().replace(PHP, '');
  await p.goBack({ waitUntil: 'networkidle' }).catch(() => {});
  await p.waitForTimeout(500);
  r.nachZurueck = p.url().replace(PHP, '');
  r.knopfNachZurueck = await p.evaluate(() => { const b = document.querySelector('[data-senden]'); return b ? { text: b.textContent.trim(), ariaDisabled: b.getAttribute('aria-disabled') } : null; });
  // erneut absenden möglich?
  await p.fill('#f-name', 'Erika Muster');
  await p.fill('#f-email', 'erika@beispiel.de');
  await p.fill('#f-nachricht', 'Zweiter Versuch');
  await Promise.all([p.waitForURL(/danke\.html/, { timeout: 8000 }).catch(() => {}), p.click('[data-senden]')]);
  r.zweitesSenden = p.url().replace(PHP, '');
  ergebnis.formularTab.push(r);
  await ctx.close();
}

// ---------- 5. Validierung im Browser ----------
{
  const ctx = await browser.newContext({ viewport: { width: 360, height: 800 } });
  const p = await ctx.newPage();
  await p.goto(PHP + '/kontakt.html', { waitUntil: 'networkidle' });
  const v = {};
  await p.click('[data-senden]');
  await p.waitForTimeout(300);
  v.leerUrl = p.url().replace(PHP, '');
  v.leerZusammenfassungSichtbar = await p.isVisible('#fehler-zusammenfassung');
  v.leerFokus = await p.evaluate(() => document.activeElement.id);
  v.leerFehler = await p.$$eval('[data-fehlerliste] a', (as) => as.map((a) => a.textContent));
  v.ariaInvalid = await p.$$eval('[aria-invalid="true"]', (e) => e.map((x) => x.id));
  v.describedbyName = await p.getAttribute('#f-name', 'aria-describedby');
  // Sprunglink fokussiert Feld
  await p.click('[data-fehlerliste] a >> nth=0');
  v.sprunglinkFokus = await p.evaluate(() => document.activeElement.id);
  // ungültige E-Mail
  await p.fill('#f-name', 'Test');
  await p.fill('#f-email', 'kein@mail');
  await p.fill('#f-nachricht', 'x');
  await p.click('[data-senden]');
  await p.waitForTimeout(200);
  v.mailFehler = await p.$$eval('[data-fehlerliste] a', (as) => as.map((a) => a.textContent));
  v.mailFehlerAmFeld = await p.isVisible('#f-email-fehler');
  // ungültiges Telefon
  await p.fill('#f-email', '');
  await p.fill('#f-telefon', 'abc<script>');
  await p.click('[data-senden]');
  await p.waitForTimeout(200);
  v.telFehler = await p.$$eval('[data-fehlerliste] a', (as) => as.map((a) => a.textContent));
  // Live-Korrektur
  await p.fill('#f-telefon', '0123 45678');
  await p.waitForTimeout(200);
  v.nachKorrekturZusammenfassung = await p.isVisible('#fehler-zusammenfassung');
  v.nachKorrekturInvalid = await p.$$eval('[aria-invalid="true"]', (e) => e.map((x) => x.id));
  v.leereDescribedby = await p.$$eval('[aria-describedby=""]', (e) => e.map((x) => x.id));
  const axe = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  v.axe = axe.violations.map((x) => x.id + ':' + x.impact);
  // ?leistung-Vorauswahl
  await p.goto(PHP + '/kontakt.html?leistung=fassade', { waitUntil: 'networkidle' });
  v.vorauswahl = await p.inputValue('#f-leistung');
  // Serverseitige Fehlerseite (ohne JS) – axe
  const ctx2 = await browser.newContext({ viewport: { width: 360, height: 800 }, javaScriptEnabled: false });
  const p2 = await ctx2.newPage();
  await p2.goto(PHP + '/kontakt.html', { waitUntil: 'networkidle' });
  await p2.fill('#f-email', 'falsch');
  await p2.click('[data-senden]');
  await p2.waitForLoadState('networkidle');
  v.ohneJsUrl = p2.url().replace(PHP, '');
  v.ohneJsZusammenfassung = await p2.isVisible('#fehler-zusammenfassung');
  v.ohneJsFehler = await p2.$$eval('[data-fehlerliste] a', (as) => as.map((a) => a.textContent));
  v.ohneJsCss = await p2.evaluate(() => getComputedStyle(document.body).fontFamily);
  const axe2 = await new AxeBuilder({ page: p2 }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  v.ohneJsAxe = axe2.violations.map((x) => x.id + ':' + x.impact);
  await ctx2.close();
  ergebnis.validierung.push(v);
  await ctx.close();
}

// ---------- 6. navigator.webdriver = false: Einblendungen + axe ----------
for (const breite of [360, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: breite, height: breite < 768 ? 800 : 900 } });
  await ctx.addInitScript(() => { Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false }); });
  for (const s of SEITEN) {
    const p = await ctx.newPage();
    await p.goto(BASIS + s, { waitUntil: 'networkidle' });
    const wd = await p.evaluate(() => navigator.webdriver);
    const wartendAnfang = await p.$$eval('.ist-wartend', (e) => e.length);
    // langsames Scrollen
    await p.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
    });
    await p.waitForTimeout(1200);
    const unsichtbar = await p.evaluate(() => [...document.querySelectorAll('.reveal, .kante')].filter((el) => parseFloat(getComputedStyle(el).opacity) < 1 || el.classList.contains('ist-wartend')).map((el) => el.className));
    const axe = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    // Sprung ans Ende (Taste End) in neuem Tab
    const p3 = await ctx.newPage();
    await p3.goto(BASIS + s, { waitUntil: 'networkidle' });
    await p3.keyboard.press('End');
    await p3.waitForTimeout(1200);
    const nachEnde = await p3.evaluate(() => [...document.querySelectorAll('.ist-wartend')].filter((el) => el.getBoundingClientRect().top < innerHeight).length);
    await p3.close();
    ergebnis.reveal.push({ seite: s, breite, webdriver: wd, wartendAnfang, nochUnsichtbar: unsichtbar.length, beispiele: unsichtbar.slice(0, 3), sichtbarAberWartendNachEnde: nachEnde });
    ergebnis.axeOhneWebdriver.push({ seite: s, breite, verstoesse: axe.violations.map((v) => ({ id: v.id, schwere: v.impact, n: v.nodes.length })) });
    await p.close();
  }
  await ctx.close();
}

await browser.close();
writeFileSync(OUT, JSON.stringify(ergebnis, null, 2));
console.log(JSON.stringify(ergebnis, null, 1));
