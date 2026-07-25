(() => {
  'use strict';

  const doc = document;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const header = doc.querySelector('.site-header');
  const progress = doc.querySelector('.scroll-progress');
  const menuButton = doc.querySelector('.menu-button');
  const nav = doc.querySelector('.main-nav');

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    doc.addEventListener('click', event => {
      if (nav.classList.contains('open') && !event.target.closest('.header-inner')) closeMenu();
    });
    doc.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    addEventListener('resize', () => {
      if (innerWidth > 880) closeMenu();
    }, { passive: true });
  }

  const updateViewportEffects = () => {
    header?.classList.toggle('is-scrolled', scrollY > 10);
    if (progress) {
      const max = Math.max(doc.documentElement.scrollHeight - innerHeight, 1);
      progress.style.width = `${Math.min(100, (scrollY / max) * 100)}%`;
    }
  };
  updateViewportEffects();
  addEventListener('scroll', updateViewportEffects, { passive: true });

  const revealItems = [...doc.querySelectorAll('.reveal')];
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -28px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const links = [...doc.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = links.map(link => doc.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach(link => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { threshold: [0.15, 0.45, 0.75], rootMargin: '-24% 0px -58% 0px' });
    sections.forEach(section => observer.observe(section));
  }

  const tabButtons = [...doc.querySelectorAll('[data-tab]')];
  const activateTab = button => {
    tabButtons.forEach(item => {
      const selected = item === button;
      const panel = doc.getElementById(item.dataset.tab || '');
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      panel?.classList.toggle('active', selected);
      panel?.setAttribute('aria-hidden', String(!selected));
    });
  };
  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => activateTab(button));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabButtons.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabButtons.length) % tabButtons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabButtons.length - 1;
      tabButtons[next].focus();
      activateTab(tabButtons[next]);
    });
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
  const recommended = doc.querySelector(`.download-card[data-os="${system}"]`);
  if (hint) {
    const messages = {
      windows: 'Detectamos Windows. Te recomendamos el instalador .EXE.',
      linux: 'Detectamos Linux. Te recomendamos el paquete .DEB.',
      android: 'Estás navegando desde Android. Descarga el instalador desde una computadora.',
      mac: 'Urban Pets 1.0 no tiene instalador para macOS en esta versión.',
      other: 'Elige Windows o Linux según la computadora donde vas a instalar Urban Pets.'
    };
    hint.querySelector('p').textContent = messages[system] || messages.other;
  }
  recommended?.classList.add('recommended-os');

  const counters = [...doc.querySelectorAll('[data-count]')];
  const animateCounter = element => {
    const target = Number(element.dataset.count || 0);
    if (!Number.isFinite(target) || target <= 0 || reduceMotion) {
      element.textContent = String(target);
      return;
    }
    const duration = 850;
    const start = performance.now();
    const tick = now => {
      const progressValue = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progressValue, 3);
      element.textContent = String(Math.round(target * eased));
      if (progressValue < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.7 });
    counters.forEach(counter => counterObserver.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }

  if (finePointer && !reduceMotion) {
    doc.querySelectorAll('.interactive-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
      });
    });

    doc.querySelectorAll('.magnetic').forEach(button => {
      const reset = () => { button.style.transform = ''; };
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
        button.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
      });
      button.addEventListener('pointerleave', reset);
      button.addEventListener('blur', reset);
    });
  }
})();
