@echo off
cd /d "%~dp0"
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri http://127.0.0.1:4174/manifest.json -UseBasicParsing).StatusCode } catch { Write-Host 'offline'; exit 1 }"
