import { UpdateGuestPass } from './../../../Application/GuestPass/updateGuestPass';
import { GuestPassMysqlRepository } from '../../Repository/guestPassMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class GuestPassPutController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const updateGuestPass: UpdateGuestPass = new UpdateGuestPass(
      new GuestPassMysqlRepository()
    );
    updateGuestPass.make({
      guest_pass_id: req.body.guest_pass_id,
      status: req.body.status
    });
    res.status(httpStatus.OK).send(this.toResponse());
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
