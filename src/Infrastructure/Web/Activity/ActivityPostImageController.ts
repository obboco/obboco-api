import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class ActivityPostImageController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    res
      .status(httpStatus.OK)
      .send({ data: { activity_image_id: res.locals.activityImageId } });
  }
}
