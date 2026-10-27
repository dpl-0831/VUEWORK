const mysql = require('mysql2/promise');

// MySQL 连接池
// 连接信息从环境变量读取（可通过 server/.env 配置），避免把账号密码提交到公开代码仓库。
// 参考项目根目录或 server/.env.example 里的字段说明。
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'my_homepage',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

module.exports = pool;