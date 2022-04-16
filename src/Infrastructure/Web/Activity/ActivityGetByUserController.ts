import { Activity } from './../../../Domain/activity';
import { ActivityMysqlRepository } from './../../activityMysqlRepository';
import { ListActivity } from './../../../Application/Activity/listActivity';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class ActivityGetByUserController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const listActivity: ListActivity = new ListActivity(
      new ActivityMysqlRepository()
    );
    const activities: Activity[] = await listActivity.make(req.params.user_id);
    res.status(httpStatus.OK).send({ data: activities });
  }
}
