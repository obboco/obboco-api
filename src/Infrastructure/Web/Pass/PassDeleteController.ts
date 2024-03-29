import { GuestPassMysqlRepository } from '../../Repository/GuestPassMysqlRepository';
import { DeletePass } from '../../../Application/Pass/DeletePass';
import { PassMysqlRepository } from '../../Repository/PassMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class PassDeleteController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    try {
      const deletePass: DeletePass = new DeletePass(
        new PassMysqlRepository(),
        new GuestPassMysqlRepository()
      );
      await deletePass.make({
        pass_id: req.params.pass_id
      });

      res.status(httpStatus.OK).send(this.toResponse());
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: [{ msg: e.message }] });
    }
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
