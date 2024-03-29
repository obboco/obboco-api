import { Event } from '../../../Domain/Event';
import { EventMysqlRepository } from '../../Repository/EventMysqlRepository';
import { ListEvent } from '../../../Application/Event/ListEvent';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class EventGetByActivityController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const listEvent: ListEvent = new ListEvent(new EventMysqlRepository());
    const events: Event[] = await listEvent.make({
      activityId: req.params.activity_id,
      time: req.query.time as 'past' | 'future'
    });
    res.status(httpStatus.OK).send(this.toResponse(events));
  }

  private toResponse(events: Event[]): any {
    return {
      data: events.map((event) => event.toPrimitives())
    };
  }
}
