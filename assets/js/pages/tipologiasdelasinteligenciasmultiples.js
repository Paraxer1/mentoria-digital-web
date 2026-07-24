'use strict';

// ---------- Data (contenido teórico) ----------
    // Textos redactados (paráfrasis) + citas cortas (autor, año).
    const MI = {
      general: {
        kicker: "Introducción",
        title: "Panorama general",
        hero: {
          src: "../plan.webp",
          cap: "MI: varias capacidades relativamente diferenciadas que se combinan en tareas reales (Gardner, 1983; 1999)."
          
        },

        concepto: {
          quote: "“La inteligencia puede entenderse como un potencial para procesar información que se activa en contextos culturales para resolver problemas o crear productos valiosos.” (paráfrasis de Gardner)",
          body: [
            "La teoría de las Inteligencias Múltiples (MI) propone que la inteligencia no es una sola capacidad medida por un puntaje único. En cambio, describe un conjunto de capacidades que pueden desarrollarse y combinarse según la actividad y el contexto cultural (Gardner, 1983; 1999; 2006).",
            "En educación, MI se utiliza como un marco para diseñar experiencias de aprendizaje variadas y para observar evidencias de desempeño: productos, procesos y acciones, no únicamente exámenes (Project Zero, Harvard)."
          ],
          pills: [
            "No es un test clínico",
            "Se observa en desempeño",
            "Se desarrolla con práctica",
            "Se combinan en tareas reales"
          ]
        },
        caracteristicas: {
          leftTitle: "Características del enfoque MI",
          left: [
            "Pluralidad: no hay una sola inteligencia.",
            "Relativa independencia: fortaleza en una no garantiza otra.",
            "Desarrollables: mejoran con práctica, retroalimentación y ambiente.",
            "Contextuales: cultura y experiencias influyen en su expresión.",
            "Combinables: normalmente operan juntas en tareas reales.",
            "Observables: se evidencian en productos y soluciones (no solo pruebas).",
            "No etiquetas: describen capacidades actuales, no la identidad completa."
          ],
          rightTitle: "Cómo se usa de forma académica",
          right: [
            "Diseñar actividades con rutas distintas (texto, mapa, prototipo, debate, bitácora…).",
            "Evaluar con evidencias auténticas (producto/registro), no solo con reactivos.",
            "Reconocer fortalezas sin encasillar y proponer metas de mejora.",
            "Relacionar MI con trabajo colaborativo y diversidad de aprendizaje."
          ],
          cite: "Project Zero (Harvard); Brualdi Timmins (1996)."
        },
        ejemplos: {
          titleA: "Ejemplos rápidos (en clase)",
          itemsA: [
            "Un mismo tema puede trabajarse con: ensayo, infografía, maqueta, entrevista, bitácora, audio o demostración.",
            "Los equipos pueden repartirse roles: redacción, datos, diseño, prototipo, coordinación y reflexión final."
          ],
          titleB: "Evidencias sugeridas",
          itemsB: [
            "Producto: cartel/infografía/maqueta/audio/reporte.",
            "Registro: bitácora de proceso (fechas, decisiones, observaciones).",
            "Rúbrica simple: criterios claros (claridad, datos, creatividad, colaboración)."
          ],
          
          gallery: [
            { src:"../personalidad.webp", tag:"Infografía" },
            { src:"../naturalista.webp", tag:"Experimento" },
            { src:"../intrapersonal.webp", tag:"Equipo" }
          ]
        },
        estrategias: {
          title: "Estrategias personales (en general)",
          items: [
            "Identificar fortalezas actuales con evidencias (qué productos te salen mejor y por qué).",
            "Probar 1 micro-hábito por inteligencia (2 semanas) y registrar avances.",
            "Combinar inteligencias: por ejemplo, infografía (espacial) + explicación oral (lingüística) + datos (lógica).",
            "Pedir retroalimentación concreta y convertirla en una meta medible."
          ],
          cierre: "Idea clave: el objetivo es ampliar recursos de aprendizaje, no encasillar."
        }
      },

      ling: makeIntel({
        kicker:"Simbólica",
        title:"Lingüístico–Verbal",
        hero:{
          src:"../interpersonal.webp",
          cap:"Capacidad para usar el lenguaje oral y escrito con eficacia (Gardner, 1983; 1999)."
        },
        concepto:{
          quote:"“Sensibilidad a los significados, sonidos y estructura del lenguaje; uso eficaz de palabras.” (paráfrasis de Gardner)",
          body:[
            "La inteligencia lingüístico–verbal se relaciona con el manejo eficaz del lenguaje: comprender, producir y organizar ideas mediante palabras, tanto de forma oral como escrita (Gardner, 1983).",
            "En el ámbito escolar se observa en la argumentación, la narración, la precisión al explicar y la capacidad de adaptar el discurso al público."
          ],
          pills:["Lectura", "Escritura", "Oratoria", "Argumentación"]
        },
        caracteristicas:{
          leftTitle:"Características observables",
          left:[
            "Explica ideas con claridad y orden.",
            "Comprende textos y detecta ideas principales.",
            "Usa vocabulario con precisión (define, compara, ejemplifica).",
            "Argumenta: da razones y evidencia.",
            "Disfruta narrar, debatir o escribir."
          ],
          rightTitle:"Se nota cuando…",
          right:[
            "Resume un tema con sus propias palabras.",
            "Redacta conclusiones claras y coherentes.",
            "Sostiene un debate con ejemplos y contraargumentos.",
            "Hace preguntas que aclaran conceptos."
          ],
          cite:"Gardner (1983); Brualdi Timmins (1996)."
        },
        ejemplos:{
          titleA:"Ejemplos académicos",
          itemsA:[
            "Ensayo corto (1–2 páginas) con tesis, argumentos y conclusión.",
            "Debate con roles: moderación, postura A/B, réplica.",
            "Guion de exposición con introducción–desarrollo–cierre."
          ],
          titleB:"Evidencias (producto/registro)",
          itemsB:[
            "Texto final con correcciones (antes/después).",
            "Audio o exposición breve del debate (2–3 min).",
            "Rúbrica breve de claridad, coherencia, evidencias y lenguaje."
          ],destacada: ["../linguistico.webp"],
          
          gallery:[
            {src:"../corporal.webp", tag:"Lectura"},
            {src:"../musical.webp", tag:"Escritura"},
            {src:"../visual.webp", tag:"Debate"}
          ]
        },
        estrategias:{
          title:"Estrategias personales",
          items:[
            "Leer 15–20 min diarios y anotar 5 palabras nuevas (con definición y ejemplo).",
            "Escribir resúmenes de 8–10 líneas por tema (idea principal + 2 detalles + conclusión).",
            "Practicar exposición de 2 min con cronómetro (voz clara, pausas, mirada).",
            "Revisar textos con checklist: coherencia, conectores, ortografía y citas."
          ],
          cierre:"Meta sugerida (2 semanas): mejorar claridad de explicación con un resumen diario."
        }
      }),

      log: makeIntel({
        kicker:"Analítica",
        title:"Lógico–Matemática",
        hero:{
          src:"../logico.webp",
          cap:"Razonamiento, patrones, relaciones causa–efecto y resolución de problemas (Gardner, 1983)."
        },
        concepto:{
          quote:"“Capacidad para razonar, reconocer patrones y manejar operaciones lógicas.” (paráfrasis de Gardner)",
          body:[
            "La inteligencia lógico–matemática se asocia con el razonamiento deductivo e inductivo, la identificación de patrones y la resolución de problemas mediante reglas, modelos o números (Gardner, 1983).",
            "En clase se manifiesta al analizar datos, justificar procedimientos y elaborar conclusiones basadas en evidencia."
          ],
          pills:["Patrones", "Datos", "Hipótesis", "Causa–efecto"]
        },
        caracteristicas:{
          leftTitle:"Características observables",
          left:[
            "Identifica patrones (series, relaciones, regularidades).",
            "Organiza información en tablas y gráficas.",
            "Explica procedimientos paso a paso.",
            "Formula hipótesis y las contrasta con datos.",
            "Detecta errores lógicos en un argumento."
          ],
          rightTitle:"Se nota cuando…",
          right:[
            "Resuelve un problema justificando cada paso.",
            "Interpreta una gráfica y saca conclusiones.",
            "Propone una regla o modelo simple para un fenómeno.",
            "Distingue correlación vs causa (cuando aplica)."
          ],
          cite:"Gardner (1983); Brualdi Timmins (1996)."
        },
        ejemplos:{
          titleA:"Ejemplos académicos",
          itemsA:[
            "Análisis de un conjunto de datos (promedio, tendencia, comparación).",
            "Diseño de un experimento con variables y predicción.",
            "Resolución de problemas con explicación (no solo resultado)."
          ],
          titleB:"Evidencias (producto/registro)",
          itemsB:[
            "Hoja de procedimientos con corrección.",
            "Gráfica + interpretación escrita (5–8 líneas).",
            "Tabla de variables/hipótesis/resultados."
          ],destacada: ["../logico.webp"],
          gallery:[
            {src:"../linguistico.webp", tag:"Datos"},
            {src:"../inteligencia.webp", tag:"Análisis"},
            {src:"../final.webp", tag:"Patrones"}
          ]
        },
        estrategias:{
          title:"Estrategias personales",
          items:[
            "Resolver 3 problemas por sesión: 1 fácil, 1 medio, 1 reto (con explicación escrita).",
            "Convertir lecturas en preguntas: ¿qué datos hay?, ¿qué falta?, ¿qué concluyo?",
            "Practicar ‘pensamiento en voz alta’: narrar cómo llegas a una solución.",
            "Usar verificación final: sustituir resultados, estimar si “tiene sentido”."
          ],
          cierre:"Meta sugerida: mejorar justificación, no solo obtener respuestas."
        }
      }),

      esp: makeIntel({
        kicker:"Visual",
        title:"Visual–Espacial",
        hero:{
          src:"../plan.webp",
          cap:"Representación mental del espacio y diseño de información (Gardner, 1983)."
        },
        concepto:{
          quote:"“Capacidad para percibir, transformar y representar información espacial y visual.” (paráfrasis de Gardner)",
          body:[
            "La inteligencia visual–espacial se relaciona con percibir y representar el mundo en imágenes: orientación, diseño, mapas, diagramas, formas y relaciones espaciales (Gardner, 1983).",
            "En la escuela se observa en el uso de esquemas, la lectura de mapas, la creación de infografías y la organización visual de ideas."
          ],
          pills:["Mapas", "Diagramas", "Diseño", "Imágenes mentales"]
        },
        caracteristicas:{
          leftTitle:"Características observables",
          left:[
            "Organiza información con diagramas o mapas mentales.",
            "Interpreta planos, gráficas e imágenes.",
            "Imagina rotaciones o posiciones en el espacio.",
            "Diseña presentaciones claras y estéticas.",
            "Detecta proporciones, simetrías y composición."
          ],
          rightTitle:"Se nota cuando…",
          right:[
            "Explica un tema con un esquema visual propio.",
            "Convierte texto a infografía o línea del tiempo.",
            "Hace un croquis o mapa conceptual correcto.",
            "Ubica relaciones (cerca/lejos, arriba/abajo, escala)."
          ],
          cite:"Gardner (1983); Project Zero (Harvard)."
        },
        ejemplos:{
          titleA:"Ejemplos académicos",
          itemsA:[
            "Infografía del tema (definición, puntos clave y ejemplo).",
            "Mapa conceptual o línea del tiempo.",
            "Modelo/maqueta simple con etiquetas."
          ],
          titleB:"Evidencias (producto/registro)",
          itemsB:[
            "Infografía exportada en PDF/imagen.",
            "Fotos del proceso (boceto → versión final).",
            "Rúbrica de legibilidad: jerarquía visual, claridad, fuentes."
          ],destacada: ["../visual.webp"],
          gallery:[
            {src:"../personalidad.webp", tag:"Infografía"},
            {src:"../naturalista.webp", tag:"Diseño"},
            {src:"../intrapersonal.webp", tag:"Esquemas"}
          ]
        },
        estrategias:{
          title:"Estrategias personales",
          items:[
            "Convertir cada tema a un mapa mental (máx. 1 página).",
            "Usar la regla: título grande + 3 bloques + 1 conclusión visual.",
            "Practicar croquis: resumir un texto en 6–8 íconos/figuras.",
            "Revisar legibilidad en pantalla: contraste, tamaño de letra y espaciado."
          ],
          cierre:"Meta sugerida: mejorar claridad visual sin saturar."
        }
      }),

      mus: makeIntel({
        kicker:"Auditiva",
        title:"Musical",
        hero:{
          src:"../interpersonal.webp",
          cap:"Sensibilidad a ritmo, tono y estructura sonora; uso educativo del sonido (Gardner, 1983)."
        },
        concepto:{
          quote:"“Capacidad para percibir, discriminar, transformar y expresar formas musicales.” (paráfrasis de Gardner)",
          body:[
            "La inteligencia musical implica sensibilidad al ritmo, el tono, el timbre y la estructura sonora. Puede expresarse en interpretación, composición o análisis de patrones musicales (Gardner, 1983).",
            "En el aula puede apoyar memoria y atención mediante ritmos, canciones educativas o recursos auditivos, siempre vinculados a evidencias."
          ],
          pills:["Ritmo", "Tono", "Patrones", "Memoria auditiva"]
        },
        caracteristicas:{
          leftTitle:"Características observables",
          left:[
            "Reconoce patrones rítmicos con facilidad.",
            "Distingue cambios de tono/volumen.",
            "Memoriza con canciones o repetición sonora.",
            "Mantiene tempo o sincronización.",
            "Detecta errores en secuencias auditivas."
          ],
          rightTitle:"Se nota cuando…",
          right:[
            "Crea una canción corta para explicar un tema.",
            "Identifica ritmo/estructura en un audio.",
            "Usa palmas o golpes para organizar contenidos.",
            "Recuerda información mediante melodías."
          ],
          cite:"Gardner (1983); Project Zero (Harvard)."
        },
        ejemplos:{
          titleA:"Ejemplos académicos",
          itemsA:[
            "Jingle educativo (20–30 s) que resuma un tema.",
            "Podcast breve (1–2 min) explicando una idea clave.",
            "Análisis de un ritmo: patrón A–B–A y su función."
          ],
          titleB:"Evidencias (producto/registro)",
          itemsB:[
            "Archivo de audio + letra/guion.",
            "Rúbrica: claridad del mensaje, estructura, creatividad y precisión.",
            "Bitácora: por qué se eligió ese ritmo y qué facilita recordar."
          ],destacada: ["../musical.webp"],
          gallery:[
            {src:"../corporal.webp", tag:"Audio"},
            {src:"../musical.webp", tag:"Ritmo"},
            {src:"../visual.webp", tag:"Interpretación"}
          ]
        },
        estrategias:{
          title:"Estrategias personales",
          items:[
            "Usar ritmo para memorizar: repetir definiciones con palmas (2–3 min).",
            "Crear ‘audionotas’ de 60 s por tema (idea principal + ejemplo).",
            "Entrenar discriminación: identificar 3 diferencias en un audio (tono/tempo).",
            "Relacionar música con contenido: la canción debe incluir conceptos exactos."
          ],
          cierre:"Meta sugerida: mejorar precisión del contenido usando recursos auditivos."
        }
      }),

      kin: makeIntel({
        kicker:"Kinestésica",
        title:"Corporal–Cinestésica",
        hero:{
          src:"../logico.webp",
          cap:"Aprender haciendo: coordinación, manejo de objetos, demostraciones (Gardner, 1983)."
        },
        concepto:{
          quote:"“Capacidad para usar el cuerpo de manera habilidosa para expresar ideas o resolver problemas.” (paráfrasis de Gardner)",
          body:[
            "La inteligencia corporal–cinestésica se refiere al uso del cuerpo para expresar ideas, construir, manipular o resolver tareas. Incluye coordinación, control motor y aprendizaje práctico (Gardner, 1983).",
            "En educación se observa en demostraciones, dramatizaciones, prototipos y aprendizaje basado en actividades."
          ],
          pills:["Aprender haciendo", "Prototipo", "Demostración", "Coordinación"]
        },
        caracteristicas:{
          leftTitle:"Características observables",
          left:[
            "Aprende mejor mediante práctica y manipulación.",
            "Coordina movimientos con precisión.",
            "Maneja herramientas/objetos con seguridad (según contexto).",
            "Expresa ideas con gestos y demostraciones.",
            "Mantiene atención en tareas activas."
          ],
          rightTitle:"Se nota cuando…",
          right:[
            "Construye una maqueta o prototipo sencillo.",
            "Explica un proceso demostrando (paso a paso).",
            "Participa en dramatizaciones para representar conceptos.",
            "Organiza materiales y espacio de trabajo."
          ],
          cite:"Gardner (1983); Brualdi Timmins (1996)."
        },
        ejemplos:{
          titleA:"Ejemplos académicos",
          itemsA:[
            "Maqueta/prototipo que represente un concepto (circuito, ecosistema, estructura).",
            "Dramatización de un proceso (ciclo del agua, conflicto histórico).",
            "Demostración guiada con checklist de pasos."
          ],
          titleB:"Evidencias (producto/registro)",
          itemsB:[
            "Fotografías del proceso y una explicación corta.",
            "Lista de pasos (procedimiento) y mejoras detectadas.",
            "Rúbrica: funcionalidad, seguridad, claridad de explicación y trabajo limpio."
          ],destacada: ["../corporal.webp"],
          gallery:[
            {src:"../linguistico.webp", tag:"Prototipo"},
            {src:"../inteligencia.webp", tag:"Manos"},
            {src:"../final.webp", tag:"Movimiento"}
          ]
        },
        estrategias:{
          title:"Estrategias personales",
          items:[
            "Aprender por ‘estaciones’: 10 min práctica + 5 min reflexión escrita (bitácora).",
            "Usar checklist de pasos: planear → ejecutar → verificar → mejorar.",
            "Explicar oralmente el proceso de forma breve (entrena claridad y control).",
            "Diseñar prototipos pequeños: menos tamaño, más precisión y evidencia."
          ],
          cierre:"Meta sugerida: demostrar comprensión construyendo y explicando."
        }
      }),

      inter: makeIntel({
        kicker:"Social",
        title:"Interpersonal",
        hero:{
          src:"../plan.webp",
          cap:"Comprender a otros: cooperación, comunicación, liderazgo (Gardner, 1983)."
        },
        concepto:{
          quote:"“Capacidad para comprender a otras personas y actuar eficazmente en la interacción.” (paráfrasis de Gardner)",
          body:[
            "La inteligencia interpersonal se relaciona con entender emociones, intenciones y puntos de vista de otras personas. Favorece la comunicación, la cooperación y la organización de actividades en grupo (Gardner, 1983).",
            "En el aula se observa en trabajo colaborativo, mediación de conflictos y liderazgo responsable."
          ],
          pills:["Cooperación", "Comunicación", "Liderazgo", "Empatía"]
        },
        caracteristicas:{
          leftTitle:"Características observables",
          left:[
            "Escucha activa y hace preguntas pertinentes.",
            "Coordina roles y acuerdos en equipo.",
            "Detecta necesidades del grupo y propone soluciones.",
            "Media desacuerdos con respeto.",
            "Motiva y organiza sin imponer."
          ],
          rightTitle:"Se nota cuando…",
          right:[
            "Facilita el trabajo grupal (roles, tiempos, metas).",
            "Participa con respeto y promueve turnos de palabra.",
            "Recibe retroalimentación sin conflicto y la aplica.",
            "Negocia acuerdos y registra compromisos."
          ],
          cite:"Gardner (1983); Project Zero (Harvard)."
        },
        ejemplos:{
          titleA:"Ejemplos académicos",
          itemsA:[
            "Trabajo por roles en proyecto (coordinador, investigador, diseñador, vocero).",
            "Entrevista o encuesta a comunidad escolar y reporte de resultados.",
            "Mesa de diálogo con reglas de participación."
          ],
          titleB:"Evidencias (producto/registro)",
          itemsB:[
            "Acta de acuerdos del equipo + evidencias de cumplimiento.",
            "Co-evaluación (cada integrante valora aportes con criterios).",
            "Registro de entrevistas (guion + resultados)."
          ],destacada: ["../interpersonal.webp"],
          gallery:[
            {src:"../personalidad.webp", tag:"Equipo"},
            {src:"../naturalista.webp", tag:"Coordinación"},
            {src:"../intrapersonal.webp", tag:"Diálogo"}
          ]
        },
        estrategias:{
          title:"Estrategias personales",
          items:[
            "Practicar escucha activa: resumir lo que el otro dijo antes de responder.",
            "Usar acuerdos claros: rol + tarea + fecha + evidencia (checklist del equipo).",
            "Aplicar feedback: pedir 1 mejora concreta y registrar cómo se implementó.",
            "Entrenar mediación: proponer 2 soluciones y elegir la más viable con el grupo."
          ],
          cierre:"Meta sugerida: mejorar coordinación y evidencias de trabajo colaborativo."
        }
      }),

      intra: makeIntel({
        kicker:"Personal",
        title:"Intrapersonal",
        hero:{
          src:"../interpersonal.webp",
          cap:"Autoconocimiento, metas, autorregulación y reflexión (Gardner, 1983)."
        },
        concepto:{
          quote:"“Capacidad para comprenderse a sí mismo y usar ese conocimiento para orientar acciones.” (paráfrasis de Gardner)",
          body:[
            "La inteligencia intrapersonal implica reconocer estados internos (motivación, emociones, fortalezas, límites) y usar esa información para planear, tomar decisiones y autorregularse (Gardner, 1983).",
            "En lo académico se refleja en la autoevaluación, la metacognición (pensar sobre cómo aprendo) y el establecimiento de metas realistas."
          ],
          pills:["Metacognición", "Autoevaluación", "Metas", "Autorregulación"]
        },
        caracteristicas:{
          leftTitle:"Características observables",
          left:[
            "Se fija metas y monitorea su avance.",
            "Identifica qué le funciona para estudiar (y qué no).",
            "Reconoce errores y propone mejoras.",
            "Regula impulsos: mantiene constancia.",
            "Reflexiona con honestidad sobre su desempeño."
          ],
          rightTitle:"Se nota cuando…",
          right:[
            "Escribe una reflexión con evidencia (qué hice, qué aprendí, qué cambiaré).",
            "Organiza su tiempo y cumple plazos.",
            "Pide ayuda de forma oportuna y específica.",
            "Elabora un plan de estudio breve."
          ],
          cite:"Gardner (1983); Brualdi Timmins (1996)."
        },
        ejemplos:{
          titleA:"Ejemplos académicos",
          itemsA:[
            "Bitácora de aprendizaje (3 entradas): objetivo, estrategia usada, resultado.",
            "Autoevaluación con rúbrica (antes de entregar).",
            "Plan semanal: 3 metas y 1 hábito para sostenerlas."
          ],
          titleB:"Evidencias (producto/registro)",
          itemsB:[
            "Bitácora firmada/fechada o archivo digital.",
            "Comparación: borrador vs versión final con mejoras.",
            "Checklist de hábitos (sí/no) por semana."
          ],destacada: ["../intrapersonal.webp"],
          gallery:[
            {src:"../corporal.webp", tag:"Reflexión"},
            {src:"../musical.webp", tag:"Metas"},
            {src:"../visual.webp", tag:"Hábitos"}
          ]
        },
        estrategias:{
          title:"Estrategias personales",
          items:[
            "Aplicar ‘revisión de 3 preguntas’ al estudiar: ¿qué entendí?, ¿qué me falta?, ¿cómo lo compruebo?",
            "Establecer metas SMART (pequeñas): 1 tarea concreta + evidencia por semana.",
            "Usar el método 25/5 (Pomodoro): 25 min + 5 min registro en bitácora.",
            "Autoevaluación previa: calificar tu trabajo con rúbrica antes de entregar."
          ],
          cierre:"Meta sugerida: mejorar constancia y calidad a partir de autoevaluación."
        }
      }),

      nat: makeIntel({
        kicker:"Entorno",
        title:"Naturalista",
        hero:{
          src:"../logico.webp",
          cap:"Observar, clasificar y comprender el mundo natural (incorporada por Gardner en desarrollos posteriores)."
        },
        concepto:{
          quote:"“Capacidad para reconocer y clasificar elementos del entorno natural (plantas, animales, fenómenos).” (paráfrasis de Gardner)",
          body:[
            "La inteligencia naturalista se asocia con la observación y clasificación del entorno: reconocer patrones en la naturaleza, distinguir especies, fenómenos o categorías, y registrar cambios (Brualdi Timmins, 1996; Gardner, trabajos posteriores).",
            "En educación se refleja en proyectos ambientales, investigación de campo, bitácoras, clasificación de muestras y análisis de variables del entorno."
          ],
          pills:["Observación", "Clasificación", "Registro", "Entorno"]
        },
        caracteristicas:{
          leftTitle:"Características observables",
          left:[
            "Distingue categorías (especies, tipos, materiales).",
            "Observa cambios y registra detalles.",
            "Relaciona variables ambientales con resultados.",
            "Cuida el entorno y propone mejoras.",
            "Formula preguntas sobre fenómenos naturales."
          ],
          rightTitle:"Se nota cuando…",
          right:[
            "Hace una bitácora de observación con fechas y evidencias.",
            "Clasifica muestras con criterios claros.",
            "Explica relaciones simples (clima–flora, agua–suelo).",
            "Propone acciones ambientales con justificación."
          ],
          cite:"Brualdi Timmins (1996); Project Zero (Harvard)."
        },
        ejemplos:{
          titleA:"Ejemplos académicos",
          itemsA:[
            "Clasificación de plantas (hojas, tallos) con criterios y fotos.",
            "Registro de clima local por una semana (tabla + conclusión).",
            "Proyecto de reciclaje: categorías, medición y propuesta."
          ],
          titleB:"Evidencias (producto/registro)",
          itemsB:[
            "Bitácora con fotos (o dibujos) y observaciones.",
            "Tabla de datos + gráfica sencilla.",
            "Informe corto con propuesta y evidencia de implementación."
          ],destacada: ["../naturalista.webp"],
          gallery:[
            {src:"../linguistico.webp", tag:"Bosque"},
            {src:"../inteligencia.webp", tag:"Observación"},
            {src:"../final.webp", tag:"Clasificar"}
          ]
        },
        estrategias:{
          title:"Estrategias personales",
          items:[
            "Hacer 2 observaciones por semana (10 min) y registrar: qué vi, qué cambió, evidencia.",
            "Aprender criterios de clasificación (3 categorías claras) y aplicarlos a un caso real.",
            "Comparar variables: por ejemplo, humedad/temperatura vs resultados de un experimento.",
            "Diseñar una acción ambiental pequeña y medible (antes/después con foto)."
          ],
          cierre:"Meta sugerida: pasar de observar a explicar con evidencia."
        }
      }),ie: makeIntel({
        kicker: "Goleman",
        title: "Inteligencia Emocional",
        hero: {
          src: "../plan.webp",
          cap: "Capacidad de reconocer nuestros sentimientos y los ajenos (Goleman, 1995)."
        },
        concepto: {
          quote: "“La IE incluye el autocontrol, el entusiasmo, la persistencia y la capacidad de motivarse a uno mismo.”",
          body: [
            "Daniel Goleman propone que el éxito depende más de la IE que del coeficiente intelectual.",
            "Se divide en 5 pilares: Autoconciencia, Autorregulación, Automotivación, Empatía y Habilidades Sociales."
          ],
          pills: ["Emociones", "Empatía", "Autocontrol", "Motivación"]
        },
        caracteristicas: {
          leftTitle: "Los 5 Pilares de la IE",
          left: [
            "Autoconciencia: Reconocer emociones propias al momento.",
            "Autorregulación: Manejar impulsos y estados de ánimo.",
            "Motivación: Persistir tras metas a pesar de fallos.",
            "Empatía: Entender señales sociales ajenas.",
            "Habilidades Sociales: Manejar las emociones de los demás."
          ],
          rightTitle: "Emociones y Motivación",
          right: [
            "Emociones Primarias: Alegría, tristeza, ira, miedo, asco, sorpresa.",
            "Motivación Intrínseca: Por placer o reto personal.",
            "Motivación Extrínseca: Por recompensas externas o evitar castigos."
          ],
          cite: "Daniel Goleman (1995)."
        },
        ejemplos: {
          titleA: "Estrategias de Mejora",
          itemsA: [
            "Llevar un diario de emociones para identificar 'triggers'.",
            "Practicar técnicas de respiración antes de reaccionar.",
            "Escucha empática sin interrumpir en trabajos de equipo."
          ],
          titleB: "Evidencias de IE",
          itemsB: [
            "Registro de manejo de conflictos en el aula.",
            "Test de autoevaluación de habilidades sociales.",
            "Bitácora de metas de automotivación semanal."
          ],destacada: ["../inteligencia.webp"],
          gallery:[
            {src:"../personalidad.webp", tag:""},
            {src:"../naturalista.webp", tag:"Tecnica de respiración"},
            {src:"../intrapersonal.webp", tag:"Escucha empática"}
          ]
        },
        estrategias: {
          title: "Desarrollo Personal",
          items: [
            "Identificar la emoción actual y nombrarla.",
            "Pausar 5 segundos antes de responder a una crítica.",
            "Practicar la asertividad: decir 'no' sin culpa y con respeto."
          ],
          cierre: "La IE es la base para el manejo de conflictos y el liderazgo eficaz."
        }
      }),

      perso: makeIntel({
        kicker: "Análisis",
        title: "Personalidad",
        hero: {
          src: "../interpersonal.webp",
          cap: "Patrones de pensamientos, sentimientos y conductas que nos hacen únicos."
        },
        concepto: {
          quote: "“La personalidad es la organización dinámica de los sistemas psicofísicos que determinan la conducta.”",
          body: [
            "Existen métodos de análisis como el Big Five (Los 5 Grandes) y el MBTI para caracterizar rasgos individuales.",
            "Se compone de Temperamento (innato) y Carácter (aprendido)."
          ],
          pills: ["Temperamento", "Carácter", "Rasgos", "Conducta"]
        },
        caracteristicas: {
          leftTitle: "Los 5 Grandes Rasgos (Big Five)",
          left: [
            "Apertura a la experiencia (Curiosidad).",
            "Responsabilidad (Organización).",
            "Extraversión (Sociabilidad).",
            "Amabilidad (Cooperación).",
            "Neuroticismo (Estabilidad emocional)."
          ],
          rightTitle: "Métodos de Análisis",
          right: [
            "Entrevistas clínicas.",
            "Cuestionarios e inventarios (test psicométricos).",
            "Observación de conducta en contextos sociales.",
            "Métodos proyectivos."
          ],
          cite: "Allport; McCrae & Costa."
        },
        ejemplos: {
          titleA: "Ejemplos de Caracterización",
          itemsA: [
            "Persona con alta responsabilidad: suele ser el coordinador del equipo.",
            "Persona con alta amabilidad: facilita la mediación de conflictos."
          ],
          titleB: "Evidencias",
          itemsB: [
            "Perfil psicológico breve basado en autoevaluación.",
            "Cuadro comparativo entre temperamento y carácter.",
            
          ],destacada: ["../personalidad.webp"],
          gallery:[
            {src:"../corporal.webp", tag:"persona responsable"},
            {src:"../musical.webp", tag:"Mediador de conflictos"},
            {src:"../visual.webp", tag:"Escucha empática"}
          ]
        },
        estrategias: {
          title: "Estrategias",
          items: [
            "Identificar rasgos dominantes para elegir roles de equipo adecuados.",
            "Trabajar en rasgos de bajo puntaje (ej. organización) mediante hábitos.",
            "Reflexionar sobre cómo el carácter influye en la toma de decisiones."
          ],
          cierre: "Conocer tu personalidad permite ajustar tu estilo de aprendizaje."
        }
      }),

      plan: makeIntel({
        kicker: "Integral",
        title: "Plan de Vida",
        hero: {
          src: "../logico.webp",
          cap: "Diseño estratégico del futuro basado en valores y metas en 8 áreas."
        },
        concepto: {
          quote: "“Un plan de vida es la ruta que trazamos para cumplir nuestra misión personal.”",
          body: [
            "Requiere pensamiento crítico y responsabilidad para tomar decisiones informadas.",
            "Se debe trabajar de forma equilibrada en los 8 aspectos del ser humano."
          ],
          pills: ["Metas", "Misión", "Visión", "Valores"]
        },
        caracteristicas: {
          leftTitle: "Los 8 Aspectos del Ser Humano",
          left: [
            "Físico (Salud, deporte).",
            "Profesional (Estudios, carrera).",
            "Afectivo (Pareja, familia).",
            "Social (Amigos, comunidad).",
            "Económico (Ahorro, finanzas).",
            "Espiritual (Sentido de vida, valores).",
            "Cognitivo (Aprendizaje, intelecto).",
            "Estético (Arte, orden, belleza)."
          ],
          rightTitle: "Elementos Críticos",
          right: [
            "Visión a corto, mediano y largo plazo.",
            "Identificación de fortalezas y debilidades (FODA).",
            "Asignación de recursos y tiempos reales."
          ],
          cite: "Material de planeación educativa."
        },
        ejemplos: {
          titleA: "Ejemplos de Metas",
          itemsA: [
            "Profesional: Terminar el TSU en Software en 2 años.",
            "Físico: Recuperación total de la lesión de pierna mediante terapia."
          ],
          titleB: "Evidencias",
          itemsB: [
            "Matriz FODA personal.",
            "Cronograma de metas para el cuatrimestre.",
            "Carta de compromiso personal."
          ],destacada: ["../plan.webp"],
          gallery: []
        },
        estrategias: {
          title: "Acciones",
          items: [
            "Revisar metas mensualmente para ajustar el rumbo.",
            "Priorizar acciones según la urgencia y la importancia.",
            "Mantener un equilibrio entre lo económico y lo afectivo."
          ],
          cierre: "El plan de vida no es estático; evoluciona contigo."
        }
      }),
    };

    function makeIntel(obj){
      // Pequeña normalización para asegurar campos
      return {
        kicker: obj.kicker || "Tipología",
        title: obj.title || "Inteligencia",
        hero: obj.hero || {src:"", cap:""},
        concepto: obj.concepto || {quote:"", body:[], pills:[]},
        caracteristicas: obj.caracteristicas || {leftTitle:"", left:[], rightTitle:"", right:[], cite:""},
        ejemplos: obj.ejemplos || {titleA:"", itemsA:[], titleB:"", itemsB:[], gallery:[]},
        estrategias: obj.estrategias || {title:"", items:[], cierre:""}
      };
    }

    // ---------- DOM helpers ----------
    const $ = (sel, root=document) => root.querySelector(sel);
    const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

    const deck = $("#deck");
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!location.hash) requestAnimationFrame(() => deck?.scrollTo({ top: 0, behavior: 'auto' }));
    const dots = $$(".dot");
    const sidebar = $("#sidebar");
    const overlay = $("#overlay");
    const openSideBtn = $("#openSide");
    const closeSideBtn = $("#closeSide");

    const kickerEl = $("#kicker");
    const titleEl = $("#mainTitle");
    const tabsEl = $("#tabs");

    const viewGeneral = $("#view-general");
    const viewConcepto = $("#view-concepto");
    const viewCarac = $("#view-caracteristicas");
    const viewEj = $("#view-ejemplos");
    const viewEst = $("#view-estrategias");

    let currentKey = "general";
    let currentTab = "concepto";

    function setActiveDot(idx){
      dots.forEach(d=>d.classList.remove("active"));
      const d = dots[idx];
      if(d) d.classList.add("active");
    }

  function scrollToSlide(idx){
  const ids = ["s0","s1","s2","s3","s4","s5_new","s5"];
  const sec = $("#"+ids[idx]);
  if(!sec) return;
  sec.scrollIntoView({behavior:"smooth", block:"start"});
}

    // dot click
    dots.forEach(d=>{
      d.addEventListener("click", ()=> scrollToSlide(parseInt(d.dataset.slide,10)));
    });

    // update dot on scroll (lightweight)
    deck.addEventListener("scroll", ()=>{
  // Añadimos el ID de la nueva sección "s5_new" y ajustamos el índice de la bibliografía
  const sections = ["s0","s1","s2","s3","s4","s5_new","s5"].map(id=>$("#"+id));
  const mid = deck.scrollTop + (window.innerHeight/2);
  let best = 0;
  for(let i=0;i<sections.length;i++){
    const el = sections[i];
    if(!el) continue;
    const top = el.offsetTop;
    if(mid >= top) best = i;
  }
  setActiveDot(best);
});

    // Sidebar toggle (mobile)
    function isMobile(){
      return window.matchMedia("(max-width: 980px)").matches;
    }
    function syncMobileControls(){
      if(isMobile()){
        openSideBtn.style.display = "inline-flex";
      }else{
        openSideBtn.style.display = "none";
        sidebar.classList.remove("open");
        overlay.classList.remove("open");
      }
    }
    window.addEventListener("resize", syncMobileControls);

    function openSidebar(){
      sidebar.classList.add("open");
      overlay.classList.add("open");
    }
    function closeSidebar(){
      sidebar.classList.remove("open");
      overlay.classList.remove("open");
    }
    openSideBtn.addEventListener("click", openSidebar);
    closeSideBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    // ---------- Rendering ----------
    function renderGeneral(){
      const g = MI.general;

      const pillsHtml = g.concepto.pills.map(p=>`
        <div class="pill"><i data-lucide="sparkles" class="w-4 h-4"></i>${escapeHtml(p)}</div>
      `).join("");

      viewGeneral.innerHTML = `
        <div class="grid2">
          <div class="card">
            <div class="pad">
              <h3>Concepto</h3>
              <p class="p quote">${escapeHtml(g.concepto.quote)}</p>
              <div class="mt-3" style="display:flex; flex-direction:column; gap:10px;">
                ${g.concepto.body.map(t=>`<p class="p">${escapeHtml(t)}</p>`).join("")}
              </div>
              <div class="pillrow mt-4">${pillsHtml}</div>
            </div>
          </div>

          <div class="card">
            <div class="pad">
              <h3>Vista rápida</h3>
              <div class="heroimg">
                <img src="${escapeAttr(g.hero.src)}" alt="Panorama MI" loading="lazy">
                <div class="cap">${escapeHtml(g.hero.cap)}</div>
              </div>

              <div class="mt-4">
                <h4>Las 8 tipologías (modelo escolar)</h4>
                <div class="pillrow">
                  ${[
                    "Lingüística–verbal","Lógico–matemática","Visual–espacial","Musical",
                    "Corporal–cinestésica","Interpersonal","Intrapersonal","Naturalista"
                  ].map(x=>`<div class="pill"><i data-lucide="check" class="w-4 h-4"></i>${escapeHtml(x)}</div>`).join("")}
                </div>
              </div>

              <div class="mt-4">
                <h4>Cómo leer MI (en clase)</h4>
                <ul class="list">
                  <li>Observa desempeños (acciones) y productos (evidencias).</li>
                  <li>Diseña rutas diversas (texto, mapa, prototipo, diálogo, bitácora).</li>
                  <li>Propón metas personales y registra avances con evidencias.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="grid2 mt-4">
          <div class="card">
            <div class="pad">
              <h3>${escapeHtml(g.caracteristicas.leftTitle)}</h3>
              <ul class="list">
                ${g.caracteristicas.left.map(i=>`<li>${escapeHtml(i)}</li>`).join("")}
              </ul>
            </div>
          </div>

          <div class="card">
            <div class="pad">
              <h3>${escapeHtml(g.caracteristicas.rightTitle)}</h3>
              <ul class="list">
                ${g.caracteristicas.right.map(i=>`<li>${escapeHtml(i)}</li>`).join("")}
              </ul>
              <div class="mt-3 text-sm text-gray-400">Fuentes base: ${escapeHtml(g.caracteristicas.cite)}</div>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="pad">
            <h3>${escapeHtml(g.estrategias.title)}</h3>
            <ul class="list">
              ${g.estrategias.items.map(i=>`<li>${escapeHtml(i)}</li>`).join("")}
            </ul>
            <p class="mt-3 text-sm text-gray-400">${escapeHtml(g.estrategias.cierre)}</p>
          </div>
        </div>
      `;

      window.MentoriaCore?.hydrateIcons();
    }

    function renderIntel(key){
      const d = MI[key];
      if(!d) return;

      kickerEl.textContent = d.kicker;
      titleEl.textContent = d.title;

      // Concepto
      viewConcepto.innerHTML = `
        <div class="grid2">
          <div class="card">
            <div class="pad">
              <h3>Concepto</h3>
              <p class="p quote">${escapeHtml(d.concepto.quote)}</p>
              <div class="mt-3" style="display:flex; flex-direction:column; gap:10px;">
                ${d.concepto.body.map(p=>`<p class="p">${escapeHtml(p)}</p>`).join("")}
              </div>
              <div class="pillrow mt-4">
                ${d.concepto.pills.map(p=>`<div class="pill"><i data-lucide="sparkles" class="w-4 h-4"></i>${escapeHtml(p)}</div>`).join("")}
              </div>
            </div>
          </div>

          <div class="card">
            <div class="pad">
              <h3>Apoyo visual</h3>
              <div class="heroimg">
                <img src="${escapeAttr(d.hero.src)}" alt="${escapeAttr(d.title)}" loading="lazy">
                <div class="cap">${escapeHtml(d.hero.cap)}</div>
              </div>
              <div class="mt-4">
                <h4>Cita breve</h4>
                <p class="p">Base teórica: <span class="text-gray-400">${escapeHtml(d.caracteristicas.cite)}</span></p>
              </div>
            </div>
          </div>
        </div>
      `;

      // Características
      viewCarac.innerHTML = `
        <div class="grid2">
          <div class="card">
            <div class="pad">
              <h3>${escapeHtml(d.caracteristicas.leftTitle)}</h3>
              <ul class="list">
                ${d.caracteristicas.left.map(i=>`<li>${escapeHtml(i)}</li>`).join("")}
              </ul>
            </div>
          </div>

          <div class="card">
            <div class="pad">
              <h3>${escapeHtml(d.caracteristicas.rightTitle)}</h3>
              <ul class="list">
                ${d.caracteristicas.right.map(i=>`<li>${escapeHtml(i)}</li>`).join("")}
              </ul>

              <div class="mt-4">
                <h4>Enfoque académico</h4>
                <p class="p">
                  Para sostenerlo con evidencias, se recomienda vincular cada rasgo con un <b>producto</b> o <b>registro</b> (ej.: rúbrica, bitácora, audio, fotos del proceso).
                  <span class="text-gray-500">(Brualdi Timmins, 1996)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      `;

// Vista Ejemplos y Evidencias (CORREGIDO CON "DESTACADA")
      const gallery = (d.ejemplos.gallery || []).slice(0,6);
      viewEj.innerHTML = `
        <div class="grid2 items-start">
          <div class="flex flex-col gap-4">
            <div class="card"><div class="pad">
              <h3>${escapeHtml(d.ejemplos.titleA)}</h3>
              <ul class="list">${d.ejemplos.itemsA.map(i=>`<li>${escapeHtml(i)}</li>`).join("")}</ul>
            </div></div>
            <div class="card"><div class="pad">
              <h3>${escapeHtml(d.ejemplos.titleB)}</h3>
              <ul class="list">${d.ejemplos.itemsB.map(i=>`<li>${escapeHtml(i)}</li>`).join("")}</ul>
            </div></div>
          </div>

          <div class="card"><div class="pad">
            
            <div class="flex flex-col">
              <h4 class="text-xs uppercase tracking-widest text-gold mb-4">Evidencia Destacada</h4>
              <div class="w-full h-[350px] rounded-2xl border border-white/10 overflow-hidden bg-black/50 shadow-2xl group relative">
                <img src="${d.ejemplos.destacada || '../linguistico.webp'}" 
                     class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700">
              </div>
            </div>

            ${gallery.length > 0 ? `
            <div class="mt-8 pt-6 border-t border-white/10">
              <h4 class="text-xs uppercase tracking-widest text-gray-500 mb-4">Otros Ejemplos</h4>
              <div class="minigallery grid-cols-3 gap-3">
                ${gallery.map(g=>`
                  <div class="mini h-28 rounded-xl border-white/5">
                    <img src="${escapeAttr(g.src)}" alt="${escapeAttr(g.tag)}">
                    <div class="tag text-[9px]">${escapeHtml(g.tag)}</div>
                  </div>
                `).join("")}
              </div>
            </div>
            ` : ''}

          </div></div>
        </div>
      `;

      // Estrategias personales
      viewEst.innerHTML = `
        <div class="card">
          <div class="pad">
            <h3>${escapeHtml(d.estrategias.title)}</h3>
            <ul class="list">
              ${d.estrategias.items.map(i=>`<li>${escapeHtml(i)}</li>`).join("")}
            </ul>

            <div class="mt-4 card" style="background: rgba(212,175,55,.06); border-style:dashed; border-color: rgba(212,175,55,.45);">
              <div class="pad">
                <h4>Meta breve</h4>
                <p class="p">${escapeHtml(d.estrategias.cierre)}</p>
              </div>
            </div>
          </div>
        </div>
      `;

      window.MentoriaCore?.hydrateIcons();
    }

    function showTab(tab){
      currentTab = tab;

      // activate tab button
      $$(".tab", tabsEl).forEach(b=>b.classList.toggle("active", b.dataset.tab === tab));

      // show/hide views
      const allViews = [viewGeneral, viewConcepto, viewCarac, viewEj, viewEst];
      allViews.forEach(v=>v.classList.remove("active"));

      if(currentKey === "general"){
        // In general, always show General view; tabs are still visible but we keep it simple:
        viewGeneral.classList.add("active");
        return;
      }

      if(tab === "concepto") viewConcepto.classList.add("active");
      if(tab === "caracteristicas") viewCarac.classList.add("active");
      if(tab === "ejemplos") viewEj.classList.add("active");
      if(tab === "estrategias") viewEst.classList.add("active");
    }

    function setActiveNav(key){
      currentKey = key;

      // nav active state
      $$(".navbtn", sidebar).forEach(b=>b.classList.toggle("active", b.dataset.key === key));

      // render
      if(key === "general"){
        kickerEl.textContent = MI.general.kicker;
        titleEl.textContent = MI.general.title;
        renderGeneral();
        // ensure general view visible
        $$(".view").forEach(v=>v.classList.remove("active"));
        viewGeneral.classList.add("active");
      }else{
        // render content and show current tab
        renderIntel(key);
        showTab(currentTab);
      }

      // if mobile, close sidebar after selection
      if(isMobile()) closeSidebar();
    }

    // ---------- Events ----------
    // Sidebar click
    $$(".navbtn", sidebar).forEach(btn=>{
      btn.addEventListener("click", ()=>{
        setActiveNav(btn.dataset.key);
      });
    });

    // Tabs click
    $$(".tab", tabsEl).forEach(btn=>{
      btn.addEventListener("click", ()=>{
        // keep general stable
        if(currentKey === "general"){
          // highlight tab but stay on general view (prevents "blank")
          $$(".tab", tabsEl).forEach(b=>b.classList.toggle("active", b === btn));
          viewGeneral.classList.add("active");
          return;
        }
        showTab(btn.dataset.tab);
      });
    });
    let timerFinalImg = null;

function mostrarImagenFinal15s(){
  const slide = document.getElementById("s_final_img");
  if(!slide) return;

  // Ir a la diapositiva
  slide.scrollIntoView({behavior:"smooth", block:"start"});

  // limpiar timer anterior
  if(timerFinalImg) clearTimeout(timerFinalImg);

  // a los 15 segundos regresar
  timerFinalImg = setTimeout(()=>{
    const back = document.getElementById("s3"); // panorama / explorador
    if(back) back.scrollIntoView({behavior:"smooth", block:"start"});

    if(typeof setActiveNav === "function"){
      setActiveNav("general"); // regresa a panorama general
    }
  }, 15000); // 15 segundos
}

    // ---------- Utilities ----------
    function escapeHtml(str){
      return String(str)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
    }
    function escapeAttr(str){ return escapeHtml(str).replaceAll("\n"," "); }

    // ---------- Init ----------
    function init(){
      // icons
      window.MentoriaCore?.hydrateIcons();

      // mobile controls
      syncMobileControls();

      // default render
      renderGeneral();
      showTab("concepto"); // no-op for general view

      // ensure sidebar has proper active state
      setActiveNav("general");

      // Prevent accidental blank view: if someone switches tabs before selecting intelligence
      currentTab = "concepto";
    }
    init();
