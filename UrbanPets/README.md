# Urban Pets 1.0 — sitio web renovado

Landing page interactiva para presentar y descargar Urban Pets 1.0.

## Cómo abrirla

1. Abre `index.html` en un navegador moderno.
2. Para publicarla, sube la carpeta completa respetando la estructura de `assets/`.
3. Los botones de descarga conservan los enlaces oficiales de GitHub Releases de la versión 1.0.0.

## Tecnologías visuales

- HTML5 semántico.
- CSS moderno y diseño adaptable.
- JavaScript sin dependencias obligatorias.
- GSAP + ScrollTrigger + SplitText para animaciones avanzadas cuando el CDN está disponible.
- Lenis para desplazamiento suave.
- Swiper para el carrusel de funciones.

La página incluye una alternativa funcional cuando alguna librería externa no carga: el contenido permanece visible, el carrusel se convierte en desplazamiento horizontal y todas las interacciones esenciales continúan operando.

## Funciones de la página

- Precargador animado.
- Hero con demostración navegable de cinco módulos.
- Cambio automático y manual de pantallas de muestra.
- Recorrido animado del flujo operativo.
- Carrusel de ocho funciones.
- Modo claro y oscuro con preferencia guardada.
- Detección orientativa de Windows o Linux.
- Pestañas accesibles de instalación y desinstalación.
- Copia de comandos al portapapeles.
- FAQ, progreso de lectura, botón para volver arriba y barra móvil de descarga.
- Animaciones 3D, parallax, magnetismo, cursor contextual y microinteracciones.
- Compatibilidad con `prefers-reduced-motion`.

## Estructura

```text
UrbanPets/
├── index.html
├── README.md
├── MEJORAS-APLICADAS.md
├── VERIFICACION-URBANPETS-1.0.txt
├── archivos-descarga/
└── assets/
    ├── css/styles.css
    ├── img/
    └── js/app.js
```

## Nota de alcance

Urban Pets 1.0 se presenta como una aplicación local para una computadora por instalación. La página no promete sincronización por red, nube, aplicación web o aplicación móvil.
