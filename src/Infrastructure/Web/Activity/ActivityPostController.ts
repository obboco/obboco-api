import { ActivityMysqlRepository } from './../../activityMysqlRepository';
import { CreateActivity } from './../../../Application/Activity/createActivity';
import { PartnerMysqlRepository } from '../../partnerMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';
import { Uuid } from '../../../Domain/Shared/uuid';

export class ActivityPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const createActivity: CreateActivity = new CreateActivity(
      new ActivityMysqlRepository()
    );
    const activity_id: Uuid = createActivity.make(req);
    res.status(httpStatus.OK).send({ activity_id: activity_id.value });
  }
}
