// 测试MySQL数据库连接
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('🔍 测试数据库连接...\n');
  
  const config = {
    host: '172.93.187.14',
    port: 3306,
    user: 'usdfan',
    password: 'EmPGz6Zh4j7LBeci',
    database: 'usdfan',
  };

  try {
    console.log('📡 连接参数:');
    console.log(`   Host: ${config.host}`);
    console.log(`   Port: ${config.port}`);
    console.log(`   User: ${config.user}`);
    console.log(`   Database: ${config.database}\n`);

    console.log('⏳ 正在连接...');
    const connection = await mysql.createConnection(config);
    
    console.log('✅ 连接成功！\n');

    // 测试查询
    const [rows] = await connection.execute('SELECT VERSION() as version');
    console.log('📊 MySQL版本:', rows[0].version);

    // 查看数据库
    const [databases] = await connection.execute('SHOW DATABASES');
    console.log('\n📂 可用数据库:');
    databases.forEach(db => console.log(`   - ${Object.values(db)[0]}`));

    // 查看表
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('\n📋 当前数据库的表:');
    if (tables.length === 0) {
      console.log('   （暂无表，这是正常的，运行 db:push 后会创建）');
    } else {
      tables.forEach(table => console.log(`   - ${Object.values(table)[0]}`));
    }

    await connection.end();
    console.log('\n✅ 测试完成！数据库连接正常。');
    console.log('\n📝 下一步：运行 npm run db:push 创建数据库表');
    
  } catch (error) {
    console.error('\n❌ 连接失败！');
    console.error('错误信息:', error.message);
    console.error('\n🔧 可能的原因:');
    console.error('   1. VPS防火墙未开放3306端口');
    console.error('   2. MySQL未配置远程访问');
    console.error('   3. 用户权限未正确设置');
    console.error('   4. IP地址或密码错误');
    console.error('\n💡 解决方案：请检查VPS上的MySQL配置');
    process.exit(1);
  }
}

testConnection();

