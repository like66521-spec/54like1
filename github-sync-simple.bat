@echo off
chcp 65001 >nul
echo ========================================
echo 54Like平台 - GitHub同步脚本
echo ========================================
echo.

echo 步骤1: 检查Git配置...
git config --global user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo 请先配置Git用户信息:
    set /p USER_NAME="请输入您的姓名: "
    set /p USER_EMAIL="请输入您的邮箱: "
    git config --global user.name "%USER_NAME%"
    git config --global user.email "%USER_EMAIL%"
    echo Git用户信息已配置完成
    echo.
)

echo 步骤2: 添加文件到Git...
git add .

echo 步骤3: 创建提交...
git commit -m "Initial commit: 54Like platform"

echo 步骤4: 获取GitHub仓库URL...
set /p GITHUB_URL="请输入您的GitHub仓库URL: "

echo 步骤5: 添加远程仓库...
git remote add origin %GITHUB_URL%

echo 步骤6: 推送到GitHub...
git push -u origin main

echo.
echo ========================================
echo 同步完成！
echo ========================================
echo 您的代码已成功同步到GitHub
echo 仓库地址: %GITHUB_URL%
echo.

pause
