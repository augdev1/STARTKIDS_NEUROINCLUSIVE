@echo off
title StartKids - Apresentacao
echo =========================================================
echo   INICIANDO O STARTKIDS - JOGOS EDUCATIVOS NEUROINCLUSIVOS
echo =========================================================
echo.
echo 1. Abrindo o jogo no seu navegador padrao...
start http://localhost:8085
echo.
echo 2. Iniciando servidor local (Node.js)...
echo    Pressione Ctrl+C para encerrar quando terminar a aula.
echo.
node server/server.js
pause
