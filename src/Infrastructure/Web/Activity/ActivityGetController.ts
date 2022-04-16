import { Activity } from './../../../Domain/activity';
import { ActivityMysqlRepository } from './../../activityMysqlRepository';
import { GetActivity } from './../../../Application/Activity/getActivity';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class ActivityGetController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const getActivity: GetActivity = new GetActivity(
      new ActivityMysqlRepository()
    );
    const activity: Activity = await getActivity.make(req.params.activity_id);
    if (activity === null) {
      res.status(httpStatus.OK).send({ data: {} });
      return;
    }
    res.status(httpStatus.OK).send({ data: activity });
  }
}
