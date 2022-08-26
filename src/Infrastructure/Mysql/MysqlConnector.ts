import mysql, { Pool } from 'mysql2/promise';

export async function mysqlConnection(): Promise<Pool> {
  return mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10
  });
}
