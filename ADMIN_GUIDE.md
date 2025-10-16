# 后台管理系统使用指南

## 📋 目录
- [登录信息](#登录信息)
- [功能模块](#功能模块)
- [数据库初始化](#数据库初始化)
- [常见问题](#常见问题)

---

## 🔐 登录信息

### 访问地址
```
http://localhost:3002/admin/login
```

### 默认管理员账号
```
邮箱: admin@usd.fan
密码: admin123
```

> ⚠️ **重要提示**: 首次使用前，请先运行数据库种子命令创建管理员账号！

---

## 🚀 数据库初始化

### 1. 首次安装步骤

```bash
# 1. 生成 Prisma 客户端
npm run db:generate

# 2. 推送数据库架构
npm run db:push

# 3. 运行种子数据（创建管理员账号和基础数据）
npm run db:seed
```

### 2. 种子数据包含内容

运行 `npm run db:seed` 后会自动创建：

✅ **管理员账号**
- 邮箱: admin@usd.fan
- 密码: admin123
- 角色: SUPER_ADMIN
- 硬币: 100,000
- 等级: 99

✅ **默认分类**
- 技术 (tech)
- 生活 (life)
- 商业 (business)
- 营销 (marketing)

✅ **菜单项**
- 讨论
- 话题
- 商城
- AI助手
- 交流群

✅ **系统设置**
- 网站名称、描述、URL
- 联系邮箱
- 注册开关、评论开关
- 新用户初始硬币数

---

## 📊 功能模块

### 1. 仪表盘 (`/admin/dashboard`)
- 📈 数据统计概览
- 👥 用户数量
- 📝 文章数量
- 💬 评论数量
- 👁️ 浏览量统计

### 2. 文章管理 (`/admin/articles`)
- ✍️ 创建新文章
- 📝 编辑文章
- 🗑️ 删除文章
- 🔍 搜索和筛选
- 📊 文章状态管理（草稿/已发布）

### 3. 分类管理 (`/admin/categories`)
- 📁 创建分类
- ✏️ 编辑分类
- 🗑️ 删除分类
- 🔗 管理分类别名（slug）

### 4. 用户管理 (`/admin/users`)
- 👤 查看用户列表
- ✏️编辑用户信息
- 🔒 修改用户密码
- 👑 管理用户角色（用户/管理员/超级管理员）
- 💰 管理用户硬币和等级

### 5. 菜单管理 (`/admin/menus`)
- 🔗 添加菜单项
- ✏️ 编辑菜单
- 🎨 设置图标和颜色
- 📊 调整显示顺序

### 6. 小部件管理 (`/admin/widgets`)
- 🧩 管理侧边栏小部件
- 📊 调整显示顺序
- 🎨 自定义样式

### 7. 支付管理 (`/admin/payments`)
- 💳 查看支付记录
- 📊 支付统计
- ✅ 订单状态管理

### 8. 系统设置 (`/admin/settings`)
- ⚙️ 网站基本信息
- 🔧 系统功能开关
- 📧 联系方式设置
- 💰 硬币系统配置

---

## 🔒 权限系统

### 角色类型
1. **SUPER_ADMIN** (超级管理员)
   - 拥有所有权限
   - 可以管理其他管理员

2. **ADMIN** (管理员)
   - 可以管理内容
   - 不能管理其他管理员

3. **USER** (普通用户)
   - 只能访问前台
   - 无法访问后台

### 路由保护
所有 `/admin/*` 路由（除了 `/admin/login`）都需要管理员权限才能访问。

---

## 🛠️ 常见问题

### Q1: 无法登录怎么办？
**A:** 确保已经运行了数据库种子命令：
```bash
npm run db:seed
```

### Q2: 忘记管理员密码？
**A:** 重新运行种子命令会重置管理员密码为 `admin123`：
```bash
npm run db:seed
```

### Q3: 如何创建新的管理员账号？
**A:** 
1. 登录后台
2. 进入"用户管理"
3. 点击"创建用户"
4. 设置角色为"管理员"或"超级管理员"

### Q4: 数据库连接失败？
**A:** 检查 `.env` 文件中的数据库配置：
```env
DATABASE_URL="mysql://用户名:密码@localhost:3306/数据库名"
```

### Q5: 如何修改端口？
**A:** 在 `package.json` 中修改：
```json
{
  "scripts": {
    "dev": "next dev -p 3002"  // 修改这里的端口号
  }
}
```

---

## 📝 开发命令

```bash
# 启动开发服务器
npm run dev

# 生成 Prisma 客户端
npm run db:generate

# 推送数据库架构
npm run db:push

# 运行种子数据
npm run db:seed

# 打开 Prisma Studio（数据库可视化工具）
npm run db:studio

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

---

## 🎯 快速开始

### 第一次使用
1. 克隆项目并安装依赖
   ```bash
   npm install
   ```

2. 配置数据库（如果还没有配置）
   ```bash
   # 创建 .env 文件并配置数据库连接
   DATABASE_URL="mysql://root:password@localhost:3306/usd_fan"
   ```

3. 初始化数据库
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. 启动开发服务器
   ```bash
   npm run dev
   ```

5. 访问后台登录页面
   ```
   http://localhost:3002/admin/login
   ```

6. 使用默认账号登录
   ```
   邮箱: admin@usd.fan
   密码: admin123
   ```

---

## 🔗 相关链接

- **前台首页**: http://localhost:3002
- **后台登录**: http://localhost:3002/admin/login
- **后台仪表盘**: http://localhost:3002/admin/dashboard
- **Prisma Studio**: 运行 `npm run db:studio` 后访问

---

## 📞 技术支持

如有问题，请查看：
- `ENV_CONFIG.md` - 环境变量配置说明
- `MYSQL_SETUP.md` - MySQL 数据库安装说明
- `SETUP.md` - 项目安装说明

---

**最后更新**: 2024-10-14

