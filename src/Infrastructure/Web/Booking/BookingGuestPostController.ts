import { GuestMysqlRepository } from './../../guestMysqlRepository';
import { BookingSessionRedisRepository } from './../../bookingRedisRepository';
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
    addGuestBookingSession.make(req);
    res.status(httpStatus.OK).send({ data: 'ok' });
  }
}
