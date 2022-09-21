import { BookingSessionRedisRepository } from '../../Repository/BookingRedisRepository';
import { InitBookingSession } from '../../../Application/BookingSession/InitBookingSession';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class BookingInitPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const initBooking: InitBookingSession = new InitBookingSession(
      new BookingSessionRedisRepository()
    );
    initBooking.make(req.body.booking_id, req.body.event_id);
    res.status(httpStatus.OK).send(this.toResponse());
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
