@echo off
echo ========================================
echo 54Like平台 - GitHub同步脚本
echo ========================================

echo.
echo 请确保您已经：
echo 1. 在GitHub上创建了新仓库
echo 2. 配置了Git用户信息
echo 3. 知道您的GitHub仓库URL
echo.

set /p GITHUB_URL="请输入您的GitHub仓库URL (例如: https://github.com/用户名/仓库名.git): "

echo.
echo 开始同步到GitHub...

echo 1. 添加文件到Git...
git add .

echo 2. 创建提交...
git commit -m "Initial commit: 54Like平台完整代码

- 基于Next.js 15的现代化内容管理平台
- 完整的用户认证和权限系统
- 文章管理和分类功能
- 支付系统集成（支付宝、微信）
- 管理员后台管理
- 数据备份功能
- 响应式UI设计
- 完整的TypeScript支持"

echo 3. 添加远程仓库...
git remote add origin %GITHUB_URL%

echo 4. 推送到GitHub...
git push -u origin main

echo.
echo ========================================
echo 同步完成！
echo ========================================
echo 您的代码已成功同步到GitHub
echo 仓库地址: %GITHUB_URL%
echo.

pause
