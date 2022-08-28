import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class MysqlMigrationController implements Controller {
  constructor() {}
  async run(req: Request, res: Response) {
    const { exec } = require('child_process');

    exec('node src/migrations.ts up --migrate-all', (error, stdout, stderr) => {
      if (stdout) res.status(httpStatus.OK).send(stdout);
      if (error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
      if (stderr) res.status(httpStatus.INTERNAL_SERVER_ERROR).send(stderr);
    });
  }
}
