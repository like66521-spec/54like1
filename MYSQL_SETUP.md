# MySQL 数据库配置指南

## 💡 数据库与 GitHub 的关系

**重要：GitHub 只是代码托管平台，不提供数据库服务！**

你需要：
- ✅ **GitHub** - 托管项目代码
- ✅ **MySQL 数据库** - 单独部署（本地/VPS/云服务）

---

## 🚀 数据库部署方案

### 方案1：本地 MySQL（开发测试用）

#### Windows 安装

1. **下载 MySQL**
   - 访问：https://dev.mysql.com/downloads/mysql/
   - 下载 MySQL Installer

2. **安装并配置**
   ```
   - 选择 "Developer Default" 安装类型
   - 设置 root 密码（记住这个密码！）
   - 默认端口：3306
   ```

3. **创建数据库**
   ```bash
   # 打开 MySQL Command Line Client
   mysql -u root -p
   
   # 输入密码后，创建数据库
   CREATE DATABASE usd_fan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   
   # 创建用户（可选，更安全）
   CREATE USER 'usd_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON usd_fan.* TO 'usd_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **配置环境变量**
   ```env
   DATABASE_URL="mysql://root:your_password@localhost:3306/usd_fan"
   # 或使用创建的用户
   DATABASE_URL="mysql://usd_user:your_password@localhost:3306/usd_fan"
   ```

#### Mac 安装

```bash
# 使用 Homebrew 安装
brew install mysql

# 启动 MySQL
brew services start mysql

# 安全配置
mysql_secure_installation

# 创建数据库
mysql -u root -p
CREATE DATABASE usd_fan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Linux 安装

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server

# 启动服务
sudo systemctl start mysql
sudo systemctl enable mysql

# 安全配置
sudo mysql_secure_installation

# 创建数据库
sudo mysql
CREATE DATABASE usd_fan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'usd_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON usd_fan.* TO 'usd_user'@'localhost';
FLUSH PRIVILEGES;
```

---

### 方案2：Docker MySQL（最简单，推荐！）

```bash
# 启动 MySQL 容器
docker run --name mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=usd_fan \
  -p 3306:3306 \
  -d mysql:8.0 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci

# 配置环境变量
DATABASE_URL="mysql://root:password@localhost:3306/usd_fan"
```

**Docker 命令参考：**
```bash
# 查看容器状态
docker ps

# 停止容器
docker stop mysql

# 启动容器
docker start mysql

# 删除容器
docker rm mysql

# 进入 MySQL
docker exec -it mysql mysql -u root -p
```

---

### 方案3：VPS MySQL（生产环境）

#### 在你的 VPS 上安装 MySQL

```bash
# 连接到 VPS
ssh user@your-vps-ip

# 安装 MySQL
sudo apt update
sudo apt install mysql-server

# 配置允许远程连接
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# 修改 bind-address
# 找到这行：bind-address = 127.0.0.1
# 改为：bind-address = 0.0.0.0

# 重启 MySQL
sudo systemctl restart mysql

# 创建数据库和远程用户
sudo mysql
CREATE DATABASE usd_fan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'usd_user'@'%' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON usd_fan.* TO 'usd_user'@'%';
FLUSH PRIVILEGES;
EXIT;

# 开放防火墙端口
sudo ufw allow 3306
```

#### 本地连接 VPS MySQL

```env
# .env 配置
DATABASE_URL="mysql://usd_user:strong_password_here@your-vps-ip:3306/usd_fan"
```

---

### 方案4：云数据库服务（最稳定）

推荐的云服务商：

#### 1. PlanetScale（免费额度，推荐）
- 官网：https://planetscale.com
- 免费 5GB 存储
- 自动备份
- 直接获取连接字符串

#### 2. 阿里云 RDS
- 官网：https://www.aliyun.com/product/rds/mysql
- 按需付费
- 高可用

#### 3. 腾讯云 MySQL
- 官网：https://cloud.tencent.com/product/cdb
- 新用户有优惠

#### 4. AWS RDS
- 官网：https://aws.amazon.com/rds/mysql/
- 全球部署

**云数据库配置示例：**
```env
DATABASE_URL="mysql://username:password@host:3306/database"
```

---

## 📝 环境变量配置

创建 `.env` 文件：

```env
# MySQL 数据库连接
DATABASE_URL="mysql://用户名:密码@主机:端口/数据库名"

# 常见配置示例：

# 本地 MySQL
DATABASE_URL="mysql://root:password@localhost:3306/usd_fan"

# Docker MySQL
DATABASE_URL="mysql://root:password@localhost:3306/usd_fan"

# VPS MySQL
DATABASE_URL="mysql://usd_user:password@192.168.1.100:3306/usd_fan"

# 云服务 MySQL
DATABASE_URL="mysql://user:pass@db.example.com:3306/usd_fan"

# 其他必需配置
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🔧 初始化数据库

```bash
# 1. 生成 Prisma Client
npm run db:generate

# 2. 推送数据库结构（创建表）
npm run db:push

# 3. 初始化种子数据（创建管理员账号）
npm run db:seed
```

---

## 🛠️ 常用命令

### MySQL 命令

```bash
# 连接数据库
mysql -u root -p

# 查看所有数据库
SHOW DATABASES;

# 使用数据库
USE usd_fan;

# 查看所有表
SHOW TABLES;

# 查看表结构
DESCRIBE users;

# 删除数据库（危险！）
DROP DATABASE usd_fan;
```

### Prisma 命令

```bash
# 查看数据库（可视化界面）
npm run db:studio

# 重置数据库
npx prisma db push --force-reset

# 查看数据库状态
npx prisma db pull
```

---

## ⚠️ 常见问题

### 1. 连接被拒绝

**错误：** `Error: Can't connect to MySQL server on 'localhost'`

**解决：**
```bash
# 检查 MySQL 是否运行
# Windows
net start MySQL80

# Mac/Linux
sudo systemctl status mysql

# Docker
docker ps
```

### 2. 认证失败

**错误：** `Access denied for user 'root'@'localhost'`

**解决：**
- 检查用户名和密码是否正确
- 重置密码：
  ```bash
  sudo mysql
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
  FLUSH PRIVILEGES;
  ```

### 3. 字符集问题

**错误：** 中文显示乱码

**解决：**
```sql
# 设置数据库字符集
ALTER DATABASE usd_fan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. VPS 远程连接失败

**检查清单：**
- [ ] MySQL 配置允许远程连接（bind-address = 0.0.0.0）
- [ ] 防火墙开放 3306 端口
- [ ] 创建了远程用户（'user'@'%'）
- [ ] 云服务器安全组开放 3306

---

## 🔒 安全建议

1. **不要使用 root 用户**
   - 创建专用数据库用户
   - 只授予必要的权限

2. **使用强密码**
   - 至少 16 位
   - 包含大小写字母、数字、特殊字符

3. **限制远程访问**
   ```sql
   -- 只允许特定 IP 访问
   CREATE USER 'user'@'192.168.1.100' IDENTIFIED BY 'password';
   ```

4. **定期备份**
   ```bash
   # 备份数据库
   mysqldump -u root -p usd_fan > backup.sql
   
   # 恢复数据库
   mysql -u root -p usd_fan < backup.sql
   ```

5. **生产环境使用 SSL**
   ```env
   DATABASE_URL="mysql://user:pass@host:3306/db?sslaccept=strict"
   ```

---

## 📚 推荐配置

### 开发环境
```env
# Docker 方式（最简单）
DATABASE_URL="mysql://root:password@localhost:3306/usd_fan"
```

### 生产环境
```env
# 云数据库（最稳定）
DATABASE_URL="mysql://user:strong_pass@cloud-db.com:3306/usd_fan?sslaccept=strict"
```

---

## 🎯 下一步

1. ✅ 选择一种方案部署 MySQL
2. ✅ 配置 `.env` 文件
3. ✅ 运行数据库初始化命令
4. ✅ 启动项目测试

有问题随时问我！🚀


