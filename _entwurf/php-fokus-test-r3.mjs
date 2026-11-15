// PHP-Fehlerseiten (kontakt.php, php -S): Fokus nach dem Laden auf der Meldung? Weiterleitungsziel danke.html#inhalt?
// Aufruf: node _entwurf/php-fokus-test-r3.mjs http://127.0.0.1:8099
import { chromium } from 'playwright';
const basis = process.argv[2] || 'http://127.0.0.1:8099';
const b = await chromium.launch();
const ok = (bed, txt) => console.log((bed ? 'OK     ' : 'FEHLER ') + txt);
for (const [w, h] of [[360, 800], [1440, 900]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  // 422: leeres Formular, Browserprüfung umgehen
  await p.goto(basis + '/kontakt.html');
  await p.evaluate(() => { const f = document.querySelector('[data-formular]'); f.addEventListener('submit', (e) => e.stopImmediatePropagation(), true); f.submit(); });
  await p.waitForLoadState('load'); await p.waitForTimeout(600);
  let fokus = await p.evaluate(() => document.activeElement.id);
  ok(fokus === 'fehler-zusammenfassung', `${w}px 422: Fokus auf ${fokus || document.activeElement}`);
  const sicht = await p.evaluate(() => { const r = document.activeElement.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; });
  ok(sicht, `${w}px 422: Meldung im sichtbaren Bereich`);
  // 503: gültige Daten, Empfänger ist Platzhalter
  await p.goto(basis + '/kontakt.html');
  await p.fill('#f-name', 'Test Person'); await p.fill('#f-email', 'test@beispiel.de'); await p.fill('#f-nachricht', 'Wohnzimmer streichen.');
  await p.click('[data-senden]');
  await p.waitForLoadState('load'); await p.waitForTimeout(600);
  fokus = await p.evaluate(() => document.activeElement.id);
  ok(fokus === 'meldung-versand', `${w}px 503: Fokus auf ${fokus}`);
  await p.close();
}
// Honeypot -> 303 danke.html#inhalt
const res = await fetch(basis + '/kontakt.php', { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'website=x&name=a&email=a@b.de&nachricht=x' });
ok(res.status === 303 && res.headers.get('location') === 'danke.html#inhalt', `Honeypot: ${res.status} -> ${res.headers.get('location')}`);
await b.close();
