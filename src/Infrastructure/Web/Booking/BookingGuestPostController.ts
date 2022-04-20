import { GuestMysqlRepository } from './../../Repository/guestMysqlRepository';
import { BookingSessionRedisRepository } from './../../Repository/bookingRedisRepository';
import { AddGuestBookingSession } from './../../../Application/BookingSession/addGuesBookingSession';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class BookingGuestPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

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
