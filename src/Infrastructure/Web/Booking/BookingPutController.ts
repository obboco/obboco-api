import { UpdateBooking } from './../../../Application/Booking/updateBooking';
import { BookingMysqlRepository } from '../../Repository/bookingMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class BookingPutController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const updateBooking: UpdateBooking = new UpdateBooking(
      new BookingMysqlRepository()
    );
    updateBooking.make({
      booking_id: req.body.booking_id,
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
