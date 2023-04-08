import {ulidValidator} from './Validator/ulidValidator';
import {Router, Request, Response} from 'express';
import {validateMiddleware} from './Validator/validateMiddleware';
import {param, body} from 'express-validator';
import {SubscriptionPutController} from '../Infrastructure/Web/Subscription/SubscriptionPutController';
import {SubscriptionPostController} from '../Infrastructure/Web/Subscription/SubscriptionPostController';
import {SubscriptionListController} from '../Infrastructure/Web/Subscription/SubscriptionListController';

export const register = (router: Router) => {
  router.post(
    '/subscription',
    body('subscription_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('partner_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('name').isString().isLength({min: 1, max: 255}),
    body('price').isNumeric(),
    body('currency').isString().isLength({min: 1, max: 255}),
    body('cycle').isString().isLength({min: 1, max: 255}),
    validateMiddleware,
    (req: Request, res: Response) => {
      const controller = new SubscriptionPostController();
      controller.run(req, res);
    }
  );

  router.put(
    '/subscription',
    body('subscription_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('partner_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('name').isString().isLength({min: 1, max: 255}),
    body('price').isNumeric(),
    body('currency').isString().isLength({min: 1, max: 255}),
    body('cycle').isString().isLength({min: 1, max: 255}),
    validateMiddleware,
    (req: Request, res: Response) => {
      const controller = new SubscriptionPutController();
      controller.run(req, res);
    }
  );

  router.get(
    '/subscription/partner/:partner_id',
    param('partner_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const controller = new SubscriptionListController();
      controller.run(req, res);
    }
  );
};
