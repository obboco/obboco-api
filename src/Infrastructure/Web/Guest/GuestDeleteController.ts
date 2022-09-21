import { BookingMysqlRepository } from '../../Repository/BookingMysqlRepository';
import { DeleteGuest } from '../../../Application/Guest/DeleteGuest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { GuestMysqlRepository } from '../../Repository/GuestMysqlRepository';

export class GuestDeleteController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const deleteGuest: DeleteGuest = new DeleteGuest(
      new GuestMysqlRepository(),
      new BookingMysqlRepository()
    );

    try {
      await deleteGuest.make({
        guest_id: req.params.guest_id
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
