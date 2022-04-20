import { GetBooking } from './../../../Application/Booking/getBooking';
import { BookingMysqlRepository } from './../../Repository/bookingMysqlRepository';
import { Booking } from './../../../Domain/booking';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class BookingGetController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const getBooking: GetBooking = new GetBooking(new BookingMysqlRepository());
    const booking: Booking = await getBooking.make(req.params.booking_id);
    res.status(httpStatus.OK).send(this.toResponse(booking));
  }

  private toResponse(booking: Booking): any {
    return {
      data: booking.toPrimitives()
    };
  }
}
