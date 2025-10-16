# 数据库配置信息

## Vercel环境变量配置

请在Vercel项目设置中添加以下环境变量：

### 必需的环境变量：

```
DATABASE_URL=mysql://www_54like_com:CkcAsNmCfGfE@172.93.187.14:3306/www_54like_com
NEXTAUTH_SECRET=your-production-secret-key-here
NEXTAUTH_URL=https://54like1.vercel.app
NEXT_PUBLIC_APP_URL=https://54like1.vercel.app
```

### 配置步骤：

1. 登录Vercel控制台
2. 进入项目设置 (Settings)
3. 点击 "Environment Variables"
4. 添加上述环境变量
5. 重新部署项目

### 数据库信息：
- 主机: 172.93.187.14
- 端口: 3306
- 数据库: www_54like_com
- 用户名: www_54like_com
- 密码: CkcAsNmCfGfE
