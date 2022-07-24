import { validateMiddleware } from './Validator/validateMiddleware';
import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { param, body } from 'express-validator';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const guestPostController = container.get(
    'Infrastructure.Web.Guest.GuestPostController'
  );
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
    (req: Request, res: Response) => guestPostController.run(req, res)
  );

  const guestPutController = container.get(
    'Infrastructure.Web.Guest.GuestPutController'
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
    (req: Request, res: Response) => guestPutController.run(req, res)
  );

  const guestGetController = container.get(
    'Infrastructure.Web.Guest.GuestGetController'
  );
  router.get(
    '/guest/:guest_id',
    param('guest_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => guestGetController.run(req, res)
  );

  const guestsGetController = container.get(
    'Infrastructure.Web.Guest.GuestsGetController'
  );
  router.get(
    '/guests/:partner_id',
    param('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => guestsGetController.run(req, res)
  );

  const guestDeleteController = container.get(
    'Infrastructure.Web.Guest.GuestDeleteController'
  );
  router.delete(
    '/guest/:guest_id',
    param('guest_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => guestDeleteController.run(req, res)
  );
};
