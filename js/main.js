/* =========================================================
   Malerwerk – minimales JavaScript
   1. Mobile Navigation  2. Sanftes Einblenden  3. Jahr im Footer
   4. Formular-Prüfung (Versand noch nicht eingerichtet)
   ========================================================= */
document.documentElement.classList.add('js');

/* 1. Mobile Navigation */
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('main-nav');

if (toggle && nav) {
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.visually-hidden').textContent = open ? 'Menü schließen' : 'Menü öffnen';
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  // Menü nach Klick auf einen Eintrag schließen
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  // Escape schließt das Menü
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
}

/* 2. Sanftes Einblenden beim Scrollen */
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('is-visible'));
}

/* 3. Jahr im Footer */
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

/* 4. Formular: Pflichtfelder prüfen.
   [PLATZHALTER: Hier später den echten Versand (Formular-Dienst / Server) anbinden.] */
const form = document.querySelector('.contact-form');
if (form) {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach((field) => {
      const ok = field.type === 'checkbox' ? field.checked : field.value.trim() !== '';
      field.setAttribute('aria-invalid', String(!ok));
      if (!ok && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      status.className = 'form-status is-error';
      status.textContent = 'Bitte füllen Sie die mit * markierten Felder aus.';
      firstInvalid.focus();
      return;
    }
    status.className = 'form-status is-ok';
    status.textContent = 'Danke! (Entwurf: Der Versand ist noch nicht eingerichtet.)';
    form.reset();
  });
}
