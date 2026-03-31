# Chadha Canvas - Backend Startup Script (PowerShell)

Write-Host "Starting Chadha Canvas Backend Server..." -ForegroundColor Green
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "Found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Python is not installed or not in system PATH." -ForegroundColor Red
    Write-Host "Please install Python from https://www.python.org" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Navigate to backend directory
$backendPath = Join-Path $PSScriptRoot "backend"
Set-Location $backendPath

# Check if Flask is installed
try {
    python -c "import flask" 2>$null
} catch {
    Write-Host "Installing required packages..." -ForegroundColor Yellow
    python -m pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Failed to install dependencies." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host ""
Write-Host "Starting Flask server..." -ForegroundColor Green
Write-Host ""
Write-Host "The server will run on: http://127.0.0.1:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Open your browser and navigate to:" -ForegroundColor Yellow
Write-Host "  C:\Users\DELL\Desktop\chadha-canvas\frontend\index.html" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press CTRL+C to stop the server." -ForegroundColor Yellow
Write-Host ""

# Start the server
python app.py

Read-Host "Press Enter to exit"
