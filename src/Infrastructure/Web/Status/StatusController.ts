import { redisConnection } from './../../Redis/redisConnector';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { mysqlConnection } from '../../Mysql/MysqlConnector';
import { Controller } from '../Controller';

export class StatusController implements Controller {
  constructor() {}
  async run(req: Request, res: Response) {
    const mysqlConnection: boolean = await this.checkMysqlConnection();
    const redisConnection: boolean = await this.checkRedisConnection();

    let returnHttpStatus: any = httpStatus.OK;
    if (!mysqlConnection || !redisConnection) {
      returnHttpStatus = httpStatus.INTERNAL_SERVER_ERROR;
    }

    res
      .status(returnHttpStatus)
      .send(this.toResponse(mysqlConnection, redisConnection));
  }

  private toResponse(mysqlConnection: boolean, redisConnection: boolean): any {
    return {
      http: 'ok',
      mysql: mysqlConnection,
      redis: redisConnection
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

  private async checkRedisConnection(): Promise<boolean> {
    try {
      const connection = await redisConnection();
      const result = await connection.SELECT('1');
      if (result === null) {
        return false;
      }
    } catch (e) {
      return false;
    }

    return true;
  }
}
