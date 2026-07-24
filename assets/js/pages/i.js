'use strict';

const CONTENT = {
      intro: {
        title: "General",
        tag: "Inicio",
        desc: "Explora las inteligencias múltiples de Howard Gardner. Selecciona un tipo en el menú para ver sus características.",
        body: `
          <div class="info">
            <div class="box">
              <h3>¿Qué es?</h3>
              <ul>
                <li>La teoría propone que no existe una sola inteligencia general.</li>
                <li>Hay múltiples formas de aprender, resolver problemas y crear.</li>
                <li>Cada persona combina inteligencias en distintos niveles.</li>
              </ul>
            </div>
            <div class="box">
              <h3>¿Para qué sirve?</h3>
              <ul>
                <li>Reconocer fortalezas y estilos de aprendizaje.</li>
                <li>Diversificar actividades en la enseñanza.</li>
                <li>Mejorar motivación y desempeño.</li>
              </ul>
            </div>
          </div>
        `,
        actions: ''
      },

      linguistica: {
        title: "Inteligencia Lingüística",
        tag: "📝",
        desc: "Capacidad para usar el lenguaje de manera efectiva: hablar, leer, escribir y argumentar.",
        body: `
          <div class="info">
            <div class="box">
              <h3>Fortalezas</h3>
              <ul>
                <li>Buena comprensión lectora.</li>
                <li>Expresión oral clara.</li>
                <li>Redacción y vocabulario.</li>
              </ul>
            </div>
            <div class="box">
              <h3>Ejemplos</h3>
              <ul>
                <li>Debates, narraciones, ensayos.</li>
                <li>Juegos de palabras.</li>
                <li>Resúmenes y mapas conceptuales.</li>
              </ul>
            </div>
          </div>
          <div class="box">
            <h3>Actividad sugerida</h3>
            <ul>
              <li>Escribe un cuento corto donde expliques una inteligencia a tu estilo.</li>
            </ul>
          </div>
        `,
        actions: ''
      },

      logico: {
        title: "Inteligencia Lógico-matemática",
        tag: "➗",
        desc: "Capacidad para razonar, analizar problemas, identificar patrones y trabajar con números.",
        body: `
          <div class="info">
            <div class="box">
              <h3>Fortalezas</h3>
              <ul>
                <li>Resolución de problemas.</li>
                <li>Pensamiento crítico.</li>
                <li>Uso de fórmulas y lógica.</li>
              </ul>
            </div>
            <div class="box">
              <h3>Ejemplos</h3>
              <ul>
                <li>Rompecabezas, acertijos.</li>
                <li>Experimentos con variables.</li>
                <li>Organizar datos en tablas.</li>
              </ul>
            </div>
          </div>
          <div class="box">
            <h3>Actividad sugerida</h3>
            <ul>
              <li>Resuelve un problema usando pasos lógicos y explica tu razonamiento.</li>
            </ul>
          </div>
        `,
        actions: ''
      },

      espacial: {
        title: "Inteligencia Espacial",
        tag: "🧭",
        desc: "Capacidad para percibir el mundo visual-espacial, imaginar, diseñar y orientarse.",
        body: `
          <div class="info">
            <div class="box">
              <h3>Fortalezas</h3>
              <ul>
                <li>Visualización mental.</li>
                <li>Diseño, dibujo, planos.</li>
                <li>Interpretación de mapas.</li>
              </ul>
            </div>
            <div class="box">
              <h3>Ejemplos</h3>
              <ul>
                <li>Maquetas y modelado.</li>
                <li>Mapas conceptuales visuales.</li>
                <li>Fotografía y edición.</li>
              </ul>
            </div>
          </div>
          <div class="box">
            <h3>Actividad sugerida</h3>
            <ul>
              <li>Crea un póster visual que explique una inteligencia.</li>
            </ul>
          </div>
        `,
        actions: ''
      },

      musical: {
        title: "Inteligencia Musical",
        tag: "🎵",
        desc: "Capacidad para percibir, discriminar y crear ritmos, tonos, melodías y timbres.",
        body: `
          <div class="info">
            <div class="box">
              <h3>Fortalezas</h3>
              <ul>
                <li>Buen oído musical.</li>
                <li>Ritmo y coordinación.</li>
                <li>Memoria auditiva.</li>
              </ul>
            </div>
            <div class="box">
              <h3>Ejemplos</h3>
              <ul>
                <li>Componer o tocar instrumentos.</li>
                <li>Aprender con canciones.</li>
                <li>Identificar patrones sonoros.</li>
              </ul>
            </div>
          </div>
          <div class="box">
            <h3>Actividad sugerida</h3>
            <ul>
              <li>Escribe una letra corta que explique un concepto escolar y ponle ritmo.</li>
            </ul>
          </div>
        `,
        actions: ''
      },

      corporal: {
        title: "Inteligencia Corporal-Kinestésica",
        tag: "🏃",
        desc: "Capacidad para usar el cuerpo para expresar ideas, resolver problemas y crear productos.",
        body: `
          <div class="info">
            <div class="box">
              <h3>Fortalezas</h3>
              <ul>
                <li>Coordinación y destreza.</li>
                <li>Aprendizaje por práctica.</li>
                <li>Expresión corporal.</li>
              </ul>
            </div>
            <div class="box">
              <h3>Ejemplos</h3>
              <ul>
                <li>Deporte, danza, teatro.</li>
                <li>Actividades manuales.</li>
                <li>Experimentos prácticos.</li>
              </ul>
            </div>
          </div>
          <div class="box">
            <h3>Actividad sugerida</h3>
            <ul>
              <li>Representa con mímica una inteligencia y que el grupo la adivine.</li>
            </ul>
          </div>
        `,
        actions: ''
      },

      interpersonal: {
        title: "Inteligencia Interpersonal",
        tag: "🤝",
        desc: "Capacidad para comprender a los demás, trabajar en equipo, liderar y comunicarse efectivamente.",
        body: `
          <div class="info">
            <div class="box">
              <h3>Fortalezas</h3>
              <ul>
                <li>Empatía y escucha.</li>
                <li>Trabajo colaborativo.</li>
                <li>Resolución de conflictos.</li>
              </ul>
            </div>
            <div class="box">
              <h3>Ejemplos</h3>
              <ul>
                <li>Proyectos en equipo.</li>
                <li>Debates respetuosos.</li>
                <li>Dinámicas de grupo.</li>
              </ul>
            </div>
          </div>
          <div class="box">
            <h3>Actividad sugerida</h3>
            <ul>
              <li>Organiza roles de equipo para crear una presentación sobre una inteligencia.</li>
            </ul>
          </div>
        `,
        actions: ''
      },

      intrapersonal: {
        title: "Inteligencia Intrapersonal",
        tag: "🧠",
        desc: "Capacidad para entenderse a sí mismo: emociones, motivaciones, metas y autoconocimiento.",
        body: `
          <div class="info">
            <div class="box">
              <h3>Fortalezas</h3>
              <ul>
                <li>Reflexión y autoconciencia.</li>
                <li>Autocontrol emocional.</li>
                <li>Metas personales claras.</li>
              </ul>
            </div>
            <div class="box">
              <h3>Ejemplos</h3>
              <ul>
                <li>Diarios personales.</li>
                <li>Autoevaluación.</li>
                <li>Metas y hábitos.</li>
              </ul>
            </div>
          </div>
          <div class="box">
            <h3>Actividad sugerida</h3>
            <ul>
              <li>Escribe 3 fortalezas tuyas y cómo las puedes usar en la escuela.</li>
            </ul>
          </div>
        `,
        actions: ''
      },

      naturalista: {
        title: "Inteligencia Naturalista",
        tag: "🌿",
        desc: "Capacidad para observar, clasificar y comprender la naturaleza, plantas, animales y ecosistemas.",
        body: `
          <div class="info">
            <div class="box">
              <h3>Fortalezas</h3>
              <ul>
                <li>Observación y clasificación.</li>
                <li>Interés por el ambiente.</li>
                <li>Reconocer patrones en la naturaleza.</li>
              </ul>
            </div>
            <div class="box">
              <h3>Ejemplos</h3>
              <ul>
                <li>Herbario, colecciones.</li>
                <li>Experimentos con plantas.</li>
                <li>Salidas de campo.</li>
              </ul>
            </div>
          </div>
          <div class="box">
            <h3>Actividad sugerida</h3>
            <ul>
              <li>Crea una guía rápida de 5 plantas/animales locales y su función en el ecosistema.</li>
            </ul>
          </div>
        `,
        actions: ''
      },

      actividad: {
        title: "Actividad Interactiva",
        tag: "🎮",
        desc: "Pon a prueba lo aprendido con una mini actividad (editable).",
        body: `
          <div class="box">
            <h3>Mini reto</h3>
            <ul>
              <li>Elige una inteligencia y escribe un ejemplo de cómo la usarías para estudiar un tema difícil.</li>
              <li>Después, elige otra inteligencia distinta y propone una alternativa.</li>
            </ul>
          </div>
          <div class="box">
            <h3>Opcional</h3>
            <ul>
              <li>Comparte tus respuestas con un compañero y mejoren juntos las ideas.</li>
            </ul>
          </div>
        `,
        actions: ''
      }
    };

    let currentKey = "intro";

    function showContent(key){
      currentKey = key;

      document.querySelectorAll('#menuButtons button').forEach(btn=>{
        btn.classList.toggle('active', btn.dataset.key === key);
      });

      const data = CONTENT[key];
      if(!data) return;

      document.getElementById('title').textContent = data.title;
      document.getElementById('tag').textContent = data.tag;
      document.getElementById('desc').textContent = data.desc;
      document.getElementById('bodyContent').innerHTML = data.body;

      const actions = document.querySelector('.actions');
      if (actions) actions.innerHTML = data.actions || '';

      setAnimeByKey(key);
      animeActToCurrentSelection(key);
    }
    document.getElementById('menuButtons')?.addEventListener('click', event => {
      const button = event.target.closest('button[data-key]');
      if (button) showContent(button.dataset.key);
    });

    const animeChar = document.getElementById('animeChar');
    const animeImg = document.getElementById('animeImg');
    const animeBubble = document.getElementById('animeBubble');

    const ANIME_MAP = {
      intro: "../inteligencia.webp",
      linguistica: "../linguistico.webp",
      logico: "../logico.webp",
      espacial: "../visual.webp",
      musical: "../musical.webp",
      corporal: "../corporal.webp",
      interpersonal: "../interpersonal.webp",
      intrapersonal: "../intrapersonal.webp",
      naturalista: "../naturalista.webp",
      actividad: "../plan.webp"
    };

    function setAnimeByKey(key){
      const src = ANIME_MAP[key] || "../inteligencia.webp";
      animeImg.src = src;

      const label = (CONTENT[key]?.title) ? CONTENT[key].title : "esta sección";
      showBubble(`¡Vamos con: ${label}! ✨`);
    }

    function showBubble(text){
      animeBubble.textContent = text;
      animeChar.classList.add('showBubble');
      clearTimeout(showBubble._t);
      showBubble._t = setTimeout(()=>animeChar.classList.remove('showBubble'), 1600);
    }

    function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

    function wander(){
      const pad = 16;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const x = (Math.random() < 0.5)
        ? clamp(pad + Math.random()*120, pad, vw-120)
        : clamp(vw - (pad + 140 + Math.random()*120), pad, vw-120);

      const y = clamp(pad + 80 + Math.random()*(vh-200), pad, vh-120);

      animeChar.style.left = x + "px";
      animeChar.style.top = y + "px";
    }

    function animeActToCurrentSelection(key){
      const btn = document.querySelector(`#menuButtons button[data-key="${key}"]`);
      if(!btn) { wander(); return; }

      const r = btn.getBoundingClientRect();
      const pad = 14;
      const charW = 86;
      let targetX = r.right + pad + 10;
      let targetY = r.top + (r.height/2);

      if(targetX + charW > window.innerWidth){
        targetX = r.left - (pad + charW + 10);
      }
      targetX = clamp(targetX, 10, window.innerWidth - charW - 10);
      targetY = clamp(targetY, 70, window.innerHeight - 70);

      animeChar.style.left = targetX + "px";
      animeChar.style.top = targetY + "px";

      showBubble("👆 ¡Aquí está la inteligencia!");
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInterval(() => { if (!document.hidden) wander(); }, 7000);
    }

    window.addEventListener('resize', ()=>{
      animeActToCurrentSelection(currentKey);
    });

    setAnimeByKey("intro");
    animeActToCurrentSelection("intro");
