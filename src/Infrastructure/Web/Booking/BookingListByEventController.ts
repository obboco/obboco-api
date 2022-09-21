import { Booking } from '../../../Domain/Booking';
import { BookingMysqlRepository } from '../../Repository/BookingMysqlRepository';
import { GetBookings } from '../../../Application/Booking/GetBookings';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class BookingListByEventController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getBookings: GetBookings = new GetBookings(
      new BookingMysqlRepository()
    );
    const bookings: Booking[] = await getBookings.make(req.params.event_id);
    res.status(httpStatus.OK).send(this.toResponse(bookings));
  }

  private toResponse(bookings: Booking[]): any {
    return {
      data: bookings.map((booking) => booking.toPrimitives())
    };
  }
}
