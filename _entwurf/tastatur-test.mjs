// Prüft Tastaturbedienung der mobilen Navigation und die Formular-Validierung.
// Aufruf: node _entwurf/tastatur-test.mjs [Basis-URL]
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:4173';
const out = '_entwurf/screenshots/builder';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 360, height: 800 } });
await p.goto(base + '/index.html');
const ok = (bed, txt) => console.log((bed ? 'OK   ' : 'FEHLER ') + txt);
await p.keyboard.press('Tab');
ok(await p.evaluate(() => document.activeElement.classList.contains('skip-link')), 'Erster Tab: Skip-Link');
await p.keyboard.press('Tab'); await p.keyboard.press('Tab');
ok(await p.evaluate(() => document.activeElement.hasAttribute('data-menue-knopf')), 'Menü-Knopf per Tab erreichbar');
await p.keyboard.press('Enter'); await p.waitForTimeout(300);
ok(await p.getAttribute('[data-menue-knopf]', 'aria-expanded') === 'true', 'Enter öffnet Menü (aria-expanded=true)');
ok(await p.evaluate(() => document.activeElement.textContent.trim() === 'Leistungen'), 'Fokus springt auf ersten Menüpunkt');
await p.screenshot({ path: `${out}/menue-offen-360.png` });
const besucht = [];
for (let i = 0; i < 8; i++) { await p.keyboard.press('Tab'); besucht.push(await p.evaluate(() => document.activeElement.textContent.trim().slice(0, 20) || document.activeElement.getAttribute('aria-label'))); }
ok(besucht.every((t) => t), 'Fokus bleibt im Menü: ' + besucht.join(' | '));
await p.keyboard.press('Escape'); await p.waitForTimeout(300);
ok(await p.getAttribute('[data-menue-knopf]', 'aria-expanded') === 'false', 'Escape schließt Menü');
ok(await p.evaluate(() => document.activeElement.hasAttribute('data-menue-knopf')), 'Fokus zurück auf Menü-Knopf');
// Formular
await p.goto(base + '/kontakt.html?leistung=fassade#anfrage');
ok(await p.inputValue('#f-leistung') === 'fassade', 'Vorauswahl ?leistung=fassade');
await p.click('[data-senden]');
ok(await p.evaluate(() => document.activeElement.id === 'fehler-zusammenfassung'), 'Fehlerzusammenfassung erhält Fokus');
ok(await p.getAttribute('#f-name', 'aria-invalid') === 'true', 'aria-invalid am Namensfeld');
ok((await p.getAttribute('#f-name', 'aria-describedby') || '').includes('f-name-fehler'), 'aria-describedby verweist auf Meldung');
await p.locator('.formular-box').screenshot({ path: `${out}/formular-fehler-360.png` });
await p.fill('#f-name', 'Anna'); await p.fill('#f-email', 'a@b.de'); await p.fill('#f-nachricht', 'Test');
ok(await p.evaluate(() => document.getElementById('fehler-zusammenfassung').hidden), 'Meldungen verschwinden nach Korrektur');
await p.goto(base + '/kontakt.html?status=fehler');
ok(await p.isVisible('#meldung-versand'), '?status=fehler zeigt Versandfehler');
await b.close();
