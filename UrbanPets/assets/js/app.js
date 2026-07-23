(() => {
  'use strict';

  const doc = document;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const menuButton = doc.querySelector('.menu-button');
  const nav = doc.querySelector('.main-nav');
  const header = doc.querySelector('.site-header');

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
      if (!nav.classList.contains('open')) return;
      if (!event.target.closest('.header-inner')) closeMenu();
    });
    doc.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    addEventListener('resize', () => {
      if (innerWidth > 760) closeMenu();
    }, { passive: true });
  }

  const updateHeader = () => header?.classList.toggle('is-scrolled', scrollY > 12);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = [...doc.querySelectorAll('.reveal')];
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px' });
    revealItems.forEach(item => observer.observe(item));
  }

  const sectionLinks = [...doc.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = sectionLinks
    .map(link => doc.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.05, 0.3, 0.65] });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const tabButtons = [...doc.querySelectorAll('[data-tab]')];
  const activateTab = button => {
    tabButtons.forEach(item => {
      const selected = item === button;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      const panel = doc.getElementById(item.dataset.tab || '');
      panel?.classList.toggle('active', selected);
      panel?.setAttribute('aria-hidden', String(!selected));
    });
  };
  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => activateTab(button));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabButtons.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabButtons.length - 1;
      tabButtons[nextIndex].focus();
      activateTab(tabButtons[nextIndex]);
    });
  });
  const selectedTab = tabButtons.find(button => button.getAttribute('aria-selected') === 'true');
  if (selectedTab) activateTab(selectedTab);

  const tilt = doc.querySelector('[data-tilt]');
  if (tilt && finePointer.matches && !reduceMotion.matches) {
    const shell = tilt.querySelector('.app-shell');
    let frame = 0;
    const reset = () => {
      tilt.classList.remove('is-tilting');
      shell?.style.setProperty('--tilt-x', '0deg');
      shell?.style.setProperty('--tilt-y', '0deg');
    };
    tilt.addEventListener('pointermove', event => {
      if (!shell) return;
      const rect = tilt.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        tilt.classList.add('is-tilting');
        shell.style.setProperty('--tilt-x', `${(-y * 3.8).toFixed(2)}deg`);
        shell.style.setProperty('--tilt-y', `${(x * 4.6).toFixed(2)}deg`);
      });
    });
    tilt.addEventListener('pointerleave', reset);
  }

  const formatSize = bytes => {
    if (!Number.isFinite(bytes) || bytes <= 0) return 'Archivo listo';
    const units = ['B', 'KB', 'MB', 'GB'];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const decimals = index > 1 ? 1 : 0;
    return `${(bytes / Math.pow(1024, index)).toFixed(decimals)} ${units[index]}`;
  };

  let statusTimer = 0;
  const showStatus = message => {
    let region = doc.querySelector('.download-status');
    if (!region) {
      region = doc.createElement('div');
      region.className = 'download-status';
      region.setAttribute('role', 'status');
      doc.body.append(region);
    }
    region.textContent = message;
    region.classList.add('show');
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => region.classList.remove('show'), 3200);
  };

  const checkDownload = async (href) => {
    try {
      const response = await fetch(href, { method: 'HEAD', cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return Number(response.headers.get('content-length')) || 0;
    } catch {
      try {
        const response = await fetch(href, {
          method: 'GET',
          cache: 'no-store',
          headers: { Range: 'bytes=0-0' }
        });
        if (!response.ok && response.status !== 206) throw new Error(`HTTP ${response.status}`);
        const range = response.headers.get('content-range');
        return range ? Number(range.split('/').pop()) || 0 : Number(response.headers.get('content-length')) || 0;
      } catch {
        return null;
      }
    }
  };

  doc.querySelectorAll('[data-download-file]').forEach(link => {
    const info = link.parentElement?.querySelector('[data-file-info]');
    const filename = link.dataset.downloadFile || 'archivo';
    const href = link.getAttribute('href') || '';

    const markMissing = () => {
      link.classList.add('download-missing');
      link.setAttribute('aria-disabled', 'true');
      link.title = `Falta colocar ${filename} en UrbanPets/archivos-descarga`;
      if (info) info.textContent = 'Disponible próximamente';
    };
    const markReady = bytes => {
      link.classList.remove('download-missing');
      link.removeAttribute('aria-disabled');
      link.removeAttribute('title');
      if (info) info.textContent = `${formatSize(bytes)} · Listo para descargar`;
    };

    link.addEventListener('click', event => {
      if (!link.classList.contains('download-missing')) return;
      event.preventDefault();
      showStatus(`Aún falta colocar ${filename} en la carpeta de descargas.`);
    });

    if (location.protocol === 'http:' || location.protocol === 'https:') {
      checkDownload(href).then(bytes => bytes === null ? markMissing() : markReady(bytes));
    } else {
      if (info) info.textContent = 'Se comprobará al publicar el sitio';
    }
  });
})();
