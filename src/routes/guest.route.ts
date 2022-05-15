import { Ulid } from '../Domain/Shared/ulid';
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
      .custom((value) => {
        try {
          Ulid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    body('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom((value) => {
        try {
          Ulid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    body('email').isEmail(),
    body('first_name').isString().isLength({ min: 1, max: 255 }),
    body('last_name').isString().isLength({ min: 1, max: 255 }),
    body('email').isString().isLength({ min: 1, max: 255 }),
    body('phone').isString().isLength({ min: 1, max: 255 }),
    (req: Request, res: Response) => guestPostController.run(req, res)
  );
};
