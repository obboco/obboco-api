import {ulidValidator} from './Validator/ulidValidator';
import {Router, Request, Response} from 'express';
import {validateMiddleware} from './Validator/validateMiddleware';
import {param, body} from 'express-validator';
import {SubscriptionGuestPostController} from '../Infrastructure/Web/SubscriptionGuest/SubscriptionGuestPostController';
import {SubscriptionGuestPutController} from '../Infrastructure/Web/SubscriptionGuest/SubscriptionGuestPutController';
import {SubscriptionGuestListController} from '../Infrastructure/Web/SubscriptionGuest/SubscriptionGuestListController';

export const register = (router: Router) => {
  router.post(
    '/subscriptionguest',
    body('subscription_guest_id')
      .isString()
      .isLength({min: 1, max: 255})
      .custom(ulidValidator),
    body('subscription_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('partner_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('guest_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('start_date').isString().isLength({min: 1, max: 255}),
    body('end_date').isString().isLength({min: 1, max: 255}),
    body('status').isString().isLength({min: 1, max: 255}),
    validateMiddleware,
    (req: Request, res: Response) => {
      const controller = new SubscriptionGuestPostController();
      controller.run(req, res);
    }
  );

  router.put(
    '/subscriptionguest',
    body('subscription_guest_id')
      .isString()
      .isLength({min: 1, max: 255})
      .custom(ulidValidator),
    body('subscription_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('partner_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('guest_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('start_date').isString().isLength({min: 1, max: 255}),
    body('end_date').isString().isLength({min: 1, max: 255}),
    body('status').isString().isLength({min: 1, max: 255}),
    validateMiddleware,
    (req: Request, res: Response) => {
      const controller = new SubscriptionGuestPutController();
      controller.run(req, res);
    }
  );

  router.get(
    '/subscriptionguest/subscription/:subscription_id',
    param('subscription_id')
      .isString()
      .isLength({min: 1, max: 255})
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const controller = new SubscriptionGuestListController();
      controller.run(req, res);
    }
  );
};
