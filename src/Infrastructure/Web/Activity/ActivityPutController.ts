import { UpdateActivity } from './../../../Application/Activity/updateActivity';
import { ActivityMysqlRepository } from '../../Repository/activityMysqlRepository';
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
    updateActivity.make({
      activity_id: req.body.activity_id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
      partner_id: req.body.partner_id,
      image_id: req.body.image_id ? req.body.image_id : null
    });
    res.status(httpStatus.OK).send(this.toResponse());
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
