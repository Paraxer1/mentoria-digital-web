// Cursos con sus imágenes y descripciones (URLs externas)
const cursos = [
    { title: "Gastronomía Completa", img: "multimedia/Gastronomia.jpg", description: "Aprende los secretos culinarios." },
    { title: "Desarrollo Web & apps", img: "multimedia/Desarrollo_apps.jpg", description: "Crea sitios web desde cero." },
    { title: "Marketing Digital 360°", img: "multimedia/Marcketing.jpg", description: "Domina el marketing online." },
    { title: "Tech Digital", img: "multimedia/Tech_total.jpg", description: "Curso avanzado sobre tecnología e innovación." },
    { title: "Cocina Internacional", img: "https://www.example.com/cocina-internacional.jpg", description: "Aprende a cocinar platillos internacionales." },
    { title: "Multimedia y diseño", img: "multimedia/Multimedia_diseño.jpg", description: "Domina las herramientas de diseño gráfico." },
    { title: "Ciberseguridad & Hacking", img: "multimedia/Hacking.jpg", description: "Domina habilidades de hacking y ciberseguridad." },
    { title: "Fotografía Profesional", img: "https://www.example.com/fotografia.jpg", description: "Aprende los fundamentos de la fotografía profesional." },
    { title: "Desarrollo de Aplicaciones Móviles", img: "https://www.example.com/app-movil.jpg", description: "Desarrolla aplicaciones para dispositivos móviles." },
    { title: "Gestión de Proyectos", img: "https://www.example.com/gestion-proyectos.jpg", description: "Aprende a gestionar proyectos de manera eficiente." },
    { title: "Desarrollo personal & Mentalidad", img: "multimedia/Desarrollo_personal.jpg", description: "Cursos para mejorar tu bienestar personal." },
    { title: "Idiomas & Finanzas", img: "multimedia/Idiomas.jpg", description: "Aprende nuevos idiomas con nuestra metodología." }
];

// Mega Packs (ofertas de descuento)
const megaPacks = [
    { title: "Pack 1: Tecnología + Web + IA", img: "https://www.example.com/mega1.jpg", description: "Todo lo que necesitas para ser un experto en tecnología." },
    { title: "Pack 2: Gastronomía + Cocina Avanzada", img: "https://www.example.com/mega2.jpg", description: "Masterchef en casa." },
    { title: "Pack 3: Marketing Digital + Diseño Gráfico", img: "https://www.example.com/mega3.jpg", description: "Domina las herramientas del marketing y diseño." },
    { title: "Pack 4: Programación + Desarrollo de Apps", img: "https://www.example.com/mega4.jpg", description: "Aprende a programar y desarrollar aplicaciones." }
];

// Función para agregar los cursos dinámicamente
const addCursos = () => {
    const container = document.getElementById('cursosContainer');
    cursos.forEach(curso => {
        const cursoDiv = document.createElement('div');
        cursoDiv.classList.add('curso');
        cursoDiv.innerHTML = `
            <img src="${curso.img}" alt="${curso.title}">
            <h3>${curso.title}</h3>
            <p>${curso.description}</p>
            <button class="cta" onclick="redirectToWhatsApp('${curso.title}')">Me interesa</button>
        `;
        container.appendChild(cursoDiv);
    });
};

// Función para agregar los mega packs dinámicamente
const addMegaPacks = () => {
    const container = document.getElementById('megaPacksContainer');
    megaPacks.forEach(pack => {
        const packDiv = document.createElement('div');
        packDiv.classList.add('mega-pack');
        packDiv.innerHTML = `
            <img src="${pack.img}" alt="${pack.title}">
            <h3>${pack.title}</h3>
            <p>${pack.description}</p>
            <button class="cta" onclick="redirectToWhatsApp('${pack.title}')">Me interesa</button>
        `;
        container.appendChild(packDiv);
    });
};

// Redirigir al WhatsApp con el mensaje de interés
const redirectToWhatsApp = (curso) => {
    const message = `Me interesa el curso de ${curso}!`;
    const phone = "1234567890"; // Aquí va tu número de WhatsApp
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
};

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    addCursos();
    addMegaPacks();
});