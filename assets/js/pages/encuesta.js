(() => {
  'use strict';

  const store = window.MentoriaSurveyData;
  const charts = {};
  const activeSubmissions = new Set();
  const completedSurveys = new Set();
  let kioscoData = { Materia: null, Facilidad: null };

  const notify = (message, kind = 'info') => window.MentoriaCore?.notify(message, kind) || alert(message);

  function getView(viewId) {
    return document.getElementById(`view-${viewId}`);
  }

  function setBusy(host, busy) {
    const button = host?.matches?.('[type="submit"],button')
      ? host
      : host?.querySelector?.('[type="submit"]');
    if (!(button instanceof HTMLButtonElement)) return;
    button.disabled = busy;
    button.setAttribute('aria-busy', String(busy));
  }

  function updateMenuStatus() {
    ['web', 'tel', 'kiosco'].forEach(id => {
      const card = document.getElementById(`card-${id}`);
      if (!card) return;
      const completed = completedSurveys.has(id);
      card.classList.toggle('survey-complete', completed);
      card.setAttribute('data-completed', String(completed));
      card.setAttribute('aria-label', completed
        ? `${card.dataset.label || id}. Respuesta guardada; se puede abrir otra vez.`
        : (card.dataset.label || id));
    });
  }

  function showView(viewId) {
    const next = getView(viewId);
    if (!next) return;

    document.querySelectorAll('.view-section').forEach(section => {
      const active = section === next;
      section.classList.toggle('hidden', !active);
      section.setAttribute('aria-hidden', String(!active));
    });

    if (viewId === 'resultados') {
      Object.values(charts).forEach(chart => chart?.update());
    }
    if (viewId === 'menu') updateMenuStatus();

    window.scrollTo({
      top: 0,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }

  function openSurvey(id) {
    if (!['web', 'tel', 'kiosco'].includes(id)) return;
    showView(id);
  }

  async function saveSurvey(id, paths, host) {
    if (activeSubmissions.has(id)) return false;

    activeSubmissions.add(id);
    setBusy(host, true);

    try {
      const result = await store.submit(paths);
      completedSurveys.add(id);
      updateMenuStatus();
      notify(
        result.source === 'server'
          ? 'Respuesta guardada correctamente.'
          : 'Respuesta guardada en este dispositivo; se sincronizará al recuperar conexión.',
        'success'
      );
      showView('menu');
      return true;
    } catch (error) {
      console.error('[Encuesta] No se pudo guardar:', error);
      notify('No fue posible guardar la respuesta. Revisa el servidor e inténtalo nuevamente.', 'error');
      return false;
    } finally {
      activeSubmissions.delete(id);
      setBusy(host, false);
    }
  }

  async function submitWeb(form) {
    const fd = new FormData(form);
    const pc = fd.get('pc');
    const internet = fd.get('internet');
    if (!pc || !internet) {
      notify('Responde las dos preguntas.', 'error');
      return;
    }
    const ok = await saveSurvey('web', [`Web/PC/${pc}`, `Web/Internet/${internet}`], form);
    if (ok) form.reset();
  }

  async function submitTel(form) {
    const fd = new FormData(form);
    const so = fd.get('so');
    const editor = fd.get('editor');
    if (!so || !editor) {
      notify('Completa los dos campos.', 'error');
      return;
    }
    const ok = await saveSurvey('tel', [`Tel/SO/${so}`, `Tel/Editor/${editor}`], form);
    if (ok) form.reset();
  }

  function selectKiosco(category, value, button) {
    if (!(category in kioscoData) || !value || !(button instanceof HTMLButtonElement)) return;
    kioscoData[category] = value;
    const group = document.getElementById(`group-${category.toLowerCase()}`);
    group?.querySelectorAll('.kiosco-btn').forEach(item => {
      const selected = item === button;
      item.classList.toggle('kiosco-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
  }

  async function submitKiosco(button) {
    if (!kioscoData.Materia || !kioscoData.Facilidad) {
      notify('Selecciona una respuesta en cada pregunta.', 'error');
      return;
    }

    const ok = await saveSurvey(
      'kiosco',
      [`Kiosco/Materia/${kioscoData.Materia}`, `Kiosco/Facilidad/${kioscoData.Facilidad}`],
      button
    );
    if (!ok) return;

    kioscoData = { Materia: null, Facilidad: null };
    document.querySelectorAll('.kiosco-btn').forEach(item => {
      item.classList.remove('kiosco-selected');
      item.setAttribute('aria-pressed', 'false');
    });
  }

  function setupEvents() {
    document.addEventListener('click', event => {
      const viewButton = event.target.closest('[data-survey-view]');
      if (viewButton) {
        event.preventDefault();
        showView(viewButton.dataset.surveyView);
        return;
      }

      const card = event.target.closest('[data-survey-open]');
      if (card) {
        event.preventDefault();
        openSurvey(card.dataset.surveyOpen);
        return;
      }

      const kioscoButton = event.target.closest('[data-kiosco-category][data-kiosco-value]');
      if (kioscoButton) {
        event.preventDefault();
        selectKiosco(kioscoButton.dataset.kioscoCategory, kioscoButton.dataset.kioscoValue, kioscoButton);
        return;
      }

      const submitButton = event.target.closest('#submit-kiosco');
      if (submitButton) {
        event.preventDefault();
        submitKiosco(submitButton);
      }
    });

    document.getElementById('survey-web-form')?.addEventListener('submit', event => {
      event.preventDefault();
      submitWeb(event.currentTarget);
    });

    document.getElementById('survey-tel-form')?.addEventListener('submit', event => {
      event.preventDefault();
      submitTel(event.currentTarget);
    });
  }

  function createCharts() {
    charts.chartWeb = MentoriaCharts.create('chartWeb', { type: 'doughnut', labels: [], data: [] });
    charts.chartTel = MentoriaCharts.create('chartTel', { type: 'bar', labels: [], data: [] });
    charts.chartKiosco1 = MentoriaCharts.create('chartKiosco1', { type: 'pie', labels: [], data: [] });
    charts.chartKiosco2 = MentoriaCharts.create('chartKiosco2', { type: 'bar', horizontal: true, labels: [], data: [] });
  }

  function render(data) {
    const pc = data.Web?.PC || {};
    const editors = data.Tel?.Editor || {};
    const materia = data.Kiosco?.Materia || {};
    const facilidad = data.Kiosco?.Facilidad || {};

    charts.chartWeb?.update({ labels: ['Sí', 'No/Compartido'], data: [pc.Si || 0, pc.No || 0] });
    charts.chartTel?.update({ labels: ['VS Code', 'IntelliJ', 'Otros'], data: [editors.VSCode || 0, editors.IntelliJ || 0, editors.Otros || 0] });
    charts.chartKiosco1?.update({ labels: ['Buena', 'Regular', 'Mala'], data: [materia.Buena || 0, materia.Regular || 0, materia.Mala || 0] });
    charts.chartKiosco2?.update({ labels: ['Fácil', 'Media', 'Difícil'], data: [facilidad.Facil || 0, facilidad.Media || 0, facilidad.Dificil || 0] });
  }

  function updateSourceLabel(text) {
    const label = document.getElementById('data-source-label');
    if (label) label.textContent = text;
  }

  function init() {
    if (!store) {
      notify('No se cargó el módulo de almacenamiento.', 'error');
      return;
    }

    setupEvents();
    createCharts();
    store.subscribe((payload, meta) => {
      render(payload);
      updateSourceLabel(
        meta.source === 'server'
          ? 'Datos compartidos desde el servidor local'
          : 'Modo local: pendiente de conexión con el servidor'
      );
    });
    store.onStatus(({ status }) => {
      updateSourceLabel(status === 'server' ? 'Servidor de datos conectado' : 'Modo local: servidor no disponible');
    });
    store.connect();
    updateMenuStatus();
    showView('menu');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
