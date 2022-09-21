import { ActivityMysqlRepository } from '../../Repository/ActivityMysqlRepository';
import { CreateActivity } from '../../../Application/Activity/CreateActivity';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { Ulid } from '../../../Domain/Shared/Ulid';

export class ActivityPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const createActivity: CreateActivity = new CreateActivity(
      new ActivityMysqlRepository()
    );
    const activity_id: Ulid = createActivity.make({
      activity_id: req.body.activity_id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
      location: req.body.location,
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
