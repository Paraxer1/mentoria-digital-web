#!/usr/bin/env sh
cd "$(dirname "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then
  exec python3 servidor.py
elif command -v python >/dev/null 2>&1; then
  exec python servidor.py
elif command -v php >/dev/null 2>&1; then
  (command -v xdg-open >/dev/null 2>&1 && xdg-open http://127.0.0.1:8000/ >/dev/null 2>&1 &) || true
  exec php -S 127.0.0.1:8000 router.php
else
  echo "No se encontró Python ni PHP. Abra index.html; las encuestas usarán almacenamiento local."
fi
