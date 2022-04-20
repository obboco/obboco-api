import { ActivityMysqlRepository } from './../../activityMysqlRepository';
import { CreateActivity } from './../../../Application/Activity/createActivity';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';
import { Ulid } from '../../../Domain/Shared/ulid';

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
    const activity_id: Ulid = createActivity.make({
      activity_id: req.body.activity_id,
      title: req.body.title,
      description: req.body.description,
      partner_id: req.body.partner_id,
      image_id: req.body.image_id ? req.body.image_id : null
    });
    res.status(httpStatus.OK).send(this.toResponse(activity_id));
  }

  private toResponse(activityId: Ulid): any {
    return {
      activity_id: activityId.value
    };
  }
}
