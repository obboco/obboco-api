import { BookingMysqlRepository } from './../../bookingMysqlRepository';
import { EventMysqlRepository } from './../../eventMysqlRepository';
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
      res.status(httpStatus.OK).send({ data: 'ok' });
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: [{ msg: e.message }] });
    }
  }
}
