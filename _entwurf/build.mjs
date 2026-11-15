// Erzeugt alle HTML-Seiten aus gemeinsamen Bausteinen (Header, Footer, Platzhalter …).
// Aufruf (im Projektwurzelverzeichnis): node _entwurf/build.mjs
// Texte: unverändert aus _entwurf/inhalte.md. Gestaltung: _entwurf/design-brief.md.
import { readFileSync, writeFileSync } from 'node:fs';

const DOMAIN = 'https://malerwerk.example';
const TEL = 'tel:[PLATZHALTER: Telefonnummer im Format +49…]';
const MAIL = 'mailto:[PLATZHALTER: E-Mail-Adresse]';
const TEL_LABEL = 'Anrufen: [PLATZHALTER: Telefonnummer]';
const MAIL_LABEL = 'E-Mail schreiben an [PLATZHALTER: E-Mail-Adresse]';
let B = ''; // Pfad-Präfix (404 nutzt "/" wegen beliebiger Aufruftiefe)

// ---------- Bausteine ----------
const ph = (t) => `<mark class="platzhalter">[PLATZHALTER: ${t}]</mark>`;
// In tel:-Linktexten geschützte Leerzeichen (Telefonnummern nicht umbrechen)
const phTel = '<mark class="platzhalter">[PLATZHALTER:&nbsp;Telefonnummer]</mark>';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const iconCache = {};
function icon(name, { size = 20, cls = '' } = {}) {
  if (!iconCache[name]) {
    const svg = readFileSync(`node_modules/lucide-static/icons/${name}.svg`, 'utf8');
    iconCache[name] = svg.replace(/<!--[\s\S]*?-->/g, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
      .split('\n').map((l) => l.trim()).filter(Boolean).join('').replace(/\s*\/>/g, '/>');
  }
  return `<svg class="icon${cls ? ' ' + cls : ''}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconCache[name]}</svg>`;
}
const pfeil = () => icon('arrow-right', { cls: 'icon-pfeil' });

const marke = (cls, aussen = '#25221E', mitte = '#A63A20') =>
  `<svg class="${cls}" viewBox="0 0 48 48" aria-hidden="true"><rect x="0" y="0" width="12" height="48" fill="${aussen}"/><rect x="18" y="14" width="12" height="34" fill="${mitte}"/><rect x="36" y="0" width="12" height="48" fill="${aussen}"/></svg>`;

const feld = (cls = '') => `<span class="etikett__feld${cls ? ' ' + cls : ''}" aria-hidden="true"></span>`;
const etikett = (text, { ton = '', cls = '', tag = 'p', id = '' } = {}) =>
  `<${tag} class="etikett${cls ? ' ' + cls : ''}"${id ? ` id="${id}"` : ''}>${feld(ton)}${text}</${tag}>`;

const knopfAnfrage = (cls = '') => `<a class="knopf knopf--primaer${cls}" href="${B}kontakt.html#anfrage">Anfrage senden${pfeil()}</a>`;
const knopfAnrufen = (cls = '') => `<a class="knopf knopf--sekundaer${cls}" href="${TEL}" aria-label="${TEL_LABEL}">${icon('phone')}Anrufen</a>`;

const FORMAT = {
  '4-5': '4:5', '3-2': '3:2', '1-1': '1:1', '21-9': '21:9',
  hero: '<span class="nur-mobil">4:3</span><span class="ab-tablet">4:5</span>',
  quer: '<span class="nur-mobil">4:3</span><span class="ab-tablet">21:9</span>',
};

/**
 * Bildplatzhalter „Musterfläche“. Wird später durch <picture> ersetzt
 * (Muster: _entwurf/bilder-austausch.md); figure, Seitenverhältnis und Layout bleiben.
 */
function motiv({ sv, ton = 'ton-gruen-hell', motiv: m, aria, alt, caption = '', cls = '', aufBild = '', vorFlaeche = '', rahmen = '' }) {
  const flaeche = `<div class="motiv__flaeche ${ton}" role="img" aria-label="${aria}">` +
    `<p class="etikett motiv__format" aria-hidden="true">${feld()}Bild · ${FORMAT[sv]}</p>` +
    `<div class="motiv__fuss" aria-hidden="true"><p class="motiv__text">Motiv: ${m}</p>${marke('motiv__marke')}</div></div>`;
  const innen = rahmen ? `<div class="${rahmen}">${vorFlaeche}${flaeche}</div>` : flaeche;
  return `<figure class="motiv sv-${sv}${aufBild ? ' motiv--mit-auf-bild' : ''}${cls ? ' ' + cls : ''}">
  <!-- Bildplatzhalter. Alt-Text für das spätere Foto: ${alt} -->
  ${aufBild ? `<p class="etikett motiv__auf-bild" aria-hidden="true">${aufBild}</p>` : ''}${innen}${caption ? `
  <figcaption class="${caption.includes('etikett__feld') ? 'etikett motiv__beschriftung' : 'motiv__beschriftung'}">${caption}</figcaption>` : ''}
</figure>`;
}

// ---------- Seitengerüst ----------
function head(s) {
  const og = s.og !== false;
  const titel = esc(s.title);
  const ogTitel = esc(s.ogTitle || s.title);
  const ogBeschr = esc(s.ogDesc || s.desc);
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titel}</title>
<meta name="description" content="${esc(s.desc)}">
${s.robots ? `<meta name="robots" content="${s.robots}">\n` : ''}${s.canonical ? `<link rel="canonical" href="${s.canonical}">\n` : ''}${og ? `<meta property="og:type" content="website">
<meta property="og:site_name" content="Malerwerk">
<meta property="og:locale" content="de_DE">
<meta property="og:title" content="${ogTitel}">
<meta property="og:description" content="${ogBeschr}">
${s.canonical ? `<meta property="og:url" content="${s.canonical}">\n` : ''}<meta property="og:image" content="${DOMAIN}/assets/bilder/og-malerwerk.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Malerwerk – Malerbetrieb in Musterstadt. Wortmarke und Streifenmarke auf hellem Grund neben einem grünen Farbfeld.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${ogTitel}">
<meta name="twitter:description" content="${ogBeschr}">
<meta name="twitter:image" content="${DOMAIN}/assets/bilder/og-malerwerk.jpg">
<meta name="twitter:image:alt" content="Malerwerk – Malerbetrieb in Musterstadt. Wortmarke und Streifenmarke auf hellem Grund neben einem grünen Farbfeld.">
` : ''}<meta name="theme-color" content="#F4F1EA">
<link rel="icon" href="${B}favicon.ico" sizes="32x32">
<link rel="icon" href="${B}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${B}apple-touch-icon.png">
<link rel="manifest" href="${B}site.webmanifest">
<link rel="preload" href="${B}assets/fonts/archivo-latin-wdth.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${B}css/style.css">
<script>document.documentElement.classList.add("js")</script>
<script src="${B}js/main.js" defer></script>
${s.jsonld ? `<script type="application/ld+json">\n${JSON.stringify(s.jsonld, null, 2)}\n</script>\n` : ''}</head>`;
}

const NAV = [
  ['leistungen', 'Leistungen'],
  ['arbeiten', 'Arbeiten'],
  ['ueber-uns', 'Über uns'],
  ['kontakt', 'Kontakt'],
];

const logo = () => `<a class="logo" href="${B}index.html" aria-label="Malerwerk – zur Startseite">${marke('logo__zeichen')}<span class="logo__wort">MALERWERK</span></a>`;

function kopf(aktiv) {
  const links = NAV.map(([slug, name]) =>
    `<li><a class="hauptnav__link" href="${B}${slug}.html"${slug === aktiv ? ' aria-current="page"' : ''}>${name}</a></li>`).join('\n          ');
  return `<a class="skip-link" href="#inhalt">Zum Inhalt springen</a>
<header class="kopf" data-kopf>
  <div class="container kopf__innen">
    ${logo()}
    <button class="menue-knopf" type="button" aria-expanded="false" aria-controls="menue" aria-label="Menü öffnen" data-menue-knopf>${icon('menu', { size: 24, cls: 'icon-auf' })}${icon('x', { size: 24, cls: 'icon-zu' })}<span data-menue-text>Menü</span></button>
    <div class="menue" id="menue" data-menue>
      <nav class="hauptnav" aria-label="Hauptnavigation">
        <ul class="hauptnav__liste">
          ${links}
        </ul>
      </nav>
      <div class="menue__direkt">
        ${etikett('Direkt erreichen')}
        <div class="knopfreihe">
          <div>
            ${knopfAnrufen(' menue__anrufen')}
            <p class="menue__nummer">${ph('Telefonnummer')}</p>
          </div>
          ${knopfAnfrage()}
        </div>
      </div>
    </div>
    <div class="kopf__aktionen">
      <a class="kopf__telefon" href="${TEL}" aria-label="${TEL_LABEL}">${icon('phone')}<span class="kopf__telefon-text">${phTel}</span></a>
      ${knopfAnfrage()}
    </div>
  </div>
</header>`;
}

function fuss(istKontakt = false) {
  const seiten = [['index', 'Startseite'], ...NAV].map(([s, n]) => `<li><a href="${B}${s}.html">${n}</a></li>`).join('\n          ');
  return `<footer class="fuss">
  <div class="container raster fuss__raster">
    <div class="fuss__marke">
      ${logo()}
      ${etikett('Malerbetrieb · Musterstadt', { cls: 'fuss__unterzeile' })}
      <p>Malerarbeiten innen und außen für Privatkunden in Musterstadt und Umgebung.</p>
    </div>
    <div class="fuss__kontakt-box">
      <h2>Kontakt</h2>
      <address class="fuss__kontakt">
        <p>${icon('phone', { size: 16 })}<a href="${TEL}" aria-label="${TEL_LABEL}">${phTel}</a></p>
        <p>${icon('mail', { size: 16 })}<a href="${MAIL}" aria-label="${MAIL_LABEL}">${ph('E-Mail-Adresse')}</a></p>
        <p>${icon('map-pin', { size: 16 })}<span>${ph('Straße und Hausnummer')}, ${ph('PLZ')} Musterstadt</span></p>
        <p>${icon('clock', { size: 16 })}<span>${ph('Erreichbarkeit')}</span></p>
      </address>
    </div>
    <nav class="fuss__seiten" aria-label="Seiten im Footer">
      <h2>Seiten</h2>
      <ul class="fuss__liste">
          ${seiten}
      </ul>
    </nav>
    <nav class="fuss__recht" aria-label="Rechtliches">
      <h2>Rechtliches</h2>
      <ul class="fuss__liste">
        <li><a href="${B}impressum.html">Impressum</a></li>
        <li><a href="${B}datenschutz.html">Datenschutz</a></li>
      </ul>
    </nav>
  </div>
  <div class="container">
    <p class="fuss__copy">© ${ph('Jahr')} Malerwerk</p>
  </div>
  <div class="kantenband" aria-hidden="true"><span></span><span></span><span></span></div>
</footer>
<nav class="aktionsleiste" aria-label="Schnellkontakt">
  <a class="knopf knopf--sekundaer" href="${TEL}" aria-label="${TEL_LABEL}">${icon('phone')}Anrufen</a>
  ${istKontakt
    ? `<a class="knopf knopf--primaer" href="#anfrage">Zum Formular</a>`
    : `<a class="knopf knopf--primaer" href="${B}kontakt.html#anfrage">Anfrage senden</a>`}
</nav>`;
}

function abschluss(h2, text) {
  return `<section class="sektion sektion--umbra abschluss" aria-labelledby="abschluss-titel">
  <div class="container raster">
    <div class="abschluss__frage reveal">
      <h2 id="abschluss-titel">${h2}</h2>
      <p>${text}</p>
    </div>
    <div class="abschluss__aktion reveal">
      <a class="abschluss__tel" href="${TEL}" aria-label="${TEL_LABEL}">${icon('phone', { size: 24 })}${phTel}</a>
      <p class="abschluss__zeit">${ph('Erreichbarkeit, z.&nbsp;B. Wochentage und Uhrzeiten')}</p>
      <div class="knopfreihe">
        ${knopfAnfrage(' knopf--gross')}
        ${knopfAnrufen(' knopf--gross')}
      </div>
    </div>
  </div>
</section>`;
}

function seite(s, main) {
  return `${head(s)}
<body>
${kopf(s.aktiv)}
<main id="inhalt" tabindex="-1">
${main}
</main>
${fuss(s.aktiv === 'kontakt')}
</body>
</html>
`;
}

const LEISTUNGEN = [
  ['01', 'innenanstrich', 'Innenanstrich', 'Wände und Decken in Wohnräumen, Fluren und Treppenhäusern, gleichmäßig und mit sauberen Kanten.'],
  ['02', 'tapezierarbeiten', 'Tapezierarbeiten', 'Alte Tapeten entfernen, Untergrund glätten, neue Tapete Bahn für Bahn auf Stoß kleben.'],
  ['03', 'fassade', 'Fassade', 'Außenwände reinigen, Risse ausbessern und mit wetterbeständiger Fassadenfarbe neu streichen.'],
  ['04', 'lackierarbeiten', 'Lackierarbeiten', 'Türen, Zargen, Fensterrahmen, Heizkörper und Geländer schleifen und neu lackieren.'],
  ['05', 'wandgestaltung', 'Wandgestaltung', 'Spachteltechnik, Lasur oder Kalkputz für Wände mit sichtbarer Struktur.'],
  ['06', 'bodenbeschichtung', 'Bodenbeschichtung', 'Beschichtung für Keller-, Garagen- und Nutzböden, die sich leichter reinigen lassen.'],
];

const ortsliste = () => `<ul class="ortsliste"><li>Musterstadt</li><li>${ph('weitere Orte im Einzugsgebiet')}</li></ul>`;

// ---------- Strukturierte Daten ----------
const JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'HousePainter',
  '@id': `${DOMAIN}/#betrieb`,
  name: 'Malerwerk',
  url: `${DOMAIN}/`,
  logo: `${DOMAIN}/assets/bilder/logo.svg`,
  image: `${DOMAIN}/assets/bilder/og-malerwerk.jpg`,
  description: 'Malerbetrieb in Musterstadt: Innenanstrich, Tapezierarbeiten, Fassade, Lackierarbeiten, Wandgestaltung und Bodenbeschichtung für Privatkunden. Besichtigung vor Ort, Angebot schriftlich.',
  areaServed: { '@type': 'City', name: 'Musterstadt' },
  knowsLanguage: 'de',
};

// =====================================================================
// Startseite
// =====================================================================
function startseite() {
  const index = LEISTUNGEN.map(([nr, slug, name, satz]) => `<li class="index__zeile reveal">
          <span class="index__quadrat ton-${nr}" aria-hidden="true"></span>
          <div>
            <p class="etikett index__code">MW-${nr}</p>
            <h3><a class="index__link" href="leistungen.html#${slug}">${name}</a></h3>
            <p>${satz}</p>
          </div>
          ${icon('arrow-right', { size: 24, cls: 'index__pfeil' })}
        </li>`).join('\n        ');

  const baender = [
    ['Anfrage', 'Sie schreiben uns über das Formular oder rufen an und schildern kurz, was gemacht werden soll.'],
    ['Rückruf und Besichtigung', 'Wir melden uns, klären offene Fragen und sehen uns Räume oder Fassade bei Ihnen vor Ort an.'],
    ['Schriftliches Angebot', 'Sie erhalten ein schriftliches Angebot mit allen besprochenen Arbeiten und entscheiden in Ruhe.'],
    ['Ausführung', 'Wir decken ab, bereiten den Untergrund vor, streichen und räumen danach wieder auf.'],
    ['Abnahme', 'Zum Schluss gehen wir gemeinsam durch die Räume und sehen uns das Ergebnis an.'],
  ].map(([t, s], i) => `<li class="ablauf__band band-${i + 1} kante reveal">
          <span class="ablauf__nummer" aria-hidden="true">0${i + 1}</span>
          <h3>${t}</h3>
          <p>${s}</p>
        </li>`).join('\n        ');

  const main = `<section class="hero" aria-labelledby="hero-titel">
  <div class="container raster hero__raster">
    <div class="hero__text">
      ${etikett('Malerbetrieb in Musterstadt')}
      <h1 id="hero-titel">Streichen, tapezieren, lackieren&nbsp;– in&nbsp;Musterstadt</h1>
      <p class="lead hero__lead">Malerwerk übernimmt Malerarbeiten in Wohnungen, Häusern und an Fassaden in Musterstadt und Umgebung. Wir sehen uns Ihre Räume vor Ort an und schicken Ihnen danach ein schriftliches Angebot. Bevor gestrichen wird, decken wir ab und kleben ab.</p>
      <div class="knopfreihe">
        ${knopfAnfrage()}
        <div class="hero__anruf">
          ${knopfAnrufen()}
          <p class="meta hero__nummer">${ph('Telefonnummer')}</p>
        </div>
      </div>
      <p class="meta hero__usp">${ph('Alleinstellungsmerkmal in einem Satz, z.&nbsp;B. Meisterbetrieb oder Gründungsjahr – nur wenn belegt')}</p>
    </div>
    <div class="hero__bild">
      ${motiv({ sv: 'hero', rahmen: 'hero__rahmen', vorFlaeche: '<span class="hero__feld" aria-hidden="true"></span>', motiv: 'Frisch gestrichenes Wohnzimmer', aria: 'Bildplatzhalter: Frisch gestrichenes, leeres Wohnzimmer im Tageslicht mit gerader Farbkante an der Decke', alt: 'Frisch gestrichenes, leeres Wohnzimmer bei Tageslicht – die Wand in einem gedeckten Grünton, darüber eine gerade Kante zur weißen Decke.', caption: `${feld('ton-01')}MW-01 · Innenanstrich` })}
    </div>
  </div>
</section>

<section class="sektion sektion--linie" aria-labelledby="leistungen-titel">
  <div class="container raster">
    <div class="index__kopf reveal">
      ${etikett('Leistungen')}
      <h2 id="leistungen-titel">Was wir für Sie streichen, tapezieren und lackieren</h2>
      <p>Von der einzelnen Wand bis zur ganzen Fassade. Wählen Sie eine Leistung, um zu sehen, was dazugehört und wie wir vorgehen.</p>
      <a class="textlink" href="leistungen.html">Alle Leistungen im Detail${pfeil()}</a>
    </div>
    <ul class="index__liste" data-reveal-gruppe>
        ${index}
    </ul>
  </div>
</section>

<section class="sektion sektion--leinen" aria-labelledby="ablauf-titel">
  <div class="container">
    <div class="ablauf__kopf reveal">
      ${etikett('So läuft es ab')}
      <h2 id="ablauf-titel">Von Ihrer Anfrage bis zur fertigen Wand</h2>
      <p>Jeder Auftrag folgt denselben Schritten. So wissen Sie vorher, was als Nächstes passiert.</p>
    </div>
    <ol class="ablauf__liste" data-reveal-gruppe>
        ${baender}
    </ol>
  </div>
</section>

<section class="sektion sorgfalt" aria-labelledby="sorgfalt-titel">
  <div class="container raster sorgfalt__raster">
    ${motiv({ sv: 'quer', ton: 'ton-leinen', motiv: 'Abgedeckter Raum vor dem Streichen', aria: 'Bildplatzhalter: Raum vor dem Streichen – Boden mit Malervlies abgedeckt, Möbel in Folie, Fenster und Steckdosen abgeklebt', alt: 'Wohnraum vor dem Anstrich: Der Boden ist mit Malervlies abgedeckt, die Möbel stehen in der Raummitte unter Folie, Fensterrahmen und Steckdosen sind abgeklebt.' })}
    <div class="sorgfalt__panel reveal">
      ${etikett('Vorbereitung')}
      <h2 id="sorgfalt-titel">Erst schützen, dann streichen</h2>
      <div class="fluss">
        <p>Ein guter Anstrich beginnt lange vor der ersten Rolle. Wir decken Böden ab, schützen Möbel mit Folie und kleben Fensterrahmen, Leisten und Steckdosen ab.</p>
        <p>Danach prüfen wir den Untergrund: Löcher und Risse werden gespachtelt, saugende Flächen grundiert – damit die Farbe gleichmäßig hält. Nach der Arbeit nehmen wir Abdeckung und Klebeband wieder mit.</p>
      </div>
      <a class="textlink" href="ueber-uns.html#arbeitsweise">So arbeiten wir${pfeil()}</a>
    </div>
  </div>
</section>

<section class="sektion sektion--linie" aria-labelledby="vorschau-titel">
  <div class="container raster">
    <div class="vorschau__kopf reveal">
      ${etikett('Arbeiten')}
      <h2 id="vorschau-titel">Arbeiten aus Musterstadt und Umgebung</h2>
      <p>Fertige Räume, Fassaden und Details aus der Nähe – so sieht unsere Arbeit aus.</p>
      <a class="textlink" href="arbeiten.html">Alle Arbeiten ansehen${pfeil()}</a>
    </div>
    <div class="vorschau__gross reveal">
      ${motiv({ sv: '3-2', ton: 'ton-ocker', motiv: 'Neu gestrichene Hausfassade', aria: 'Bildplatzhalter: Neu gestrichene Fassade eines Wohnhauses bei Tageslicht', alt: 'Neu gestrichene Fassade eines Wohnhauses in [PLATZHALTER: Ort] bei Tageslicht, mit sauber abgesetztem Sockel und Fensterlaibungen.', caption: `${feld('ton-03')}MW-03 · Fassade` })}
    </div>
    <div class="vorschau__klein reveal">
      ${motiv({ sv: '4-5', ton: 'ton-gruen-hell', motiv: 'Kante zwischen zwei Farbtönen', aria: 'Bildplatzhalter: Nahaufnahme einer geraden Kante zwischen zwei Wandfarben', alt: 'Nahaufnahme einer Wand: Ein gedeckter Grünton trifft an einer geraden, scharfen Kante auf hellen Kalkton.', caption: `${feld()}Detail · Farbkante` })}
    </div>
  </div>
</section>

<section class="sektion sektion--gruen" aria-labelledby="gebiet-titel">
  <div class="container raster">
    <div class="gebiet__text reveal">
      ${etikett('Einzugsgebiet')}
      <h2 id="gebiet-titel">In Musterstadt und Umgebung unterwegs</h2>
      <p>Wir arbeiten in Musterstadt und den Orten im Umkreis. Ihr Ort ist nicht dabei? Fragen Sie trotzdem an – wir sagen Ihnen ehrlich, ob wir den Auftrag übernehmen können.</p>
      ${ortsliste()}
      <a class="textlink" href="kontakt.html#anfrage">Anfrage für Ihren Ort senden${pfeil()}</a>
    </div>
    <div class="gebiet__ort-box">
      <p class="gebiet__ort" aria-hidden="true">${icon('map-pin', { size: 48 })}Musterstadt</p>
    </div>
  </div>
</section>

${abschluss('Welche Räume sollen neu gestrichen werden?', 'Beschreiben Sie kurz Ihr Vorhaben. Wir melden uns und vereinbaren einen Termin zur Besichtigung.')}`;

  return seite({
    title: 'Maler in Musterstadt – Malerwerk | Malerbetrieb',
    desc: 'Maler in Musterstadt: Malerwerk streicht Wände, Decken und Fassaden, tapeziert und lackiert. Erst die Besichtigung vor Ort, dann ein schriftliches Angebot.',
    ogTitle: 'Malerwerk – Malerbetrieb in Musterstadt',
    ogDesc: 'Innenanstrich, Tapezierarbeiten, Fassade und Lackierarbeiten für Privatkunden in Musterstadt und Umgebung. Besichtigung vor Ort, Angebot schriftlich.',
    canonical: `${DOMAIN}/`,
    jsonld: JSONLD,
  }, main);
}

// =====================================================================
// Leistungen
// =====================================================================
function leistungAbschnitt({ nr, slug, h2, text, liste, bild, gespiegelt }) {
  const name = LEISTUNGEN.find((l) => l[1] === slug)[2];
  return `<section class="sektion leistung${gespiegelt ? ' leistung--gespiegelt' : ''}" id="${slug}" aria-labelledby="${slug}-titel">
  <div class="container raster leistung__raster">
    <div class="leistung__bild reveal">
      ${motiv(bild)}
    </div>
    <div class="leistung__text reveal">
      ${etikett(`MW-${nr} · ${name}`, { ton: `ton-${nr}` })}
      <h2 id="${slug}-titel">${h2}</h2>
      <p>${text}</p>
      <h3>Dazu gehört</h3>
      <ul class="hakenliste">
        ${liste.map((l) => `<li>${icon('check')}<span>${l}</span></li>`).join('\n        ')}
      </ul>
      <a class="textlink" href="kontakt.html?leistung=${slug}#anfrage">Diese Leistung anfragen${pfeil()}</a>
    </div>
  </div>
</section>`;
}

function leistungen() {
  const chips = LEISTUNGEN.map(([nr, slug, name]) => `<li><a href="#${slug}">${feld(`ton-${nr}`)}<span class="sprungleiste__code">MW-${nr}</span> <span class="sprungleiste__name">${name}</span></a></li>`).join('\n        ');
  const main = `<section class="seitenkopf" aria-labelledby="seiten-titel">
  <div class="container">
    <div class="raster seitenkopf__raster">
      <div class="seitenkopf__titel">
        ${etikett('Leistungen')}
        <h1 id="seiten-titel">Malerarbeiten innen und außen</h1>
      </div>
      <p class="seitenkopf__intro">Hier finden Sie alle Leistungen von Malerwerk auf einen Blick. Zu jeder Leistung steht, was dazugehört und wie wir vorgehen. Den genauen Umfang besprechen wir bei der Besichtigung.</p>
    </div>
    <nav class="sprungleiste" aria-label="Leistungen auf dieser Seite">
      <ul>
        ${chips}
      </ul>
    </nav>
  </div>
</section>

${leistungAbschnitt({
    nr: '01', slug: 'innenanstrich', h2: 'Innenanstrich für Wände und Decken',
    text: 'Ob nach dem Umzug, vor der Wohnungsübergabe oder weil das Kinderzimmer eine neue Farbe bekommen soll: Wir streichen Wände und Decken in Wohnräumen, Fluren und Treppenhäusern. Vorher werden Böden und Möbel abgedeckt und Kanten abgeklebt. Kleine Löcher und Risse spachteln wir, damit die Fläche nach dem Anstrich glatt wirkt.',
    liste: ['Boden, Möbel und Fenster abdecken', 'Löcher und Risse spachteln und schleifen', 'Untergrund grundieren, wo nötig', 'Wände und Decken streichen', 'Abdeckung entfernen und aufräumen'],
    bild: { sv: '3-2', ton: 'ton-gruen-hell', motiv: 'Wand wird mit der Rolle gestrichen', aria: 'Bildplatzhalter: Malerin oder Maler streicht eine Wohnzimmerwand mit der Rolle, Boden abgedeckt', alt: 'Eine Wohnzimmerwand wird mit der Farbrolle gestrichen, der Boden darunter ist mit Malervlies abgedeckt.' },
  })}

${leistungAbschnitt({
    nr: '02', slug: 'tapezierarbeiten', h2: 'Tapezieren&nbsp;– vom Untergrund bis zur letzten Bahn', gespiegelt: true,
    text: 'Eine Tapete sieht nur so gut aus wie die Wand darunter. Deshalb entfernen wir zuerst alte Tapeten und Kleberreste und glätten den Untergrund. Danach kleben wir die neue Tapete Bahn für Bahn – auf Stoß und mit passendem Muster. Ob Raufaser, Vliestapete oder Mustertapete: Wir beraten Sie bei der Besichtigung.',
    liste: ['Alte Tapeten und Kleberreste entfernen', 'Wand spachteln und glätten', 'Neue Tapete zuschneiden und kleben', 'Muster an den Stößen anpassen', 'Tapete auf Wunsch überstreichen'],
    bild: { sv: '3-2', ton: 'ton-leinen', motiv: 'Tapetenbahn wird angesetzt', aria: 'Bildplatzhalter: Eine Tapetenbahn wird an der Wand angesetzt und glatt gestrichen', alt: 'Eine neue Tapetenbahn wird an der Wand angesetzt und mit der Tapezierbürste glatt gestrichen, daneben die bereits geklebte Bahn.' },
  })}

<section class="sektion sektion--gruen leistung leistung--band" id="fassade" aria-labelledby="fassade-titel">
  <div class="container">
    <div class="kante reveal">
      ${motiv({ sv: 'quer', ton: 'ton-gruen-hell', motiv: 'Wohnhaus nach dem Fassadenanstrich', aria: 'Bildplatzhalter: Wohnhaus mit frisch gestrichener Fassade', alt: 'Wohnhaus mit frisch gestrichener, heller Fassade bei Tageslicht; Sockel und Fensterlaibungen sind in einem dunkleren Ton abgesetzt.' })}
    </div>
    <div class="raster leistung__raster">
      <div class="band__links reveal">
        ${etikett('MW-03 · Fassade', { ton: 'ton-03' })}
        <h2 id="fassade-titel">Fassade streichen und ausbessern</h2>
        <p>Sonne, Regen und Frost setzen jeder Fassade zu. Abblätternde Farbe, Risse oder grüner Belag sind ein Zeichen, dass ein neuer Anstrich fällig ist. Wir prüfen den Zustand der Außenwände, reinigen sie, bessern Schäden aus und streichen mit Fassadenfarbe für außen. Fenster, Türen und Pflanzen werden vorher geschützt.</p>
      </div>
      <div class="band__rechts reveal">
        <h3 class="liste-titel">Dazu gehört</h3>
        <ul class="hakenliste">
          <li>${icon('check')}<span>Zustand von Putz und Anstrich prüfen</span></li>
          <li>${icon('check')}<span>Fassade reinigen</span></li>
          <li>${icon('check')}<span>Risse und Putzschäden ausbessern</span></li>
          <li>${icon('check')}<span>Grundieren und Fassadenfarbe auftragen</span></li>
          <li>${icon('check')}<span>Sockel, Laibungen und Gesimse absetzen</span></li>
        </ul>
        <a class="textlink" href="kontakt.html?leistung=fassade#anfrage">Diese Leistung anfragen${pfeil()}</a>
      </div>
    </div>
  </div>
</section>

${leistungAbschnitt({
    nr: '04', slug: 'lackierarbeiten', h2: 'Lackierarbeiten an Türen, Fenstern und Heizkörpern',
    text: 'Abgegriffene Türen, vergilbte Heizkörper oder ein verwitterter Fensterrahmen sehen frisch lackiert wieder gepflegt aus. Wir schleifen die Flächen an, füllen Macken und tragen den Lack in dünnen Schichten auf. Das gilt für Holz ebenso wie für Metall.',
    liste: ['Türen, Zargen und Fensterrahmen lackieren', 'Heizkörper und Rohre lackieren', 'Geländer und Metallteile lackieren', 'Altanstrich anschleifen, Macken füllen', 'Lack in mehreren dünnen Schichten auftragen'],
    bild: { sv: '3-2', ton: 'ton-ocker', motiv: 'Türzarge wird lackiert', aria: 'Bildplatzhalter: Eine Türzarge wird mit dem Pinsel lackiert, die Wand daneben ist abgeklebt', alt: 'Nahaufnahme einer Türzarge, die mit einem feinen Pinsel weiß lackiert wird; die angrenzende Wand ist mit Klebeband abgeklebt.' },
  })}

<section class="sektion leistung leistung--muster" id="wandgestaltung" aria-labelledby="wandgestaltung-titel">
  <div class="container raster leistung__raster">
    <div class="leistung__text reveal">
      ${etikett('MW-05 · Wandgestaltung', { ton: 'ton-05' })}
      <h2 id="wandgestaltung-titel">Wandgestaltung mit Struktur</h2>
      <p>Nicht jede Wand muss einfarbig glatt sein. Mit Spachteltechnik, Lasur oder Kalkputz bekommt eine Fläche Tiefe und eine spürbare Oberfläche – etwa im Wohnzimmer, im Flur oder hinter dem Bett. Welche Technik zu Ihrem Raum passt, zeigen wir Ihnen an Mustern.</p>
      <h3>Dazu gehört</h3>
      <ul class="hakenliste">
        <li>${icon('check')}<span>Beratung mit Mustern vor Ort</span></li>
        <li>${icon('check')}<span>Spachteltechnik für glatte, feine Flächen</span></li>
        <li>${icon('check')}<span>Lasuren für lebendige Farbwirkung</span></li>
        <li>${icon('check')}<span>Kalkputz für matte, mineralische Wände</span></li>
        <li>${icon('check')}<span>Akzentwände und abgesetzte Flächen</span></li>
      </ul>
      <a class="textlink" href="kontakt.html?leistung=wandgestaltung#anfrage">Diese Leistung anfragen${pfeil()}</a>
    </div>
    <div class="musterkarte" data-reveal-gruppe>
      <div class="reveal">${motiv({ sv: '1-1', cls: 'motiv--klein', ton: 'ton-leinen', motiv: 'Kalkputz', aria: 'Bildplatzhalter: Nahaufnahme einer Wand mit mattem, leicht wolkigem Kalkputz', alt: 'Nahaufnahme einer Wand mit mattem Kalkputz in einem warmen Naturton, die Oberfläche leicht wolkig.', caption: `${feld('ton-02')}Kalkputz` })}</div>
      <div class="reveal">${motiv({ sv: '1-1', cls: 'motiv--klein', ton: 'ton-gruen-hell', motiv: 'Spachteltechnik', aria: 'Bildplatzhalter: Nahaufnahme einer Spachteltechnik mit feinen, glänzenden Zügen', alt: 'Nahaufnahme einer gespachtelten Wandfläche mit feinen, leicht glänzenden Spachtelzügen.', caption: `${feld('ton-05')}Spachteltechnik` })}</div>
      <div class="reveal">${motiv({ sv: '1-1', cls: 'motiv--klein', ton: 'ton-ocker', motiv: 'Lasur', aria: 'Bildplatzhalter: Nahaufnahme einer lasierten Wand mit sichtbaren Pinselspuren in zwei Tönen', alt: 'Nahaufnahme einer lasierten Wand, auf der zwei ähnliche Farbtöne ineinander übergehen.', caption: `${feld('ton-04')}Lasur` })}</div>
    </div>
  </div>
</section>

${leistungAbschnitt({
    nr: '06', slug: 'bodenbeschichtung', h2: 'Bodenbeschichtung für Keller und Garage', gespiegelt: true,
    text: 'Unbehandelter Estrich oder Beton staubt, nimmt Flecken auf und lässt sich schlecht reinigen. Eine Bodenbeschichtung schließt die Oberfläche. Wir reinigen den Boden gründlich, schleifen ihn an, grundieren und tragen die Beschichtung auf. Danach braucht der Boden Zeit zum Aushärten, bevor er wieder belastet wird.',
    liste: ['Boden reinigen und anschleifen', 'Risse und Ausbrüche ausbessern', 'Grundierung auftragen', 'Beschichtung auftragen', 'Sockel und Wandanschlüsse absetzen'],
    bild: { sv: '3-2', ton: 'ton-gruen-hell', motiv: 'Beschichteter Kellerboden', aria: 'Bildplatzhalter: Frisch beschichteter, grauer Kellerboden mit abgesetztem Sockel', alt: 'Frisch beschichteter Kellerboden in Grau, gleichmäßig matt glänzend, mit sauber abgesetztem Sockel an der Wand.' },
  })}

<section class="sektion sektion--kompakt sektion--leinen angebot" aria-labelledby="angebot-titel">
  <div class="container raster">
    <div class="angebot__box reveal">
      ${etikett('Angebot')}
      <h2 id="angebot-titel">Angebot nach Besichtigung</h2>
      <p class="messlatte">Wie viel Arbeit in einem Raum oder an einer Fassade steckt, hängt vom Untergrund, von der Fläche und vom gewünschten Ergebnis ab. Deshalb sehen wir uns alles zuerst vor Ort an. Danach erhalten Sie ein schriftliches Angebot.</p>
    </div>
  </div>
</section>

${abschluss('Sie wissen schon, was gemacht werden soll?', 'Dann schreiben Sie uns kurz, um welche Räume oder Flächen es geht. Wir melden uns für einen Termin.')}`;

  return seite({
    aktiv: 'leistungen',
    title: 'Leistungen: Innenanstrich, Tapezieren, Fassade | Malerwerk',
    desc: 'Innenanstrich, Tapezierarbeiten, Fassade streichen, Lackierarbeiten, Wandgestaltung und Bodenbeschichtung in Musterstadt – Ablauf und Anfrage.',
    ogTitle: 'Leistungen von Malerwerk in Musterstadt',
    ogDesc: 'Was zu Innenanstrich, Tapezierarbeiten, Fassade, Lackierarbeiten, Wandgestaltung und Bodenbeschichtung gehört – und wie Sie anfragen.',
    canonical: `${DOMAIN}/leistungen.html`,
  }, main);
}

// =====================================================================
// Arbeiten
// =====================================================================
const datenzeilen = (umfangBsp = true) => `<div><dt>Ort</dt><dd>${ph('Ort')}</dd></div>
          <div><dt>Leistung</dt><dd>${ph('Leistung')}</dd></div>
          <div><dt>Umfang</dt><dd>${ph(umfangBsp ? 'Umfang, z.&nbsp;B. Räume oder Fläche' : 'Umfang')}</dd></div>
          <div><dt>Farbton</dt><dd>${ph('Farbton')}</dd></div>`;
const projektText = (id, titel) => `<div class="projekt__text">
          <h2 id="${id}">${ph(titel)}</h2>
          <p>${ph('zwei bis drei Sätze zu Ausgangslage, ausgeführten Arbeiten und Ergebnis')}</p>
        </div>`;

function arbeiten() {
  const main = `<section class="seitenkopf" aria-labelledby="seiten-titel">
  <div class="container raster seitenkopf__raster">
    <div class="seitenkopf__titel">
      ${etikett('Arbeiten')}
      <h1 id="seiten-titel">Arbeiten aus Musterstadt und Umgebung</h1>
      <p class="seitenkopf__intro hinweis-etikett">Hier zeigen wir ausgewählte Aufträge – fertige Räume, Fassaden und Details aus der Nähe. Bei Vorher-Nachher-Bildern ist jeweils dieselbe Stelle aus gleicher Position fotografiert. So sehen Sie, was sich verändert hat.</p>
    </div>
    <p class="etikett seitenkopf__hinweis">${ph('Referenzprojekte mit Fotos und Freigabe der Kunden')}</p>
  </div>
</section>

<section class="sektion sektion--linie" aria-labelledby="projekt1-etikett projekt1-titel">
  <div class="container raster">
    <div class="projekt1__bild reveal">
      ${motiv({ sv: '3-2', ton: 'ton-gruen-hell', motiv: 'Fertig gestrichener Wohnraum', aria: 'Bildplatzhalter: Hauptbild Projekt 1 – fertig gestrichener Wohnraum bei Tageslicht', alt: '[PLATZHALTER: Beschreibung des Fotos, z.&nbsp;B. Raum, Farbton, Blickrichtung]' })}
    </div>
    <div class="projekt1__info reveal">
      <div class="datenblatt ton-03">
        ${etikett('Projekt 01', { id: 'projekt1-etikett' })}
        <dl>
          ${datenzeilen(true)}
        </dl>
      </div>
      ${projektText('projekt1-titel', 'Projekttitel, z.&nbsp;B. „Altbauwohnung, neu gestrichen“')}
    </div>
  </div>
</section>

<section class="sektion sektion--leinen" aria-labelledby="projekt2-etikett projekt2-titel">
  <div class="container">
    ${etikett('Projekt 02 · Vorher und nachher', { cls: 'reveal', id: 'projekt2-etikett' })}
    <div class="paar" data-reveal-gruppe>
      <div class="reveal">${motiv({ sv: '4-5', ton: 'ton-ocker', aufBild: 'Vorher', motiv: 'Wand vor der Renovierung', aria: 'Bildplatzhalter: Vorher – Wand mit Rissen, Flecken und alter Tapete', alt: 'Vorher: [PLATZHALTER: Zustand vor der Arbeit, z.&nbsp;B. Wand mit Rissen und alter Tapete]' })}</div>
      <div class="reveal">${motiv({ sv: '4-5', ton: 'ton-gruen-hell', aufBild: 'Nachher', motiv: 'Dieselbe Wand nach der Arbeit', aria: 'Bildplatzhalter: Nachher – dieselbe Wand aus gleicher Position, glatt und frisch gestrichen', alt: 'Nachher: [PLATZHALTER: Zustand nach der Arbeit, gleiche Position wie das Vorher-Bild]' })}</div>
    </div>
    <div class="projekt2__unten reveal">
      <div class="datenblatt datenblatt--quer ton-04">
        <dl>
          ${datenzeilen(false)}
        </dl>
      </div>
      ${projektText('projekt2-titel', 'Projekttitel')}
    </div>
  </div>
</section>

<section class="sektion" aria-labelledby="projekt3-etikett projekt3-titel">
  <div class="container raster">
    <div class="projekt3__info reveal">
      <div class="datenblatt ton-06">
        ${etikett('Projekt 03', { id: 'projekt3-etikett' })}
        <dl>
          ${datenzeilen(false)}
        </dl>
      </div>
      ${projektText('projekt3-titel', 'Projekttitel')}
    </div>
    <div class="projekt3__bilder">
      <div class="reveal">
      ${motiv({ sv: '3-2', ton: 'ton-leinen', motiv: 'Treppenhaus nach dem Anstrich', aria: 'Bildplatzhalter: Hauptbild Projekt 3 – frisch gestrichenes Treppenhaus mit lackiertem Geländer', alt: '[PLATZHALTER: Beschreibung des Fotos]' })}
      </div>
      <div class="details" data-reveal-gruppe>
        <div class="reveal">${motiv({ sv: '4-5', ton: 'ton-ocker', motiv: 'Lackiertes Treppengeländer', aria: 'Bildplatzhalter: Detail – frisch lackiertes Treppengeländer', alt: '[PLATZHALTER: Beschreibung des Detailfotos]' })}</div>
        <div class="reveal">${motiv({ sv: '4-5', ton: 'ton-gruen-hell', motiv: 'Kante an der Treppenwange', aria: 'Bildplatzhalter: Detail – gerade Farbkante zwischen Wand und Treppenwange', alt: '[PLATZHALTER: Beschreibung des Detailfotos]' })}</div>
      </div>
    </div>
  </div>
</section>

${abschluss('Soll Ihr Projekt das nächste sein?', 'Erzählen Sie uns, was Sie vorhaben. Wir sehen es uns vor Ort an und schicken Ihnen ein Angebot.')}`;

  return seite({
    aktiv: 'arbeiten',
    title: 'Arbeiten & Referenzen aus Musterstadt | Malerwerk',
    desc: 'Arbeiten von Malerwerk in Musterstadt und Umgebung: fertige Räume, Fassaden und Details sowie Vorher-Nachher-Vergleiche. Fragen Sie Ihr Projekt an.',
    ogTitle: 'Arbeiten von Malerwerk – Musterstadt und Umgebung',
    ogDesc: 'Fertige Räume, Fassaden, Details und Vorher-Nachher-Vergleiche aus Musterstadt und Umgebung.',
    canonical: `${DOMAIN}/arbeiten.html`,
  }, main);
}

// =====================================================================
// Über uns
// =====================================================================
function ueberUns() {
  const punkte = [
    ['Erst reden, dann streichen', 'Bevor wir anfangen, klären wir mit Ihnen Farbtöne, Umfang und Ablauf. Was besprochen ist, steht im schriftlichen Angebot.'],
    ['Ihre Wohnung wird geschützt', 'Böden, Möbel und Fenster decken wir ab, Kanten und Steckdosen kleben wir ab. Was nicht gestrichen werden soll, bleibt sauber.'],
    ['Der Untergrund kommt zuerst', 'Wir prüfen Wände und Flächen und bereiten sie vor: spachteln, schleifen, grundieren. Erst dann wird gestrichen, tapeziert oder lackiert.'],
    ['Aufräumen und gemeinsame Abnahme', 'Nach der Arbeit entfernen wir Abdeckung und Klebeband und nehmen unser Material mit. Zum Schluss sehen wir uns das Ergebnis gemeinsam mit Ihnen an.'],
  ].map(([t, s], i) => `<li class="arbeitsweise__punkt reveal">
          <span class="arbeitsweise__nummer" aria-hidden="true">0${i + 1}</span>
          <h3>${t}</h3>
          <p>${s}</p>
        </li>`).join('\n        ');

  const portraet = (cls, ton, aria) => `<div class="${cls} reveal">${motiv({ sv: '4-5', ton, motiv: 'Porträt bei der Arbeit', aria, alt: '[PLATZHALTER: Name und Tätigkeit der abgebildeten Person]', caption: `<span class="meta">${ph('Name · Funktion')}</span>` })}</div>`;

  const main = `<section class="seitenkopf" aria-labelledby="seiten-titel">
  <div class="container">
    <div class="raster">
      <div class="seitenkopf__titel--breit">
        ${etikett('Über uns')}
        <h1 id="seiten-titel">Malerwerk&nbsp;– Malerbetrieb in&nbsp;Musterstadt</h1>
      </div>
    </div>
    <p class="lead messlatte ueber__lead">Wer zu Ihnen nach Hause kommt, sollte vorher bekannt sein. Hier erfahren Sie, wer hinter Malerwerk steht und wie wir arbeiten – vom ersten Gespräch bis zur Abnahme.</p>
    <div class="ueber__bild">
      ${motiv({ sv: 'quer', ton: 'ton-gruen-hell', motiv: 'Das Team bei der Arbeit', aria: 'Bildplatzhalter: Das Team von Malerwerk bei der Arbeit in einem hellen, abgedeckten Raum', alt: '[PLATZHALTER: Beschreibung des Teamfotos, z.&nbsp;B. wer zu sehen ist und bei welcher Arbeit]' })}
    </div>
  </div>
</section>

<section class="sektion sektion--linie" aria-labelledby="betrieb-titel">
  <div class="container raster">
    ${etikett('Der Betrieb', { cls: 'betrieb__notiz' })}
    <div class="betrieb__text reveal">
      <h2 id="betrieb-titel">Wer hinter Malerwerk steht</h2>
      <div class="fluss messlatte">
        <p>Malerwerk ist ein Malerbetrieb aus Musterstadt. Wir arbeiten für Privatkunden – in Wohnungen, Häusern, Treppenhäusern und an Fassaden.</p>
        <p>${ph('Geschichte des Betriebs, Inhaberin oder Inhaber, Qualifikation (z.&nbsp;B. Meistertitel) – zwei bis vier Sätze, nur belegte Angaben')}</p>
        <p>${ph('Alleinstellungsmerkmal – was Malerwerk von anderen Betrieben unterscheidet')}</p>
      </div>
    </div>
  </div>
</section>

<section class="sektion sektion--leinen" id="arbeitsweise" aria-labelledby="arbeitsweise-titel">
  <div class="container">
    <div class="reveal">
      ${etikett('Arbeitsweise')}
      <h2 id="arbeitsweise-titel">So arbeiten wir bei Ihnen zu Hause</h2>
    </div>
    <ol class="arbeitsweise__liste" data-reveal-gruppe>
        ${punkte}
    </ol>
  </div>
</section>

<section class="sektion" aria-labelledby="team-titel">
  <div class="container raster">
    <div class="team__text reveal">
      ${etikett('Team')}
      <h2 id="team-titel">Die Menschen, die zu Ihnen kommen</h2>
      <p>${ph('kurze Vorstellung des Teams – Namen, Aufgaben und Qualifikationen, nur mit Einverständnis der Personen')}</p>
    </div>
    <div class="team__bilder">
      ${portraet('team__gross', 'ton-ocker', 'Bildplatzhalter: Porträt einer Person aus dem Team bei der Arbeit')}
      ${portraet('team__klein-1', 'ton-gruen-hell', 'Bildplatzhalter: Porträt einer weiteren Person aus dem Team')}
      ${portraet('team__klein-2', 'ton-leinen', 'Bildplatzhalter: Porträt einer weiteren Person aus dem Team')}
    </div>
  </div>
</section>

<section class="sektion sektion--kompakt sektion--gruen gebiet--kompakt" aria-labelledby="gebiet-titel">
  <div class="container">
    ${etikett('Einzugsgebiet')}
    <div class="gebiet__zeile">
      <h2 id="gebiet-titel">Wir arbeiten in Musterstadt und Umgebung</h2>
      ${ortsliste()}
      <a class="textlink" href="kontakt.html#anfrage">Anfrage für Ihren Ort senden${pfeil()}</a>
    </div>
  </div>
</section>

${abschluss('Sollen wir uns Ihre Räume ansehen?', 'Schreiben Sie uns oder rufen Sie an. Wir vereinbaren einen Termin zur Besichtigung.')}`;

  return seite({
    aktiv: 'ueber-uns',
    title: 'Über uns – Malerbetrieb in Musterstadt | Malerwerk',
    desc: 'Malerwerk ist ein Malerbetrieb in Musterstadt. So arbeiten wir: klare Absprache vorab, Schutz Ihrer Wohnung, gründliche Vorbereitung, gemeinsame Abnahme.',
    ogTitle: 'Über Malerwerk – Malerbetrieb in Musterstadt',
    ogDesc: 'Wer hinter Malerwerk steht und wie wir arbeiten: Absprache, Schutz Ihrer Wohnung, Vorbereitung des Untergrunds und gemeinsame Abnahme.',
    canonical: `${DOMAIN}/ueber-uns.html`,
  }, main);
}

// =====================================================================
// Kontakt
// =====================================================================
const fehlerP = (id) => `<p class="fehlertext" id="${id}" hidden>${icon('circle-alert', { size: 16 })}<span class="fehlertext__text"></span></p>`;

function kontakt() {
  const main = `<section class="seitenkopf" aria-labelledby="seiten-titel">
  <div class="container raster seitenkopf__raster">
    <div class="kontaktkopf__titel">
      ${etikett('Kontakt')}
      <h1 id="seiten-titel">Anfrage senden oder anrufen</h1>
      <p class="lead messlatte hinweis-etikett">Beschreiben Sie kurz, was gemacht werden soll. Wir melden uns bei Ihnen und vereinbaren einen Termin zur Besichtigung.</p>
    </div>
    <div class="telblock">
      ${etikett('Anrufen')}
      <a class="telblock__nummer" href="${TEL}" aria-label="${TEL_LABEL}">${icon('phone', { size: 24 })}${phTel}</a>
      <p class="meta">${ph('Erreichbarkeit, z.&nbsp;B. Wochentage und Uhrzeiten')}</p>
      <a class="textlink" href="${MAIL}" aria-label="${MAIL_LABEL}">${icon('mail')}${ph('E-Mail-Adresse')}</a>
    </div>
  </div>
</section>

<section class="sektion sektion--leinen" id="anfrage" aria-labelledby="formular-titel">
  <div class="container raster anfrage__raster">
    <div class="formular-box">
      <form class="formular" id="anfrageformular" action="kontakt.php#anfrage" method="post" data-formular>
        <h2 id="formular-titel">Ihre Anfrage</h2>
        <p class="meta formular__pflicht">Felder mit * sind Pflichtfelder.</p>

        <div class="meldung" id="meldung-versand" role="alert" hidden>
          <p class="meldung__titel">${icon('circle-alert')}Ihre Anfrage konnte nicht gesendet werden</p>
          <p>Leider ist beim Versand ein technischer Fehler aufgetreten. Ihre Eingaben sind noch da – bitte versuchen Sie es in einigen Minuten erneut. Oder rufen Sie uns an: ${ph('Telefonnummer')}. Per E-Mail erreichen Sie uns unter ${ph('E-Mail-Adresse')}.</p>
        </div>

        <div class="meldung" id="fehler-zusammenfassung" role="alert" tabindex="-1" hidden>
          <p class="meldung__titel">${icon('circle-alert')}Bitte prüfen Sie Ihre Angaben</p>
          <p>Einige Felder sind noch nicht richtig ausgefüllt. Die Hinweise stehen direkt am jeweiligen Feld.</p>
          <ul data-fehlerliste></ul>
        </div>

        <div class="feld">
          <label class="feld__label" for="f-name">Name <span aria-hidden="true">*</span></label>
          <input id="f-name" name="name" type="text" autocomplete="name" maxlength="100" required>
          ${fehlerP('f-name-fehler')}
        </div>

        <fieldset class="feldgruppe" id="f-erreichbar" aria-describedby="f-erreichbar-hilfe">
          <legend>Wie erreichen wir Sie? <span aria-hidden="true">*</span></legend>
          <p class="feld__hilfe" id="f-erreichbar-hilfe">Bitte geben Sie mindestens eine Telefonnummer oder eine E-Mail-Adresse an.</p>
          ${fehlerP('f-erreichbar-fehler')}
          <div class="feld">
            <label class="feld__label" for="f-telefon">Telefon</label>
            <p class="feld__hilfe" id="f-telefon-hilfe">Für Rückfragen und zur Terminabsprache.</p>
            <input id="f-telefon" name="telefon" type="tel" autocomplete="tel" maxlength="40" aria-describedby="f-erreichbar-hilfe f-telefon-hilfe">
            ${fehlerP('f-telefon-fehler')}
          </div>
          <div class="feld">
            <label class="feld__label" for="f-email">E-Mail</label>
            <input id="f-email" name="email" type="email" autocomplete="email" maxlength="254" aria-describedby="f-erreichbar-hilfe">
            ${fehlerP('f-email-fehler')}
          </div>
        </fieldset>

        <div class="feld">
          <label class="feld__label" for="f-ort">PLZ und Ort des Objekts</label>
          <p class="feld__hilfe" id="f-ort-hilfe">Wo sollen die Arbeiten stattfinden?</p>
          <input id="f-ort" name="ort" type="text" maxlength="120" aria-describedby="f-ort-hilfe">
          ${fehlerP('f-ort-fehler')}
        </div>

        <div class="feld">
          <label class="feld__label" for="f-leistung">Um welche Leistung geht es?</label>
          <select id="f-leistung" name="leistung">
            <option value="">Bitte wählen</option>
            <option value="innenanstrich">Innenanstrich</option>
            <option value="tapezierarbeiten">Tapezierarbeiten</option>
            <option value="fassade">Fassade</option>
            <option value="lackierarbeiten">Lackierarbeiten</option>
            <option value="wandgestaltung">Wandgestaltung</option>
            <option value="bodenbeschichtung">Bodenbeschichtung</option>
            <option value="sonstiges">Sonstiges / weiß ich noch nicht</option>
          </select>
          ${fehlerP('f-leistung-fehler')}
        </div>

        <div class="feld">
          <label class="feld__label" for="f-nachricht">Was soll gemacht werden? <span aria-hidden="true">*</span></label>
          <p class="feld__hilfe" id="f-nachricht-hilfe">Zum Beispiel: welche Räume oder Flächen, ungefähre Größe, gewünschte Farbe, Besonderheiten wie hohe Decken oder Altbau.</p>
          <textarea id="f-nachricht" name="nachricht" rows="6" maxlength="5000" required aria-describedby="f-nachricht-hilfe"></textarea>
          ${fehlerP('f-nachricht-fehler')}
        </div>

        <div class="feld">
          <label class="feld__label" for="f-zeitraum">Gewünschter Zeitraum (optional)</label>
          <p class="feld__hilfe" id="f-zeitraum-hilfe">Zum Beispiel „vor dem Umzug Ende März“ oder „flexibel“.</p>
          <input id="f-zeitraum" name="zeitraum" type="text" maxlength="120" aria-describedby="f-zeitraum-hilfe">
          ${fehlerP('f-zeitraum-fehler')}
        </div>

        <div class="honig" aria-hidden="true">
          <label for="f-website">Dieses Feld bitte leer lassen</label>
          <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off">
        </div>

        <p class="formular__hinweis">Ihre Angaben verwenden wir nur, um Ihre Anfrage zu beantworten und gegebenenfalls ein Angebot zu erstellen. Sie werden nicht an Dritte weitergegeben. Mehr dazu in unserer <a href="datenschutz.html#kontaktformular">Datenschutzerklärung</a>.</p>

        <div class="formular__senden">
          <button class="knopf knopf--primaer knopf--gross" type="submit" data-senden><span data-senden-text>Anfrage senden</span>${pfeil()}</button>
          <p class="formular__anruf">Lieber direkt sprechen? Rufen Sie an: <a href="${TEL}">${phTel}</a></p>
        </div>
      </form>
    </div>

    <div class="seitenspalte">
      <h2>Was nach Ihrer Anfrage passiert</h2>
      <ol class="schritte">
        <li><span>Wir melden uns per Telefon oder E-Mail und klären erste Fragen.</span></li>
        <li><span>Wir vereinbaren einen Termin und sehen uns alles vor Ort an.</span></li>
        <li><span>Sie erhalten ein schriftliches Angebot und entscheiden in Ruhe.</span></li>
      </ol>
      <h3>Adresse</h3>
      <address>Malerwerk<br>${ph('Straße und Hausnummer')}<br>${ph('PLZ')} Musterstadt</address>
      <h3>Erreichbarkeit</h3>
      <p>${ph('Erreichbarkeit, z.&nbsp;B. Wochentage und Uhrzeiten')}</p>
    </div>
  </div>
</section>

<section class="sektion" aria-labelledby="anfahrt-titel">
  <div class="container raster">
    <div class="anfahrt__links reveal">
      ${etikett('Anfahrt')}
      <h2 id="anfahrt-titel">So finden Sie uns</h2>
      <p>Malerwerk · ${ph('Straße und Hausnummer')} · ${ph('PLZ')} Musterstadt</p>
      <p><a class="textlink" href="https://www.openstreetmap.org/search?query=%5BPLATZHALTER%3A%20Adresse%20URL-kodiert%5D" target="_blank" rel="noopener noreferrer" aria-label="Route in OpenStreetMap öffnen (externer Dienst, öffnet neues Fenster)">Route in OpenStreetMap öffnen${icon('arrow-up-right')}</a></p>
      <p class="meta">Externer Dienst, öffnet in einem neuen Fenster. Erst mit dem Klick werden Daten an OpenStreetMap übertragen.</p>
    </div>
    <div class="anfahrt__rechts reveal">
      <h3>Einzugsgebiet</h3>
      <p>Wir arbeiten in Musterstadt und Umgebung:</p>
      ${ortsliste()}
      <p>Ihr Ort ist nicht dabei? Fragen Sie trotzdem an.</p>
    </div>
  </div>
</section>`;

  return seite({
    aktiv: 'kontakt',
    title: 'Kontakt & Anfrage – Maler in Musterstadt | Malerwerk',
    desc: 'Anfrage an Malerwerk, Malerbetrieb in Musterstadt: Formular ausfüllen oder anrufen. Wir melden uns, vereinbaren eine Besichtigung und schicken ein Angebot.',
    ogTitle: 'Anfrage an Malerwerk – Malerbetrieb in Musterstadt',
    ogDesc: 'Schildern Sie kurz Ihr Vorhaben oder rufen Sie an. Wir melden uns, sehen uns alles vor Ort an und schicken Ihnen ein schriftliches Angebot.',
    canonical: `${DOMAIN}/kontakt.html`,
    jsonld: { ...JSONLD },
  }, main);
}

// =====================================================================
// Danke
// =====================================================================
function danke() {
  const main = `<section class="sektion danke" aria-labelledby="seiten-titel">
  <div class="container danke__inhalt">
    ${marke('danke__marke')}
    ${etikett('Anfrage gesendet')}
    <h1 id="seiten-titel">Vielen Dank für Ihre Anfrage</h1>
    <p class="lead">Ihre Nachricht ist bei uns angekommen. Wir melden uns bei Ihnen per Telefon oder E-Mail, um Ihre Fragen zu klären und einen Termin zur Besichtigung zu vereinbaren.</p>
    <p>Ist es eilig? Dann rufen Sie uns gern an: <a class="tel" href="${TEL}">${phTel}</a>.</p>
    <div class="knopfreihe">
      <a class="textlink" href="index.html">Zurück zur Startseite${pfeil()}</a>
      <a class="textlink" href="leistungen.html">Leistungen ansehen${pfeil()}</a>
    </div>
  </div>
</section>`;
  return seite({
    title: 'Anfrage gesendet | Malerwerk',
    desc: 'Vielen Dank für Ihre Anfrage bei Malerwerk in Musterstadt. Wir melden uns bei Ihnen, um die nächsten Schritte und eine Besichtigung abzustimmen.',
    robots: 'noindex, follow',
  }, main);
}

// =====================================================================
// Impressum
// =====================================================================
function impressum() {
  const main = `<section class="seitenkopf" aria-labelledby="seiten-titel">
  <div class="container">
    ${etikett('Rechtliches')}
    <h1 id="seiten-titel">Impressum</h1>
  </div>
</section>
<section class="sektion sektion--linie">
  <div class="container">
    <div class="rechtstext">
    <h2>Angaben gemäß §&nbsp;5 DDG</h2>
    <p>Malerwerk ${ph('vollständiger Firmenname mit Rechtsformzusatz, z.&nbsp;B. „Inhaber Vorname Nachname e.&nbsp;K.“ oder „Malerwerk GmbH“')}<br>
    ${ph('Straße und Hausnummer')}<br>
    ${ph('PLZ')} Musterstadt<br>
    Deutschland</p>

    <h2>Vertreten durch</h2>
    <p>${ph('Inhaberin/Inhaber bzw. vertretungsberechtigte Person(en), z.&nbsp;B. Geschäftsführer bei einer GmbH')}</p>

    <h2>Rechtsform</h2>
    <p>${ph('Rechtsform, z.&nbsp;B. Einzelunternehmen, e.&nbsp;K., GbR, GmbH')}</p>

    <h2>Kontakt</h2>
    <p>Telefon: <a href="${TEL}">${phTel}</a><br>
    E-Mail: <a href="${MAIL}">${ph('E-Mail-Adresse')}</a></p>

    <!-- Abschnitt entfernen, wenn kein Registereintrag besteht. -->
    <h2>Registereintrag</h2>
    <p>Eintragung im Handelsregister<br>Registergericht: ${ph('Amtsgericht – entfällt, wenn keine Eintragung')}<br>Registernummer: ${ph('HRA/HRB-Nummer – entfällt, wenn keine Eintragung')}</p>

    <!-- Abschnitt entfernen, wenn keine USt-IdNr. vorhanden ist. Steuernummer gehört nicht ins Impressum. -->
    <h2>Umsatzsteuer-Identifikationsnummer</h2>
    <p>Umsatzsteuer-Identifikationsnummer gemäß §&nbsp;27&nbsp;a Umsatzsteuergesetz: ${ph('USt-IdNr. – entfällt, wenn keine vorhanden')}</p>

    <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
    <p>Berufsbezeichnung: ${ph('Berufsbezeichnung, z.&nbsp;B. Maler und Lackierer bzw. Maler- und Lackierermeister/-in – nur die tatsächlich geführte Bezeichnung')}<br>
    Verliehen in: ${ph('Staat, in dem die Berufsbezeichnung verliehen wurde, z.&nbsp;B. Deutschland')}<br>
    Zuständige Kammer: ${ph('Name und Anschrift der zuständigen Handwerkskammer')}<br>
    Eintragung in die Handwerksrolle: ${ph('Handwerkskammer und Betriebsnummer, falls angegeben werden soll')}<br>
    Es gelten folgende berufsrechtliche Regelungen: Gesetz zur Ordnung des Handwerks (Handwerksordnung), einsehbar unter <a href="https://www.gesetze-im-internet.de/hwo/" rel="noopener noreferrer">www.gesetze-im-internet.de/hwo</a>.</p>

    <h2>Redaktionell verantwortlich</h2>
    <p>Verantwortlich für den Inhalt nach §&nbsp;18 Abs.&nbsp;2 MStV:<br>${ph('Vorname Nachname')}<br>${ph('Anschrift, falls abweichend von oben')}</p>

    <!-- Vorbereiteter Text nach § 36 VSBG – vom Kunden zu bestätigen (siehe Launch-Checkliste). Nach der Bestätigung nur den Satz ohne Platzhalter-Markierung stehen lassen. -->
    <h2>Verbraucherstreitbeilegung</h2>
    <p>${ph('Erklärung nach §&nbsp;36 VSBG vom Betrieb bestätigen – vorbereiteter Text: „Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.“')}</p>

    <h2>Bildnachweise</h2>
    <p>${ph('Bildnachweise – entfällt, wenn alle Fotos aus dem eigenen Betrieb stammen')}</p>

    <h2>Gestaltung</h2>
    <p>Schrift: Archivo, lizenziert unter der SIL Open Font License&nbsp;1.1. Icons: Lucide, lizenziert unter der ISC-Lizenz.</p>
    </div>
  </div>
</section>`;
  return seite({
    title: 'Impressum | Malerwerk, Musterstadt',
    desc: 'Impressum von Malerwerk, Malerbetrieb in Musterstadt: Anbieterkennzeichnung nach § 5 DDG mit Anschrift, Kontaktdaten, Kammer und Berufsbezeichnung.',
    ogTitle: 'Impressum – Malerwerk',
    canonical: `${DOMAIN}/impressum.html`,
  }, main);
}

// =====================================================================
// Datenschutz
// =====================================================================
function datenschutz() {
  const toc = [
    ['verantwortlicher', 'Verantwortlicher'], ['ueberblick', 'Überblick'], ['hosting', 'Hosting und Server-Logfiles'],
    ['kontaktformular', 'Kontaktformular'], ['kontakt', 'Kontakt per <span class="kein-umbruch">E-Mail</span> oder Telefon'], ['cookies', 'Keine Cookies, kein Tracking'],
    ['schriften', 'Schriften und Icons'], ['externe-links', 'Links zu externen Diensten'], ['speicherdauer', 'Speicherdauer'],
    ['rechte', 'Ihre Rechte'], ['beschwerde', 'Beschwerderecht'], ['verschluesselung', 'Verschlüsselung'],
  ];
  const tocHtml = toc.map(([id, t], i) => `<li><a href="#${id}"><span class="toc__nr" aria-hidden="true">${i + 1}.</span><span>${t}</span></a></li>`).join('\n          ');
  const main = `<section class="seitenkopf" aria-labelledby="seiten-titel">
  <div class="container">
    ${etikett('Rechtliches')}
    <h1 id="seiten-titel">Datenschutz&shy;erklärung</h1>
    <p class="meta hinweis-etikett">Stand: ${ph('Monat und Jahr')}</p>
  </div>
</section>
<section class="sektion sektion--linie">
  <div class="container">
    <div class="raster">
      <!-- Prüfhinweis nach der rechtlichen Prüfung entfernen (Launch-Checkliste). -->
      <div class="pruefhinweis" role="note">
        <strong>Wichtiger Hinweis: Dieser Text muss vor der Veröffentlichung geprüft werden</strong>
        <p>Diese Datenschutzerklärung ist eine vorbereitete Struktur auf Grundlage der tatsächlich eingesetzten Technik dieser Website. Sie ersetzt keine Rechtsberatung. Vor der Veröffentlichung muss der Text mit einem Datenschutz-Generator (z.&nbsp;B. eRecht24 oder Datenschutz-Generator.de) erstellt bzw. abgeglichen oder anwaltlich geprüft werden. Alle mit Platzhalter gekennzeichneten Angaben sind zu ergänzen.</p>
      </div>
      <nav class="toc" aria-label="Inhalt der Datenschutzerklärung">
        ${etikett('Inhalt')}
        <ol>
          ${tocHtml}
        </ol>
      </nav>
      <div class="rechtstext datenschutz__text">
        <h2 id="verantwortlicher">1. Verantwortlicher</h2>
        <p>Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:<br>
        Malerwerk ${ph('vollständiger Firmenname')}<br>
        ${ph('Inhaberin/Inhaber bzw. vertretungsberechtigte Person')}<br>
        ${ph('Straße und Hausnummer')}<br>
        ${ph('PLZ')} Musterstadt<br>
        Telefon: <a href="${TEL}">${phTel}</a><br>
        E-Mail: <a href="${MAIL}">${ph('E-Mail-Adresse')}</a></p>
        <p>Einen Datenschutzbeauftragten haben wir ${ph('nicht benannt, da keine gesetzliche Pflicht besteht – oder Name und Kontakt des Datenschutzbeauftragten')}.</p>

        <h2 id="ueberblick">2. Überblick</h2>
        <p>Personenbezogene Daten sind alle Angaben, mit denen Sie persönlich identifiziert werden können, etwa Ihr Name, Ihre Telefonnummer oder Ihre IP-Adresse. Auf dieser Website verarbeiten wir nur die Daten, die für den Betrieb der Seite und für die Beantwortung Ihrer Anfrage nötig sind.</p>
        <p>Im Einzelnen sind das:</p>
        <ul>
          <li>technische Zugriffsdaten, die beim Aufruf jeder Website anfallen (Server-Logfiles),</li>
          <li>die Angaben, die Sie uns über das Kontaktformular, per E-Mail oder am Telefon mitteilen.</li>
        </ul>
        <p>Wir setzen keine Cookies, keine Analyse- oder Tracking-Werkzeuge und keine eingebundenen Inhalte von Drittanbietern ein. Rechtsgrundlagen der Verarbeitung sind die Datenschutz-Grundverordnung (DSGVO) und das Bundesdatenschutzgesetz (BDSG); die jeweilige Rechtsgrundlage nennen wir bei den einzelnen Verarbeitungen.</p>

        <h2 id="hosting">3. Hosting und Server-Logfiles</h2>
        <p>Diese Website wird bei folgendem Anbieter gehostet: ${ph('Name und Anschrift des Hosters')}. Mit dem Hoster besteht ein Vertrag zur Auftragsverarbeitung nach Art.&nbsp;28 DSGVO ${ph('bestätigen')}.</p>
        <p>Bei jedem Aufruf der Website speichert der Server automatisch Informationen, die Ihr Browser übermittelt (Server-Logfiles):</p>
        <ul>
          <li>IP-Adresse des anfragenden Geräts,</li>
          <li>Datum und Uhrzeit des Zugriffs,</li>
          <li>aufgerufene Seite bzw. Datei,</li>
          <li>Website, von der aus Sie zu uns gekommen sind (Referrer-URL),</li>
          <li>verwendeter Browser und Betriebssystem,</li>
          <li>übertragene Datenmenge und Statuscode der Anfrage.</li>
        </ul>
        <p>Diese Daten sind technisch nötig, um die Website auszuliefern sowie Stabilität und Sicherheit zu gewährleisten. Eine Zusammenführung mit anderen Datenquellen findet nicht statt. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO; unser berechtigtes Interesse liegt im sicheren und fehlerfreien Betrieb der Website. Die Logfiles werden nach ${ph('Speicherdauer laut Hoster')} gelöscht.</p>

        <h2 id="kontaktformular">4. Kontaktformular</h2>
        <p>Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir die Angaben, die Sie eintragen: Name, Telefonnummer und/oder E-Mail-Adresse, Ort des Objekts, gewünschte Leistung, Ihre Nachricht und den gewünschten Zeitraum. Pflichtangaben sind Ihr Name, Ihre Nachricht und mindestens eine Möglichkeit, Sie zu erreichen.</p>
        <p>Das Formular wird auf unserem eigenen Webspace verarbeitet und Ihre Angaben werden per E-Mail an uns weitergeleitet. Dabei werden keine externen Dienste eingesetzt. Zum Schutz vor automatisierten Spam-Nachrichten verwenden wir ein unsichtbares Prüffeld; dafür werden keine zusätzlichen Daten erhoben und keine Drittanbieter eingebunden.</p>
        <p>Wir nutzen Ihre Angaben ausschließlich, um Ihre Anfrage zu beantworten, einen Besichtigungstermin zu vereinbaren und gegebenenfalls ein Angebot zu erstellen. Eine Weitergabe an Dritte findet nicht statt. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO (Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage hin) sowie Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO für allgemeine Anfragen; unser berechtigtes Interesse liegt in der Beantwortung Ihres Anliegens.</p>

        <h2 id="kontakt">5. Kontakt per <span class="kein-umbruch">E-Mail</span> oder Telefon</h2>
        <p>Wenn Sie uns per E-Mail schreiben oder anrufen, verarbeiten wir die Angaben, die Sie uns dabei mitteilen – etwa Ihren Namen, Ihre Kontaktdaten und Ihr Anliegen –, um Ihre Anfrage zu bearbeiten. Die Rechtsgrundlagen sind dieselben wie beim Kontaktformular (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b bzw. lit.&nbsp;f DSGVO). Für E-Mails nutzen wir ${ph('E-Mail-Anbieter bzw. Postfach beim Hoster')}.</p>

        <h2 id="cookies">6. Keine Cookies, kein Tracking</h2>
        <p>Diese Website setzt keine Cookies und verwendet keine Analyse-, Werbe- oder Tracking-Dienste. Es werden keine Nutzungsprofile erstellt. Aus diesem Grund zeigen wir auch kein Cookie-Banner an.</p>

        <h2 id="schriften">7. Schriften und Icons</h2>
        <p>Schriften und Icons sind lokal auf unserem Server gespeichert und werden von dort geladen. Beim Aufruf der Website wird keine Verbindung zu Servern von Drittanbietern wie Google Fonts oder Content-Delivery-Netzwerken hergestellt.</p>

        <h2 id="externe-links">8. Links zu externen Diensten</h2>
        <p>Auf der Kontaktseite finden Sie einen Link, mit dem Sie eine Route in OpenStreetMap öffnen können. Es handelt sich um einen einfachen Link, keine eingebettete Karte. Erst wenn Sie ihn anklicken, wird die Website von OpenStreetMap in einem neuen Fenster geöffnet und Ihr Browser überträgt Daten wie Ihre IP-Adresse an den Betreiber. Betreiber ist die OpenStreetMap Foundation, St John’s Innovation Centre, Cowley Road, Cambridge, CB4&nbsp;0WS, Vereinigtes Königreich. Für die Verarbeitung dort gilt deren Datenschutzerklärung: <a href="https://osmfoundation.org/wiki/Privacy_Policy" rel="noopener noreferrer">osmfoundation.org/wiki/Privacy_Policy</a>.</p>
        <p>Das Impressum enthält zudem einen Link zur Handwerksordnung auf gesetze-im-internet.de. Auch hier werden Daten erst nach Ihrem Klick übertragen.</p>

        <h2 id="speicherdauer">9. Speicherdauer</h2>
        <p>Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck nötig ist. Anfragen löschen wir, wenn sie abschließend bearbeitet sind und kein Auftrag zustande kommt ${ph('konkrete Löschfrist für Anfragen ohne Auftrag')}. Kommt ein Auftrag zustande, bewahren wir die Daten auf, solange gesetzliche Aufbewahrungspflichten bestehen, etwa nach Handels- und Steuerrecht.</p>

        <h2 id="rechte">10. Ihre Rechte</h2>
        <p>Sie haben gegenüber uns jederzeit folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
        <ul>
          <li>Recht auf Auskunft (Art.&nbsp;15 DSGVO),</li>
          <li>Recht auf Berichtigung (Art.&nbsp;16 DSGVO),</li>
          <li>Recht auf Löschung (Art.&nbsp;17 DSGVO),</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art.&nbsp;18 DSGVO),</li>
          <li>Recht auf Datenübertragbarkeit (Art.&nbsp;20 DSGVO),</li>
          <li>Recht auf Widerspruch gegen die Verarbeitung (Art.&nbsp;21 DSGVO).</li>
        </ul>
        <p class="hervorgehoben">Widerspruchsrecht: Verarbeiten wir Ihre Daten auf Grundlage von Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO, können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen.</p>
        <p>Für alle Anliegen genügt eine formlose Nachricht an die oben unter „Verantwortlicher“ genannten Kontaktdaten.</p>

        <h2 id="beschwerde">11. Beschwerderecht</h2>
        <p>Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt (Art.&nbsp;77 DSGVO). Zuständig ist in der Regel die Aufsichtsbehörde des Bundeslandes, in dem unser Betrieb sitzt: ${ph('Name, Anschrift und Website der zuständigen Landesdatenschutzbehörde')}.</p>

        <!-- Nur stehen lassen, wenn das SSL-Zertifikat beim Hoster aktiv ist (Launch-Checkliste). -->
        <h2 id="verschluesselung">12. Verschlüsselung</h2>
        <p>${ph('erst nach Einrichtung des SSL-Zertifikats und der HTTPS-Weiterleitung bestätigen')}</p>
        <p>Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers. Daten, die Sie über das Kontaktformular senden, können so nicht von Dritten mitgelesen werden.</p>
      </div>
    </div>
  </div>
</section>`;
  return seite({
    title: 'Datenschutzerklärung | Malerwerk, Musterstadt',
    desc: 'Datenschutz bei Malerwerk in Musterstadt: welche Daten beim Besuch der Website und bei einer Anfrage verarbeitet werden – ohne Cookies und ohne Tracking.',
    ogTitle: 'Datenschutzerklärung – Malerwerk',
    canonical: `${DOMAIN}/datenschutz.html`,
  }, main);
}

// =====================================================================
// 404
// =====================================================================
function fehler404() {
  B = '/';
  const links = [['index', 'Startseite'], ...NAV].map(([s, n]) => `<li><a href="/${s}.html">${n}</a></li>`).join('\n          ');
  const main = `<div class="wand">
  <div class="wand__gruen">
    <p class="wand__zahl" aria-hidden="true">404</p>
    <h1><span class="visuell-versteckt">Fehler 404: </span>Diese Wand ist noch nicht fertig</h1>
    <p>Die Seite, die Sie suchen, gibt es nicht oder nicht mehr. Vielleicht hat sich die Adresse geändert. Von hier aus geht es weiter:</p>
  </div>
  <div class="wand__kalk">
    <nav aria-label="Weiter zu">
      <ul class="fuss__liste">
          ${links}
      </ul>
    </nav>
    <div class="knopfreihe">
      ${knopfAnfrage()}
      ${knopfAnrufen()}
    </div>
  </div>
</div>`;
  const html = seite({
    title: 'Seite nicht gefunden | Malerwerk',
    desc: 'Diese Seite gibt es bei Malerwerk nicht oder nicht mehr. Von hier aus finden Sie Leistungen, Arbeiten und den Kontakt zum Malerbetrieb in Musterstadt.',
    robots: 'noindex, follow',
  }, main);
  B = '';
  return html;
}

// ---------- Ausgabe ----------
const seiten = {
  'index.html': startseite(),
  'leistungen.html': leistungen(),
  'arbeiten.html': arbeiten(),
  'ueber-uns.html': ueberUns(),
  'kontakt.html': kontakt(),
  'danke.html': danke(),
  'impressum.html': impressum(),
  'datenschutz.html': datenschutz(),
  '404.html': fehler404(),
};
for (const [datei, html] of Object.entries(seiten)) writeFileSync(datei, html);
console.log(`${Object.keys(seiten).length} Seiten geschrieben.`);
