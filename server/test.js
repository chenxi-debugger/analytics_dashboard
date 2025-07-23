import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config(); // 加载 .env 文件

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT
    });
    console.log('Connected!');
    await connection.end();
  } catch (error) {
    console.error('Connection error:', error.code, error.message, {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT
    });
  }
})();