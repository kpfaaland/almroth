// ─── MOBILE NAV ───────────────────────────────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  });
});

// Smooth scroll to top for Forside
document.querySelectorAll('a[href="#top"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ─── FOOTER YEAR ─────────────────────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ─── CONTACT FORM (Formspree AJAX) ───────────────────────────────────────────
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sender...';
  status.textContent = '';
  status.className = 'form-status';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      status.textContent = '✓ Meldingen er sendt! Vi tar kontakt snart.';
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    status.textContent = 'Noe gikk galt. Prøv igjen eller ring oss.';
    status.classList.add('error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send melding';
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  let current = '';
  const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
  if (nearBottom) {
    current = 'kontakt';
  } else {
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= 120) current = section.id;
    });
  }
  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}

window.addEventListener('scroll', setActiveNav);
setActiveNav();