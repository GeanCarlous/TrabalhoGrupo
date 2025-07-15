@echo off
echo Iniciando backend...
start "Backend" cmd /k "cd /d backend && npm run dev"

echo Aguardando 3 segundos...
timeout /t 3 /nobreak > nul

echo Iniciando frontend...
start "Frontend" cmd /k "npm start"

echo Aplicação iniciada!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
