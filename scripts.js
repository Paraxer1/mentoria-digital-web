// data: Cursos y Mega Packs
const cursos = [
  { title: "Gastronomía Completa", img: "multimedia/Gastronomia.jpg", description: "Aprende los secretos culinarios." },
  { title: "Desarrollo Web & apps", img: "multimedia/Desarrollo_apps.jpg", description: "Crea sitios web desde cero." },
  { title: "Marketing Digital 360°", img: "multimedia/Marcketing.jpg", description: "Domina el marketing online." },
  { title: "Tech Digital", img: "multimedia/Tech_total.jpg", description: "Curso avanzado sobre tecnología e innovación." },
  { title: "Librería Digital", img: "multimedia/Biblioteca.jpg", description: "Accede a la colección más completa de libros y audiolibros." },
  { title: "Multimedia y diseño", img: "multimedia/Multimedia_diseño.jpg", description: "Domina las herramientas de diseño gráfico." },
  { title: "Ciberseguridad & Hacking", img: "multimedia/Hacking.jpg", description: "Domina habilidades de hacking y ciberseguridad." },
  { title: "Educación académica", img: "multimedia/Educacion_academica.jpg", description: "Refuerza tus conocimientos con el contenido más completo para todos los niveles de estudio." },
  { title: "Psicología & Neurociencia", img: "multimedia/Psicologia.jpg", description: "Explora la mente humana con cursos personalizados." },
  { title: "Habilidades & Manualidades Pro", img: "multimedia/Manualidades.jpg", description: "Desarrolla proyectos y emprende con habilidades prácticas." },
  { title: "Desarrollo personal & Mentalidad", img: "multimedia/Desarrollo_personal.jpg", description: "Cursos para mejorar tu bienestar personal." },
  { title: "Idiomas & Finanzas", img: "multimedia/Idiomas.jpg", description: "Aprende nuevos idiomas con nuestra metodología." }
];

const megaPacks = [
  { title: "Mega Pack tecnológico", img: "multimedia/Tecnologico.jpg", description: "Todo lo que necesitas para ser un experto en tecnología." },
  { title: "Mega Pack Mentalidad & crecimiento", img: "multimedia/Mentalidad.jpg", description: "Potencia tu mente y liderazgo." },
  { title: "Mega Pack Creativo & Diseño Gráfico", img: "multimedia/Creativo.jpg", description: "Despierta tu lado creativo y emprendedor." },
  { title: "Mega Pack Educativo Pro", img: "multimedia/Educativo.jpg", description: "Ideal para estudiantes de todos los niveles." }
];

// Función para mostrar cursos
function addCursos() {
  const container = document.getElementById("cursosContainer");
  container.innerHTML = "";

  cursos.forEach(curso => {
    const card = document.createElement("div");
    card.className = "curso";
    card.innerHTML = `
      <div class="image-container">
        <img src="${curso.img}" alt="${curso.title}" />
        <span class="badge">20% OFF</span>
        <div class="overlay">
          <button class="btn-info">ℹ Más info</button>
        </div>
      </div>
      <h3>${curso.title}</h3>
      <p>${curso.description}</p>
      <button class="cta" onclick="redirectToWhatsApp('${curso.title}')">🔖 Me interesa</button>
    `;
    container.appendChild(card);
  });

  // Botón de info muestra descripción en alerta
  document.querySelectorAll(".btn-info").forEach(btn => {
    btn.addEventListener("click", e => {
      const card = e.currentTarget.closest(".curso");
      const title = card.querySelector("h3").textContent;
      const desc  = card.querySelector("p").textContent;
      alert(`${title}\n\n${desc}`);
    });
  });
}

// Función para mostrar mega packs
function addMegaPacks() {
  const container = document.getElementById("megaPacksContainer");
  container.innerHTML = "";

  megaPacks.forEach(pack => {
    const card = document.createElement("div");
    card.className = "mega-pack";
    card.innerHTML = `
      <div class="image-container">
        <img src="${pack.img}" alt="${pack.title}" />
      </div>
      <h3>${pack.title}</h3>
      <p>${pack.description}</p>
      <button class="cta" onclick="redirectToWhatsApp('${pack.title}')">🔖 Me interesa</button>
    `;
    container.appendChild(card);
  });
}

// Redirige a WhatsApp con mensaje de interés
function redirectToWhatsApp(item) {
  const phone = "5212321443592";
  const msg = `¡Hola! Me interesa el ${item}.`;
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

// Redirige a WhatsApp para comprar todo el catálogo
function redirectToWhatsAppCatalogo() {
  const phone = "5212321443592";
  const msg = "¡Hola! Quiero adquirir todo el catálogo de cursos.";
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

// Temporizador de cuenta regresiva + progreso circular
const promoEndDate   = new Date("2025-08-01T23:59:59");
const circle         = document.querySelector(".progress-ring__circle");
const radius         = circle?.r.baseVal.value || 0;
const circumference  = 2 * Math.PI * radius;

// Inicializa el círculo de progreso
if (circle) {
  circle.style.strokeDasharray  = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;
}

function setProgress(percent) {
  if (!circle) return;
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

function startCountdown() {
  const countdown = document.getElementById("countdown");
  const timerBox  = document.getElementById("promo-timer");

  const update = () => {
    const now  = Date.now();
    const diff = promoEndDate - now;

    if (diff <= 0) {
      countdown.textContent = "🎉 ¡La promo ha terminado!";
      timerBox.classList.add("promo-ended");
      setProgress(100);
      clearInterval(timerId);
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins  = Math.floor((diff / (1000 * 60)) % 60);
 

    countdown.textContent = `${days}d ${hours}h ${mins}m `;

    // Cálculo de porcentaje transcurrido desde 1 de julio
    const start   = new Date("2025-07-01T00:00:00").getTime();
    const total   = promoEndDate.getTime() - start;
    const elapsed = now - start;
    const pct     = Math.min((elapsed / total) * 100, 100);
    setProgress(pct);
  };

  update();
  const timerId = setInterval(update, 1000);
}

// Toggle de FAQs
function initFAQ() {
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const ans = q.nextElementSibling;
      ans.style.display = ans.style.display === "block" ? "none" : "block";
    });
  });
}

// Scroll suave al explorar cursos
document.getElementById("explorarCursosBtn")?.addEventListener("click", () => {
  document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" });
});

// Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  addCursos();
  addMegaPacks();
  startCountdown();
  initFAQ();
  document.getElementById("comprarTodoBtn")?.addEventListener("click", redirectToWhatsAppCatalogo);
});