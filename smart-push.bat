@echo off
chcp 65001 >nul
echo 🚀 智能自动推送脚本
echo ====================
echo.

REM 设置Git环境变量，完全避免交互式提示
set GIT_TERMINAL_PROMPT=0
set GIT_MERGE_AUTOEDIT=no
set GIT_ASKPASS=echo

echo 📋 检查Git状态...
git status --porcelain > temp_status.txt
if %errorlevel% neq 0 (
    echo ❌ Git状态检查失败
    goto :error
)

REM 检查是否有未提交的更改
for /f %%i in (temp_status.txt) do (
    echo 📝 发现未提交的更改，正在处理...
    goto :commit
)

echo ✅ 工作目录干净，无需提交
goto :push

:commit
echo.
echo 📦 添加所有更改...
git add . --quiet

echo 💾 提交更改...
git commit -m "Auto commit: %date% %time%" --quiet
if %errorlevel% neq 0 (
    echo ❌ 提交失败
    goto :error
)

echo ✅ 更改已提交

:push
echo.
echo 🚀 推送到GitHub...
git push origin main --quiet
if %errorlevel% equ 0 (
    echo ✅ 代码已成功推送到GitHub！
    echo.
    echo 📋 最新提交：
    git log --oneline -1
    echo.
    echo 🎉 Vercel将自动重新部署...
    echo.
    echo 🌐 项目链接：https://54like1.vercel.app
) else (
    echo ❌ 推送失败，可能的原因：
    echo    - 网络连接问题
    echo    - GitHub权限问题
    echo    - 需要先拉取远程更改
    echo.
    echo 🔄 尝试拉取远程更改...
    git pull origin main --quiet
    if %errorlevel% equ 0 (
        echo ✅ 拉取成功，重新推送...
        git push origin main --quiet
        if %errorlevel% equ 0 (
            echo ✅ 推送成功！
        ) else (
            echo ❌ 推送仍然失败
        )
    ) else (
        echo ❌ 拉取也失败了
    )
)

:cleanup
del temp_status.txt 2>nul
echo.
echo 按任意键退出...
pause >nul
exit /b 0

:error
echo.
echo ❌ 操作失败，请检查Git配置
pause
exit /b 1
