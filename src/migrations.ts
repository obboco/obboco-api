var mysql = require('mysql');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

migration.init(connection, __dirname + '/migrations');
