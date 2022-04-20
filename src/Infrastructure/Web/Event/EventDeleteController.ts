import { BookingMysqlRepository } from './../../Repository/bookingMysqlRepository';
import { EventMysqlRepository } from './../../Repository/eventMysqlRepository';
import { DeleteEvent } from './../../../Application/Event/deleteEvent';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class EventDeleteController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const deleteEvent: DeleteEvent = new DeleteEvent(
      new EventMysqlRepository(),
      new BookingMysqlRepository()
    );

    try {
      await deleteEvent.make(req.params.event_id);
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
