<?php
declare(strict_types=1);

$path = rawurldecode((string) (parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/'));
$root = realpath(__DIR__);

$legacyKey = strtolower((string) preg_replace('/[^a-z0-9.\-]/', '', iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', ltrim($path, '/')) ?: ltrim($path, '/')));
$legacyRoutes = [
    'urbanpets' => '/UrbanPets/',
    'borcelle-agency.html' => '/agencia-borcelle/',
    'encuesta.html' => '/encuesta/',
    'encuestadeconveniencia.html' => '/encuesta-conveniencia/',
    'i.html' => '/explorador-inteligencias/',
    'perrosvsgatos.html' => '/perros-vs-gatos/',
    'resultados.html' => '/resultados/',
    'tecnicas-de-asertividad.html' => '/tecnicas-de-asertividad/',
    'tecnicasdeasertividad.html' => '/tecnicas-de-asertividad/',
    'tipologias-inteligencias-multiples.html' => '/inteligencias-multiples/',
    'tipologiasdelasinteligenciasmultiples.html' => '/inteligencias-multiples/',
];

if (isset($legacyRoutes[$legacyKey])) {
    header('Location: ' . $legacyRoutes[$legacyKey], true, 308);
    return true;
}

if (str_starts_with($path, '/data/')) {
    http_response_code(403);
    header('Content-Type: application/json; charset=UTF-8');
    echo '{"status":"error","message":"Acceso denegado."}';
    return true;
}

if ($path === '/api.php' || $path === '/guardar.php' || $path === '/api/encuestas') {
    require __DIR__ . DIRECTORY_SEPARATOR . 'api.php';
    return true;
}

$requested = realpath(__DIR__ . DIRECTORY_SEPARATOR . ltrim($path, '/'));
if ($requested !== false && $root !== false && str_starts_with($requested, $root)) {
    if (is_file($requested)) {
        return false;
    }
    if (is_dir($requested)) {
        $index = $requested . DIRECTORY_SEPARATOR . 'index.html';
        if (is_file($index)) {
            if (!str_ends_with($path, '/')) {
                header('Location: ' . $path . '/', true, 308);
                return true;
            }
            return false;
        }
    }
}

http_response_code(404);
header('Content-Type: text/plain; charset=UTF-8');
echo 'Recurso no encontrado.';
return true;
