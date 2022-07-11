import { Event } from './../../../Domain/event';
import { EventMysqlRepository } from './../../Repository/eventMysqlRepository';
import { GetEvent } from './../../../Application/Event/getEvent';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class EventGetController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getEvent: GetEvent = new GetEvent(new EventMysqlRepository());
    const event: Event = await getEvent.make(req.params.event_id);
    res.status(httpStatus.OK).send(this.toResponse(event));
  }

  private toResponse(event: Event): any {
    return {
      data: event === null ? {} : event.toPrimitives()
    };
  }
}
