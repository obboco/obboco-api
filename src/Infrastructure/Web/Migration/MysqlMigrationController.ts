import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { migrate } from '../../MysqlMigration/MysqlCustomMigration';
import { Controller } from '../Controller';

export class MysqlMigrationController implements Controller {
  constructor() {}
  async run(req: Request, res: Response) {
    require('dotenv').config();
    var mysql = require('mysql');

    var connection = mysql.createPool({
      connectionLimit: 10,
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    try {
      const argv = ['node', 'migration', 'up', '--migrate-all'];

      migrate(
        argv,
        connection,
        __dirname + '/../../../migrations',
        function () {
          res.status(httpStatus.OK).send('ok');
        },
        ['--migrate-all']
      );
    } catch (e) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }
}
