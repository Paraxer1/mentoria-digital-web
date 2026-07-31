(() => {
  'use strict';

  const doc = document;
  const html = doc.documentElement;
  const body = doc.body;
  const q = (selector, root = doc) => root.querySelector(selector);
  const qa = (selector, root = doc) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const SplitText = window.SplitText;

  if (!hasGSAP) html.classList.add('no-gsap');
  if (reducedMotion) html.classList.add('reduced-motion');

  const runSafely = (callback) => {
    try {
      callback();
    } catch (error) {
      console.warn('[Urban Pets] Una mejora visual no pudo iniciarse:', error);
    }
  };

  /* ------------------------------------------------------------------------
     Tema y apariencia
  ------------------------------------------------------------------------ */
  const themeButton = q('[data-theme-toggle]');
  const themeColor = q('meta[name="theme-color"]');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  const getStoredTheme = () => {
    try {
      return localStorage.getItem('urbanpets-theme');
    } catch (_) {
      return null;
    }
  };

  const storeTheme = (theme) => {
    try {
      localStorage.setItem('urbanpets-theme', theme);
    } catch (_) {
      // El sitio sigue funcionando aunque el navegador bloquee localStorage.
    }
  };

  const applyTheme = (theme, save = false) => {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    html.dataset.theme = nextTheme;
    themeColor?.setAttribute('content', nextTheme === 'dark' ? '#061713' : '#f4fbf8');
    if (themeButton) {
      const isDark = nextTheme === 'dark';
      themeButton.setAttribute('aria-pressed', String(isDark));
      themeButton.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
      themeButton.title = isDark ? 'Activar modo claro' : 'Activar modo oscuro';
    }
    if (save) storeTheme(nextTheme);
  };

  applyTheme(getStoredTheme() || (systemDark.matches ? 'dark' : 'light'));

  themeButton?.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
    if (hasGSAP && !reducedMotion) {
      gsap.fromTo(body, { opacity: 0.88 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    }
  });

  systemDark.addEventListener?.('change', (event) => {
    if (!getStoredTheme()) applyTheme(event.matches ? 'dark' : 'light');
  });

  /* ------------------------------------------------------------------------
     Precarga e introducción
  ------------------------------------------------------------------------ */
  const preloader = q('.preloader');
  const hidePreloader = () => {
    if (!preloader || preloader.classList.contains('is-hidden')) return;
    preloader.classList.add('is-hidden');
    window.setTimeout(() => preloader.remove(), 700);
  };

  const intro = () => {
    if (!hasGSAP || reducedMotion) {
      hidePreloader();
      qa('[data-hero-item], [data-hero-visual]').forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
      });
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline
      .to(preloader, { opacity: 0, duration: 0.55, delay: 0.35, onComplete: hidePreloader })
      .from('[data-hero-item]', { opacity: 0, y: 28, duration: 0.7, stagger: 0.09 }, '-=0.15')
      .from('[data-hero-visual]', { opacity: 0, y: 36, rotateX: 8, scale: 0.965, duration: 1.05 }, '-=0.7')
      .from('.floating-badge', { opacity: 0, scale: 0.72, y: 16, stagger: 0.12, duration: 0.55, ease: 'back.out(1.8)' }, '-=0.55');
  };

  if (doc.readyState === 'complete') intro();
  else window.addEventListener('load', intro, { once: true });
  window.setTimeout(hidePreloader, 3500);

  /* ------------------------------------------------------------------------
     Navegación, progreso y encabezado
  ------------------------------------------------------------------------ */
  const header = q('[data-header]');
  const menuButton = q('[data-menu-button]');
  const nav = q('#main-nav');
  const progressBar = q('.scroll-progress span');
  const backToTop = q('[data-back-to-top]');
  const mobileDownload = q('.mobile-download-bar');
  let lastScrollY = window.scrollY;
  let scrollTicking = false;

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    body.classList.remove('menu-open');
  };

  const openMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.add('open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Cerrar menú');
    body.classList.add('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    if (nav?.classList.contains('open')) closeMenu();
    else openMenu();
  });

  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  doc.addEventListener('click', (event) => {
    if (!nav?.classList.contains('open')) return;
    if (!event.target.closest('.header-inner')) closeMenu();
  });

  doc.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const updateScrollUI = () => {
    const current = window.scrollY;
    const max = Math.max(html.scrollHeight - window.innerHeight, 1);
    const percent = Math.min(100, Math.max(0, (current / max) * 100));
    if (progressBar) progressBar.style.width = `${percent}%`;

    header?.classList.toggle('is-scrolled', current > 12);
    if (header && current > 260 && Math.abs(current - lastScrollY) > 8) {
      header.classList.toggle('header-hidden', current > lastScrollY && !nav?.classList.contains('open'));
    } else if (current <= 260) {
      header?.classList.remove('header-hidden');
    }

    backToTop?.classList.toggle('visible', current > 650);
    mobileDownload?.classList.toggle('visible', current > 520 && current < max - 210);
    lastScrollY = current;
    scrollTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollUI);
      scrollTicking = true;
    }
  }, { passive: true });
  updateScrollUI();

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
    updateScrollUI();
  }, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  /* ------------------------------------------------------------------------
     Lenis: desplazamiento suave con degradación segura
  ------------------------------------------------------------------------ */
  let lenis = null;
  if (!reducedMotion && typeof window.Lenis !== 'undefined') {
    runSafely(() => {
      lenis = new window.Lenis({
        duration: 1.08,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.15,
        wheelMultiplier: 0.9
      });

      if (hasGSAP && ScrollTrigger) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      } else {
        const raf = (time) => {
          lenis.raf(time);
          window.requestAnimationFrame(raf);
        };
        window.requestAnimationFrame(raf);
      }
    });
  }

  const scrollToTarget = (target) => {
    if (!target) return;
    const offset = -(header?.offsetHeight || 76) - 10;
    if (lenis) lenis.scrollTo(target, { offset, duration: reducedMotion ? 0 : 1.05 });
    else {
      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  qa('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = q(id);
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
      try { if (history.pushState) history.pushState(null, '', id); } catch (_) { /* file:// puede restringir el historial */ }
    });
  });

  const navLinks = qa('.main-nav a[href^="#"]');
  const navSections = navLinks
    .map((link) => q(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && navSections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      const entry = entries
        .filter((item) => item.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!entry) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { threshold: [0.12, 0.35, 0.65], rootMargin: '-25% 0px -58% 0px' });
    navSections.forEach((section) => navObserver.observe(section));
  }

  /* ------------------------------------------------------------------------
     GSAP / ScrollTrigger y revelados
  ------------------------------------------------------------------------ */
  if (hasGSAP) {
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (SplitText) gsap.registerPlugin(SplitText);
  }

  const revealElements = qa('[data-reveal]');
  if (hasGSAP && ScrollTrigger && !reducedMotion) {
    revealElements.forEach((element, index) => {
      gsap.fromTo(element,
        { opacity: 0, y: 36, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: (index % 3) * 0.035,
          scrollTrigger: { trigger: element, start: 'top 88%', once: true }
        }
      );
    });
  } else if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('revealed'));
  }

  if (hasGSAP && ScrollTrigger && !reducedMotion) {
    qa('[data-parallax]').forEach((element) => {
      const speed = Number(element.dataset.parallax || 0.08);
      gsap.to(element, {
        yPercent: speed * 280,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    });

    qa('.hero-particles i').forEach((particle, index) => {
      gsap.to(particle, {
        y: index % 2 ? -22 : 26,
        x: index % 3 ? 12 : -10,
        duration: 3.5 + (index % 4),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.12
      });
    });

    qa('[data-float-card]').forEach((card, index) => {
      gsap.to(card, {
        y: index % 2 ? 10 : -12,
        rotate: index % 2 ? 1.1 : -1,
        duration: 2.8 + index * 0.45,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }

  /* ------------------------------------------------------------------------
     Palabra rotatoria del hero
  ------------------------------------------------------------------------ */
  const rotatingWord = q('[data-rotating-word]');
  const words = ['mascotas', 'salud', 'adopciones', 'documentos', 'respaldos'];
  let wordIndex = 0;
  let wordTimer = null;

  const rotateWord = () => {
    if (!rotatingWord || doc.hidden) return;
    wordIndex = (wordIndex + 1) % words.length;
    const next = words[wordIndex];
    if (hasGSAP && !reducedMotion) {
      gsap.to(rotatingWord, {
        y: -14,
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          rotatingWord.textContent = next;
          gsap.fromTo(rotatingWord, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: 'power3.out' });
        }
      });
    } else {
      rotatingWord.textContent = next;
    }
  };

  if (rotatingWord && !reducedMotion) wordTimer = window.setInterval(rotateWord, 2600);

  /* ------------------------------------------------------------------------
     Contadores
  ------------------------------------------------------------------------ */
  const animateNumber = (element, target, duration = 950) => {
    if (!element) return;
    const numericTarget = Number(target);
    if (!Number.isFinite(numericTarget)) return;
    if (reducedMotion) {
      element.textContent = String(numericTarget);
      return;
    }

    if (hasGSAP) {
      const value = { current: 0 };
      gsap.to(value, {
        current: numericTarget,
        duration: duration / 1000,
        ease: 'power2.out',
        onUpdate: () => { element.textContent = String(Math.round(value.current)); }
      });
      return;
    }

    const start = performance.now();
    const tick = (now) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      element.textContent = String(Math.round(numericTarget * eased));
      if (elapsed < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observedCounters = qa('[data-big-counter]');
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateNumber(entry.target, entry.target.dataset.bigCounter, 1100);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.55 });
    observedCounters.forEach((counter) => counterObserver.observe(counter));
  } else {
    observedCounters.forEach((counter) => animateNumber(counter, counter.dataset.bigCounter));
  }

  const dashboardCounters = qa('[data-counter]');
  let dashboardCountersPlayed = false;
  const playDashboardCounters = (force = false) => {
    if (dashboardCountersPlayed && !force) return;
    dashboardCountersPlayed = true;
    dashboardCounters.forEach((counter, index) => {
      counter.textContent = '0';
      window.setTimeout(() => animateNumber(counter, counter.dataset.counter, 720), index * 80);
    });
  };

  /* ------------------------------------------------------------------------
     Demostración interactiva del sistema
  ------------------------------------------------------------------------ */
  const demoButtons = qa('[data-demo-target]');
  const demoScreens = qa('[data-demo-screen]');
  let activeDemoIndex = Math.max(0, demoButtons.findIndex((button) => button.classList.contains('active')));
  let demoTimer = null;
  let demoPaused = false;

  const activateDemo = (index, userInitiated = false) => {
    if (!demoButtons.length || !demoScreens.length) return;
    activeDemoIndex = (index + demoButtons.length) % demoButtons.length;
    const button = demoButtons[activeDemoIndex];
    const targetName = button.dataset.demoTarget;

    demoButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    demoScreens.forEach((screen) => {
      const active = screen.dataset.demoScreen === targetName;
      if (active) {
        screen.hidden = false;
        screen.classList.add('active');
        if (hasGSAP && !reducedMotion) {
          gsap.killTweensOf(screen);
          gsap.fromTo(screen, { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.42, ease: 'power3.out' });
          gsap.from(screen.querySelectorAll('article, li, .demo-heading, .filter-row'), {
            opacity: 0,
            y: 10,
            duration: 0.38,
            stagger: 0.025,
            ease: 'power2.out'
          });
        }
      } else {
        screen.classList.remove('active');
        screen.hidden = true;
      }
    });

    if (targetName === 'dashboard') playDashboardCounters(userInitiated);
  };

  const restartDemoTimer = () => {
    window.clearInterval(demoTimer);
    if (reducedMotion || demoButtons.length < 2) return;
    demoTimer = window.setInterval(() => {
      if (!demoPaused && !doc.hidden) activateDemo(activeDemoIndex + 1);
    }, 5200);
  };

  demoButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      activateDemo(index, true);
      restartDemoTimer();
    });
  });

  const demoStage = q('.app-stage');
  demoStage?.addEventListener('pointerenter', () => { demoPaused = true; });
  demoStage?.addEventListener('pointerleave', () => { demoPaused = false; });
  demoStage?.addEventListener('focusin', () => { demoPaused = true; });
  demoStage?.addEventListener('focusout', () => { demoPaused = false; });
  activateDemo(activeDemoIndex);
  restartDemoTimer();

  /* ------------------------------------------------------------------------
     Recorrido animado de cinco etapas
  ------------------------------------------------------------------------ */
  const journeySteps = qa('[data-journey-step]');
  const journey = {
    ring: q('[data-journey-ring]'),
    number: q('[data-journey-number]'),
    label: q('[data-journey-label]'),
    title: q('[data-journey-title]'),
    description: q('[data-journey-description]'),
    icon: q('[data-journey-icon] use'),
    cardTitle: q('[data-journey-card-title]'),
    cardSubtitle: q('[data-journey-card-subtitle]'),
    status: q('[data-journey-status]'),
    fields: q('[data-journey-fields]'),
    bar: q('[data-journey-bar]'),
    preview: q('.journey-preview')
  };
  const journeyIcons = {
    paw: 'paw',
    health: 'heart-pulse',
    users: 'users',
    home: 'home-heart',
    backup: 'hard-drive'
  };
  let activeJourney = -1;

  const updateJourney = (step, index) => {
    if (!step || index === activeJourney) return;
    activeJourney = index;
    journeySteps.forEach((item, itemIndex) => item.classList.toggle('active', itemIndex === index));

    const fields = (step.dataset.fields || '')
      .split(';')
      .map((item) => item.split('|'))
      .filter((parts) => parts.length === 2);
    const iconName = journeyIcons[step.dataset.icon] || 'paw';
    const progress = Math.min(100, Math.max(0, Number(step.dataset.progress || 0)));

    const applyContent = () => {
      if (journey.number) journey.number.textContent = String(index + 1).padStart(2, '0');
      if (journey.label) journey.label.textContent = step.dataset.label || '';
      if (journey.title) journey.title.textContent = step.dataset.title || '';
      if (journey.description) journey.description.textContent = step.dataset.description || '';
      if (journey.cardTitle) journey.cardTitle.textContent = step.dataset.cardTitle || '';
      if (journey.cardSubtitle) journey.cardSubtitle.textContent = step.dataset.cardSubtitle || '';
      if (journey.status) journey.status.textContent = step.dataset.status || '';
      journey.icon?.setAttribute('href', `#icon-${iconName}`);
      if (journey.ring) journey.ring.style.setProperty('--progress', `${progress}%`);
      if (journey.bar) journey.bar.style.width = `${progress}%`;
      if (journey.fields) {
        journey.fields.innerHTML = fields.map(([label, value]) => `<span><small>${label}</small><strong>${value}</strong></span>`).join('');
      }
    };

    if (hasGSAP && !reducedMotion && journey.preview) {
      gsap.to(journey.preview, {
        opacity: 0,
        y: 10,
        scale: 0.985,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          applyContent();
          gsap.to(journey.preview, { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'power3.out' });
        }
      });
    } else {
      applyContent();
    }
  };

  if (journeySteps.length && 'IntersectionObserver' in window) {
    const journeyObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) updateJourney(visible.target, journeySteps.indexOf(visible.target));
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-30% 0px -40% 0px' });
    journeySteps.forEach((step) => journeyObserver.observe(step));
  }
  if (journeySteps[0]) updateJourney(journeySteps[0], 0);

  /* ------------------------------------------------------------------------
     Carrusel de funciones con Swiper y alternativa sin CDN
  ------------------------------------------------------------------------ */
  const featureSlider = q('.features-swiper');
  if (featureSlider) {
    if (typeof window.Swiper !== 'undefined') {
      runSafely(() => {
        new window.Swiper(featureSlider, {
          slidesPerView: 1.08,
          spaceBetween: 14,
          speed: reducedMotion ? 0 : 680,
          grabCursor: finePointer,
          watchOverflow: true,
          keyboard: { enabled: true, onlyInViewport: true },
          pagination: { el: '.features-pagination', clickable: true },
          navigation: { nextEl: '.features-next', prevEl: '.features-prev' },
          breakpoints: {
            560: { slidesPerView: 1.45, spaceBetween: 16 },
            760: { slidesPerView: 2.05, spaceBetween: 18 },
            1020: { slidesPerView: 3, spaceBetween: 20 },
            1320: { slidesPerView: 3.35, spaceBetween: 22 }
          }
        });
      });
    } else {
      featureSlider.classList.add('swiper-fallback');
      q('.features-prev')?.addEventListener('click', () => {
        q('.swiper-wrapper', featureSlider)?.scrollBy({ left: -360, behavior: reducedMotion ? 'auto' : 'smooth' });
      });
      q('.features-next')?.addEventListener('click', () => {
        q('.swiper-wrapper', featureSlider)?.scrollBy({ left: 360, behavior: reducedMotion ? 'auto' : 'smooth' });
      });
    }
  }

  /* ------------------------------------------------------------------------
     Tabs de instalación
  ------------------------------------------------------------------------ */
  const tabButtons = qa('[data-tab]');
  const activateTab = (button, moveFocus = false) => {
    tabButtons.forEach((item) => {
      const selected = item === button;
      const panel = q(`#${item.dataset.tab}`);
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      if (panel) {
        panel.hidden = !selected;
        panel.classList.toggle('active', selected);
        panel.setAttribute('aria-hidden', String(!selected));
      }
    });
    if (moveFocus) button.focus();
  };

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => activateTab(button));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabButtons.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabButtons.length) % tabButtons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabButtons.length - 1;
      activateTab(tabButtons[next], true);
    });
  });
  const initiallySelectedTab = tabButtons.find((button) => button.getAttribute('aria-selected') === 'true') || tabButtons[0];
  if (initiallySelectedTab) activateTab(initiallySelectedTab);

  /* ------------------------------------------------------------------------
     Detección del sistema operativo
  ------------------------------------------------------------------------ */
  const detectSystem = () => {
    const ua = navigator.userAgent.toLowerCase();
    const platform = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase();
    if (ua.includes('android')) return 'android';
    if (ua.includes('windows') || platform.includes('win')) return 'windows';
    if (ua.includes('linux') || ua.includes('x11') || platform.includes('linux')) return 'linux';
    if (ua.includes('mac') || platform.includes('mac')) return 'mac';
    return 'other';
  };

  const detectedSystem = detectSystem();
  const systemMessage = q('[data-system-message]');
  const systemImage = q('[data-system-image]');
  const messages = {
    windows: 'Detectamos Windows. El instalador .EXE es la opción recomendada para este equipo.',
    linux: 'Detectamos Linux. El paquete .DEB es la opción recomendada para este equipo.',
    android: 'Estás navegando desde Android. Abre esta página en la computadora donde instalarás Urban Pets.',
    mac: 'Urban Pets 1.0 no ofrece instalador para macOS. Usa una computadora con Windows o una distribución Linux compatible con .DEB.',
    other: 'Elige Windows o Linux según la computadora donde instalarás Urban Pets.'
  };
  if (systemMessage) systemMessage.textContent = messages[detectedSystem] || messages.other;

  if (systemImage) {
    const linuxLike = detectedSystem === 'linux';
    systemImage.src = linuxLike ? 'assets/img/linux-penguin.webp' : 'assets/img/windows-download.webp';
    systemImage.alt = linuxLike ? 'Ilustración de Linux' : 'Ilustración de Windows';
  }
  q(`.download-card[data-os="${detectedSystem}"]`)?.classList.add('recommended-os');

  /* ------------------------------------------------------------------------
     Portapapeles, avisos y descargas
  ------------------------------------------------------------------------ */
  const toast = q('[data-toast]');
  let toastTimer = null;
  const showToast = (message = 'Copiado') => {
    if (!toast) return;
    const label = q('span', toast);
    if (label) label.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2200);
  };

  const fallbackCopy = (text) => {
    const field = doc.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    body.appendChild(field);
    field.select();
    let copied = false;
    try { copied = doc.execCommand('copy'); } catch (_) { copied = false; }
    field.remove();
    return copied;
  };

  qa('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy || '';
      let copied = false;
      try {
        await navigator.clipboard.writeText(value);
        copied = true;
      } catch (_) {
        copied = fallbackCopy(value);
      }
      showToast(copied ? 'Comando copiado' : 'Selecciona y copia el comando');
      button.classList.add('copied');
      window.setTimeout(() => button.classList.remove('copied'), 1200);
    });
  });

  qa('[data-download-link]').forEach((link) => {
    link.addEventListener('click', () => {
      link.classList.add('is-downloading');
      showToast('Preparando descarga…');
      window.setTimeout(() => link.classList.remove('is-downloading'), 2400);
    });
  });

  /* ------------------------------------------------------------------------
     Preguntas frecuentes
  ------------------------------------------------------------------------ */
  const faqItems = qa('.faq-list details');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ------------------------------------------------------------------------
     Cursor, magnetismo y superficies 3D
  ------------------------------------------------------------------------ */
  if (finePointer && !reducedMotion) {
    const cursorDot = q('.cursor-dot');
    const cursorRing = q('.cursor-ring');
    if (cursorDot && cursorRing) {
      body.classList.add('has-custom-cursor');
      const moveDotX = hasGSAP ? gsap.quickTo(cursorDot, 'x', { duration: 0.12, ease: 'power3.out' }) : null;
      const moveDotY = hasGSAP ? gsap.quickTo(cursorDot, 'y', { duration: 0.12, ease: 'power3.out' }) : null;
      const moveRingX = hasGSAP ? gsap.quickTo(cursorRing, 'x', { duration: 0.32, ease: 'power3.out' }) : null;
      const moveRingY = hasGSAP ? gsap.quickTo(cursorRing, 'y', { duration: 0.32, ease: 'power3.out' }) : null;

      window.addEventListener('pointermove', (event) => {
        if (moveDotX) {
          moveDotX(event.clientX);
          moveDotY(event.clientY);
          moveRingX(event.clientX);
          moveRingY(event.clientY);
        } else {
          cursorDot.style.left = `${event.clientX}px`;
          cursorDot.style.top = `${event.clientY}px`;
          cursorRing.style.left = `${event.clientX}px`;
          cursorRing.style.top = `${event.clientY}px`;
        }
      }, { passive: true });

      doc.addEventListener('pointerover', (event) => {
        if (event.target.closest('a, button, summary, [data-tilt], .feature-card')) body.classList.add('cursor-active');
      });
      doc.addEventListener('pointerout', (event) => {
        if (event.target.closest('a, button, summary, [data-tilt], .feature-card')) body.classList.remove('cursor-active');
      });
    }

    qa('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
        if (hasGSAP) gsap.to(element, { x: x * 11, y: y * 8, duration: 0.28, ease: 'power2.out' });
        else element.style.transform = `translate(${x * 11}px, ${y * 8}px)`;
      });
      const reset = () => {
        if (hasGSAP) gsap.to(element, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, .45)' });
        else element.style.transform = '';
      };
      element.addEventListener('pointerleave', reset);
      element.addEventListener('blur', reset);
    });

    qa('[data-tilt]').forEach((surface) => {
      const strength = Number(surface.dataset.tilt || 4);
      surface.addEventListener('pointermove', (event) => {
        const rect = surface.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        const rotateY = x * strength * 2;
        const rotateX = -y * strength * 2;
        surface.style.setProperty('--pointer-x', `${(x + 0.5) * 100}%`);
        surface.style.setProperty('--pointer-y', `${(y + 0.5) * 100}%`);
        if (hasGSAP) {
          gsap.to(surface, { rotateX, rotateY, duration: 0.55, ease: 'power2.out', transformPerspective: 1000, transformOrigin: 'center' });
        } else {
          surface.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      });
      surface.addEventListener('pointerleave', () => {
        if (hasGSAP) gsap.to(surface, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, .45)' });
        else surface.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------------------------------
     Animaciones decorativas de secciones
  ------------------------------------------------------------------------ */
  if (hasGSAP && ScrollTrigger && !reducedMotion) {
    const localDiagram = q('[data-local-diagram]');
    if (localDiagram) {
      gsap.from(localDiagram.querySelectorAll('.orbit-node, .diagram-core'), {
        opacity: 0,
        scale: 0.75,
        duration: 0.65,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: localDiagram, start: 'top 76%', once: true }
      });
      gsap.from(localDiagram.querySelectorAll('.diagram-lines path'), {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: localDiagram, start: 'top 76%', once: true }
      });
    }

    qa('.feature-card').forEach((card) => {
      const icon = q('.feature-icon', card);
      if (!icon) return;
      card.addEventListener('pointerenter', () => gsap.to(icon, { rotate: -5, scale: 1.08, duration: 0.35, ease: 'back.out(1.8)' }));
      card.addEventListener('pointerleave', () => gsap.to(icon, { rotate: 0, scale: 1, duration: 0.4, ease: 'power2.out' }));
    });
  }

  /* ------------------------------------------------------------------------
     Estado del documento y utilidades finales
  ------------------------------------------------------------------------ */
  q('[data-current-year]')?.replaceChildren(String(new Date().getFullYear()));

  doc.addEventListener('visibilitychange', () => {
    demoPaused = doc.hidden;
  });

  window.addEventListener('load', () => {
    if (ScrollTrigger) window.setTimeout(() => ScrollTrigger.refresh(), 120);
  });

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      hidePreloader();
      updateScrollUI();
    }
  });
})();
