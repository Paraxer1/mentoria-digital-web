'use strict';

(() => {
  const menuButton = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  const closeMenu = () => {
    navLinks?.classList.remove('active');
    menuButton?.setAttribute('aria-expanded', 'false');
  };

  menuButton?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', String(Boolean(open)));
  });

  navLinks?.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  addEventListener('resize', () => {
    if (innerWidth > 900) closeMenu();
  }, { passive: true });

  const items = document.querySelectorAll('.fade-in');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '60px 0px' });

  items.forEach(item => observer.observe(item));
})();
