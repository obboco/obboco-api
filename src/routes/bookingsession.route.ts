import { BookingFinishPostController } from './../Infrastructure/Web/Booking/BookingFinishPostController';
import { BookingInitPostController } from './../Infrastructure/Web/Booking/BookingInitPostController';
import { BookingGetByEventController } from './../Infrastructure/Web/Booking/BookingGetByEventController';
import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validateMiddleware } from './Validator/validateMiddleware';
import { BookingGuestPostController } from '../Infrastructure/Web/Booking/BookingGuestPostController';

export const register = (router: Router) => {
  router.get(
    '/booking/event/:event_id',
    param('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const bookingGetByEventController: BookingGetByEventController =
        new BookingGetByEventController();
      bookingGetByEventController.run(req, res);
    }
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
    (req: Request, res: Response) => {
      const bookingInitPostController: BookingInitPostController =
        new BookingInitPostController();
      bookingInitPostController.run(req, res);
    }
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
    (req: Request, res: Response) => {
      const bookingGuestPostController: BookingGuestPostController =
        new BookingGuestPostController();
      bookingGuestPostController.run(req, res);
    }
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
    (req: Request, res: Response) => {
      const bookingFinishPostController: BookingFinishPostController =
        new BookingFinishPostController();
      bookingFinishPostController.run(req, res);
    }
  );
};
