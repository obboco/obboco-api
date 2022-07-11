import { validateMiddleware } from './Validator/validateMiddleware';
import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { param, body } from 'express-validator';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const eventPostController = container.get(
    'Infrastructure.Web.Event.EventPostController'
  );
  router.post(
    '/event',
    body('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('start_date').isString().isLength({ min: 1, max: 255 }),
    body('duration').isNumeric(),
    body('capacity').isNumeric(),
    body('activity_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => eventPostController.run(req, res)
  );

  const eventPutController = container.get(
    'Infrastructure.Web.Event.EventPutController'
  );
  router.put(
    '/event',
    body('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('start_date').isString().isLength({ min: 1, max: 255 }),
    body('duration').isNumeric(),
    body('capacity').isNumeric(),
    body('activity_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => eventPutController.run(req, res)
  );

  const eventGetByActivityController = container.get(
    'Infrastructure.Web.Event.EventGetByActivityController'
  );
  router.get(
    '/event/activity/:activity_id',
    param('activity_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => eventGetByActivityController.run(req, res)
  );

  const eventGetController = container.get(
    'Infrastructure.Web.Event.EventGetController'
  );
  router.get(
    '/event/:event_id',
    param('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => eventGetController.run(req, res)
  );

  const eventDeleteController = container.get(
    'Infrastructure.Web.Event.EventDeleteController'
  );
  router.delete(
    '/event/:event_id',
    param('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => eventDeleteController.run(req, res)
  );
};
