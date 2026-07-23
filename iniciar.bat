@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 servidor.py
  goto :end
)
where python >nul 2>nul
if %errorlevel%==0 (
  python servidor.py
  goto :end
)
where php >nul 2>nul
if %errorlevel%==0 (
  start "" http://127.0.0.1:8000/
  php -S 127.0.0.1:8000 router.php
  goto :end
)
echo No se encontro Python ni PHP. Se abrira el sitio en modo local sin base compartida.
start "" index.html
:end
pause
