# 🚀 网站部署上线指南

## ✅ 功能完成情况

### 前端功能 (100%)
- ✅ 首页文章列表
- ✅ 分类页面
- ✅ 文章详情页
- ✅ 热门/推荐/最新页面
- ✅ 三栏布局(左侧导航、中间内容、右侧边栏)
- ✅ 响应式设计
- ✅ Markdown文章渲染
- ✅ 评论区

### 后台功能 (100%)
- ✅ 管理员登录/登出
- ✅ 仪表盘(实时统计数据)
- ✅ 文章管理(CRUD)
- ✅ 分类管理(CRUD)
- ✅ 用户管理
- ✅ 友情链接管理
- ✅ 菜单管理
- ✅ 小工具管理
- ✅ 支付记录
- ✅ 网站备份(数据库+完整备份)
- ✅ 系统设置

### API接口 (100%)
- ✅ 文章API (GET/POST/PUT/DELETE)
- ✅ 分类API (GET/POST/PUT/DELETE)
- ✅ 用户API
- ✅ 备份API
- ✅ 认证API

---

## 📋 上线前检查清单

### 1. 环境配置

```bash
# 检查 .env 文件
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3002"  # 改为生产环境URL
NEXTAUTH_SECRET="your-secret-key-here"  # 生成新的密钥
```

**生成新的 NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 2. 数据库准备

```bash
# 生成 Prisma Client
npx prisma generate

# 推送数据库schema
npx prisma db push

# 运行种子数据(可选)
npx prisma db seed
```

### 3. 依赖安装

```bash
# 安装所有依赖
npm install

# 或使用 pnpm
pnpm install
```

### 4. 构建项目

```bash
# 生产环境构建
npm run build

# 测试构建结果
npm run start
```

---

## 🌐 部署选项

### 选项 1: Vercel (推荐)

1. **准备工作**
   - 注册 Vercel 账号
   - 安装 Vercel CLI: `npm i -g vercel`

2. **部署步骤**
   ```bash
   # 登录 Vercel
   vercel login
   
   # 部署
   vercel
   
   # 生产环境部署
   vercel --prod
   ```

3. **环境变量设置**
   - 在 Vercel Dashboard 中设置环境变量
   - DATABASE_URL
   - NEXTAUTH_URL
   - NEXTAUTH_SECRET

4. **注意事项**
   - SQLite 不支持 Vercel,需要改用 PostgreSQL/MySQL
   - 上传的文件需要使用云存储(如 AWS S3)

### 选项 2: 云服务器 (阿里云/腾讯云)

1. **服务器要求**
   - Node.js 18+
   - 2GB+ RAM
   - 20GB+ 磁盘空间

2. **部署步骤**
   ```bash
   # 1. 上传代码到服务器
   git clone your-repo
   cd your-project
   
   # 2. 安装依赖
   npm install
   
   # 3. 构建项目
   npm run build
   
   # 4. 使用 PM2 运行
   npm install -g pm2
   pm2 start npm --name "usd-fan" -- start
   pm2 save
   pm2 startup
   ```

3. **Nginx 配置**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3002;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **SSL 证书**
   ```bash
   # 使用 Let's Encrypt
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### 选项 3: Docker 部署

1. **创建 Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm install
   
   COPY . .
   RUN npx prisma generate
   RUN npm run build
   
   EXPOSE 3002
   
   CMD ["npm", "start"]
   ```

2. **构建和运行**
   ```bash
   # 构建镜像
   docker build -t usd-fan .
   
   # 运行容器
   docker run -d -p 3002:3002 \
     -e DATABASE_URL="file:./dev.db" \
     -e NEXTAUTH_URL="https://your-domain.com" \
     -e NEXTAUTH_SECRET="your-secret" \
     --name usd-fan \
     usd-fan
   ```

---

## 🔒 安全配置

### 1. 更改默认管理员密码

登录后台后,立即修改默认密码:
- 默认账号: `admin@usd.fan`
- 默认密码: `admin123`

### 2. 环境变量安全

- ❌ 不要将 `.env` 文件提交到 Git
- ✅ 使用强密码
- ✅ 定期更换密钥

### 3. 数据库安全

```bash
# 定期备份数据库
# 在后台 -> 网站备份 -> 完整备份

# 或使用命令行
cp prisma/dev.db backups/dev-$(date +%Y%m%d).db
```

### 4. HTTPS 配置

- 生产环境必须使用 HTTPS
- 配置 SSL 证书
- 强制 HTTPS 重定向

---

## 📊 性能优化

### 1. 图片优化

- 使用 Next.js Image 组件
- 配置图片CDN
- 启用图片懒加载

### 2. 缓存策略

```javascript
// next.config.mjs
export default {
  images: {
    domains: ['your-cdn.com'],
  },
  // 启用静态导出
  output: 'standalone',
}
```

### 3. 数据库优化

- 添加索引
- 使用连接池
- 定期清理日志

---

## 🔍 监控和维护

### 1. 日志监控

```bash
# PM2 日志
pm2 logs usd-fan

# 实时监控
pm2 monit
```

### 2. 性能监控

- 使用 Vercel Analytics
- 配置 Google Analytics
- 监控服务器资源

### 3. 定期维护

- ✅ 每周备份数据库
- ✅ 每月更新依赖
- ✅ 定期检查安全漏洞

```bash
# 检查过时的依赖
npm outdated

# 更新依赖
npm update

# 安全审计
npm audit
npm audit fix
```

---

## 🐛 故障排查

### 问题 1: 数据库连接失败

```bash
# 检查数据库文件
ls -la prisma/dev.db

# 重新生成 Prisma Client
npx prisma generate
```

### 问题 2: 构建失败

```bash
# 清理缓存
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### 问题 3: 端口被占用

```bash
# 查找占用端口的进程
lsof -i :3002

# 杀死进程
kill -9 <PID>
```

---

## 📞 技术支持

### 常用命令

```bash
# 开发环境
npm run dev

# 生产环境
npm run build
npm run start

# 数据库管理
npx prisma studio

# 查看日志
pm2 logs

# 重启服务
pm2 restart usd-fan
```

### 文档链接

- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- NextAuth.js: https://next-auth.js.org

---

## ✨ 上线后的第一步

1. **登录后台**
   - URL: `https://your-domain.com/admin/login`
   - 修改默认密码

2. **创建第一篇文章**
   - 后台 -> 文章管理 -> 新建文章

3. **添加分类**
   - 后台 -> 分类管理 -> 新建分类

4. **配置友情链接**
   - 后台 -> 友情链接 -> 添加链接

5. **设置自动备份**
   - 后台 -> 网站备份 -> 自动备份设置

6. **配置系统设置**
   - 后台 -> 系统设置 -> 填写网站信息

---

## 🎉 恭喜!

您的网站已经准备好上线了!

**下一步建议:**
- 📝 发布第一篇文章
- 🎨 自定义网站样式
- 📊 配置分析工具
- 🔔 设置邮件通知
- 💰 配置支付功能

**祝您的网站运营顺利!** 🚀

