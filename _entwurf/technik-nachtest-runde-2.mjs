import { chromium } from 'playwright';
const S='_entwurf/screenshots/runde-2-technik';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 360, height: 800 } });
await p.goto('http://127.0.0.1:8098/kontakt.html', { waitUntil: 'networkidle' });
await p.fill('#f-email', 'falsch');
await Promise.all([p.waitForNavigation(), p.evaluate(() => HTMLFormElement.prototype.submit.call(document.querySelector('[data-formular]')))]);
await p.waitForLoadState('networkidle'); await p.waitForTimeout(500);
console.log('server focus', await p.evaluate(() => [document.activeElement.tagName, document.activeElement.id, document.hasFocus(), !!document.getElementById('fehler-zusammenfassung').hidden, document.querySelectorAll('script[src]').length]));
// skip link after transition
for (const w of [360,1440]) {
const q = await b.newPage({ viewport: { width: w, height: 800 } });
await q.goto('http://localhost:4173/index.html', { waitUntil: 'networkidle' });
await q.keyboard.press('Tab'); await q.waitForTimeout(400);
console.log('skip', w, await q.evaluate(() => { const r = document.activeElement.getBoundingClientRect(); return [document.activeElement.textContent, Math.round(r.top), Math.round(r.bottom)]; }));
await q.screenshot({ path: S + '/skip-' + w + '.png', clip: { x: 0, y: 0, width: w, height: 120 } });
await q.close();
}
// obscured focus screenshot
const k = await b.newPage({ viewport: { width: 360, height: 800 } });
await k.goto('http://localhost:4173/kontakt.html', { waitUntil: 'networkidle' });
for (let i=0;i<40;i++){ await k.keyboard.press('Tab'); if (await k.evaluate(()=>document.activeElement.id==='f-email')) break; }
await k.waitForTimeout(300);
console.log('email rect', await k.evaluate(() => { const r=document.activeElement.getBoundingClientRect(); const bar=document.querySelector('.aktionsleiste').getBoundingClientRect(); return {feld:[Math.round(r.top),Math.round(r.bottom)], bar:[Math.round(bar.top),Math.round(bar.bottom)]}; }));
await k.screenshot({ path: S + '/verdeckt-email-360.png' });
// zoom 200%: 1440 desktop at 200% ~ 720 css px
const z = await b.newPage({ viewport: { width: 720, height: 450 } });
await z.goto('http://localhost:4173/kontakt.html', { waitUntil: 'networkidle' });
let hidden=0, total=0;
for (let i=0;i<40;i++){ await z.keyboard.press('Tab'); await z.waitForTimeout(30); total++; const v = await z.evaluate(()=>{const r=document.activeElement.getBoundingClientRect(); const bar=document.querySelector('.aktionsleiste').getBoundingClientRect(); return r.top>=bar.top-1 && getComputedStyle(document.querySelector('.aktionsleiste')).display!=='none';}); if(v) hidden++; }
console.log('720x450 verdeckt', hidden, 'von', total);
await b.close();
