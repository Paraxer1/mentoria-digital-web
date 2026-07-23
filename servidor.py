#!/usr/bin/env python3
"""Servidor portable sin dependencias: archivos estáticos + API SQLite."""
from __future__ import annotations

import json
import mimetypes
import os
import re
import sqlite3
import sys
import threading
import unicodedata
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import quote, unquote, urlparse

ROOT = Path(__file__).resolve().parent
DB_DIR = ROOT / "data"
DB_PATH = DB_DIR / "encuestas.sqlite"
MAX_BODY = 16 * 1024
ALLOWED_PATHS = {
    "Web/PC/Si", "Web/PC/No",
    "Web/Internet/Buena", "Web/Internet/Regular", "Web/Internet/Mala",
    "Tel/SO/Windows", "Tel/SO/Linux", "Tel/SO/Mac",
    "Tel/Editor/VSCode", "Tel/Editor/IntelliJ", "Tel/Editor/Otros",
    "Kiosco/Materia/Buena", "Kiosco/Materia/Regular", "Kiosco/Materia/Mala",
    "Kiosco/Facilidad/Facil", "Kiosco/Facilidad/Media", "Kiosco/Facilidad/Dificil",
}
ID_PATTERN = re.compile(r"^[A-Za-z0-9_-]{8,80}$")

LEGACY_ROUTES = {
    "urbanpets": "/UrbanPets/",
    "borcelle-agency.html": "/agencia-borcelle/",
    "encuesta.html": "/encuesta/",
    "encuestadeconveniencia.html": "/encuesta-conveniencia/",
    "i.html": "/explorador-inteligencias/",
    "perrosvsgatos.html": "/perros-vs-gatos/",
    "resultados.html": "/resultados/",
    "tecnicas-de-asertividad.html": "/tecnicas-de-asertividad/",
    "tecnicasdeasertividad.html": "/tecnicas-de-asertividad/",
    "tipologias-inteligencias-multiples.html": "/inteligencias-multiples/",
    "tipologiasdelasinteligenciasmultiples.html": "/inteligencias-multiples/",
}

def route_key(path: str) -> str:
    value = unicodedata.normalize("NFKD", unquote(path)).encode("ascii", "ignore").decode("ascii")
    return value.lstrip("/").casefold()


def connect() -> sqlite3.Connection:
    DB_DIR.mkdir(parents=True, exist_ok=True)
    db = sqlite3.connect(DB_PATH, timeout=5)
    db.execute("PRAGMA journal_mode=WAL")
    db.execute("PRAGMA synchronous=NORMAL")
    db.execute("PRAGMA busy_timeout=5000")
    db.execute("CREATE TABLE IF NOT EXISTS conteos (ruta TEXT PRIMARY KEY, valor INTEGER NOT NULL DEFAULT 0 CHECK(valor >= 0))")
    db.execute("CREATE TABLE IF NOT EXISTS envios (id TEXT PRIMARY KEY, creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)")
    return db


def nested_data(db: sqlite3.Connection) -> dict:
    result: dict = {}
    for path, value in db.execute("SELECT ruta, valor FROM conteos ORDER BY ruta"):
        node = result
        parts = str(path).split("/")
        for part in parts[:-1]:
            node = node.setdefault(part, {})
        node[parts[-1]] = int(value)
    return result


class Handler(SimpleHTTPRequestHandler):
    server_version = "MentoriaLite/2.0"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt: str, *args) -> None:
        sys.stdout.write("[web] " + fmt % args + "\n")

    def send_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def is_api(self) -> bool:
        return urlparse(self.path).path in {"/api.php", "/guardar.php", "/api/encuestas"}

    def is_private_path(self) -> bool:
        return urlparse(self.path).path.startswith('/data/')

    def deny_private(self) -> None:
        self.send_json(403, {'status': 'error', 'message': 'Acceso denegado.'})


    def redirect_legacy(self) -> bool:
        target = LEGACY_ROUTES.get(route_key(urlparse(self.path).path))
        if not target:
            return False
        query = urlparse(self.path).query
        location = target + (("?" + query) if query else "")
        self.send_response(308)
        self.send_header("Location", quote(location, safe="/:?=&%"))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        return True

    def do_HEAD(self) -> None:
        if self.redirect_legacy():
            return
        if self.is_private_path():
            self.deny_private()
        elif self.is_api():
            self.handle_api_get()
        else:
            super().do_HEAD()

    def do_GET(self) -> None:
        if self.redirect_legacy():
            return
        if self.is_private_path():
            self.deny_private()
        elif self.is_api():
            self.handle_api_get()
        else:
            super().do_GET()

    def do_POST(self) -> None:
        if not self.is_api():
            self.send_json(404, {"status": "error", "message": "Ruta no encontrada."})
            return
        length = int(self.headers.get("Content-Length", "0") or 0)
        if length <= 0 or length > MAX_BODY:
            self.send_json(413 if length > MAX_BODY else 400, {"status": "error", "message": "Tamaño inválido."})
            return
        try:
            payload = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self.send_json(400, {"status": "error", "message": "JSON inválido."})
            return
        submission_id = str(payload.get("id", "")) if isinstance(payload, dict) else ""
        paths = payload.get("paths") if isinstance(payload, dict) else None
        if not ID_PATTERN.fullmatch(submission_id) or not isinstance(paths, list) or not 1 <= len(paths) <= 8:
            self.send_json(422, {"status": "error", "message": "Formato inválido."})
            return
        paths = list(dict.fromkeys(map(str, paths)))
        if any(path not in ALLOWED_PATHS for path in paths):
            self.send_json(422, {"status": "error", "message": "Opción no permitida."})
            return
        try:
            with connect() as db:
                db.execute("BEGIN IMMEDIATE")
                cursor = db.execute("INSERT OR IGNORE INTO envios (id) VALUES (?)", (submission_id,))
                duplicate = cursor.rowcount == 0
                if not duplicate:
                    db.executemany(
                        "INSERT INTO conteos (ruta, valor) VALUES (?, 1) ON CONFLICT(ruta) DO UPDATE SET valor = valor + 1",
                        ((path,) for path in paths),
                    )
                db.commit()
                data = nested_data(db)
            self.send_json(200, {"status": "success", "storage": "sqlite", "duplicate": duplicate, "data": data})
        except sqlite3.Error as error:
            self.send_json(503, {"status": "error", "message": f"SQLite no disponible: {error}"})

    def handle_api_get(self) -> None:
        try:
            with connect() as db:
                data = nested_data(db)
            self.send_json(200, {"status": "success", "storage": "sqlite", "data": data})
        except sqlite3.Error as error:
            self.send_json(503, {"status": "error", "message": f"SQLite no disponible: {error}"})

    def end_headers(self) -> None:
        path = urlparse(self.path).path.lower()
        if path.endswith(('.html', '.php', '.css', '.js', '/')) or path == '/':
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        elif path.endswith(('.webp', '.jpg', '.jpeg', '.png', '.svg', '.ico', '.exe', '.zip', '.gz')):
            self.send_header('Cache-Control', 'public, max-age=604800, immutable')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()


def main() -> None:
    os.chdir(ROOT)
    mimetypes.add_type('application/manifest+json', '.webmanifest')
    port = int(os.environ.get('PORT', '8000'))
    server = ThreadingHTTPServer(('127.0.0.1', port), Handler)
    url = f'http://127.0.0.1:{port}/'
    print(f'Mentoría Digital Lite: {url}')
    print('SQLite:', DB_PATH)
    threading.Timer(0.5, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServidor detenido.')
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
