(() => {
  'use strict';

  const doc = document;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const header = doc.querySelector('[data-header]');
  const menuButton = doc.querySelector('.menu-button');
  const nav = doc.querySelector('.main-nav');
  const toast = doc.querySelector('[data-toast]');
  let toastTimer = 0;

  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2800);
  };

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
      if (innerWidth > 900) closeMenu();
    }, { passive: true });
  }

  const updateHeader = () => header?.classList.toggle('is-scrolled', scrollY > 12);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = [...doc.querySelectorAll('.reveal')];
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px' });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  const sectionLinks = [...doc.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = sectionLinks.map(link => doc.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      sectionLinks.forEach(link => {
        if (link.getAttribute('href') === `#${current.target.id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-28% 0px -62% 0px', threshold: [0.05, 0.3, 0.6] });
    sections.forEach(section => navObserver.observe(section));
  }

  const tilt = doc.querySelector('[data-tilt]');
  if (tilt && finePointer.matches && !reduceMotion.matches) {
    const target = tilt.querySelector('.app-window');
    let frame = 0;
    const resetTilt = () => {
      tilt.classList.remove('is-tilting');
      target?.style.setProperty('--tilt-x', '0deg');
      target?.style.setProperty('--tilt-y', '0deg');
    };
    tilt.addEventListener('pointermove', event => {
      if (!target) return;
      const rect = tilt.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        tilt.classList.add('is-tilting');
        target.style.setProperty('--tilt-x', `${(-y * 3.5).toFixed(2)}deg`);
        target.style.setProperty('--tilt-y', `${(x * 4.2).toFixed(2)}deg`);
      });
    });
    tilt.addEventListener('pointerleave', resetTilt);
  }

  if (finePointer.matches && !reduceMotion.matches) {
    const halo = doc.querySelector('[data-pointer-halo]');
    if (halo) {
      let haloFrame = 0;
      addEventListener('pointermove', event => {
        cancelAnimationFrame(haloFrame);
        haloFrame = requestAnimationFrame(() => {
          halo.classList.add('active');
          halo.style.left = `${event.clientX}px`;
          halo.style.top = `${event.clientY}px`;
        });
      }, { passive: true });
      doc.documentElement.addEventListener('mouseleave', () => halo.classList.remove('active'));
    }

    doc.querySelectorAll('[data-spotlight]').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      });
    });

    doc.querySelectorAll('[data-magnetic]').forEach(element => {
      element.addEventListener('pointermove', event => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate(${(x * 0.07).toFixed(1)}px, ${(y * 0.10).toFixed(1)}px)`;
      });
      element.addEventListener('pointerleave', () => {
        element.style.transform = '';
      });
    });
  }

  const tabButtons = [...doc.querySelectorAll('[data-tab]')];
  const activateTab = selected => {
    tabButtons.forEach(button => {
      const active = button === selected;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      const panel = doc.getElementById(button.dataset.tab || '');
      if (!panel) return;
      panel.hidden = !active;
      panel.classList.toggle('active', active);
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
  const initiallySelected = tabButtons.find(button => button.getAttribute('aria-selected') === 'true');
  if (initiallySelected) activateTab(initiallySelected);

  const copyText = async text => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Comando copiado al portapapeles.');
    } catch {
      const area = doc.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      doc.body.append(area);
      area.select();
      const copied = doc.execCommand('copy');
      area.remove();
      showToast(copied ? 'Comando copiado al portapapeles.' : 'No se pudo copiar el comando.');
    }
  };

  doc.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', () => copyText(button.dataset.copy || ''));
  });

  const formatSize = bytes => {
    if (!Number.isFinite(bytes) || bytes <= 0) return 'Archivo disponible';
    const units = ['B', 'KB', 'MB', 'GB'];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / (1024 ** index)).toFixed(index >= 2 ? 1 : 0)} ${units[index]}`;
  };

  doc.querySelectorAll('[data-download-file]').forEach(link => {
    const info = link.querySelector('[data-file-info]');
    const declaredSize = Number(link.dataset.fileSize || 0);
    if (info && declaredSize > 0) info.textContent = `${formatSize(declaredSize)} · Versión 1.0`;
    link.addEventListener('click', () => {
      showToast(`Iniciando descarga de ${link.dataset.downloadFile || 'Urban Pets'}…`);
    });
  });

  const userAgent = navigator.userAgent.toLowerCase();
  const platform = userAgent.includes('windows') ? 'windows' : (userAgent.includes('linux') ? 'linux' : 'other');
  const message = doc.querySelector('[data-platform-message]');
  const recommendedCard = doc.querySelector(`[data-platform-card="${platform}"]`);
  if (recommendedCard) recommendedCard.classList.add('recommended');

  if (message) {
    const title = message.querySelector('strong');
    const detail = message.querySelector('small');
    if (platform === 'windows') {
      if (title) title.textContent = 'Detectamos Windows en tu equipo.';
      if (detail) detail.textContent = 'Descarga el instalador .EXE. Esta versión trabaja localmente en esa computadora.';
    } else if (platform === 'linux') {
      if (title) title.textContent = 'Detectamos Linux en tu equipo.';
      if (detail) detail.textContent = 'Si usas Debian, Ubuntu o un derivado compatible, descarga el paquete .DEB.';
    } else {
      if (title) title.textContent = 'Elige el instalador de tu sistema.';
      if (detail) detail.textContent = 'Urban Pets 1.0 es una aplicación local y no conecta varias computadoras.';
    }
  }

  const details = [...doc.querySelectorAll('.faq-list details')];
  details.forEach(item => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      details.forEach(other => {
        if (other !== item) other.open = false;
      });
    });
  });
})();
