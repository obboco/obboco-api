import { PassGetByPartnerController } from './../Infrastructure/Web/Pass/PassGetByPartnerController';
import { PassGetController } from './../Infrastructure/Web/Pass/PassGetController';
import { PassDeleteController } from './../Infrastructure/Web/Pass/PassDeleteController';
import { PassPutController } from './../Infrastructure/Web/Pass/PassPutController';
import { PassPostController } from './../Infrastructure/Web/Pass/PassPostController';
import { validateMiddleware } from './Validator/validateMiddleware';
import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { param, body } from 'express-validator';

export const register = (router: Router) => {
  router.post(
    '/pass',
    body('pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('title').isString().isLength({ min: 1, max: 255 }),
    body('description')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    body('quantity').isNumeric(),
    body('price').isNumeric(),
    body('currency').isString().isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => {
      const passPostController: PassPostController = new PassPostController();
      passPostController.run(req, res);
    }
  );

  router.put(
    '/pass',
    body('pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('title').isString().isLength({ min: 1, max: 255 }),
    body('description')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    body('quantity').isNumeric(),
    body('price').isNumeric(),
    body('currency').isString().isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => {
      const passPutController: PassPutController = new PassPutController();
      passPutController.run(req, res);
    }
  );

  router.delete(
    '/pass/:pass_id',
    param('pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const passDeleteController: PassDeleteController =
        new PassDeleteController();
      passDeleteController.run(req, res);
    }
  );

  router.get(
    '/pass/:pass_id',
    param('pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const passGetController: PassGetController = new PassGetController();
      passGetController.run(req, res);
    }
  );

  router.get(
    '/pass/partner/:partner_id',
    param('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const passGetByPartnerController: PassGetByPartnerController =
        new PassGetByPartnerController();
      passGetByPartnerController.run(req, res);
    }
  );
};
