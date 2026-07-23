(() => {
  'use strict';
  const doc = document;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const iconMap = {
    'server':'▣','chart-pie':'◕','user-graduate':'◆','laptop-code':'⌨','headset':'◉','fingerprint':'◎',
    'wifi':'⌁','laptop':'▰','xmark':'×','windows':'⊞','android':'●','mobile':'▯','mobile-alt':'▯',
    'mobile-screen':'▯','floppy-disk':'▣','check':'✓','check-double':'✓','arrow-left':'←','arrow-right':'→',
    'arrow-down':'↓','bars':'☰','book-open':'▤','brain':'◉','clock':'◷','code':'</>','cogs':'⚙',
    'comments':'◌','exclamation-triangle':'⚠','globe':'◎','graduation-cap':'◆','lightbulb':'◉','link':'↗',
    'map-marker-alt':'●','microscope':'⌕','moon':'◐','paper-plane':'➤','paw':'●','phone-alt':'☎',
    'plane-departure':'✈','plus':'+','quote-left':'“','satellite-dish':'⌁','shield-halved':'◇',
    'shopping-basket':'▱','star':'★','sun':'☀','tag':'◇','tree':'♣','university':'▦','users':'◆',
    'utensils':'◫','water':'≈','wrench':'⚙','activity':'⌁','calculator':'▦','check-circle':'✓',
    'compass':'◉','flag':'⚑','folder-kanban':'▤','heart':'♥','layers':'▱','layout-grid':'▦',
    'leaf':'♧','list-checks':'☷','map':'⌖','menu':'☰','message-square':'□','mouse':'◉','music':'♫',
    'target':'◎','user':'◆','users-2':'◆','x':'×','sparkles':'✦'
  };

  function iconName(element) {
    const lucide = element.getAttribute('data-lucide');
    if (lucide) return lucide;
    const cls = [...element.classList].find(value => value.startsWith('fa-') && !['fa-solid','fa-regular','fa-brands','fa'].includes(value));
    return cls ? cls.slice(3) : '';
  }

  function hydrateIcons(root = doc) {
    root.querySelectorAll('i[class*="fa-"], [data-lucide]').forEach(element => {
      if (element.dataset.iconReady === '1') return;
      const name = iconName(element);
      element.textContent = iconMap[name] || '•';
      element.dataset.iconReady = '1';
      element.setAttribute('aria-hidden', 'true');
    });
  }

  function setupReveals() {
    const items = [...doc.querySelectorAll('[data-aos]')];
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '80px 0px', threshold: .06 });
    items.forEach(item => observer.observe(item));
  }

  function fallbackSvg(label) {
    const text = String(label || 'Imagen no disponible').replace(/[<>&"']/g, '').slice(0, 42);
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><rect width="800" height="450" fill="#0f172a"/><text x="400" y="230" text-anchor="middle" fill="#cbd5e1" font-family="system-ui" font-size="25">${text}</text></svg>`)}`;
  }

  function setupMedia() {
    doc.querySelectorAll('img').forEach((image, index) => {
      if (index > 0 && !image.loading) image.loading = 'lazy';
      image.decoding = 'async';
      image.addEventListener('error', () => {
        if (image.dataset.fallback === '1') return;
        image.dataset.fallback = '1';
        image.classList.add('mdw-media-fallback');
        image.src = fallbackSvg(image.alt);
      }, { once: true });
    });
  }

  let toastRegion;
  function notify(message, kind = 'info', timeout = 2800) {
    if (!toastRegion) {
      toastRegion = doc.createElement('div');
      toastRegion.className = 'mdw-toast-region';
      toastRegion.setAttribute('role', 'status');
      doc.body.append(toastRegion);
    }
    const toast = doc.createElement('div');
    toast.className = 'mdw-toast';
    toast.dataset.kind = kind;
    toast.textContent = String(message);
    toastRegion.append(toast);
    setTimeout(() => toast.remove(), timeout);
  }

  function resolveArgument(value, event, element) {
    if (value && typeof value === 'object' && value.$ === 'event') return event;
    if (value && typeof value === 'object' && value.$ === 'this') return element;
    return value;
  }

  function runActions(element, event, attribute) {
    if (element.dataset.mdwPrevent === '1') event.preventDefault();
    if (element.dataset.mdwStop === '1') event.stopPropagation();
    const raw = element.getAttribute(attribute);
    if (!raw) return;
    let actions;
    try { actions = JSON.parse(raw); } catch { return; }
    actions.forEach(action => {
      const fn = window[action.name];
      if (typeof fn !== 'function') {
        console.warn(`[Mentoria] Acción no disponible: ${action.name}`);
        return;
      }
      const args = (action.args || []).map(value => resolveArgument(value, event, element));
      fn(...args);
    });
  }

  function setupActions() {
    doc.addEventListener('click', event => {
      const element = event.target.closest('[data-mdw-click],[data-mdw-prevent]');
      if (element) runActions(element, event, 'data-mdw-click');
    });
    doc.addEventListener('submit', event => {
      const element = event.target.closest('[data-mdw-submit]');
      if (element) runActions(element, event, 'data-mdw-submit');
    });
  }

  function setupNetworkStatus() {
    const status = doc.createElement('div');
    status.className = 'mdw-network';
    status.setAttribute('role', 'status');
    doc.body.append(status);
    let timer;
    const show = online => {
      status.textContent = online ? 'Conexión restablecida' : 'Sin conexión: se guardará localmente';
      status.classList.add('show');
      clearTimeout(timer);
      timer = setTimeout(() => status.classList.remove('show'), 2200);
    };
    addEventListener('online', () => show(true));
    addEventListener('offline', () => show(false));
  }



  function supportFileProtocol() {
    if (location.protocol !== 'file:') return;
    doc.querySelectorAll('a[href]').forEach(link => {
      const raw = link.getAttribute('href');
      if (!raw || raw.startsWith(('#', 'mailto:', 'tel:', 'javascript:'))) return;
      try {
        const target = new URL(raw, location.href);
        if (target.protocol === 'file:' && target.pathname.endsWith('/')) {
          target.pathname += 'index.html';
          link.href = target.href;
        }
      } catch {}
    });
  }

  function clearLegacyWorker() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.getRegistrations().then(items => items.forEach(item => item.unregister())).catch(() => {});
    if ('caches' in window) caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('mentoria-')).map(key => caches.delete(key)))).catch(() => {});
  }

  function init() {
    doc.documentElement.classList.add('js');
    clearLegacyWorker();
    hydrateIcons();
    setupReveals();
    setupMedia();
    setupNetworkStatus();
    setupActions();
    supportFileProtocol();
  }

  window.MentoriaCore = Object.freeze({ hydrateIcons, notify });
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
