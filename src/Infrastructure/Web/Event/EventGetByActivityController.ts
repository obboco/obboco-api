import { Event } from './../../../Domain/event';
import { EventMysqlRepository } from './../../eventMysqlRepository';
import { ListEvent } from './../../../Application/Event/listEvent';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class EventGetByActivityController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const listEvent: ListEvent = new ListEvent(new EventMysqlRepository());
    const events: Event[] = await listEvent.make({
      activityId: req.params.activity_id,
      time: req.query.time
    });
    res.status(httpStatus.OK).send({ data: events });
  }
}
