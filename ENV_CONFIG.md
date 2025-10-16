# 环境变量配置指南

## 📝 创建配置文件

在项目根目录创建 `.env` 文件，内容如下：

```env
# 数据库配置（必填）
DATABASE_URL="postgresql://postgres:password@localhost:5432/usd_fan"

# NextAuth 配置（必填）
NEXTAUTH_SECRET="development-secret-key-please-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# 应用URL（必填）
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🔧 配置说明

### 1. 数据库配置

**本地 PostgreSQL：**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/usd_fan"
```

**VPS PostgreSQL：**
```env
DATABASE_URL="postgresql://username:password@your-vps-ip:5432/usd_fan"
```

**格式说明：**
```
postgresql://[用户名]:[密码]@[主机]:[端口]/[数据库名]
```

### 2. NextAuth 密钥生成

**Linux/Mac：**
```bash
openssl rand -base64 32
```

**Windows PowerShell：**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### 3. 生产环境配置

```env
# 生产环境示例
DATABASE_URL="postgresql://prod_user:SecurePassword123@db.example.com:5432/usd_fan_prod"
NEXTAUTH_SECRET="你生成的随机密钥"
NEXTAUTH_URL="https://your-domain.com"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## 🚀 快速开始

1. **复制配置**
```bash
# 创建 .env 文件
touch .env

# 或者在 Windows 上
type nul > .env
```

2. **填写配置**
使用文本编辑器打开 `.env` 文件，填写上述配置。

3. **测试连接**
```bash
npm run db:generate
npm run db:push
```

## ⚠️ 注意事项

1. `.env` 文件包含敏感信息，不要提交到 Git
2. 生产环境必须使用强密码和随机密钥
3. 确保数据库允许远程连接（如果使用 VPS）
4. 配置防火墙规则允许数据库端口（默认 5432）

## 📞 需要帮助？

如果配置遇到问题，请查看：
- `SETUP.md` - 详细配置文档
- `UPDATE.md` - 功能说明和常见问题


