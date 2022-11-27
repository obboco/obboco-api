import { EventDeleteController } from './../Infrastructure/Web/Event/EventDeleteController';
import { EventGetController } from './../Infrastructure/Web/Event/EventGetController';
import { EventGetByActivityController } from './../Infrastructure/Web/Event/EventGetByActivityController';
import { EventPutController } from './../Infrastructure/Web/Event/EventPutController';
import { EventPostController } from './../Infrastructure/Web/Event/EventPostController';
import { validateMiddleware } from './Validator/validateMiddleware';
import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { param, body } from 'express-validator';

export const register = (router: Router) => {
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
    (req: Request, res: Response) => {
      const eventPostController: EventPostController =
        new EventPostController();
      eventPostController.run(req, res);
    }
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
    (req: Request, res: Response) => {
      const eventPutController: EventPutController = new EventPutController();
      eventPutController.run(req, res);
    }
  );

  router.get(
    '/event/activity/:activity_id',
    param('activity_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const eventGetByActivityController: EventGetByActivityController =
        new EventGetByActivityController();
      eventGetByActivityController.run(req, res);
    }
  );

  router.get(
    '/event/:event_id',
    param('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const eventGetController: EventGetController = new EventGetController();
      eventGetController.run(req, res);
    }
  );

  router.delete(
    '/event/:event_id',
    param('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const eventDeleteController: EventDeleteController =
        new EventDeleteController();
      eventDeleteController.run(req, res);
    }
  );
};
