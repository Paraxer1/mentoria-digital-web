# Mejoras aplicadas a la experiencia web de Urban Pets

**Fecha:** 31 de julio de 2026  
**Resultado:** rediseño visual y funcional completo de la landing page.

## Diseño y contenido

- Nueva dirección visual premium en verde, menta y ámbar, coherente con la identidad de Urban Pets.
- Mensaje principal más directo: “Menos caos. Más tiempo para cuidar.”
- Jerarquía tipográfica, espacios, contraste y ritmo visual reconstruidos.
- Contenido reorganizado como una historia: problema, flujo, funciones, alcance, versión, descarga, instalación y dudas.
- Alcance real de la versión 1.0 explicado sin promesas de red, nube o multiestación.
- Imágenes de Windows y Linux optimizadas a WebP para reducir considerablemente el peso del sitio.

## Interactividad y animaciones

- Precargador animado.
- Intro escalonada del hero.
- Palabras rotatorias y fondos ambientales.
- Demo interactiva con cinco pantallas: inicio, mascotas, salud, adopciones y respaldos.
- Contadores animados y cambio automático de módulos con pausa al interactuar.
- Recorrido de cinco etapas con panel visual que cambia al desplazarse.
- Carrusel de ocho módulos.
- Parallax, tarjetas flotantes, inclinación 3D, botones magnéticos y cursor contextual.
- Diagrama local animado, indicadores de progreso y microinteracciones.
- Modo oscuro animado y guardado en el navegador.

## Experiencia de uso

- Navegación fija con sección activa y ocultamiento inteligente al bajar.
- Menú móvil accesible.
- Desplazamiento suave con Lenis y alternativa nativa.
- Recomendación automática según Windows o Linux.
- Pestañas de instalación con navegación por teclado.
- Botones para copiar comandos y avisos tipo toast.
- FAQ ordenada, botón para volver arriba y CTA fijo en móvil.
- Diseño adaptable desde 390 px hasta pantallas amplias.

## Robustez y accesibilidad

- Todo el contenido permanece disponible cuando las librerías CDN no cargan.
- El carrusel cuenta con alternativa horizontal sin Swiper.
- Respeto a `prefers-reduced-motion`.
- Etiquetas ARIA, estados de botones, navegación por teclado y enlace para saltar al contenido.
- Sin IDs duplicados, sin referencias locales rotas y sin desbordamiento horizontal en las pruebas de escritorio y móvil.
- JavaScript validado sintácticamente y probado sin errores de ejecución en el modo alternativo.
