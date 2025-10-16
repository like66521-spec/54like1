# USD.FAN 项目配置文档

## 📚 项目介绍

USD.FAN 是一个现代化的内容分享和知识付费平台，支持文章发布、付费内容、用户管理、评论系统等功能。

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env` 文件并填写以下配置：

```env
# 数据库配置（必填）
DATABASE_URL="postgresql://用户名:密码@主机:端口/数据库名"

# NextAuth 配置（必填）
NEXTAUTH_SECRET="your-secret-key-here"  # 可使用: openssl rand -base64 32 生成
NEXTAUTH_URL="http://localhost:3000"

# 应用URL（必填）
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. 数据库配置示例

#### 本地 PostgreSQL

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/usd_fan"
```

#### 远程 VPS

```env
DATABASE_URL="postgresql://username:password@your-vps-ip:5432/usd_fan"
```

#### Docker PostgreSQL

```bash
# 启动 PostgreSQL 容器
docker run --name postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=usd_fan \
  -p 5432:5432 \
  -d postgres:16

# 配置环境变量
DATABASE_URL="postgresql://postgres:password@localhost:5432/usd_fan"
```

### 4. 初始化数据库

```bash
# 生成 Prisma Client
npm run db:generate

# 推送数据库架构
npm run db:push

# 初始化种子数据（创建管理员账号等）
npm run db:seed
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问：
- 前台：http://localhost:3000
- 后台：http://localhost:3000/admin
- 登录：http://localhost:3000/admin/login

## 🔐 默认管理员账号

初始化后会创建以下管理员账号：

```
邮箱：admin@usd.fan
密码：admin123
```

**⚠️ 生产环境请立即修改默认密码！**

## 📦 数据库管理

### Prisma Studio（可视化界面）

```bash
npm run db:studio
```

访问 http://localhost:5555 查看和编辑数据库内容

### 数据库迁移

```bash
# 推送架构更改
npm run db:push

# 重新生成 Prisma Client
npm run db:generate
```

## 🗂️ 项目结构

```
usd-fan-clone/
├── app/                    # Next.js 应用目录
│   ├── admin/             # 管理后台
│   │   ├── login/         # 登录页面
│   │   ├── dashboard/     # 仪表盘
│   │   ├── articles/      # 文章管理
│   │   ├── users/         # 用户管理
│   │   ├── settings/      # 系统设置
│   │   └── ...
│   ├── api/               # API 路由
│   │   ├── auth/          # 认证相关
│   │   └── payment/       # 支付相关
│   └── ...
├── components/            # React 组件
├── lib/                   # 工具函数
│   ├── prisma.ts         # Prisma 客户端
│   ├── auth.ts           # NextAuth 配置
│   └── ...
├── prisma/               # Prisma 配置
│   ├── schema.prisma     # 数据库模型
│   └── seed.ts          # 种子数据
└── ...
```

## 🔧 配置选项

### 数据库表结构

- **users** - 用户表
- **categories** - 分类表
- **articles** - 文章表
- **payments** - 支付记录表
- **comments** - 评论表
- **menu_items** - 菜单项表
- **sidebar_widgets** - 侧边栏小工具表
- **settings** - 系统设置表

### 用户角色

- `USER` - 普通用户
- `ADMIN` - 管理员
- `SUPER_ADMIN` - 超级管理员

## 🛠️ 开发命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 数据库操作
npm run db:generate      # 生成 Prisma Client
npm run db:push          # 推送数据库架构
npm run db:studio        # 打开 Prisma Studio
npm run db:seed          # 运行种子文件
```

## 🌐 VPS 部署指南

### 1. 准备 VPS 环境

```bash
# 安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 PostgreSQL
sudo apt install postgresql postgresql-contrib

# 安装 PM2（进程管理）
npm install -g pm2
```

### 2. 配置 PostgreSQL

```bash
# 切换到 postgres 用户
sudo -u postgres psql

# 创建数据库和用户
CREATE DATABASE usd_fan;
CREATE USER usd_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE usd_fan TO usd_user;
\q
```

### 3. 部署项目

```bash
# 克隆代码
git clone <your-repo>
cd usd-fan-clone

# 安装依赖
npm install

# 配置环境变量
nano .env

# 初始化数据库
npm run db:push
npm run db:seed

# 构建项目
npm run build

# 使用 PM2 启动
pm2 start npm --name "usd-fan" -- start
pm2 save
pm2 startup
```

### 4. 配置 Nginx（可选）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 安全建议

1. **修改默认密码**：登录后立即修改管理员密码
2. **使用强密码**：NEXTAUTH_SECRET 使用强随机字符串
3. **启用 HTTPS**：生产环境必须使用 HTTPS
4. **数据库访问**：限制数据库只能从应用服务器访问
5. **定期备份**：定期备份数据库数据

## 📝 常见问题

### 1. 数据库连接失败

检查：
- 数据库服务是否运行
- DATABASE_URL 配置是否正确
- 防火墙是否允许连接
- VPS 安全组是否开放端口

### 2. 登录失败

检查：
- 是否运行了 `npm run db:seed`
- NEXTAUTH_SECRET 是否配置
- NEXTAUTH_URL 是否正确

### 3. 页面空白

检查：
- 是否运行了 `npm run build`
- 环境变量是否配置完整
- 浏览器控制台是否有错误

## 📞 技术支持

如有问题，请检查：
1. 项目文档
2. GitHub Issues
3. 错误日志

## 📄 License

MIT


