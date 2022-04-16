import { UpdateActivity } from './../../../Application/Activity/updateActivity';
import { ActivityMysqlRepository } from './../../activityMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class ActivityPutController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const updateActivity: UpdateActivity = new UpdateActivity(
      new ActivityMysqlRepository()
    );
    updateActivity.make(req);
    res.status(httpStatus.OK).send({ data: 'ok' });
  }
}
