@echo off
setlocal EnableExtensions
cd /d "%~dp0"

set "PORT=8000"
set "URL=http://127.0.0.1:%PORT%/index.html"

set "CHROME="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
) else if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
  set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
)
if not defined CHROME (
  echo Google Chrome not found under Program Files. Install Chrome or edit this script to set CHROME to chrome.exe.
  exit /b 1
)

where py >nul 2>&1
if errorlevel 1 (
  start "invisible-violence server" /MIN python bridge_server.py --host 0.0.0.0 --port %PORT%
) else (
  start "invisible-violence server" /MIN py -3 bridge_server.py --host 0.0.0.0 --port %PORT%
)

timeout /t 2 /nobreak >nul
start "" "%CHROME%" --kiosk --start-fullscreen "%URL%"

endlocal
exit /b 0
