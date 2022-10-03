import { DeleteCalendarEvent } from './../../../Application/Calendar/DeleteCalendarEvent';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class CalendarEventDeleteController implements Controller {
  constructor(readonly deleteCalendarEvent: DeleteCalendarEvent) {}

  async run(req: Request, res: Response) {
    try {
      const request = {
        access_token: req.body.access_token,
        title: req.body.title,
        start_date: req.body.start_date,
        duration: req.body.duration
      };
      this.deleteCalendarEvent.make(request);
      res.status(httpStatus.OK).send(this.toResponse());
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: [{ msg: e.message }] });
    }
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
