import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { mysqlConnection } from '../../Mysql/MysqlConnector';
import { Controller } from '../Controller';

export class StatusController implements Controller {
  constructor() {}
  async run(req: Request, res: Response) {
    const mysqlConnection: boolean = await this.checkMysqlConnection();
    res.status(httpStatus.OK).send(this.toResponse(mysqlConnection));
  }

  private toResponse(mysqlConnection: boolean): any {
    return {
      http: 'ok',
      mysql: mysqlConnection
    };
  }

  private async checkMysqlConnection(): Promise<boolean> {
    try {
      const connection = await mysqlConnection();
      const [result] = await connection.execute('SELECT 1');
      connection.end();

      if (result[0] == undefined) {
        return false;
      }
    } catch (e) {
      return false;
    }

    return true;
  }
}
