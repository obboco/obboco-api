import {CreateCalendarEvent} from './../../../Application/Calendar/CreateCalendarEvent';
import {Request, Response} from 'express';
import httpStatus from 'http-status';
import {Controller} from '../Controller';
import {Inject} from 'typescript-ioc';

export class CalendarEventPostController implements Controller {
  @Inject private readonly createCalendarEvent: CreateCalendarEvent;
  constructor() {}

  async run(req: Request, res: Response) {
    try {
      this.createCalendarEvent.make({
        access_token: req.body.access_token,
        title: req.body.title,
        start_date: req.body.start_date,
        duration: req.body.duration,
      });
      res.status(httpStatus.OK).send(this.toResponse());
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).json({errors: [{msg: e.message}]});
    }
  }

  private toResponse(): any {
    return {
      data: 'ok',
    };
  }
}
