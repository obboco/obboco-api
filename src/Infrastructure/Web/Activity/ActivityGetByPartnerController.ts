import { Activity } from '../../../Domain/Activity';
import { ActivityMysqlRepository } from '../../Repository/ActivityMysqlRepository';
import { ListActivity } from '../../../Application/Activity/ListActivity';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class ActivityGetByPartnerController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const listActivity: ListActivity = new ListActivity(
      new ActivityMysqlRepository()
    );
    const activities: Activity[] = await listActivity.make(
      req.params.partner_id
    );
    res.status(httpStatus.OK).send(this.toResponse(activities));
  }

  private toResponse(activities: Activity[]): any {
    return {
      data: activities.map((activity: Activity) => {
        return activity.toPrimitives();
      })
    };
  }
}
