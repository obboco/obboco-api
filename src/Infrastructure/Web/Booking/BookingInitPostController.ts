import { BookingSessionRedisRepository } from './../../Repository/bookingRedisRepository';
import {
  InitBookingSession,
  InitBookingSessionResponse
} from './../../../Application/BookingSession/initBookingSession';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';
import { Ulid } from '../../../Domain/Shared/ulid';

export class BookingInitPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const initBooking: InitBookingSession = new InitBookingSession(
      new BookingSessionRedisRepository()
    );
    const result: InitBookingSessionResponse = await initBooking.make(
      req.body.booking_id,
      req.body.event_id
    );
    res.status(httpStatus.OK).send({ data: result });
  }

  private toResponse(result: InitBookingSessionResponse): any {
    return {
      data: result
    };
  }
}
