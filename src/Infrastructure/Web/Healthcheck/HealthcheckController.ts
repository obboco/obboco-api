import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class HealthcheckController implements Controller {
  constructor() {}
  async run(req: Request, res: Response) {
    res.status(httpStatus.OK).send('ok');
  }
}
