# Mentoría Digital Web — arquitectura por rutas limpias

Sitio académico portable, sin Firebase ni dependencias CDN. La portada conserva su diseño y las páginas internas se organizaron por módulos con rutas legibles, recursos compartidos y almacenamiento local/SQLite.

## Inicio rápido

- **Windows:** ejecute `iniciar.bat`.
- **Linux/macOS:** ejecute `./iniciar.sh`.
- También puede usar `python3 servidor.py`.

La dirección local predeterminada es:

```text
http://127.0.0.1:8000/
```

## Rutas limpias

Las páginas reales viven en carpetas con un `index.html`. Por eso el navegador muestra direcciones como:

```text
/perros-vs-gatos/
/inteligencias-multiples/
/tecnicas-de-asertividad/
/agencia-borcelle/
/encuesta/
/encuesta-conveniencia/
/resultados/
/explorador-inteligencias/
```

Los archivos antiguos terminados en `.html` se conservan únicamente como redirecciones de compatibilidad. Los enlaces internos ya no los utilizan.

## Organización

- Cada ruta pública tiene su propia carpeta e `index.html`.
- `assets/css/core.css`: base, accesibilidad y navegación común.
- `assets/css/refinement.css`: refinamientos compartidos y adaptación responsiva.
- `assets/css/pages/`: identidad visual específica de cada proyecto.
- `assets/js/core.js`: utilidades comunes, navegación, accesibilidad y carga visual.
- `assets/js/data.js`: conexión con la API, cola local e idempotencia.
- `assets/js/charts.js`: gráficas Canvas sin librerías externas.
- `assets/js/pages/`: comportamiento específico de cada página.
- `servidor.py`: servidor portable con SQLite y soporte para rutas limpias.
- `router.php`: rutas limpias y API para el servidor integrado de PHP.
- `.htaccess`: redirecciones y cabeceras para Apache.

Esta separación evita duplicar CSS y JavaScript dentro de cada carpeta: las páginas están separadas, mientras los recursos reutilizables permanecen centralizados.

## Encuestas y almacenamiento

1. El servidor Python utiliza `data/encuestas.sqlite`.
2. En PHP, `api.php` intenta usar PDO SQLite.
3. Cuando el alojamiento PHP no tiene SQLite, utiliza `data/encuestas.json` con bloqueo de archivo.
4. Si la API no responde, el navegador conserva temporalmente los envíos y los sincroniza después.
5. Cada envío tiene un identificador único para evitar duplicados durante reintentos.

La carpeta `data/` está protegida contra acceso directo. Los archivos se crean cuando la API se utiliza.

## Publicación

### Hosting PHP o cPanel

Suba todo el contenido manteniendo las carpetas. Compruebe que PHP tenga permiso de escritura sobre `data/`. En Apache, `.htaccess` activa las redirecciones antiguas y mantiene las rutas limpias.

Para probar localmente con PHP:

```bash
php -S 127.0.0.1:8000 router.php
```

### Servidor Python

```bash
python3 servidor.py
```

### Hosting únicamente estático

Las carpetas con `index.html` permiten las rutas limpias en la mayoría de los servicios estáticos. Las encuestas, sin embargo, no pueden compartir resultados entre dispositivos sin PHP o Python; en ese caso quedan guardadas en cada navegador.

## Rendimiento y diseño

- No se cargan Firebase, Chart.js, AOS, Font Awesome, Google Fonts ni otros CDN.
- Las imágenes están en WebP.
- El proyecto no incluye archivos, reproductores ni controles de video.
- Las animaciones usan principalmente `opacity` y `transform`.
- Se respeta `prefers-reduced-motion`.
- Se retiraron rutas frágiles con acentos y nombres inconsistentes.
- La portada `index.html` conserva su diseño; las páginas internas tienen mejores proporciones, navegación compartida y adaptación móvil.

## Publicación en GitHub Pages y Urban Pets

La raíz del repositorio debe contener directamente `index.html`, `.github/`, `assets/` y `UrbanPets/`. No coloque otra carpeta `mentoria-digital-web/` dentro de ella.

Los instaladores de Urban Pets se publican en GitHub Releases con la etiqueta `urbanpets-v1.0.0`; no se guardan en el repositorio ni mediante Git LFS. Antes de hacer `push`, ejecute:

```bash
python3 scripts/validate-site.py
```

La tarjeta de la portada enlaza mediante la ruta relativa `UrbanPets/`, compatible con un dominio personalizado y con GitHub Pages alojado bajo el nombre del repositorio.
