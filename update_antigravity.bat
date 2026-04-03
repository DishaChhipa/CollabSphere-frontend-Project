@echo off
echo ==================================================
echo Antigravity Update Script
echo ==================================================
echo.
echo Please CLOSE your IDE (VS Code or Cursor) NOW.
echo This script will wait 10 seconds for you to do so...
timeout /t 10 /nobreak
echo.
echo Closing any remaining Antigravity processes...
taskkill /F /IM Antigravity.exe /T 2>nul
echo.
echo Running winget update for Google.Antigravity (Version 1.20.5)...
winget install --id Google.Antigravity --version 1.20.5 --force
echo.
echo Update complete! You can now restart your IDE.
pause
