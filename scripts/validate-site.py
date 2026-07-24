#!/usr/bin/env python3
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
IGNORE_SCHEMES = {"http", "https", "mailto", "tel", "data", "javascript", "blob"}
ATTRS = {"href", "src", "action", "poster"}
BINARY_SUFFIXES = {".exe", ".deb", ".msi", ".appimage"}


class RefParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.refs: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if name.lower() in ATTRS and value:
                self.refs.append((name.lower(), value.strip()))


def local_target(source: Path, raw: str) -> tuple[Path | None, str | None]:
    if not raw or raw.startswith("#") or raw.startswith("//"):
        return None, None
    parsed = urlsplit(raw)
    if parsed.scheme.lower() in IGNORE_SCHEMES:
        return None, None
    path_text = unquote(parsed.path)
    if not path_text:
        return None, None
    if path_text.startswith("/"):
        return None, "ruta absoluta"
    target = (source.parent / path_text).resolve()
    try:
        target.relative_to(ROOT)
    except ValueError:
        return None, "ruta fuera del repositorio"
    return target, None


def exists_as_web_target(target: Path, raw: str) -> bool:
    if target.is_file():
        return True
    if target.is_dir() and (target / "index.html").is_file():
        return True
    if raw.split("?", 1)[0].split("#", 1)[0].endswith("/"):
        return (target / "index.html").is_file()
    return False


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    required = [ROOT / "index.html", ROOT / "UrbanPets" / "index.html", ROOT / ".github" / "workflows" / "pages.yml"]
    for path in required:
        if not path.is_file():
            errors.append(f"Falta archivo obligatorio: {path.relative_to(ROOT)}")

    nested_names = {"mentoria-digital-web", "mentoria-digital"}
    for name in nested_names:
        nested = ROOT / name
        if (nested / "index.html").is_file():
            errors.append(f"Carpeta raíz duplicada detectada: {name}/index.html")

    for path in ROOT.rglob("*"):
        if path.is_file() and path.suffix.lower() in BINARY_SUFFIXES:
            errors.append(f"Instalador dentro del repositorio web: {path.relative_to(ROOT)}")

    for html in sorted(ROOT.rglob("*.html")):
        parser = RefParser()
        try:
            parser.feed(html.read_text(encoding="utf-8", errors="replace"))
        except Exception as exc:
            errors.append(f"No se pudo analizar {html.relative_to(ROOT)}: {exc}")
            continue
        for attr, raw in parser.refs:
            target, problem = local_target(html, raw)
            if problem == "ruta absoluta":
                errors.append(f"{html.relative_to(ROOT)}: {attr}=\"{raw}\" usa una ruta absoluta y puede fallar en GitHub Pages")
                continue
            if problem:
                errors.append(f"{html.relative_to(ROOT)}: {attr}=\"{raw}\": {problem}")
                continue
            if target is not None and not exists_as_web_target(target, raw):
                errors.append(f"{html.relative_to(ROOT)}: enlace roto {attr}=\"{raw}\"")

    css_url = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)", re.IGNORECASE)
    for css in sorted(ROOT.rglob("*.css")):
        text = css.read_text(encoding="utf-8", errors="replace")
        for match in css_url.finditer(text):
            raw = match.group(2).strip()
            target, problem = local_target(css, raw)
            if problem == "ruta absoluta":
                errors.append(f"{css.relative_to(ROOT)}: url({raw}) usa una ruta absoluta")
            elif problem:
                errors.append(f"{css.relative_to(ROOT)}: url({raw}): {problem}")
            elif target is not None and not exists_as_web_target(target, raw):
                errors.append(f"{css.relative_to(ROOT)}: recurso CSS inexistente url({raw})")

    if errors:
        print("VALIDACIÓN FALLIDA")
        for item in errors:
            print(f"ERROR: {item}")
        for item in warnings:
            print(f"AVISO: {item}")
        return 1

    print("VALIDACIÓN CORRECTA")
    print("- La raíz contiene index.html y UrbanPets/index.html.")
    print("- No hay carpetas raíz duplicadas.")
    print("- No hay instaladores dentro del repositorio web.")
    print("- Las rutas HTML y CSS locales existen y son relativas.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
