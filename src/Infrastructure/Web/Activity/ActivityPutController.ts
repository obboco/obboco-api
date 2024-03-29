import { UpdateActivity } from '../../../Application/Activity/UpdateActivity';
import { ActivityMysqlRepository } from '../../Repository/ActivityMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class ActivityPutController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const updateActivity: UpdateActivity = new UpdateActivity(
      new ActivityMysqlRepository()
    );
    updateActivity.make({
      activity_id: req.body.activity_id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
      location: req.body.location,
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
