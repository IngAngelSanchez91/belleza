/* ============================================
   BELLEZA INTEGRAL — Shared JavaScript
   ============================================ */

// ── Navigation ────────────────────────────────
const nav = document.querySelector('.nav');
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.querySelector('.nav__mobile');

if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ── Active nav link ───────────────────────────
(function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Scroll reveal ─────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

// ── Counter animation ─────────────────────────
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// Trigger counters when stats section enters view
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { animateCounters(); io.disconnect(); }
  }, { threshold: 0.4 });
  io.observe(statsSection);
}

// ── Page enter animation ──────────────────────
document.querySelector('main')?.classList.add('page-enter');

// ── Form submission (demo) ────────────────────
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = '✓ Sent!';
    btn.disabled = true;
    btn.style.background = '#4caf50';
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
});

// ── Services tabs ─────────────────────────────
const tabs = document.querySelectorAll('.services-tab');
const serviceItems = document.querySelectorAll('.service-item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    serviceItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
        item.style.opacity = '0';
        item.style.transform = 'translateY(12px)';
        requestAnimationFrame(() => {
          item.style.transition = 'opacity .3s ease, transform .3s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        });
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ── Newsletter demo ───────────────────────────
document.querySelectorAll('.newsletter__form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const btn = form.querySelector('button');
    btn.textContent = '✓ Subscribed!';
    input.value = '';
    setTimeout(() => { btn.textContent = 'Join Now'; }, 3000);
  });
});

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
});
