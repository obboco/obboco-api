import { Ulid } from '../Domain/Shared/ulid';
import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
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
      .custom((value) => {
        try {
          Ulid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    body('pass_id')
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
    body('quantity').isNumeric(),
    body('price').isNumeric(),
    body('currency').isString().isLength({ min: 1, max: 255 }),
    (req: Request, res: Response) => guestPassPostController.run(req, res)
  );
};
