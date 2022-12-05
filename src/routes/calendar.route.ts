import {CalendarEventDeleteController} from './../Infrastructure/Web/Calendar/CalendarEventDeleteController';
import {CalendarEventPostController} from './../Infrastructure/Web/Calendar/CalendarEventPostController';
import {validateMiddleware} from './Validator/validateMiddleware';
import {Router, Request, Response} from 'express';
import {body} from 'express-validator';

export const register = (router: Router) => {
  router.post(
    '/calendar',
    body('access_token').isString(),
    body('title').isString().isLength({min: 1, max: 255}),
    body('start_date').isString().isLength({min: 1, max: 255}),
    body('duration').isNumeric(),
    body('time_zone').isString(),
    validateMiddleware,
    (req: Request, res: Response) => {
      const calendarEventPostController: CalendarEventPostController =
        new CalendarEventPostController();
      calendarEventPostController.run(req, res);
    }
  );

  router.delete(
    '/calendar',
    body('access_token').isString(),
    body('title').isString().isLength({min: 1, max: 255}),
    body('start_date').isString().isLength({min: 1, max: 255}),
    body('duration').isNumeric(),
    body('time_zone').isString(),
    validateMiddleware,
    (req: Request, res: Response) => {
      const calendarEventDeleteController: CalendarEventDeleteController =
        new CalendarEventDeleteController();
      calendarEventDeleteController.run(req, res);
    }
  );
};
