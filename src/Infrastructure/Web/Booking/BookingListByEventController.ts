import { Booking } from './../../../Domain/booking';
import { BookingMysqlRepository } from './../../bookingMysqlRepository';
import { GetBookings } from './../../../Application/Booking/getBookings';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class BookingListByEventController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }
    const getBookings: GetBookings = new GetBookings(
      new BookingMysqlRepository()
    );
    const bookings: Booking[] = await getBookings.make(req.params.event_id);
    res.status(httpStatus.OK).send({ data: bookings });
  }
}
