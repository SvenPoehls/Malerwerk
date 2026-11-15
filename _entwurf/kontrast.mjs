// Aufruf: node _entwurf/kontrast.mjs  – berechnet WCAG-2.1-Kontrastwerte der Malerwerk-Palette
const P = {
  kalk: '#F4F1EA',      // Kalkweiß – Grundfläche
  leinen: '#E8E1D3',    // Leinen – Wechselfläche
  gruenerdeHell: '#D5DBCB', // Grünerde hell – Musterflächen/Platzhalter
  gruenerde: '#5E6B57', // Grünerde – Farbfeld (30 %)
  umbra: '#25221E',     // Umbra – Text, dunkle Felder
  umbra70: '#5B554C',   // Umbra 70 – Sekundärtext
  linie: '#C9C0AF',     // Linie – Rahmen (dekorativ)
  linieStark: '#776E62',// Linie stark – Formularrahmen (UI, ≥3:1)
  rot: '#A63A20',       // Englischrot – Akzent/CTA
  rotDunkel: '#8A2E17', // Englischrot dunkel – Hover/Textlink
  ocker: '#C99A4B',     // Ocker – nur Fläche (Platzhalter), nie Text
  weiss: '#FFFFFF',
  fehler: '#A12A1C',
};
const lum = (hex) => {
  const c = hex.replace('#', '').match(/../g).map((h) => parseInt(h, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const paare = [
  ['umbra', 'kalk'], ['umbra', 'leinen'], ['umbra', 'gruenerdeHell'], ['umbra', 'ocker'],
  ['umbra70', 'kalk'], ['umbra70', 'leinen'], ['umbra70', 'gruenerdeHell'],
  ['rot', 'kalk'], ['rot', 'leinen'], ['rotDunkel', 'kalk'], ['rotDunkel', 'leinen'],
  ['kalk', 'rot'], ['weiss', 'rot'], ['kalk', 'rotDunkel'],
  ['kalk', 'umbra'], ['leinen', 'umbra'], ['gruenerdeHell', 'umbra'], ['ocker', 'umbra'],
  ['kalk', 'gruenerde'], ['umbra', 'gruenerde'], ['gruenerde', 'kalk'],
  ['linieStark', 'kalk'], ['linieStark', 'leinen'], ['rot', 'gruenerde'], ['kalk', 'gruenerdeHell'], ['umbra', 'rot'], ['ocker', 'kalk'], ['gruenerde', 'leinen'], ['gruenerdeHell', 'gruenerde'], ['linie', 'kalk'], ['fehler', 'kalk'], ['rot', 'umbra'],
];
for (const [t, b] of paare) {
  const r = ratio(P[t], P[b]);
  const bew = r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA groß/UI' : 'nicht ausreichend';
  console.log(`| ${t} ${P[t]} | ${b} ${P[b]} | ${r.toFixed(2)} : 1 | ${bew} |`);
}
