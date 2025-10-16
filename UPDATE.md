# 🎉 USD.FAN 项目更新说明

## ✅ 已完成的功能

### 1. 用户管理页面 (/admin/users)
- ✅ 用户列表展示（头像、昵称、邮箱、角色、等级、硬币）
- ✅ 用户搜索功能
- ✅ 添加新用户
- ✅ 编辑/删除用户
- ✅ 角色管理（普通用户、管理员、超级管理员）

### 2. 系统设置页面 (/admin/settings)
- ✅ 基础设置（网站名称、描述、URL等）
- ✅ SEO设置（Meta标题、描述、OG图片）
- ✅ 支付配置（微信支付、支付宝）
- ✅ 邮件配置（SMTP设置）
- ✅ 系统配置（注册开关、评论开关、维护模式等）

### 3. 登录认证系统
- ✅ 登录页面 (/admin/login)
- ✅ NextAuth.js 集成
- ✅ 邮箱密码登录
- ✅ Session 管理
- ✅ 退出登录功能

### 4. 数据库集成
- ✅ Prisma ORM 集成
- ✅ PostgreSQL 数据库支持
- ✅ 完整的数据库模型（用户、文章、分类、支付、评论等）
- ✅ 数据库种子文件（自动创建管理员账号）

### 5. 中间件保护
- ✅ 后台路由保护
- ✅ 未登录自动跳转登录页
- ✅ 已登录访问登录页自动跳转仪表盘

## 📋 使用步骤

### 第一步：安装依赖

```bash
npm install
```

### 第二步：配置数据库

**已改用 MySQL 数据库！**

#### 快速开始（推荐使用 Docker）

```bash
# 使用 Docker 启动 MySQL（最简单）
docker run --name mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=usd_fan \
  -p 3306:3306 \
  -d mysql:8.0
```

#### 或者使用本地 MySQL

1. 安装 MySQL（Windows/Mac/Linux）
2. 创建数据库：
```sql
CREATE DATABASE usd_fan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 或者使用 VPS MySQL

```bash
# 在你的 VPS 上
sudo apt install mysql-server
sudo mysql
CREATE DATABASE usd_fan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'usd_user'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON usd_fan.* TO 'usd_user'@'%';
```

**详细配置请查看 `MYSQL_SETUP.md` 文档！**

### 第三步：配置环境变量

创建 `.env` 文件：

```env
# 数据库连接（根据你的实际情况修改）
# Docker MySQL:
DATABASE_URL="mysql://root:password@localhost:3306/usd_fan"

# 本地 MySQL:
DATABASE_URL="mysql://root:your_password@localhost:3306/usd_fan"

# VPS MySQL:
DATABASE_URL="mysql://usd_user:your_password@your-vps-ip:3306/usd_fan"

# NextAuth 配置
NEXTAUTH_SECRET="development-secret-key-please-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# 应用URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 第四步：初始化数据库

```bash
# 生成 Prisma Client
npm run db:generate

# 推送数据库结构
npm run db:push

# 初始化种子数据（创建管理员账号）
npm run db:seed
```

### 第五步：启动项目

```bash
npm run dev
```

## 🔐 登录信息

初始化后会自动创建管理员账号：

```
后台地址：http://localhost:3000/admin
邮箱：admin@usd.fan
密码：admin123
```

**⚠️ 首次登录后请立即修改密码！**

## 📁 新增文件清单

```
新增文件：
├── prisma/
│   ├── schema.prisma          # 数据库模型定义
│   └── seed.ts                # 种子数据
├── lib/
│   ├── prisma.ts              # Prisma Client
│   └── auth.ts                # NextAuth 配置
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth API
│   ├── admin/
│   │   ├── login/page.tsx     # 登录页面
│   │   ├── users/page.tsx     # 用户管理
│   │   └── settings/page.tsx  # 系统设置
├── middleware.ts              # 路由保护
├── types/next-auth.d.ts       # 类型定义
└── SETUP.md                   # 详细配置文档

修改文件：
├── package.json               # 新增依赖和脚本
└── app/admin/layout.tsx       # 新增退出登录按钮
```

## 🔧 数据库管理工具

### Prisma Studio（可视化数据库管理）

```bash
npm run db:studio
```

访问 http://localhost:5555 即可查看和编辑数据库

## 🌐 数据库部署方案

### ⚠️ 重要说明

**GitHub 只是代码托管平台，不提供数据库！**

你需要单独部署 MySQL 数据库，有以下几种方案：

### 方案1：Docker MySQL（最简单，推荐开发）
```bash
docker run --name mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=usd_fan \
  -p 3306:3306 -d mysql:8.0
```

### 方案2：本地 MySQL
- Windows: 下载 MySQL Installer
- Mac: `brew install mysql`
- Linux: `sudo apt install mysql-server`

### 方案3：VPS MySQL（你的情况）
```env
DATABASE_URL="mysql://usd_user:password@your-vps-ip:3306/usd_fan"
```

### 方案4：云数据库（最稳定）
- PlanetScale (免费5GB)
- 阿里云 RDS
- 腾讯云 MySQL

**详细配置请查看 `MYSQL_SETUP.md` 文档！**

## 🚨 常见问题

### 问题1：数据库连接失败
```bash
# 检查 PostgreSQL 是否运行
sudo systemctl status postgresql

# 检查防火墙
sudo ufw status
sudo ufw allow 5432
```

### 问题2：Prisma 无法连接
```bash
# 重新生成 Prisma Client
npm run db:generate

# 测试连接
npx prisma db push
```

### 问题3：登录失败
```bash
# 确保运行了种子文件
npm run db:seed

# 检查环境变量
cat .env
```

## 📞 下一步

1. ✅ 确保数据库连接成功
2. ✅ 运行种子文件创建管理员
3. ✅ 登录后台修改默认密码
4. ⭐ 开始使用完整的管理功能

## 💡 提示

- 详细配置文档请查看 `SETUP.md`
- VPS 部署指南也在 `SETUP.md` 中
- 有问题随时问我！

祝使用愉快！🎊

