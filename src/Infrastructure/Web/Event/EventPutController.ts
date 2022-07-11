import { BookingMysqlRepository } from './../../Repository/bookingMysqlRepository';
import { EventMysqlRepository } from './../../Repository/eventMysqlRepository';
import { UpdateEvent } from './../../../Application/Event/updateEvent';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class EventPutController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const updateEvent: UpdateEvent = new UpdateEvent(
      new EventMysqlRepository(),
      new BookingMysqlRepository()
    );
    try {
      await updateEvent.make({
        event_id: req.body.event_id,
        start_date: req.body.start_date,
        duration: req.body.duration,
        capacity: req.body.capacity,
        activity_id: req.body.activity_id
      });
      res.status(httpStatus.OK).send(this.toResponse());
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: [{ msg: e.message }] });
    }
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
