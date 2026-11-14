/* =====================================================================
   Malerwerk – minimales JavaScript (keine Bibliotheken)
   1. Mobile Navigation
   2. Gestaffeltes Einblenden beim Scrollen (einmalig, IntersectionObserver)
   3. Jahr im Footer
   4. Kontaktformular: Prüfung + Fehler-/Erfolgszustände
   ===================================================================== */
document.documentElement.classList.add('js');

/* ---------- 1. Mobile Navigation ---------- */
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('main-nav');

if (toggle && nav) {
  const label = toggle.querySelector('.visually-hidden');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Menü schließen' : 'Menü öffnen';
    nav.classList.toggle('is-open', open);
  };
  setOpen(false);

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
}

/* ---------- 2. Einblenden ---------- */
// Elemente innerhalb von [data-stagger] bekommen einen Index → Verzögerung per CSS (--i × --stagger)
document.querySelectorAll('[data-stagger]').forEach((group) => {
  group.querySelectorAll(':scope > .reveal, :scope > * > .reveal').forEach((el, i) => {
    el.style.setProperty('--i', Math.min(i, 5));
  });
});

const revealItems = document.querySelectorAll('.reveal');
const finish = (el) => {
  // Nach dem Einblenden: Verzögerung entfernen, damit Hover-Effekte sofort reagieren
  el.addEventListener('transitionend', () => el.classList.add('is-done'), { once: true });
  el.classList.add('is-visible');
};

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      finish(entry.target);
      io.unobserve(entry.target);          // nur einmal animieren
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach((el) => io.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add('is-visible', 'is-done'));
}

/* ---------- 3. Jahr im Footer ---------- */
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

/* ---------- 4. Kontaktformular ----------
   [PLATZHALTER: Versand an Formular-Dienst oder Server-Skript anbinden.
   Bis dahin wird nur geprüft und ein Hinweis angezeigt.] */
const form = document.querySelector('.contact-form');

if (form) {
  const status = form.querySelector('.form-status');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const check = (input) => {
    const field = input.closest('.field');
    let ok = true;
    if (input.type === 'checkbox') ok = !input.required || input.checked;
    else if (input.type === 'email') ok = input.value.trim() === '' || emailPattern.test(input.value.trim());
    else if (input.required) ok = input.value.trim() !== '';

    field.classList.toggle('has-error', !ok);
    field.classList.toggle('is-valid', ok && input.type !== 'checkbox' && input.value.trim() !== '');
    input.setAttribute('aria-invalid', String(!ok));
    return ok;
  };

  const inputs = form.querySelectorAll('input');
  // Erst nach dem Verlassen eines Felds prüfen, danach live korrigieren
  inputs.forEach((input) => {
    input.addEventListener('blur', () => check(input));
    input.addEventListener('input', () => { if (input.closest('.field').classList.contains('has-error')) check(input); });
    input.addEventListener('change', () => { if (input.type === 'checkbox') check(input); });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = [...inputs].filter((input) => !check(input));

    if (invalid.length) {
      status.className = 'form-status is-error';
      status.textContent = 'Bitte prüfen Sie die markierten Felder.';
      invalid[0].focus();
      return;
    }

    status.className = 'form-status is-success';
    status.textContent = 'Danke für Ihre Anfrage! Wir melden uns so bald wie möglich. (Entwurf: Versand noch nicht eingerichtet.)';
    form.reset();
    form.querySelectorAll('.field').forEach((f) => f.classList.remove('is-valid', 'has-error'));
  });
}
