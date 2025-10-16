#!/bin/bash
# MySQL远程访问配置脚本

echo "=== MySQL远程访问配置 ==="
echo ""

# 1. 检查MySQL服务状态
echo "1. 检查MySQL服务状态..."
systemctl status mysql | head -n 3

# 2. 配置MySQL监听所有IP
echo ""
echo "2. 配置MySQL监听所有IP..."
mysql -u root -p -e "
SELECT user, host FROM mysql.user WHERE user='usdfan';
GRANT ALL PRIVILEGES ON usdfan.* TO 'usdfan'@'%' IDENTIFIED BY 'EmPGz6Zh4j7LBeci';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'usdfan'@'%';
"

# 3. 修改MySQL配置文件
echo ""
echo "3. 修改MySQL配置文件..."
if grep -q "bind-address" /etc/mysql/mysql.conf.d/mysqld.cnf 2>/dev/null; then
    sed -i 's/bind-address.*/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
    echo "已修改 bind-address = 0.0.0.0"
elif grep -q "bind-address" /etc/my.cnf 2>/dev/null; then
    sed -i 's/bind-address.*/bind-address = 0.0.0.0/' /etc/my.cnf
    echo "已修改 bind-address = 0.0.0.0"
else
    echo "未找到bind-address配置，可能不需要修改"
fi

# 4. 重启MySQL服务
echo ""
echo "4. 重启MySQL服务..."
systemctl restart mysql
systemctl status mysql | head -n 3

# 5. 开放防火墙端口
echo ""
echo "5. 配置防火墙..."
if command -v ufw &> /dev/null; then
    echo "使用UFW防火墙"
    ufw allow 3306/tcp
    ufw status | grep 3306
elif command -v firewall-cmd &> /dev/null; then
    echo "使用firewalld防火墙"
    firewall-cmd --permanent --add-port=3306/tcp
    firewall-cmd --reload
    firewall-cmd --list-ports | grep 3306
else
    echo "未检测到防火墙，或防火墙已关闭"
fi

# 6. 测试端口
echo ""
echo "6. 测试3306端口..."
netstat -tuln | grep 3306 || ss -tuln | grep 3306

echo ""
echo "=== 配置完成 ==="
echo "现在可以尝试从本地连接到数据库"

