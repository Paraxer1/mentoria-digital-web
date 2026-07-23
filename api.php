<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const MAX_BODY_BYTES = 16384;
const ALLOWED_PATHS = [
    'Web/PC/Si', 'Web/PC/No',
    'Web/Internet/Buena', 'Web/Internet/Regular', 'Web/Internet/Mala',
    'Tel/SO/Windows', 'Tel/SO/Linux', 'Tel/SO/Mac',
    'Tel/Editor/VSCode', 'Tel/Editor/IntelliJ', 'Tel/Editor/Otros',
    'Kiosco/Materia/Buena', 'Kiosco/Materia/Regular', 'Kiosco/Materia/Mala',
    'Kiosco/Facilidad/Facil', 'Kiosco/Facilidad/Media', 'Kiosco/Facilidad/Dificil',
];

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function dataDirectory(): string
{
    $directory = __DIR__ . DIRECTORY_SEPARATOR . 'data';
    if (!is_dir($directory) && !mkdir($directory, 0775, true) && !is_dir($directory)) {
        throw new RuntimeException('No se pudo crear la carpeta de datos.');
    }
    return $directory;
}

function nestedData(array $counts): array
{
    ksort($counts);
    $result = [];
    foreach ($counts as $path => $value) {
        $parts = explode('/', (string) $path);
        $cursor =& $result;
        foreach (array_slice($parts, 0, -1) as $part) {
            if (!isset($cursor[$part]) || !is_array($cursor[$part])) {
                $cursor[$part] = [];
            }
            $cursor =& $cursor[$part];
        }
        $cursor[$parts[array_key_last($parts)]] = max(0, (int) $value);
        unset($cursor);
    }
    return $result;
}

function validateSubmission(): array
{
    $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($contentLength > MAX_BODY_BYTES) {
        respond(413, ['status' => 'error', 'message' => 'Solicitud demasiado grande.']);
    }
    $raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
    if (!is_string($raw) || $raw === '' || strlen($raw) > MAX_BODY_BYTES) {
        respond(400, ['status' => 'error', 'message' => 'No llegaron datos válidos.']);
    }
    try {
        $payload = json_decode($raw, true, 16, JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        respond(400, ['status' => 'error', 'message' => 'JSON inválido.']);
    }
    $id = (string) ($payload['id'] ?? '');
    $paths = $payload['paths'] ?? null;
    if (!preg_match('/^[A-Za-z0-9_-]{8,80}$/', $id) || !is_array($paths) || $paths === [] || count($paths) > 8) {
        respond(422, ['status' => 'error', 'message' => 'Formato de respuesta inválido.']);
    }
    $paths = array_values(array_unique(array_map('strval', $paths)));
    foreach ($paths as $path) {
        if (!in_array($path, ALLOWED_PATHS, true)) {
            respond(422, ['status' => 'error', 'message' => 'La respuesta contiene una opción no permitida.']);
        }
    }
    return [$id, $paths];
}

function openSqlite(): PDO
{
    if (!extension_loaded('pdo_sqlite')) {
        throw new RuntimeException('PDO SQLite no está habilitado.');
    }
    $pdo = new PDO('sqlite:' . dataDirectory() . DIRECTORY_SEPARATOR . 'encuestas.sqlite', null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 5,
    ]);
    $pdo->exec('PRAGMA journal_mode=WAL');
    $pdo->exec('PRAGMA synchronous=NORMAL');
    $pdo->exec('PRAGMA busy_timeout=5000');
    $pdo->exec('CREATE TABLE IF NOT EXISTS conteos (ruta TEXT PRIMARY KEY, valor INTEGER NOT NULL DEFAULT 0 CHECK(valor >= 0))');
    $pdo->exec('CREATE TABLE IF NOT EXISTS envios (id TEXT PRIMARY KEY, creado_en TEXT NOT NULL)');
    return $pdo;
}

function sqliteCounts(PDO $pdo): array
{
    $counts = [];
    foreach ($pdo->query('SELECT ruta, valor FROM conteos ORDER BY ruta') as $row) {
        $counts[(string) $row['ruta']] = (int) $row['valor'];
    }
    return $counts;
}

function sqliteSubmit(PDO $pdo, string $id, array $paths): array
{
    $pdo->exec('BEGIN IMMEDIATE TRANSACTION');
    try {
        $insert = $pdo->prepare('INSERT OR IGNORE INTO envios (id, creado_en) VALUES (:id, :created)');
        $insert->execute([':id' => $id, ':created' => gmdate('c')]);
        $duplicate = $insert->rowCount() === 0;
        if (!$duplicate) {
            $increment = $pdo->prepare('INSERT INTO conteos (ruta, valor) VALUES (:path, 1) ON CONFLICT(ruta) DO UPDATE SET valor = valor + 1');
            foreach ($paths as $path) {
                $increment->execute([':path' => $path]);
            }
        }
        $pdo->commit();
        return [$duplicate, sqliteCounts($pdo)];
    } catch (Throwable $error) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $error;
    }
}

function readJsonState($handle): array
{
    rewind($handle);
    $raw = stream_get_contents($handle);
    if (!is_string($raw) || trim($raw) === '') {
        return ['counts' => [], 'submissions' => []];
    }
    try {
        $state = json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        return ['counts' => [], 'submissions' => []];
    }
    return [
        'counts' => is_array($state['counts'] ?? null) ? $state['counts'] : [],
        'submissions' => is_array($state['submissions'] ?? null) ? $state['submissions'] : [],
    ];
}

function jsonRead(): array
{
    $file = dataDirectory() . DIRECTORY_SEPARATOR . 'encuestas.json';
    $handle = fopen($file, 'c+b');
    if ($handle === false) {
        throw new RuntimeException('No se pudo abrir el respaldo JSON.');
    }
    try {
        if (!flock($handle, LOCK_SH)) {
            throw new RuntimeException('No se pudo bloquear el respaldo JSON.');
        }
        $state = readJsonState($handle);
        flock($handle, LOCK_UN);
        fclose($handle);
        return $state['counts'];
    } catch (Throwable $error) {
        flock($handle, LOCK_UN);
        fclose($handle);
        throw $error;
    }
}

function jsonSubmit(string $id, array $paths): array
{
    $file = dataDirectory() . DIRECTORY_SEPARATOR . 'encuestas.json';
    $handle = fopen($file, 'c+b');
    if ($handle === false) {
        throw new RuntimeException('No se pudo abrir el respaldo JSON.');
    }
    try {
        if (!flock($handle, LOCK_EX)) {
            throw new RuntimeException('No se pudo bloquear el respaldo JSON.');
        }
        $state = readJsonState($handle);
        $duplicate = isset($state['submissions'][$id]);
        if (!$duplicate) {
            $state['submissions'][$id] = gmdate('c');
            foreach ($paths as $path) {
                $state['counts'][$path] = max(0, (int) ($state['counts'][$path] ?? 0)) + 1;
            }
            if (count($state['submissions']) > 10000) {
                $state['submissions'] = array_slice($state['submissions'], -8000, null, true);
            }
        }
        $encoded = json_encode($state, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
        rewind($handle);
        if (!ftruncate($handle, 0) || fwrite($handle, $encoded) === false || !fflush($handle)) {
            throw new RuntimeException('No se pudo escribir el respaldo JSON.');
        }
        flock($handle, LOCK_UN);
        fclose($handle);
        return [$duplicate, $state['counts']];
    } catch (Throwable $error) {
        flock($handle, LOCK_UN);
        fclose($handle);
        throw $error;
    }
}

function selectStorage(): array
{
    try {
        return ['sqlite', openSqlite()];
    } catch (Throwable $error) {
        error_log('[api.php] SQLite no disponible; se usa JSON: ' . $error->getMessage());
        return ['json-fallback', null];
    }
}

try {
    $method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
    if (!in_array($method, ['GET', 'HEAD', 'POST'], true)) {
        header('Allow: GET, HEAD, POST');
        respond(405, ['status' => 'error', 'message' => 'Método no permitido.']);
    }
    [$storage, $pdo] = selectStorage();

    if ($method === 'GET' || $method === 'HEAD') {
        $counts = $storage === 'sqlite' ? sqliteCounts($pdo) : jsonRead();
        respond(200, ['status' => 'success', 'storage' => $storage, 'data' => nestedData($counts)]);
    }

    [$id, $paths] = validateSubmission();
    [$duplicate, $counts] = $storage === 'sqlite'
        ? sqliteSubmit($pdo, $id, $paths)
        : jsonSubmit($id, $paths);
    respond(200, [
        'status' => 'success',
        'storage' => $storage,
        'duplicate' => $duplicate,
        'data' => nestedData($counts),
    ]);
} catch (Throwable $error) {
    error_log('[api.php] ' . $error->getMessage());
    respond(503, ['status' => 'error', 'message' => 'El almacenamiento local no está disponible.']);
}
