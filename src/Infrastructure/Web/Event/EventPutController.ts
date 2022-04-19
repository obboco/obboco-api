import { BookingMysqlRepository } from './../../bookingMysqlRepository';
import { EventMysqlRepository } from './../../eventMysqlRepository';
import { UpdateEvent } from './../../../Application/Event/updateEvent';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class EventPutController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const updateEvent: UpdateEvent = new UpdateEvent(
      new EventMysqlRepository(),
      new BookingMysqlRepository()
    );
    try {
      await updateEvent.make(req);
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
