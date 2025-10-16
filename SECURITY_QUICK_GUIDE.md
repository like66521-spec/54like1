# 🔐 安全快速参考指南

## 🚀 上线前必做 (5分钟)

### 1. 修改默认密码 ⚠️ 重要!
```
登录: http://your-domain.com/admin/login
账号: admin@usd.fan
默认密码: admin123

立即修改为强密码!
```

### 2. 生成新的密钥
```bash
# 生成NEXTAUTH_SECRET
openssl rand -base64 32

# 更新 .env 文件
NEXTAUTH_SECRET="刚生成的密钥"
NEXTAUTH_URL="https://your-domain.com"
```

### 3. 检查文件权限
```bash
chmod 600 .env
chmod 600 prisma/dev.db
chmod 700 backups/
```

---

## 🛡️ 安全功能使用

### 登录安全
- ✅ 5次失败尝试后锁定30分钟
- ✅ 密码必须8位以上
- ✅ 自动记录登录IP

### API保护
- ✅ 登录API: 15分钟最多5次
- ✅ 一般API: 1分钟最多30次
- ✅ 读取API: 1分钟最多100次

### 数据保护
- ✅ 所有密码bcrypt加密
- ✅ SQL注入自动防护
- ✅ XSS攻击自动过滤
- ✅ CSRF Token验证

---

## 🚨 被攻击时怎么办

### 发现异常登录
1. 立即修改密码
2. 检查后台 -> 用户管理
3. 查看最近登录记录
4. 必要时删除可疑用户

### 网站被入侵
1. 立即下线网站
2. 恢复最近的备份
3. 修改所有密码和密钥
4. 检查代码是否被篡改

### 数据泄露
1. 通知所有用户
2. 强制重置所有密码
3. 生成新的NEXTAUTH_SECRET
4. 审查访问日志

---

## 📋 每日检查 (1分钟)

```bash
# 检查是否有异常登录
# 后台 -> 仪表盘 -> 查看最近活动

# 检查备份是否正常
# 后台 -> 网站备份 -> 查看最近备份时间

# 检查网站是否正常
curl -I https://your-domain.com
```

---

## 🔒 密码管理

### 生成强密码
```typescript
// 在浏览器控制台运行
function generatePassword(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  return password
}
console.log(generatePassword())
```

### 密码要求
- ✅ 至少8位
- ✅ 包含大写字母
- ✅ 包含小写字母
- ✅ 包含数字
- ⚠️ 建议包含特殊字符

---

## 🌐 Nginx安全配置

```nginx
# /etc/nginx/sites-available/your-site

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL证书
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # 安全头
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000" always;
    
    # 限制请求大小
    client_max_body_size 10M;
    
    # 速率限制
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;
    
    # 代理到Next.js
    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}

# HTTP重定向到HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## 📞 紧急联系

### 安全问题报告
- 邮箱: security@your-domain.com
- 响应时间: 24小时内

### 备份恢复
```bash
# 恢复数据库
cp backups/backup-db-YYYYMMDD-HHMMSS.db prisma/dev.db

# 重启服务
pm2 restart usd-fan
```

---

## ✅ 安全检查清单

### 每天
- [ ] 检查登录日志
- [ ] 查看备份状态

### 每周
- [ ] 创建完整备份
- [ ] 下载备份到本地
- [ ] 检查失败登录次数

### 每月
- [ ] 更新npm依赖
- [ ] 运行安全审计
- [ ] 审查用户权限
- [ ] 测试备份恢复

---

## 🔗 快速链接

- [完整安全文档](./SECURITY.md)
- [部署指南](./DEPLOYMENT_GUIDE.md)
- [测试报告](./TEST_REPORT.md)

---

**记住**: 安全是持续的过程,不是一次性的任务!

