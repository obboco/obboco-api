import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import container from '../dependency-injection';
import { validateMiddleware } from './Validator/validateMiddleware';

export const register = (router: Router) => {
  const bookingGetByEventController = container.get(
    'Infrastructure.Web.Booking.BookingGetByEventController'
  );

  router.get(
    '/booking/event/:event_id',
    param('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => bookingGetByEventController.run(req, res)
  );

  const bookingInitPostController = container.get(
    'Infrastructure.Web.Booking.BookingInitPostController'
  );
  router.post(
    '/booking/init',
    body('booking_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => bookingInitPostController.run(req, res)
  );

  const bookingGuestPostController = container.get(
    'Infrastructure.Web.Booking.BookingGuestPostController'
  );
  router.post(
    '/booking/guest',
    body('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('booking_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('guest.guest_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('guest.first_name').isString().isLength({ min: 1, max: 255 }),
    body('guest.last_name').isString().isLength({ min: 1, max: 255 }),
    body('guest.email').isString().isLength({ min: 1, max: 255 }).isEmail(),
    body('guest.phone').isString().isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => bookingGuestPostController.run(req, res)
  );

  const bookingFinishPostController = container.get(
    'Infrastructure.Web.Booking.BookingFinishPostController'
  );
  router.post(
    '/booking/finish',
    body('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('booking_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('source').isString().isLength({ min: 1, max: 255 }),
    body('type').isString().isLength({ min: 1, max: 255 }),
    body('guest_pass_id')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => bookingFinishPostController.run(req, res)
  );
};
