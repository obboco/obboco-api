import { Pass } from '../../../Domain/Pass';
import { GetPass } from '../../../Application/Pass/GetPass';
import { PassMysqlRepository } from '../../Repository/PassMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class PassGetController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getPass: GetPass = new GetPass(new PassMysqlRepository());
    const pass: Pass = await getPass.make({
      pass_id: req.params.pass_id
    });
    if (pass === null) {
      res.status(httpStatus.OK).send({ data: {} });
      return;
    }
    res.status(httpStatus.OK).send(this.toResponse(pass));
  }

  private toResponse(pass: Pass): any {
    return {
      data: pass.toPrimitives()
    };
  }
}
