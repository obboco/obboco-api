import { BookingSessionRedisRepository } from './../../Repository/bookingRedisRepository';
import { ActivityMysqlRepository } from '../../Repository/activityMysqlRepository';
import { EventMysqlRepository } from './../../Repository/eventMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import {
  GetEvent as GetEventForBookingSession,
  BookingEventResponse
} from './../../../Application/BookingSession/getEvent';

export class BookingGetByEventController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getEvent: GetEventForBookingSession = new GetEventForBookingSession(
      new EventMysqlRepository(),
      new ActivityMysqlRepository(),
      new BookingSessionRedisRepository()
    );
    const result: BookingEventResponse = await getEvent.make(
      req.params.event_id
    );
    res.status(httpStatus.OK).send(this.toResponse(result));
  }

  private toResponse(result: BookingEventResponse): any {
    return {
      data: {
        event: result.event.toPrimitives(),
        activity: result.activity.toPrimitives()
      }
    };
  }
}
