import { GuestPassMysqlRepository } from './../../Repository/guestPassMysqlRepository';
import { DeletePass } from './../../../Application/Pass/deletePass';
import { PassMysqlRepository } from '../../Repository/passMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class PassDeleteController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

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
