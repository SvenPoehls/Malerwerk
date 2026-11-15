/* Malerwerk – minimales JavaScript (mobile Navigation, Einblendungen, Formular-Komfort).
   Alle Inhalte und das Formular funktionieren auch ohne JavaScript. */
(function () {
  'use strict';

  var doc = document.documentElement;
  // Keine Einblend-Animation bei reduzierter Bewegung und in automatisierten Prüfläufen
  // (stabile Screenshots und Kontrastmessungen ohne Zwischenzustände).
  var reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.webdriver === true;

  /* ---------- Header-Schatten nach dem Scrollen ---------- */
  var kopf = document.querySelector('[data-kopf]');
  if (kopf) {
    var pruefeScroll = function () { kopf.classList.toggle('ist-gescrollt', window.scrollY > 8); };
    pruefeScroll();
    window.addEventListener('scroll', pruefeScroll, { passive: true });
  }

  /* ---------- Mobile Navigation ---------- */
  var knopf = document.querySelector('[data-menue-knopf]');
  var menue = document.querySelector('[data-menue]');
  var desktop = window.matchMedia('(min-width: 1024px)');

  if (knopf && menue) {
    var knopfText = knopf.querySelector('[data-menue-text]');

    var fokussierbare = function () {
      return Array.prototype.filter.call(
        menue.querySelectorAll('a[href], button:not([disabled])'),
        function (el) { return el.offsetParent !== null; }
      );
    };

    var setzeZustand = function (offen) {
      knopf.setAttribute('aria-expanded', String(offen));
      knopf.setAttribute('aria-label', offen ? 'Menü schließen' : 'Menü öffnen');
      if (knopfText) knopfText.textContent = offen ? 'Schließen' : 'Menü';
      menue.classList.toggle('ist-offen', offen);
      doc.classList.toggle('menue-offen', offen);
    };

    var oeffnen = function () {
      setzeZustand(true);
      var erstes = fokussierbare()[0];
      if (erstes) window.setTimeout(function () { erstes.focus(); }, 50);
    };

    var schliessen = function (fokusZurueck) {
      if (knopf.getAttribute('aria-expanded') !== 'true') return;
      setzeZustand(false);
      if (fokusZurueck) knopf.focus();
    };

    knopf.addEventListener('click', function () {
      if (knopf.getAttribute('aria-expanded') === 'true') schliessen(true);
      else oeffnen();
    });

    document.addEventListener('keydown', function (e) {
      if (knopf.getAttribute('aria-expanded') !== 'true') return;
      if (e.key === 'Escape') {
        e.preventDefault();
        schliessen(true);
        return;
      }
      if (e.key !== 'Tab') return;
      // Fokus bleibt zwischen Menü-Knopf und Menü-Inhalt
      var liste = [knopf].concat(fokussierbare());
      var erstes = liste[0];
      var letztes = liste[liste.length - 1];
      if (e.shiftKey && document.activeElement === erstes) {
        e.preventDefault();
        letztes.focus();
      } else if (!e.shiftKey && document.activeElement === letztes) {
        e.preventDefault();
        erstes.focus();
      } else if (liste.indexOf(document.activeElement) === -1) {
        e.preventDefault();
        erstes.focus();
      }
    });

    // Klick auf einen Link im Menü (z. B. Sprung auf derselben Seite) schließt es
    menue.addEventListener('click', function (e) {
      if (e.target.closest('a')) schliessen(false);
    });

    var beiBreite = function () { if (desktop.matches) schliessen(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', beiBreite);
  }

  /* ---------- Scroll-Einblendungen (nur transform/opacity) ---------- */
  var elemente = document.querySelectorAll('.reveal, .kante');
  if (!reduziert && 'IntersectionObserver' in window && elemente.length) {
    // Stagger innerhalb einer Gruppe
    document.querySelectorAll('[data-reveal-gruppe]').forEach(function (gruppe) {
      Array.prototype.forEach.call(gruppe.querySelectorAll('.reveal'), function (el, i) {
        el.style.transitionDelay = (i * 80) + 'ms';
      });
    });

    var hoehe = window.innerHeight || doc.clientHeight;
    var beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (eintrag) {
        if (!eintrag.isIntersecting) return;
        eintrag.target.classList.remove('ist-wartend');
        beobachter.unobserve(eintrag.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

    var wartend = [];
    elemente.forEach(function (el) {
      // Bereits sichtbare Inhalte werden nicht versteckt (kein Flackern, kein LCP-Verzug)
      if (el.getBoundingClientRect().top < hoehe) return;
      el.classList.add('ist-wartend');
      beobachter.observe(el);
      wartend.push(el);
    });

    // Absicherung bei sehr schnellem Scrollen (Sprunglinks, Tastatur „Ende“):
    // alles, was erreicht oder bereits überscrollt wurde, wird sofort eingeblendet.
    var geplant = false;
    var nachziehen = function () {
      geplant = false;
      var grenze = window.innerHeight;
      wartend = wartend.filter(function (el) {
        if (el.getBoundingClientRect().top < grenze) {
          el.classList.remove('ist-wartend');
          beobachter.unobserve(el);
          return false;
        }
        return true;
      });
      if (!wartend.length) window.removeEventListener('scroll', beimScrollen);
    };
    var beimScrollen = function () {
      if (geplant) return;
      geplant = true;
      window.requestAnimationFrame(nachziehen);
    };
    if (wartend.length) window.addEventListener('scroll', beimScrollen, { passive: true });
  }

  /* ---------- Formular ---------- */
  var formular = document.querySelector('[data-formular]');
  if (!formular) return;

  var params = new URLSearchParams(window.location.search);

  // Vorauswahl der Leistung über ?leistung=<slug>
  var auswahl = formular.querySelector('#f-leistung');
  var gewuenscht = params.get('leistung');
  if (auswahl && gewuenscht) {
    var passend = Array.prototype.some.call(auswahl.options, function (o) { return o.value === gewuenscht; });
    if (passend) auswahl.value = gewuenscht;
  }

  // Versandfehler über ?status=fehler anzeigen. kontakt.php nutzt das selbst nicht (es gibt die Seite
  // direkt mit Meldung aus); der Parameter bleibt für eine spätere Weiterleitungs-Variante bzw. für
  // einen externen Formular-Dienst, der bei Fehlern auf kontakt.html?status=fehler zurückleitet.
  var versand = document.getElementById('meldung-versand');
  if (versand && params.get('status') === 'fehler') versand.hidden = false;

  // Serverseitig gemeldete Fehler (kontakt.php): Zusammenfassung bzw. Versandfehler fokussieren,
  // damit Screenreader und Tastatur direkt bei der Meldung landen.
  var vorhanden = document.getElementById('fehler-zusammenfassung');
  if (vorhanden && !vorhanden.hidden) {
    vorhanden.focus();
  } else if (versand && !versand.hidden) {
    versand.tabIndex = -1;
    versand.focus();
  }

  formular.noValidate = true; // eigene, verständliche Meldungen statt Browser-Blasen

  var MAX_NACHRICHT = 5000;
  var feld = function (id) { return document.getElementById(id); };
  var name = feld('f-name');
  var telefon = feld('f-telefon');
  var email = feld('f-email');
  var nachricht = feld('f-nachricht');
  var gruppe = feld('f-erreichbar');
  var zusammenfassung = feld('fehler-zusammenfassung');
  var fehlerliste = zusammenfassung ? zusammenfassung.querySelector('[data-fehlerliste]') : null;
  var abgeschickt = false;
  var senden = formular.querySelector('[data-senden]');
  var sendenText = senden ? senden.querySelector('[data-senden-text]') : null;
  var sperre = function (ev) { ev.preventDefault(); };

  var TEL_MUSTER = /^[0-9+()\/\-\s]{5,40}$/;
  // Nur ASCII (keine Umlaute) – entspricht FILTER_VALIDATE_EMAIL in kontakt.php, damit Browser- und
  // Serverprüfung dieselben Adressen annehmen.
  var MAIL_MUSTER = /^[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

  var setzeFehler = function (input, fehlerId, text) {
    var p = feld(fehlerId);
    if (!p) return;
    var beschr = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    var ohne = beschr.filter(function (id) { return id !== fehlerId; });
    if (text) {
      p.querySelector('.fehlertext__text').textContent = text;
      p.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      ohne.push(fehlerId);
    } else {
      p.hidden = true;
      input.removeAttribute('aria-invalid');
    }
    if (ohne.length) input.setAttribute('aria-describedby', ohne.join(' '));
    else input.removeAttribute('aria-describedby');
  };

  var pruefe = function () {
    var fehler = [];
    var wert = function (el) { return el ? el.value.trim() : ''; };

    var nameFehler = wert(name) ? '' : 'Bitte geben Sie Ihren Namen an.';
    setzeFehler(name, 'f-name-fehler', nameFehler);
    if (nameFehler) fehler.push([name, nameFehler]);

    var tel = wert(telefon);
    var mail = wert(email);
    var telFehler = tel && !(TEL_MUSTER.test(tel) && /\d{3,}/.test(tel.replace(/\D/g, '')))
      ? 'Bitte geben Sie eine gültige Telefonnummer an – nur Ziffern, Leerzeichen und die Zeichen + ( ) / -.' : '';
    var mailFehler = mail && !MAIL_MUSTER.test(mail)
      ? 'Bitte geben Sie eine gültige E-Mail-Adresse an, zum Beispiel name@beispiel.de.' : '';
    var gruppenFehler = !tel && !mail ? 'Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an.' : '';

    // Gruppenfehler an beiden Feldern bekanntgeben
    var gp = feld('f-erreichbar-fehler');
    if (gp) {
      gp.querySelector('.fehlertext__text').textContent = gruppenFehler;
      gp.hidden = !gruppenFehler;
    }
    [telefon, email].forEach(function (el) {
      var ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(function (id) { return id && id !== 'f-erreichbar-fehler'; });
      if (gruppenFehler) ids.unshift('f-erreichbar-fehler');
      el.setAttribute('aria-describedby', ids.join(' '));
    });
    setzeFehler(telefon, 'f-telefon-fehler', telFehler);
    setzeFehler(email, 'f-email-fehler', mailFehler);
    if (gruppenFehler) {
      telefon.setAttribute('aria-invalid', 'true');
      email.setAttribute('aria-invalid', 'true');
      fehler.push([telefon, gruppenFehler]);
    }
    if (telFehler) fehler.push([telefon, telFehler]);
    if (mailFehler) fehler.push([email, mailFehler]);

    var n = wert(nachricht);
    var nachrichtFehler = !n ? 'Bitte beschreiben Sie kurz, was gemacht werden soll.'
      : (n.length > MAX_NACHRICHT ? 'Ihre Nachricht ist zu lang. Bitte kürzen Sie sie auf höchstens ' + MAX_NACHRICHT + ' Zeichen.' : '');
    setzeFehler(nachricht, 'f-nachricht-fehler', nachrichtFehler);
    if (nachrichtFehler) fehler.push([nachricht, nachrichtFehler]);

    if (gruppe) gruppe.classList.toggle('hat-fehler', !!gruppenFehler);
    return fehler;
  };

  var zeigeZusammenfassung = function (fehler) {
    if (!zusammenfassung || !fehlerliste) return;
    fehlerliste.textContent = '';
    fehler.forEach(function (f) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + f[0].id;
      a.textContent = f[1];
      a.addEventListener('click', function (e) {
        e.preventDefault();
        f[0].focus();
      });
      li.appendChild(a);
      fehlerliste.appendChild(li);
    });
    zusammenfassung.hidden = false;
    zusammenfassung.focus();
  };

  formular.addEventListener('submit', function (e) {
    abgeschickt = true;
    var fehler = pruefe();
    if (fehler.length) {
      e.preventDefault();
      if (versand) versand.hidden = true;
      zeigeZusammenfassung(fehler);
      return;
    }
    if (zusammenfassung) zusammenfassung.hidden = true;
    if (senden) {
      if (sendenText) sendenText.textContent = 'Wird gesendet …';
      senden.setAttribute('aria-disabled', 'true');
      // Doppeltes Absenden verhindern, ohne den Fokus zu verlieren
      formular.addEventListener('submit', sperre);
    }
  });

  // Zurück-Taste (Back/Forward-Cache): Sperre aufheben, sonst ließe sich das Formular nicht erneut senden
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted || !senden) return;
    formular.removeEventListener('submit', sperre);
    senden.removeAttribute('aria-disabled');
    if (sendenText) sendenText.textContent = 'Anfrage senden';
  });

  // Nach dem ersten Absenden: Meldungen beim Korrigieren aktualisieren
  formular.addEventListener('input', function () {
    if (!abgeschickt) return;
    var fehler = pruefe();
    if (!fehler.length && zusammenfassung) zusammenfassung.hidden = true;
  });
})();
