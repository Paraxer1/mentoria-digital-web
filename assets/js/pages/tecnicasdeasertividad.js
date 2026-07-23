'use strict';

// --- Lógica del Slider ---
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const progressBar = document.getElementById('progressBar');
        function updateSlide() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === currentSlide) {
                    slide.classList.add('active');
                }
            });
            const progress = ((currentSlide + 1) / slides.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        function nextSlide() {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateSlide();
            }
        }

        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlide();
            }
        }

        function resetSlides() {
            currentSlide = 0;
            updateSlide();
            // Resetear dinámicas
            document.querySelectorAll('.feedback').forEach(f => f.style.display = 'none');
            document.querySelectorAll('.quiz-btn').forEach(b => {
                b.disabled = false;
                b.style.background = 'rgba(255,255,255,0.03)';
                b.style.borderColor = 'rgba(255,255,255,0.1)';
                b.style.color = 'var(--text-secondary)';
            });
            // Reset semáforo
            semaforoIndex = 0;
            loadSemaforo();
            document.getElementById('btn-next-semaforo').style.display = 'none';
            // Reset Tools
            toolIndex = 0;
            loadToolCase();
            document.getElementById('btn-next-tool').style.display = 'none';
        }


        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });

        // Swipe support
        let touchStartX = 0;
        const slider = document.getElementById('slider');
        slider.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
        slider.addEventListener('touchend', e => {
            if (e.changedTouches[0].screenX < touchStartX - 50) nextSlide();
            if (e.changedTouches[0].screenX > touchStartX + 50) prevSlide();
        });

        // --- DINÁMICA 1: SEMÁFORO ---
        const semaforoPhrases = [
            { 
                text: '"Lo que tú digas está bien, no quiero problemas."', 
                type: 'pasivo',
                hint: 'Evita el conflicto anulando su propia opinión.'
            },
            { 
                text: '"Claro que lo haré, pero me parece ridículo que me lo pidas a mí."', 
                type: 'agresivo',
                hint: 'Acepta hacerlo, pero usa la culpa y el ataque (Agresividad pasiva).'
            },
            { 
                text: '"No estoy de acuerdo con esa idea, prefiero que lo hagamos de esta otra forma."', 
                type: 'asertivo',
                hint: 'Expresa desacuerdo claramente sin atacar a la persona.'
            }
        ];
        let semaforoIndex = 0;

        function loadSemaforo() {
            if (semaforoIndex < semaforoPhrases.length) {
                document.getElementById('semaforo-text').textContent = semaforoPhrases[semaforoIndex].text;
                document.getElementById('feedback-semaforo').style.display = 'none';
                document.querySelectorAll('.btn-semaforo').forEach(btn => btn.style.transform = "scale(1)");
            } else {
                document.getElementById('semaforo-text').textContent = "¡Nivel completado!";
                document.getElementById('btn-next-semaforo').style.display = 'none';
            }
        }

        function checkSemaforo(selectedType) {
            const currentPhrase = semaforoPhrases[semaforoIndex];
            const feedback = document.getElementById('feedback-semaforo');
            const btnNext = document.getElementById('btn-next-semaforo');

            if (selectedType === currentPhrase.type) {
                feedback.innerHTML = `¡Correcto! <br><span style="font-weight:400; font-size:0.9em">${currentPhrase.hint}</span>`;
                feedback.className = "feedback correct";
                feedback.style.display = 'block';
                btnNext.style.display = 'block'; 
            } else {
                feedback.textContent = "Incorrecto. Analiza bien: ¿Cede? ¿Ataca? ¿O propone?";
                feedback.className = "feedback incorrect";
                feedback.style.display = 'block';
            }
        }

        function nextSemaforo() {
            semaforoIndex++;
            if(semaforoIndex < semaforoPhrases.length){
                loadSemaforo();
            } else {
                 document.getElementById('semaforo-text').textContent = "¡Excelente! Has dominado la identificación de estilos.";
                 document.getElementById('feedback-semaforo').style.display = 'none';
                 document.getElementById('btn-next-semaforo').style.display = 'none';
            }
        }

        // --- DINÁMICA 2: TRADUCTOR ---
        function checkTraductor(btn, type) {
            const feedback = document.getElementById('feedback-traductor');
            
            if (type === 'asertivo') {
                applyStyle(btn, 'correct');
                feedback.innerHTML = "¡Exacto! <br>No atacaste a la persona, hablaste del problema, cómo te afecta y diste una solución.";
                feedback.className = "feedback correct";
                disableSiblings(btn);
            } else if (type === 'pasivo') {
                applyStyle(btn, 'incorrect');
                feedback.textContent = "Eso es Pasivo. Asumes una carga que no te corresponde y validas la irresponsabilidad del otro.";
                feedback.className = "feedback incorrect";
            } else {
                applyStyle(btn, 'incorrect');
                feedback.textContent = "Eso es Agresivo. Usas sarcasmo y culpa, lo que generará una pelea defensiva.";
                feedback.className = "feedback incorrect";
            }
            feedback.style.display = 'block';
        }

        // --- DINÁMICA 3: LA CAJA DE HERRAMIENTAS (NUEVA) ---
        const toolCases = [
            {
                scenario: "🔥 SITUACIÓN: Un vendedor te sigue por toda la tienda insistiendo: 'Llévelo, es una oferta única, no se arrepentirá, ándale anímese'. Tú ya dijiste que no.",
                options: [
                    { name: "Banco de Niebla", icon: "🌫️", correct: false },
                    { name: "Disco Rayado", icon: "💿", correct: true, feedback: "¡Correcto! Ante la insistencia sin argumentos nuevos, la repetición tranquila del 'No, gracias' es lo único que funciona." },
                    { name: "Mensaje Yo", icon: "👤", correct: false }
                ]
            },
            {
                scenario: "💣 SITUACIÓN: Tu jefe te dice frente a todos: 'Este informe es un desastre, todo lo que haces está mal'. (Crítica vaga y generalizada)",
                options: [
                    { name: "Aplazamiento", icon: "⏸️", correct: false },
                    { name: "Banco de Niebla", icon: "🌫️", correct: false },
                    { name: "Pregunta Asertiva", icon: "❓", correct: true, feedback: "¡Bien pensado! Al preguntar '¿Qué parte específicamente está mal?', obligas al crítico a dejar de insultar y empezar a dar datos útiles." }
                ]
            },
            {
                scenario: "🌪️ SITUACIÓN: Llegas tarde a una reunión y un compañero te dice sarcásticamente: 'Miren quién se dignó a aparecer, como siempre tarde'. (Es verdad que llegaste tarde)",
                options: [
                    { name: "Disco Rayado", icon: "💿", correct: false },
                    { name: "Banco de Niebla", icon: "🌫️", correct: true, feedback: "¡Excelente! Aceptas la verdad ('Es cierto que llegué tarde') sin engancharte con su sarcasmo. La niebla absorbe el impacto." },
                    { name: "Acuerdo Viable", icon: "🤝", correct: false }
                ]
            }
        ];
        let toolIndex = 0;

        function loadToolCase() {
            const container = document.getElementById('tool-options');
            const scenarioText = document.getElementById('tool-scenario');
            container.innerHTML = ''; // Limpiar
            document.getElementById('feedback-tool').style.display = 'none';
            document.getElementById('btn-next-tool').style.display = 'none';

            if (toolIndex < toolCases.length) {
                const currentCase = toolCases[toolIndex];
                scenarioText.textContent = currentCase.scenario;

                currentCase.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = 'tool-btn';
                    btn.innerHTML = `<span class="tool-icon">${opt.icon}</span> ${opt.name}`;
                    btn.onclick = () => checkTool(btn, opt);
                    container.appendChild(btn);
                });
            } else {
                scenarioText.textContent = "¡Felicidades! Eres un maestro de la Asertividad.";
                scenarioText.style.borderLeftColor = "var(--success)";
            }
        }

        function checkTool(btn, option) {
            const feedback = document.getElementById('feedback-tool');
            const btnNext = document.getElementById('btn-next-tool');
            const allBtns = document.querySelectorAll('.tool-btn');

            if (option.correct) {
                btn.style.background = 'var(--success)';
                btn.style.color = '#fff';
                feedback.innerHTML = option.feedback;
                feedback.className = "feedback correct";
                feedback.style.display = 'block';
                btnNext.style.display = 'block';
                
                // Deshabilitar otros
                allBtns.forEach(b => b.disabled = true);
            } else {
                btn.style.background = 'rgba(239, 68, 68, 0.2)';
                btn.style.borderColor = 'var(--error)';
                feedback.textContent = "Esa herramienta no es la más efectiva aquí. Intenta de nuevo.";
                feedback.className = "feedback incorrect";
                feedback.style.display = 'block';
            }
        }

        function nextTool() {
            toolIndex++;
            loadToolCase();
        }

        // --- Helpers ---
        function applyStyle(btn, status) {
            if (status === 'correct') {
                btn.style.background = 'rgba(16, 185, 129, 0.2)';
                btn.style.borderColor = 'var(--success)';
                btn.style.color = '#fff';
            } else {
                btn.style.background = 'rgba(239, 68, 68, 0.2)';
                btn.style.borderColor = 'var(--error)';
                btn.style.color = '#fff';
                btn.disabled = true;
            }
        }

        function disableSiblings(btn) {
            let parent = btn.parentNode;
            let siblings = parent.getElementsByTagName('button');
            for(let i=0; i<siblings.length; i++) siblings[i].disabled = true;
        }

        // Init
        updateSlide();
        loadSemaforo(); 
        loadToolCase(); // Iniciar la nueva dinámica
