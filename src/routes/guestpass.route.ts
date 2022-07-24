import { validateMiddleware } from './Validator/validateMiddleware';
import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const guestPassPostController = container.get(
    'Infrastructure.Web.GuestPass.GuestPassPostController'
  );
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
    validateMiddleware,
    (req: Request, res: Response) => guestPassPostController.run(req, res)
  );

  const guestPassGetController = container.get(
    'Infrastructure.Web.GuestPass.GuestPassGetController'
  );
  router.get(
    '/guestpass/:guest_pass_id',
    param('guest_pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => guestPassGetController.run(req, res)
  );

  const guestPassGetByGuestController = container.get(
    'Infrastructure.Web.GuestPass.GuestPassGetByGuestController'
  );
  router.get(
    '/guestpass/guest/:guest_id',
    param('guest_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => guestPassGetByGuestController.run(req, res)
  );

  const guestPassDeleteController = container.get(
    'Infrastructure.Web.GuestPass.GuestPassDeleteController'
  );
  router.delete(
    '/guestpass/:guest_pass_id',
    param('guest_pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => guestPassDeleteController.run(req, res)
  );
};
