import { GetBooking } from '../../../Application/Booking/GetBooking';
import { BookingMysqlRepository } from '../../Repository/BookingMysqlRepository';
import { Booking } from '../../../Domain/Booking';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class BookingGetController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
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
