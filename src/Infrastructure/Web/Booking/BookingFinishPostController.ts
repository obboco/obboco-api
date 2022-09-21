import { GuestPassMysqlRepository } from '../../Repository/GuestPassMysqlRepository';
import { EventMysqlRepository } from '../../Repository/EventMysqlRepository';
import { BookingMysqlRepository } from '../../Repository/BookingMysqlRepository';
import { BookingSessionRedisRepository } from '../../Repository/BookingRedisRepository';
import { FinishBookingSession } from '../../../Application/BookingSession/FinishBookingSession';
import { ActivityMysqlRepository } from '../../Repository/ActivityMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class BookingFinishPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const finishBookingSession: FinishBookingSession = new FinishBookingSession(
      new BookingSessionRedisRepository(),
      new BookingMysqlRepository(),
      new ActivityMysqlRepository(),
      new EventMysqlRepository(),
      new GuestPassMysqlRepository()
    );
    finishBookingSession.make({
      booking_id: req.body.booking_id,
      event_id: req.body.event_id,
      source: req.body.source,
      type: req.body.type,
      guest_pass_id: req.body.guest_pass_id
    });
    res.status(httpStatus.OK).send(this.toResponse());
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
