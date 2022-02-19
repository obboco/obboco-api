import mysql, { Connection } from 'mysql2/promise';

export const mysqlConnection = async (): Promise<Connection> => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
};
