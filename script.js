// script.js — versión mejorada, modular y más confiable
// Características: filtrado estable, orden estable, preserva selección al filtrar,
// navegación teclado/táctil, "volver a galería" que enfoca la miniatura, preloads y manejo de errores.

(() => {
  // Config / elementos
  const SELECTORS = {
    galleryGrid: '#gallery',
    card: '.card',
    filter: '#filter',
    sortBtn: '#sortBtn',
    shuffleBtn: '#shuffleBtn',
    groupBtn: '#groupBtn',
    backdrop: '#backdrop',
    vMedia: '#vMedia',
    vCaption: '#vCaption',
    vPos: '#vPos',
    vDownload: '#vDownload',
    vClose: '#vClose',
    vCloseBig: '#vCloseBig',
    backToGallery: '#backToGallery',
    prev: '#prev',
    next: '#next'
  };

  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const gallery = $(SELECTORS.galleryGrid);
  const filterEl = $(SELECTORS.filter);
  const sortBtn = $(SELECTORS.sortBtn);
  const shuffleBtn = $(SELECTORS.shuffleBtn);
  const groupBtn = $(SELECTORS.groupBtn);

  const backdrop = $(SELECTORS.backdrop);
  const vMedia = $(SELECTORS.vMedia);
  const vCaption = $(SELECTORS.vCaption);
  const vPos = $(SELECTORS.vPos);
  const vDownload = $(SELECTORS.vDownload);
  const vClose = $(SELECTORS.vClose);
  const vCloseBig = $(SELECTORS.vCloseBig);
  const backToGallery = $(SELECTORS.backToGallery);
  const prevBtn = $(SELECTORS.prev);
  const nextBtn = $(SELECTORS.next);

  let allItems = [];    // original snapshot of items from DOM with stableIndex
  let viewList = [];    // currently visible items in order
  let current = 0;      // index in viewList of current viewed item
  let chronoAsc = true;   // sort order flag

  // Utilities
  const debounce = (fn, wait = 150) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  };

  function buildAllItems() {
    allItems = $$('.container main .grid .card')
      .map((el, i) => ({
        el,
        src: el.dataset.src || '',
        type: el.dataset.type || 'image',
        owner: (el.dataset.owner || '').toLowerCase(),
        title: el.querySelector('.title')?.textContent?.trim() || el.getAttribute('aria-label') || `item-${i+1}`,
        poster: el.dataset.poster || '', // Añadir poster para videos
        stableIndex: i
      }));
  }

  // Apply filter + stable sort and re-render visible set
  function applyFilterAndSort() {
    const filter = (filterEl?.value || 'all').toLowerCase();

    // Rebuild snapshot every time (keeps stableIndex consistent with DOM initial load)
    buildAllItems();

    viewList = allItems.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'kevin') return item.owner === 'kevin';
      if (filter === 'oscar') return item.owner === 'oscar';
      if (filter === 'guero' || filter === 'grupo') return item.owner === 'guero' || item.owner === 'grupo';
      if (filter === 'photos') return item.type === 'image';
      if (filter === 'videos') return item.type === 'video';
      return true;
    });

    const parents = new Set(allItems.map(it => it.el.parentElement));
    
    // Hide all first
    allItems.forEach(it => it.el.style.display = 'none');
    
    // Append and show visible, re-sorting them into their correct parents
    viewList.forEach(it => {
      const correctParent = document.getElementById(it.el.closest('.grid').id);
      if(correctParent) {
         correctParent.appendChild(it.el);
         it.el.style.display = '';
      }
    });

    // Reattach handlers (idempotent)
    attachCardHandlers();
  }

  // Attach click/keyboard handlers to cards (ensures no duplicate handlers)
  function attachCardHandlers() {
    $$('.container main .grid .card').forEach(card => {
      if (card.__hasHandlers) return;
      card.__hasHandlers = true;
      card.tabIndex = card.tabIndex || 0;
      card.addEventListener('click', () => openViewerForCard(card));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openViewerForCard(card); }
      });
    });
  }

  // Build viewList from currently visible cards (used when opening viewer)
  function rebuildViewListFromVisible() {
    const visible = $$('.container main .grid .card').filter(c => c.style.display !== 'none');
    viewList = visible.map((el, idx) => ({
      el,
      src: el.dataset.src || '',
      type: el.dataset.type || 'image',
      owner: (el.dataset.owner || '').toLowerCase(),
      title: el.querySelector('.title')?.textContent?.trim() || `item-${idx+1}`,
      poster: el.dataset.poster || '' // Asegúrate de capturar el poster
    }));
  }

  // Viewer open / show / close
  function openViewerForCard(cardEl) {
    rebuildViewListFromVisible();
    current = viewList.findIndex(i => i.el === cardEl);
    if (current === -1) current = 0;
    showCurrent();
    backdrop.style.display = 'flex';
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus media region for keyboard navigation
    setTimeout(() => vMedia?.focus?.(), 80);
    preloadNearby();
  }

  function showCurrent() {
    try {
      vMedia.innerHTML = '';
      if (!viewList.length) return;
      const it = viewList[current];
      vCaption.textContent = it.title;
      vPos.textContent = `${current + 1} / ${viewList.length}`;
      if (vDownload) { vDownload.href = it.src; vDownload.setAttribute('download', it.title); }

      if (it.type === 'image') {
        const img = document.createElement('img');
        img.src = it.src;
        img.alt = it.title;
        img.loading = 'eager';
        // double click to close
        img.addEventListener('dblclick', closeViewer);
        vMedia.appendChild(img);
      } else {
        const vid = document.createElement('video');
        vid.src = it.src;
        vid.controls = true;
        vid.autoplay = true;
        vid.muted = true;
        vid.playsInline = true;
        vid.preload = 'metadata';
        if (it.poster) { // Añadir el atributo poster
            vid.poster = it.poster;
        }
        vMedia.appendChild(vid);
      }
    } catch (err) {
      console.error('Error mostrando elemento en visor:', err);
    }
  }

  function closeViewer() {
    stopMedia();
    backdrop.style.display = 'none';
    backdrop.setAttribute('aria-hidden', 'true');
    vMedia.innerHTML = '';
    document.body.style.overflow = '';
  }

  function stopMedia() {
    const video = vMedia.querySelector('video');
    if (video) {
      try { video.pause(); video.removeAttribute('src'); video.load(); } catch (e) { /* ignore */ }
    }
  }

  // Navigation controls
  function goPrev() {
    if (!viewList.length) return;
    current = (current - 1 + viewList.length) % viewList.length;
    showCurrent();
    preloadNearby();
  }
  function goNext() {
    if (!viewList.length) return;
    current = (current + 1) % viewList.length;
    showCurrent();
    preloadNearby();
  }

  // Back to gallery: close and focus/highlight thumbnail
  function backToGalleryHandler() {
    closeViewer();
    rebuildViewListFromVisible();
    const thumbEl = viewList[current]?.el;
    if (thumbEl) {
      thumbEl.classList.add('highlight');
      thumbEl.focus();
      thumbEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => thumbEl.classList.remove('highlight'), 900);
    }
  }

  // Shuffle visible viewList and reorder DOM
  function shuffleVisible() {
    rebuildViewListFromVisible();
    for (let i = viewList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [viewList[i], viewList[j]] = [viewList[j], viewList[i]];
    }
    // Re-append to their respective parents
    viewList.forEach(it => {
        const correctParent = document.getElementById(it.el.closest('.grid').id);
        if(correctParent) correctParent.appendChild(it.el);
    });
    attachCardHandlers();
  }

  // Preload neighbors for smoother nav
  function preloadNearby() {
    if (!viewList.length) return;
    const prevItem = viewList[(current - 1 + viewList.length) % viewList.length];
    const nextItem = viewList[(current + 1) % viewList.length];
    [prevItem, nextItem].forEach(it => {
      if (!it) return;
      if (it.type === 'image') {
        const im = new Image();
        im.src = it.src;
      } else {
        // preload video (solo precargamos el poster si existe para ahorrar banda ancha)
        if (it.poster) {
            const im = new Image();
            im.src = it.poster;
        }
        // También podemos precargar el video, pero el poster es suficiente para una vista previa rápida
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = it.src;
        document.head.appendChild(link);
        setTimeout(() => { try { document.head.removeChild(link); } catch (e) { } }, 10000);
      }
    });
  }

  // Touch swipe handling inside viewer
  function enableTouchSwipe() {
    let startX = 0;
    let touching = false;
    vMedia.addEventListener('touchstart', e => {
      touching = true;
      startX = e.changedTouches[0].clientX;
    }, { passive: true });
    vMedia.addEventListener('touchend', e => {
      if (!touching) return;
      const dx = e.changedTouches[0].clientX - startX;
      touching = false;
      if (Math.abs(dx) > 50) { dx > 0 ? goPrev() : goNext(); }
    }, { passive: true });
  }

  // Keyboard shortcuts when viewer open
  function enableKeyboard() {
    document.addEventListener('keydown', e => {
      if (backdrop.style.display !== 'flex') return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      if (e.key === ' ') {
        const vid = vMedia.querySelector('video');
        if (vid && document.activeElement !== vid) { // Solo si el video no está enfocado (para no interferir con sus controles)
           e.preventDefault(); vid.paused ? vid.play() : vid.pause(); 
        }
      }
    });
  }

  // Initialise UI handlers
  function initControls() {
    buildAllItems();
    attachCardHandlers();
    applyFilterAndSort(); // Run on load

    if (filterEl) filterEl.addEventListener('change', debounce(applyFilterAndSort, 80));
    if (sortBtn) sortBtn.addEventListener('click', () => {
      chronoAsc = !chronoAsc;
      sortBtn.textContent = chronoAsc ? 'Orden: Cronológico' : 'Orden: Inverso';
      applyFilterAndSort();
    });
    if (shuffleBtn) shuffleBtn.addEventListener('click', shuffleVisible);
    
    if (groupBtn) groupBtn.addEventListener('click', () => document.getElementById('group-title')?.scrollIntoView({ behavior: 'smooth' }));

    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (vClose) vClose.addEventListener('click', closeViewer);
    if (vCloseBig) vCloseBig.addEventListener('click', closeViewer);
    if (backToGallery) backToGallery.addEventListener('click', backToGalleryHandler);

    // close when clicking outside viewer content
    if (backdrop) backdrop.addEventListener('click', e => { if (e.target === backdrop) closeViewer(); });

    enableTouchSwipe();
    enableKeyboard();
  }

  // Run init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initControls);
  } else {
    initControls();
  }

})();