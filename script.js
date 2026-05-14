/* ═══════════════════════════════════════
   MAWULI ADS AGENCY — SCRIPT.JS
═══════════════════════════════════════ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile burger menu ── */
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
const navCta = document.querySelector('.nav__cta');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('open');
  if (navCta) navCta.style.display = navLinks.classList.contains('open') ? 'flex' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('open');
    if (navCta) navCta.style.display = '';
  });
});

/* ── Reveal on scroll ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Animated number counters ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__num[data-count]').forEach(el => {
  counterObserver.observe(el);
});

/* ── Contact form → WhatsApp ── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name     = form.querySelector('#name').value.trim();
    const whatsapp = form.querySelector('#whatsapp').value.trim();
    const brand    = form.querySelector('#brand').value.trim();
    const type     = form.querySelector('#type').value;
    const market   = form.querySelector('#market').value;
    const message  = form.querySelector('#message').value.trim();

    const text = [
      `Hi Mawuli! 👋`,
      ``,
      `*Name:* ${name}`,
      `*WhatsApp:* ${whatsapp}`,
      `*Brand:* ${brand}`,
      `*Business Type:* ${type || 'Not specified'}`,
      `*Target Market:* ${market || 'Not specified'}`,
      ``,
      `*About my brand:*`,
      message || 'No additional details provided.',
      ``,
      `I'm interested in working together. When can we talk?`
    ].join('\n');

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/233596320894?text=${encoded}`, '_blank');
  });
}

/* ── Smooth active nav link highlight ── */
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
