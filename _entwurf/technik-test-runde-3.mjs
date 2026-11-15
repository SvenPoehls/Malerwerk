// Technik-Prüfung Runde 3 (Agent 5). Aufruf: node _entwurf/technik-test-runde-3.mjs [Basis-URL] [PHP-Basis-URL]
// Prüft: horizontales Scrollen, Tab-Stopps (Fokus sichtbar, nicht verdeckt), Skip-Link, mobile Navigation,
// Formular per Tastatur, Browser-Validierung, Einblendungen ohne webdriver-Abkürzung + axe, PHP-Fehlerseite (Fokus).
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:4173';
const PHP = process.argv[3] || '';
const SEITEN = ['/index.html', '/leistungen.html', '/arbeiten.html', '/ueber-uns.html', '/kontakt.html',
  '/danke.html', '/impressum.html', '/datenschutz.html', '/404.html'];
const ergebnis = { overflow: [], tabstopps: [], skiplink: [], navigation: [], formular: [], validierung: [], einblendung: [], php: [] };
const killer = setTimeout(() => { console.error('Gesamt-Timeout'); writeFileSync('_entwurf/technik-test-runde-3.json', JSON.stringify(ergebnis, null, 2)); process.exit(2); }, 540000);

const browser = await chromium.launch();

// ---------- 1. Horizontales Scrollen ----------
for (const w of [360, 768, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  for (const s of SEITEN) {
    await page.goto(BASE + s, { waitUntil: 'load' });
    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const breit = [...document.querySelectorAll('body *')].filter((el) => {
        const b = el.getBoundingClientRect();
        return b.width > 0 && (b.right > de.clientWidth + 1 || b.left < -1) && getComputedStyle(el).position !== 'fixed';
      }).slice(0, 5).map((el) => el.tagName + '.' + el.className);
      return { scrollW: de.scrollWidth, clientW: de.clientWidth, breit };
    });
    ergebnis.overflow.push({ breite: w, seite: s, ...r, ok: r.scrollW <= r.clientW });
  }
  await ctx.close();
}

// ---------- 2. Tab-Stopps ----------
const pruefeFokus = () => {
  const el = document.activeElement;
  if (!el || el === document.body) return null;
  const r = el.getBoundingClientRect();
  const vw = innerWidth, vh = innerHeight;
  const cs = getComputedStyle(el);
  // Fokusanzeige: Outline am Element oder (bei Karten) am Vorfahren mit :has()
  let anzeige = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none';
  let anz = el;
  for (let i = 0; i < 3 && !anzeige && anz.parentElement; i++) {
    anz = anz.parentElement;
    const c = getComputedStyle(anz);
    anzeige = c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) > 0;
  }
  const ueberlapp = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  const verdecker = [];
  for (const sel of ['.kopf', '.aktionsleiste']) {
    const f = document.querySelector(sel);
    if (!f || f.contains(el)) continue;
    const fr = f.getBoundingClientRect();
    if (getComputedStyle(f).display === 'none' || fr.height === 0) continue;
    const fl = ueberlapp(r, fr);
    if (fl > 0) verdecker.push({ sel, anteil: Math.round(100 * fl / Math.max(1, r.width * r.height)) });
  }
  // elementFromPoint an Mitte und Ecken (leicht eingerückt)
  const pts = [[r.left + r.width / 2, r.top + r.height / 2], [r.left + 2, r.top + 2], [r.right - 2, r.top + 2], [r.left + 2, r.bottom - 2], [r.right - 2, r.bottom - 2]];
  let getroffen = 0, fremd = [];
  for (const [x, y] of pts) {
    if (x < 0 || y < 0 || x >= vw || y >= vh) continue;
    const t = document.elementFromPoint(x, y);
    if (t && (t === el || el.contains(t) || t.contains(el))) getroffen++;
    else if (t) fremd.push(t.tagName + '.' + (t.className?.baseVal ?? t.className));
  }
  const imBild = r.width > 0 && r.height > 0 && r.top >= 0 && r.bottom <= vh && r.left >= 0 && r.right <= vw;
  return {
    el: el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + String(el.className).split(' ')[0] : ''),
    text: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40),
    rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)],
    imBild, anzeige, verdecker, getroffen, fremd: [...new Set(fremd)],
  };
};

for (const vp of [{ width: 360, height: 800 }, { width: 768, height: 1024 }, { width: 720, height: 450 }]) {
  const ctx = await browser.newContext({ viewport: vp });
  const page = await ctx.newPage();
  for (const s of SEITEN) {
    await page.goto(BASE + s, { waitUntil: 'load' });
    await page.waitForTimeout(100);
    const stopps = [];
    const gesehen = new Set();
    for (let i = 0; i < 200; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(30);
      const f = await page.evaluate(pruefeFokus);
      if (!f) break;
      const key = f.el + f.rect.join(',') + f.text;
      stopps.push(f);
      if (i > 2 && f.text === 'Zum Inhalt springen') break; // Runde beendet
      gesehen.add(key);
    }
    const probleme = stopps.filter((f) => !f.imBild || !f.anzeige || f.verdecker.length || f.getroffen === 0);
    ergebnis.tabstopps.push({ viewport: `${vp.width}x${vp.height}`, seite: s, anzahl: stopps.length, probleme });
  }
  await ctx.close();
}

// ---------- 3. Skip-Link und mobile Navigation ----------
{
  const ctx = await browser.newContext({ viewport: { width: 360, height: 800 } });
  const page = await ctx.newPage();
  for (const s of SEITEN) {
    await page.goto(BASE + s, { waitUntil: 'load' });
    await page.keyboard.press('Tab');
    const skip = await page.evaluate(() => {
      const el = document.activeElement; const r = el.getBoundingClientRect();
      return { text: el.textContent.trim(), sichtbar: r.top >= 0 && r.bottom <= innerHeight && r.width > 0 };
    });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(150);
    const ziel = await page.evaluate(() => document.activeElement.id);
    await page.keyboard.press('Tab');
    const danach = await page.evaluate(() => { const e = document.activeElement; return e.closest('main') ? 'in main' : (e.closest('header') ? 'header' : e.tagName); });
    ergebnis.skiplink.push({ seite: s, ...skip, fokusNachEnter: ziel, naechsterTab: danach, ok: skip.text === 'Zum Inhalt springen' && skip.sichtbar && ziel === 'inhalt' && danach === 'in main' });
  }
  for (const s of ['/index.html', '/kontakt.html', '/404.html']) {
    await page.goto(BASE + s, { waitUntil: 'load' });
    const log = [];
    // Menü-Knopf per Tab erreichen
    let gefunden = false;
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      if (await page.evaluate(() => document.activeElement.matches('[data-menue-knopf]'))) { gefunden = true; break; }
    }
    log.push('Knopf per Tab: ' + gefunden);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    const offen = await page.evaluate(() => ({
      exp: document.querySelector('[data-menue-knopf]').getAttribute('aria-expanded'),
      fokus: document.activeElement.textContent.trim().slice(0, 30),
      imMenue: !!document.activeElement.closest('[data-menue]'),
    }));
    log.push('nach Enter: ' + JSON.stringify(offen));
    const kreis = [];
    const menueProbleme = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(30);
      const f = await page.evaluate(pruefeFokus);
      const drin = await page.evaluate(() => !!document.activeElement.closest('[data-menue], [data-menue-knopf]'));
      kreis.push((drin ? '' : 'RAUS:') + f?.text);
      if (f && (!f.imBild || !f.anzeige || f.getroffen === 0)) menueProbleme.push(f);
    }
    log.push('Fokusfalle: ' + kreis.join(' | '));
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const zu = await page.evaluate(() => ({
      exp: document.querySelector('[data-menue-knopf]').getAttribute('aria-expanded'),
      fokusAufKnopf: document.activeElement.matches('[data-menue-knopf]'),
      menueSichtbar: (() => { const m = document.querySelector('[data-menue]'); const c = getComputedStyle(m); return c.visibility !== 'hidden' && c.display !== 'none' && m.getBoundingClientRect().height > 0; })(),
    }));
    log.push('nach Escape: ' + JSON.stringify(zu));
    // Link im Menü per Enter folgen
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await page.keyboard.press('Tab');
    const linkText = await page.evaluate(() => document.activeElement.textContent.trim());
    await Promise.all([page.waitForNavigation({ timeout: 5000 }).catch(() => null), page.keyboard.press('Enter')]);
    log.push('Link "' + linkText + '" -> ' + page.url());
    ergebnis.navigation.push({
      seite: s, log, menueProbleme,
      ok: gefunden && offen.exp === 'true' && offen.imMenue && !kreis.some((k) => k.startsWith('RAUS')) && zu.exp === 'false' && zu.fokusAufKnopf && !zu.menueSichtbar && !menueProbleme.length,
    });
  }
  await ctx.close();
}

// ---------- 4. Formular komplett per Tastatur ----------
for (const vp of [{ width: 360, height: 800 }, { width: 1440, height: 900 }]) {
  const ctx = await browser.newContext({ viewport: vp });
  const page = await ctx.newPage();
  let gesendet = null;
  await page.route('**/kontakt.php*', async (route) => {
    gesendet = route.request().postData();
    await route.fulfill({ status: 303, headers: { Location: BASE + '/danke.html#inhalt' } });
  });
  await page.goto(BASE + '/kontakt.html', { waitUntil: 'load' });
  const log = [];
  const tabBis = async (pred, max = 80) => {
    for (let i = 0; i < max; i++) {
      await page.keyboard.press('Tab');
      if (await page.evaluate(pred)) return true;
    }
    return false;
  };
  // Leeres Absenden per Tastatur
  log.push('Senden-Knopf erreicht: ' + await tabBis(() => document.activeElement.matches('[data-senden]')));
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);
  const leer = await page.evaluate(() => ({
    fokus: document.activeElement.id,
    zusammenfassung: !document.getElementById('fehler-zusammenfassung').hidden,
    fehler: [...document.querySelectorAll('.fehlertext:not([hidden])')].map((p) => p.id),
    links: [...document.querySelectorAll('[data-fehlerliste] a')].map((a) => a.getAttribute('href')),
    invalid: [...document.querySelectorAll('[aria-invalid="true"]')].map((e) => e.id),
  }));
  log.push('leer: ' + JSON.stringify(leer));
  // Sprunglink in der Zusammenfassung per Tastatur
  await page.keyboard.press('Tab');
  const ersterLink = await page.evaluate(() => document.activeElement.getAttribute('href'));
  await page.keyboard.press('Enter');
  await page.waitForTimeout(100);
  const nachSprung = await page.evaluate(pruefeFokus);
  log.push('Sprunglink ' + ersterLink + ' -> ' + nachSprung?.el + ' imBild=' + nachSprung?.imBild + ' verdeckt=' + JSON.stringify(nachSprung?.verdecker));
  // Felder ausfüllen per Tab (nur Tastatur)
  const tabs = [];
  await page.focus('#f-name').catch(() => {});
  await page.keyboard.type('Erika Muster');
  for (const [id, wert] of [['f-telefon', '0123 456789'], ['f-email', 'erika@beispiel.de'], ['f-ort', '12345 Musterstadt'], ['f-leistung', null], ['f-nachricht', 'Wohnzimmer streichen, ca. 20 qm.'], ['f-zeitraum', 'flexibel']]) {
    await page.keyboard.press('Tab');
    const akt = await page.evaluate(() => document.activeElement.id);
    tabs.push(akt);
    if (akt !== id) { log.push(`Tab-Reihenfolge: erwartet ${id}, war ${akt}`); break; }
    if (wert) await page.keyboard.type(wert);
    else { await page.keyboard.press('ArrowDown'); await page.keyboard.press('ArrowDown'); }
  }
  const leistungWert = await page.evaluate(() => document.getElementById('f-leistung').value);
  log.push('Reihenfolge: ' + tabs.join(' > ') + ' | Leistung=' + leistungWert);
  await page.keyboard.press('Tab');
  const nachZeitraum = await page.evaluate(() => document.activeElement.id || document.activeElement.textContent.trim().slice(0, 30));
  log.push('nach Zeitraum: ' + nachZeitraum + ' (Honeypot darf nicht kommen)');
  const zumSenden = await tabBis(() => document.activeElement.matches('[data-senden]'), 5);
  await Promise.all([page.waitForURL(/danke/, { timeout: 5000 }).catch(() => null), page.keyboard.press('Enter')]);
  log.push('URL nach Senden: ' + page.url());
  const daten = gesendet ? Object.fromEntries(new URLSearchParams(gesendet)) : null;
  log.push('POST: ' + JSON.stringify(daten));
  const dankeFokus = await page.evaluate(() => document.activeElement?.id || document.activeElement?.tagName);
  log.push('Fokus Danke-Seite: ' + dankeFokus);
  ergebnis.formular.push({
    viewport: `${vp.width}x${vp.height}`, log,
    ok: leer.fokus === 'fehler-zusammenfassung' && leer.fehler.length >= 3 && nachZeitraum !== 'f-website' && zumSenden && /danke/.test(page.url()) && daten?.name === 'Erika Muster' && daten?.website === '' && daten?.leistung,
  });
  await ctx.close();
}

// ---------- 5. Browser-Validierung im Detail ----------
{
  const ctx = await browser.newContext({ viewport: { width: 360, height: 800 } });
  const page = await ctx.newPage();
  let posts = 0;
  await page.route('**/kontakt.php*', (r) => { posts++; r.fulfill({ status: 200, body: 'ok' }); });
  const fall = async (name, felder) => {
    await page.goto(BASE + '/kontakt.html', { waitUntil: 'load' });
    for (const [id, v] of Object.entries(felder)) await page.fill('#' + id, v);
    const vor = posts;
    await page.click('[data-senden]');
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => [...document.querySelectorAll('.fehlertext:not([hidden])')].map((p) => p.id + ': ' + p.textContent.trim()));
    ergebnis.validierung.push({ fall: name, fehler: r, abgesendet: posts > vor });
  };
  await fall('nur Name', { 'f-name': 'A' });
  await fall('ungültige E-Mail', { 'f-name': 'A', 'f-email': 'abc@', 'f-nachricht': 'x' });
  await fall('Umlaut-E-Mail', { 'f-name': 'A', 'f-email': 'jürgen@beispiel.de', 'f-nachricht': 'x' });
  await fall('ungültiges Telefon', { 'f-name': 'A', 'f-telefon': 'abc', 'f-nachricht': 'x' });
  await fall('nur Leerzeichen', { 'f-name': '   ', 'f-telefon': '   ', 'f-nachricht': '   ' });
  await fall('gültig nur Telefon', { 'f-name': 'A', 'f-telefon': '+49 (0)123/45-67', 'f-nachricht': 'x' });
  await fall('gültig nur E-Mail', { 'f-name': 'A', 'f-email': 'a.b@c-d.de', 'f-nachricht': 'x' });
  // Vorauswahl per ?leistung=
  await page.goto(BASE + '/kontakt.html?leistung=fassade', { waitUntil: 'load' });
  ergebnis.validierung.push({ fall: '?leistung=fassade', wert: await page.evaluate(() => document.getElementById('f-leistung').value) });
  // Fehlerkorrektur live
  await page.goto(BASE + '/kontakt.html', { waitUntil: 'load' });
  await page.click('[data-senden]');
  await page.fill('#f-name', 'A'); await page.fill('#f-email', 'a@b.de'); await page.fill('#f-nachricht', 'x');
  ergebnis.validierung.push({ fall: 'Korrektur live', offeneFehler: await page.evaluate(() => [...document.querySelectorAll('.fehlertext:not([hidden])')].length), zusammenfassungSichtbar: await page.evaluate(() => !document.getElementById('fehler-zusammenfassung').hidden) });
  await ctx.close();
}

// ---------- 6. Einblendungen wie bei echten Besuchern (webdriver=false) + axe ----------
for (const vp of [{ width: 360, height: 800 }, { width: 1440, height: 900 }]) {
  const ctx = await browser.newContext({ viewport: vp });
  await ctx.addInitScript(() => Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false }));
  for (const s of SEITEN) {
    const page = await ctx.newPage();
    const fehler = [];
    page.on('pageerror', (e) => fehler.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text()); });
    await page.goto(BASE + s, { waitUntil: 'load' });
    const wd = await page.evaluate(() => navigator.webdriver);
    const wartendAnfang = await page.evaluate(() => document.querySelectorAll('.ist-wartend').length);
    // langsam scrollen
    const hoehe = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= hoehe; y += 300) { await page.mouse.wheel(0, 300); await page.waitForTimeout(40); }
    await page.waitForTimeout(1200);
    const unsichtbar = await page.evaluate(() => [...document.querySelectorAll('.reveal, .kante, main *')]
      .filter((el) => { const c = getComputedStyle(el); return el.getBoundingClientRect().height > 0 && parseFloat(c.opacity) < 1 && !el.closest('[aria-hidden="true"]'); })
      .map((el) => el.tagName + '.' + el.className + ' op=' + getComputedStyle(el).opacity).slice(0, 8));
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const ernst = axe.violations.filter((v) => ['serious', 'critical'].includes(v.impact)).map((v) => v.id + ' (' + v.nodes.length + ')');
    const andere = axe.violations.filter((v) => !['serious', 'critical'].includes(v.impact)).map((v) => v.id + ':' + v.impact);
    // Sprung ans Ende (Taste Ende) ohne Zwischenschritte
    await page.goto(BASE + s, { waitUntil: 'load' });
    await page.keyboard.press('End');
    await page.waitForTimeout(1200);
    const nachEnde = await page.evaluate(() => [...document.querySelectorAll('.reveal, .kante')].filter((el) => parseFloat(getComputedStyle(el).opacity) < 1).length);
    ergebnis.einblendung.push({ viewport: `${vp.width}`, seite: s, webdriver: wd, wartendAnfang, unsichtbar, nachEndeUnsichtbar: nachEnde, axeSeriousCritical: ernst, axeAndere: andere, fehler });
    await page.close();
  }
  await ctx.close();
}

// ---------- 7. PHP-Fehlerseite im Browser ----------
if (PHP) {
  for (const js of [true, false]) {
    const ctx = await browser.newContext({ viewport: { width: 360, height: 800 }, javaScriptEnabled: js });
    const page = await ctx.newPage();
    await page.goto(PHP + '/kontakt.html', { waitUntil: 'load' });
    // Server-Prüfung erzwingen (Browser-Prüfung umgehen)
    await page.fill('#f-name', 'Test');
    await page.fill('#f-email', 'kaputt@');
    if (js) {
      await Promise.all([page.waitForNavigation(), page.evaluate(() => HTMLFormElement.prototype.submit.call(document.getElementById('anfrageformular')))]);
    } else {
      // Ohne JS greift die native Browser-Prüfung (required/type=email): Absenden muss blockiert sein
      await page.click('[data-senden]');
      await page.waitForTimeout(500);
      ergebnis.php.push({ javascript: false, nativeValidierungBlockiert: page.url().endsWith('/kontakt.html') });
      // Werte, die die Browser-Prüfung bestehen, aber serverseitig scheitern (Telefon mit Buchstaben)
      await page.fill('#f-email', '');
      await page.fill('#f-telefon', 'abc');
      await page.fill('#f-nachricht', 'x');
      await Promise.all([page.waitForNavigation(), page.click('[data-senden]')]);
    }
    await page.waitForTimeout(600);
    const r = await page.evaluate(() => ({
      url: location.href,
      fokus: document.activeElement?.id || document.activeElement?.tagName,
      zusammenfassung: !document.getElementById('fehler-zusammenfassung')?.hidden,
      links: [...document.querySelectorAll('[data-fehlerliste] a')].map((a) => a.textContent),
      name: document.getElementById('f-name')?.value,
      email: document.getElementById('f-email')?.value,
      robots: document.querySelector('meta[name=robots]')?.content,
      css: getComputedStyle(document.body).fontFamily,
    }));
    const fokusInfo = js ? await page.evaluate(pruefeFokus) : null;
    // Versandfehler-Fall (gültige Daten, Empfänger ist Platzhalter)
    await page.goto(PHP + '/kontakt.html', { waitUntil: 'load' });
    await page.fill('#f-name', 'Test'); await page.fill('#f-email', 'a@b.de'); await page.fill('#f-nachricht', 'Hallo');
    const [resp] = await Promise.all([page.waitForNavigation(), page.click('[data-senden]')]);
    await page.waitForTimeout(600);
    const v = await page.evaluate(() => ({ fokus: document.activeElement?.id || document.activeElement?.tagName, meldung: !document.getElementById('meldung-versand')?.hidden, nachricht: document.getElementById('f-nachricht')?.value }));
    ergebnis.php.push({ javascript: js, eingabefehler: r, fokusInfo, versandfehler: { status: resp?.status(), ...v } });
    await ctx.close();
  }
}

await browser.close();
clearTimeout(killer);
writeFileSync('_entwurf/technik-test-runde-3.json', JSON.stringify(ergebnis, null, 2));
console.log('fertig');
