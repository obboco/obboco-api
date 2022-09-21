import { GuestMysqlRepository } from '../../Repository/GuestMysqlRepository';
import { BookingSessionRedisRepository } from '../../Repository/BookingRedisRepository';
import { AddGuestBookingSession } from '../../../Application/BookingSession/AddGuesBookingSession';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class BookingGuestPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const addGuestBookingSession: AddGuestBookingSession =
      new AddGuestBookingSession(
        new BookingSessionRedisRepository(),
        new GuestMysqlRepository()
      );
    addGuestBookingSession.make({
      booking_id: req.body.booking_id,
      event_id: req.body.event_id,
      guest: req.body.guest
    });
    res.status(httpStatus.OK).send(this.toResponse());
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
