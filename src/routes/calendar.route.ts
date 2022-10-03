import { validateMiddleware } from './Validator/validateMiddleware';
import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const calendarEventPostController = container.get(
    'Infrastructure.Web.Calendar.CalendarEventPostController'
  );
  router.post(
    '/calendar',
    body('access_token').isString().isLength({ min: 1, max: 255 }),
    body('title').isString().isLength({ min: 1, max: 255 }),
    body('start_date').isString().isLength({ min: 1, max: 255 }),
    body('duration').isNumeric(),
    validateMiddleware,
    (req: Request, res: Response) => calendarEventPostController.run(req, res)
  );

  const calendarEventDeleteController = container.get(
    'Infrastructure.Web.Calendar.CalendarEventDeleteController'
  );
  router.delete(
    '/calendar',
    body('access_token').isString().isLength({ min: 1, max: 255 }),
    body('title').isString().isLength({ min: 1, max: 255 }),
    body('start_date').isString().isLength({ min: 1, max: 255 }),
    body('duration').isNumeric(),
    validateMiddleware,
    (req: Request, res: Response) => calendarEventDeleteController.run(req, res)
  );
};
