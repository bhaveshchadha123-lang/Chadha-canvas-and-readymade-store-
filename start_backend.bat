@echo off
echo Starting Chadha Canvas Backend Server...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in system PATH.
    echo Please install Python from https://www.python.org
    pause
    exit /b 1
)

REM Navigate to backend directory
cd /d "%~dp0backend"

REM Check if requirements are installed
python -c "import flask" >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing required packages...
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies.
        pause
        exit /b 1
    )
)

echo.
echo Starting Flask server...
echo.
echo The server will run on: http://127.0.0.1:5000
echo.
echo Open your browser and navigate to:
echo   C:\Users\DELL\Desktop\chadha-canvas\frontend\index.html
echo.
echo Press CTRL+C to stop the server.
echo.

REM Start the server
python app.py

pause
