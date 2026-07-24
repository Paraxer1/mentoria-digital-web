(() => {
  'use strict';

  const APP_BASE = document.querySelector('meta[name="app-base"]')?.content || './';
  const API_ENDPOINTS = ['api.php', 'guardar.php', 'api/encuestas'].map(path => new URL(path, new URL(APP_BASE, location.href)).href);
  const CACHE_KEY = 'mentoria.encuestas.cache.v4';
  const PENDING_KEY = 'mentoria.encuestas.pending.v4';
  const listeners = new Set();
  const statusListeners = new Set();

  let data = readJson(CACHE_KEY, {});
  let connected = false;
  let pollingTimer = 0;
  let storageEngine = 'local';
  let activeEndpoint = API_ENDPOINTS[0];

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '');
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
  }

  function emit(source) {
    const snapshot = clone(data);
    listeners.forEach(listener => {
      try {
        listener(snapshot, { source, storage: storageEngine });
      } catch (error) {
        console.error('[Datos] Error en suscriptor:', error);
      }
    });
  }

  function emitStatus(state, detail = '') {
    statusListeners.forEach(listener => {
      try {
        listener({ status: state, detail });
      } catch (error) {
        console.error('[Datos] Error en estado:', error);
      }
    });
  }

  function increment(target, path) {
    const parts = String(path).split('/').filter(Boolean);
    if (!parts.length) return;

    let node = target;
    for (const part of parts.slice(0, -1)) {
      if (!node[part] || typeof node[part] !== 'object') node[part] = {};
      node = node[part];
    }

    const key = parts[parts.length - 1];
    node[key] = Math.max(0, Number(node[key]) || 0) + 1;
  }

  function requestId() {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
    const random = Math.random().toString(36).slice(2);
    return `${Date.now()}-${random}`;
  }

  async function fetchJson(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          ...(options.headers || {})
        }
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.message || `HTTP ${response.status}`);
      return body;
    } finally {
      clearTimeout(timer);
    }
  }

  async function requestApi(options = {}) {
    const endpoints = [activeEndpoint, ...API_ENDPOINTS.filter(item => item !== activeEndpoint)];
    let lastError = new Error('Servidor no disponible.');

    for (const endpoint of endpoints) {
      try {
        const result = await fetchJson(endpoint, options);
        activeEndpoint = endpoint;
        return result;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  }

  function applyServerResult(result, source = 'server') {
    data = result.data || {};
    storageEngine = result.storage || 'server';
    connected = true;
    writeJson(CACHE_KEY, data);
    emit(source);
    emitStatus('server', storageEngine);
    return data;
  }

  async function refresh() {
    const result = await requestApi();
    return applyServerResult(result);
  }

  function getPending() {
    const pending = readJson(PENDING_KEY, []);
    return Array.isArray(pending) ? pending : [];
  }

  function savePending(items) {
    const unique = [];
    const seen = new Set();
    for (const item of items) {
      if (!item?.id || seen.has(item.id)) continue;
      seen.add(item.id);
      unique.push(item);
    }
    writeJson(PENDING_KEY, unique.slice(-500));
  }

  async function flushPending() {
    const pending = getPending();
    if (!pending.length) return 0;

    const remaining = [];
    let synced = 0;

    for (const item of pending) {
      try {
        const result = await requestApi({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        applyServerResult(result);
        synced += 1;
      } catch {
        remaining.push(item);
      }
    }

    savePending(remaining);
    return synced;
  }

  async function connect() {
    emit('local');

    try {
      await refresh();
      await flushPending();
      clearInterval(pollingTimer);
      pollingTimer = setInterval(() => {
        if (!document.hidden && navigator.onLine) refresh().catch(() => {});
      }, 20000);
      return true;
    } catch (error) {
      connected = false;
      storageEngine = 'local';
      emitStatus('local', error.message);
      emit('local');
      return false;
    }
  }

  async function submit(paths) {
    const cleanPaths = [...new Set((paths || []).map(String).filter(Boolean))];
    if (!cleanPaths.length) throw new Error('No hay respuestas válidas.');

    const submission = { id: requestId(), paths: cleanPaths };

    try {
      const result = await requestApi({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
      applyServerResult(result);
      return { source: 'server', storage: storageEngine, duplicate: Boolean(result.duplicate) };
    } catch (error) {
      const pending = getPending();
      pending.push(submission);
      savePending(pending);

      cleanPaths.forEach(path => increment(data, path));
      writeJson(CACHE_KEY, data);
      connected = false;
      storageEngine = 'local';
      emit('local');
      emitStatus('local', 'Respuesta pendiente de sincronización');
      return { source: 'local', storage: 'local', error };
    }
  }

  function subscribe(listener) {
    listeners.add(listener);
    listener(clone(data), { source: connected ? 'server' : 'local', storage: storageEngine });
    return () => listeners.delete(listener);
  }

  function onStatus(listener) {
    statusListeners.add(listener);
    return () => statusListeners.delete(listener);
  }

  addEventListener('online', () => connect());

  window.MentoriaSurveyData = Object.freeze({
    connect,
    submit,
    subscribe,
    onStatus,
    readLocal: () => clone(data)
  });
})();
