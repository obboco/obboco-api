import { EventMysqlRepository } from '../../Repository/EventMysqlRepository';
import { CreateEvent } from '../../../Application/Event/CreateEvent';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { Ulid } from '../../../Domain/Shared/Ulid';

export class EventPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const createEvent: CreateEvent = new CreateEvent(
      new EventMysqlRepository()
    );
    const event_id: Ulid = createEvent.make({
      event_id: req.body.event_id,
      start_date: req.body.start_date,
      duration: req.body.duration,
      capacity: req.body.capacity,
      activity_id: req.body.activity_id
    });
    res.status(httpStatus.OK).send(this.toResponse(event_id));
  }

  private toResponse(eventId: Ulid): any {
    return {
      event_id: eventId.value
    };
  }
}
