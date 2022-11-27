import { GuestDeleteController } from './../Infrastructure/Web/Guest/GuestDeleteController';
import { GuestsGetController } from './../Infrastructure/Web/Guest/GuestsGetController';
import { GuestGetController } from './../Infrastructure/Web/Guest/GuestGetController';
import { GuestPutController } from './../Infrastructure/Web/Guest/GuestPutController';
import { GuestPostController } from './../Infrastructure/Web/Guest/GuestPostController';
import { validateMiddleware } from './Validator/validateMiddleware';
import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { param, body } from 'express-validator';

export const register = (router: Router) => {
  router.post(
    '/guest',
    body('guest_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('email').isEmail(),
    body('first_name').isString().isLength({ min: 1, max: 255 }),
    body('last_name').isString().isLength({ min: 1, max: 255 }),
    body('phone').isString().isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => {
      const guestPostController: GuestPostController =
        new GuestPostController();
      guestPostController.run(req, res);
    }
  );

  router.put(
    '/guest',
    body('guest_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('email').isEmail(),
    body('first_name').isString().isLength({ min: 1, max: 255 }),
    body('last_name').isString().isLength({ min: 1, max: 255 }),
    body('phone').isString().isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => {
      const guestPutController: GuestPutController = new GuestPutController();
      guestPutController.run(req, res);
    }
  );

  router.get(
    '/guest/:guest_id',
    param('guest_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const guestGetController: GuestGetController = new GuestGetController();
      guestGetController.run(req, res);
    }
  );

  router.get(
    '/guests/:partner_id',
    param('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const guestsGetController: GuestsGetController =
        new GuestsGetController();
      guestsGetController.run(req, res);
    }
  );

  router.delete(
    '/guest/:guest_id',
    param('guest_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const guestDeleteController: GuestDeleteController =
        new GuestDeleteController();
      guestDeleteController.run(req, res);
    }
  );
};
