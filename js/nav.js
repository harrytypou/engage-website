/* ============================================================
   ENGAGE — Nav, Hamburger, Scroll Reveal, Page Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Active nav link ─────────────────────────────────────── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const match = href.split('/').pop();
    if (
      (page === 'index.html' || page === '') && (match === 'index.html' || match === '' || match === '#')
    ) { link.classList.add('active'); }
    else if (match && match !== 'index.html' && match !== '' && page.startsWith(match.replace('.html',''))) {
      link.classList.add('active');
    }
  });

  /* ── Hamburger menu ──────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobile-drawer');
  const body      = document.body;

  function openDrawer() {
    hamburger.classList.add('open');
    drawer.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  function toggleDrawer() {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  }

  if (hamburger) hamburger.addEventListener('click', toggleDrawer);

  /* Close on mobile link click */
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* Close on outside click */
  document.addEventListener('click', e => {
    if (
      drawer && drawer.classList.contains('open') &&
      !drawer.contains(e.target) &&
      !hamburger.contains(e.target)
    ) { closeDrawer(); }
  });

  /* Close on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  /* ── Nav scroll shadow ───────────────────────────────────── */
  const nav = document.querySelector('.nav');
  function updateNavShadow() {
    if (!nav) return;
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 2px 24px rgba(3,83,223,0.08)';
    } else {
      nav.style.boxShadow = '';
    }
  }
  window.addEventListener('scroll', updateNavShadow, { passive: true });
  updateNavShadow();

  /* ── Scroll reveal ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Hero stagger ────────────────────────────────────────── */
  document.querySelectorAll('.hero-animate').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.1}s`;
  });

  /* ── Page fade in ────────────────────────────────────────── */
  document.body.classList.add('page-fade');

  /* ── Smooth page transitions ─────────────────────────────── */
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('http') &&
      !href.startsWith('mailto') &&
      !href.startsWith('tel') &&
      link.target !== '_blank'
    ) {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.2s ease';
        setTimeout(() => { window.location.href = href; }, 200);
      });
    }
  });

});
