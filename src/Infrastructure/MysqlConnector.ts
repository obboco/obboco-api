import mysql, { Connection } from "mysql2/promise";

export const mysqlConnection = async (): Promise<Connection> => {
  return mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database: "booking"
  });
};
