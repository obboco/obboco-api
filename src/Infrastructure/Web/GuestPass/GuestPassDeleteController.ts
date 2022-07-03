import { GuestPassMysqlRepository } from './../../Repository/guestPassMysqlRepository';
import { DeleteGuestPass } from './../../../Application/GuestPass/deleteGuestPass';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class GuestPassDeleteController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const deleteGuest: DeleteGuestPass = new DeleteGuestPass(
      new GuestPassMysqlRepository()
    );

    try {
      await deleteGuest.make({
        guest_pass_id: req.params.guest_pass_id
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
