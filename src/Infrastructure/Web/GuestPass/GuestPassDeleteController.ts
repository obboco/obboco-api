import { GuestPassMysqlRepository } from '../../Repository/GuestPassMysqlRepository';
import { DeleteGuestPass } from '../../../Application/GuestPass/DeleteGuestPass';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class GuestPassDeleteController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
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
