import { BookingMysqlRepository } from './../../Repository/bookingMysqlRepository';
import { DeleteGuest } from './../../../Application/Guest/deleteGuest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult, param } from 'express-validator';
import { GuestMysqlRepository } from '../../Repository/guestMysqlRepository';

export class GuestDeleteController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

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
