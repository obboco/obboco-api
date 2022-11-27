import { GuestPassDeleteController } from './../Infrastructure/Web/GuestPass/GuestPassDeleteController';
import { GuestPassGetByGuestController } from './../Infrastructure/Web/GuestPass/GuestPassGetByGuestController';
import { GuestPassListWithFiltersController } from './../Infrastructure/Web/GuestPass/GuestPassListWithFiltersController';
import { GuestPassGetController } from './../Infrastructure/Web/GuestPass/GuestPassGetController';
import { GuestPassPutController } from './../Infrastructure/Web/GuestPass/GuestPassPutController';
import { GuestPassPostController } from './../Infrastructure/Web/GuestPass/GuestPassPostController';
import { validateMiddleware } from './Validator/validateMiddleware';
import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { body, param, query } from 'express-validator';

export const register = (router: Router) => {
  router.post(
    '/guestpass',
    body('guest_pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('guest_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const guestPassPostController: GuestPassPostController =
        new GuestPassPostController();
      guestPassPostController.run(req, res);
    }
  );

  router.put(
    '/guestpass',
    body('guest_pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('status').isString().isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => {
      const guestPassPutController: GuestPassPutController =
        new GuestPassPutController();
      guestPassPutController.run(req, res);
    }
  );

  router.get(
    '/guestpass/:guest_pass_id',
    param('guest_pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const guestPassGetController: GuestPassGetController =
        new GuestPassGetController();
      guestPassGetController.run(req, res);
    }
  );

  router.get(
    '/guestpass',
    query('partner')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    query('start_date')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    query('end_date')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    query('status')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => {
      const guestPassListWithFiltersController: GuestPassListWithFiltersController =
        new GuestPassListWithFiltersController();
      guestPassListWithFiltersController.run(req, res);
    }
  );

  router.get(
    '/guestpass/guest/:guest_id',
    param('guest_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const guestPassGetByGuestController: GuestPassGetByGuestController =
        new GuestPassGetByGuestController();
      guestPassGetByGuestController.run(req, res);
    }
  );

  router.delete(
    '/guestpass/:guest_pass_id',
    param('guest_pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const guestPassDeleteController: GuestPassDeleteController =
        new GuestPassDeleteController();
      guestPassDeleteController.run(req, res);
    }
  );
};
