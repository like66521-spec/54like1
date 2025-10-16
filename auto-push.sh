#!/bin/bash

echo "自动推送代码到GitHub..."
echo

# 设置Git环境变量，避免任何交互式提示
export GIT_TERMINAL_PROMPT=0
export GIT_MERGE_AUTOEDIT=no

# 添加所有更改
git add .

# 提交更改（如果有的话）
git commit -m "Auto commit: $(date)" 2>/dev/null

# 推送到GitHub，使用非交互式模式
if git push origin main --quiet; then
    echo "✅ 代码已成功推送到GitHub！"
    echo
    echo "📋 推送详情："
    git log --oneline -1
    echo
    echo "🚀 Vercel将自动重新部署..."
else
    echo "❌ 推送失败，请检查网络连接或GitHub权限"
fi

echo
