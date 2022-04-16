import { EventMysqlRepository } from './../../eventMysqlRepository';
import { CreateEvent } from './../../../Application/Event/createEvent';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';
import { Uuid } from '../../../Domain/Shared/uuid';

export class EventPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return
      }

      const createEvent: CreateEvent = new CreateEvent(
        new EventMysqlRepository()
      );
      const event_id: Uuid = createEvent.make(req);
      res.status(httpStatus.OK).send({ event_id: event_id.value });
    }
  }
}
