@echo off
echo ========================================
echo 54Like Platform - GitHub Sync Script
echo ========================================
echo.

echo Please make sure you have:
echo 1. Created a new repository on GitHub
echo 2. Configured Git user information
echo 3. Know your GitHub repository URL
echo.

set /p GITHUB_URL="Please enter your GitHub repository URL (e.g., https://github.com/username/repository.git): "

echo.
echo Starting sync to GitHub...

echo Step 1: Adding files to Git...
git add .

echo Step 2: Creating commit...
git commit -m "Initial commit: 54Like platform complete code"

echo Step 3: Adding remote repository...
git remote add origin %GITHUB_URL%

echo Step 4: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Sync completed!
echo ========================================
echo Your code has been successfully synced to GitHub
echo Repository URL: %GITHUB_URL%
echo.

pause
