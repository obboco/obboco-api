var mysql = require("mysql");
var migration = require("mysql-migrations");

var connection = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "user",
  password: "user",
  database: "booking"
});

migration.init(connection, __dirname + "/migrations");
