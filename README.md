# 54Like - 现代化内容管理平台

一个基于 Next.js 15 构建的现代化内容管理和社交平台，具有完整的用户认证、文章管理、支付系统等功能。

## 🚀 功能特性

### 核心功能
- **用户认证系统** - 支持多种登录方式
- **文章管理** - 完整的文章发布、编辑、分类管理
- **支付系统** - 集成支付宝、微信支付
- **内容分类** - 灵活的分类管理系统
- **用户管理** - 完整的用户权限控制
- **数据备份** - 自动备份功能

### 技术特性
- **现代化UI** - 基于 Radix UI 和 Tailwind CSS
- **类型安全** - 完整的 TypeScript 支持
- **数据库** - Prisma ORM + MySQL
- **认证** - NextAuth.js v5
- **安全** - 完整的权限控制和数据验证

## 🛠️ 技术栈

- **前端**: Next.js 15, React 19, TypeScript
- **UI组件**: Radix UI, Tailwind CSS
- **数据库**: MySQL, Prisma ORM
- **认证**: NextAuth.js v5
- **支付**: 支付宝、微信支付
- **部署**: Vercel 就绪

## 📦 快速开始

### 环境要求
- Node.js 18+ 
- MySQL 8.0+
- npm 或 pnpm

### 安装步骤

1. **克隆项目**
```bash
git clone <your-repo-url>
cd 54like1
```

2. **安装依赖**
```bash
npm install
# 或
pnpm install
```

3. **环境配置**
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量
# 配置数据库连接、认证密钥等
```

4. **数据库设置**
```bash
# 生成 Prisma 客户端
npm run db:generate

# 推送数据库模式
npm run db:push

# 运行种子数据（可选）
npm run db:seed
```

5. **启动开发服务器**
```bash
npm run dev
```

访问 http://localhost:3002 查看应用。

## 🔧 环境变量配置

请参考 [ENV_CONFIG.md](./ENV_CONFIG.md) 了解详细的环境变量配置说明。

## 📚 文档

- [安装指南](./SETUP.md) - 详细的安装和配置步骤
- [管理员指南](./ADMIN_GUIDE.md) - 管理员功能使用说明
- [部署指南](./DEPLOYMENT_GUIDE.md) - 生产环境部署说明
- [安全指南](./SECURITY.md) - 安全配置和最佳实践
- [功能状态](./FEATURE_STATUS.md) - 当前功能开发状态

## 🚀 部署

### Vercel 部署
1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

### 自托管部署
请参考 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) 了解详细的自托管部署步骤。

## 🔒 安全注意事项

- 请确保在生产环境中配置正确的环境变量
- 定期更新依赖包
- 配置适当的数据库权限
- 启用 HTTPS

详细安全配置请参考 [SECURITY.md](./SECURITY.md)。

## 📝 开发

### 项目结构
```
├── app/                 # Next.js App Router 页面
├── components/          # React 组件
├── lib/                 # 工具函数和配置
├── prisma/             # 数据库模式
├── public/             # 静态资源
└── types/              # TypeScript 类型定义
```

### 可用脚本
- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 代码检查
- `npm run db:studio` - 打开 Prisma Studio

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📞 支持

如有问题，请查看文档或提交 Issue。
