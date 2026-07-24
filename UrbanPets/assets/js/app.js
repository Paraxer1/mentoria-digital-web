(() => {
  'use strict';

  const doc = document;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = doc.querySelector('.site-header');
  const menuButton = doc.querySelector('.menu-button');
  const nav = doc.querySelector('.main-nav');

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });

    doc.addEventListener('click', event => {
      if (!nav.classList.contains('open')) return;
      if (!event.target.closest('.header-inner')) closeMenu();
    });

    doc.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const revealItems = [...doc.querySelectorAll('.reveal')];
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const navLinks = [...doc.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = navLinks.map(link => doc.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${visible.target.id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { threshold: [0.2, 0.5, 0.8], rootMargin: '-25% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const tabButtons = [...doc.querySelectorAll('[data-tab]')];
  const activateTab = button => {
    tabButtons.forEach(item => {
      const selected = item === button;
      const panel = doc.getElementById(item.dataset.tab || '');
      item.setAttribute('aria-selected', String(selected));
      if (panel) {
        panel.classList.toggle('active', selected);
        panel.setAttribute('aria-hidden', String(!selected));
      }
    });
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => activateTab(button));
  });
  if (tabButtons[0]) activateTab(tabButtons[0]);

  const detectSystem = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('windows')) return 'windows';
    if (ua.includes('linux') || ua.includes('x11')) return 'linux';
    if (ua.includes('android')) return 'android';
    if (ua.includes('mac')) return 'mac';
    return 'other';
  };

  const system = detectSystem();
  const hint = doc.getElementById('system-hint');
  const recommendedCard = doc.querySelector(`.download-card[data-os="${system}"]`);
  if (hint) {
    const messages = {
      windows: 'Detectamos Windows en tu equipo. La mejor opción para ti es el instalador .EXE.',
      linux: 'Detectamos Linux en tu equipo. La mejor opción para ti es el paquete .DEB.',
      android: 'Parece que estás navegando desde Android. Descarga el instalador desde una computadora.',
      mac: 'Parece que estás en macOS. Urban Pets 1.0 no ofrece instalador para macOS en esta versión.',
      other: 'Elige la descarga según el sistema donde vas a instalar Urban Pets.'
    };
    hint.querySelector('p').textContent = messages[system] || messages.other;
  }
  if (recommendedCard) recommendedCard.classList.add('recommended-os');

  if (!reduceMotion && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    doc.querySelectorAll('.magnetic').forEach(button => {
      const reset = () => {
        button.style.transform = '';
      };
      button.addEventListener('mousemove', event => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
        button.style.transform = `translate(${x * 7}px, ${y * 7}px)`;
      });
      button.addEventListener('mouseleave', reset);
      button.addEventListener('blur', reset);
    });
  }
})();
