import { Activity } from '../../../Domain/Activity';
import { ActivityMysqlRepository } from '../../Repository/ActivityMysqlRepository';
import { GetActivity } from '../../../Application/Activity/GetActivity';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class ActivityGetController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getActivity: GetActivity = new GetActivity(
      new ActivityMysqlRepository()
    );
    const activity: Activity = await getActivity.make(req.params.activity_id);
    if (activity === null) {
      res.status(httpStatus.OK).send({ data: {} });
      return;
    }
    res.status(httpStatus.OK).send(this.toResponse(activity));
  }

  private toResponse(activity: Activity): any {
    return {
      data: activity.toPrimitives()
    };
  }
}
