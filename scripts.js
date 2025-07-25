// Cursos con sus imágenes y descripciones (URLs externas)
const cursos = [
    { title: "Gastronomía Completa", img: "multimedia/Gastronomia.jpg", description: "Aprende los secretos culinarios." },
    { title: "Desarrollo Web & apps", img: "multimedia/Desarrollo_apps.jpg", description: "Crea sitios web desde cero." },
    { title: "Marketing Digital 360°", img: "multimedia/Marcketing.jpg", description: "Domina el marketing online." },
    { title: "Tech Digital", img: "multimedia/Tech_total.jpg", description: "Curso avanzado sobre tecnología e innovación." },
    { title: "Libreria Digital", img: "multimedia/Biblioteca.jpg", description: "Accede a la coleccion mas completa de libros y audio libros." },
    { title: "Multimedia y diseño", img: "multimedia/Multimedia_diseño.jpg", description: "Domina las herramientas de diseño gráfico." },
    { title: "Ciberseguridad & Hacking", img: "multimedia/Hacking.jpg", description: "Domina habilidades de hacking y ciberseguridad." },
    { title: "Educación academica", img: "multimedia/Educacion_academica.jpg", description: "Refuerza tus conocimientos con el contenido mas completo para todos los niveles de estudio." },
    { title: "Psicología & Neurociencia", img: "multimedia/Psicologia.jpg", description: "Explora la mente humana con cursos personalizados." },
    { title: "Habilidades & Manualidades Pro", img: "multimedia/Manualidades.jpg", description: "Desarrolla proyectos y emprende con habilidades practicas." },
    { title: "Desarrollo personal & Mentalidad", img: "multimedia/Desarrollo_personal.jpg", description: "Cursos para mejorar tu bienestar personal." },
    { title: "Idiomas & Finanzas", img: "multimedia/Idiomas.jpg", description: "Aprende nuevos idiomas con nuestra metodología." }
];

// Mega Packs (ofertas de descuento)
const megaPacks = [
    { title: "Mega Pack tecnologico", img: "multimedia/Tecnologico.jpg", description: "Todo lo que necesitas para ser un experto en tecnología." },
    { title: "Mega Pack Mentalidad & crecimiento", img: "multimedia/Mentalidad.jpg", description: "Potencia tu mente y liderazgo." },
    { title: "Mega Pack Creativo & Diseño Gráfico", img: "multimedia/Creativo.jpg", description: "Despierta tu lado creativo y despierta tu lado emprendedor." },
    { title: "Mega Pack Educativo Pro", img: "multimedia/Educativo.jpg", description: "Es excelente para los estudiantes de todos los niveles o autodidactas." }
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
    const phone = "+5212321443592"; // Aquí va tu número de WhatsApp
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
};

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    addCursos();
    addMegaPacks();
});