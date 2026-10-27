const mysql = require('mysql2/promise');

// MySQL 连接池
// 连接串说明：
//   host      数据库地址（本机为 localhost）
//   user      数据库账号
//   password  数据库密码（请替换为你的真实密码，如 123456）
//   database  数据库名
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'my_homepage',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

module.exports = pool;
