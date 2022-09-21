import { BookingMysqlRepository } from '../../Repository/BookingMysqlRepository';
import { EventMysqlRepository } from '../../Repository/EventMysqlRepository';
import { DeleteEvent } from '../../../Application/Event/DeleteEvent';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class EventDeleteController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
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
