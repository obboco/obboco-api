import { EventMysqlRepository } from './../../Repository/eventMysqlRepository';
import { DeleteActivity } from './../../../Application/Activity/deleteActivity';
import { ActivityMysqlRepository } from '../../Repository/activityMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class ActivityDeleteController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const deleteActivity: DeleteActivity = new DeleteActivity(
      new ActivityMysqlRepository(),
      new EventMysqlRepository()
    );
    try {
      await deleteActivity.make({
        activity_id: req.params.activity_id
      });
      res.status(httpStatus.OK).send(this.toResponse());
    } catch (e) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: [{ msg: e.message }] });
    }
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
