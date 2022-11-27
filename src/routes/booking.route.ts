import { BookingListByEventController } from './../Infrastructure/Web/Booking/BookingListByEventController';
import { BookingListWithFiltersController } from './../Infrastructure/Web/Booking/BookingListWithFiltersController';
import { BookingPutController } from './../Infrastructure/Web/Booking/BookingPutController';
import { BookingGetController } from './../Infrastructure/Web/Booking/BookingGetController';
import { validateMiddleware } from './Validator/validateMiddleware';
import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { body, param, query } from 'express-validator';

export const register = (router: Router) => {
  router.get(
    '/booking/:booking_id',
    param('booking_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const bookingGetController: BookingGetController =
        new BookingGetController();
      bookingGetController.run(req, res);
    }
  );

  router.put(
    '/booking',
    body('booking_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('status').isString().isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => {
      const bookingPutController: BookingPutController =
        new BookingPutController();
      bookingPutController.run(req, res);
    }
  );

  router.get(
    '/bookings',
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
      const bookingListWithFiltersController: BookingListWithFiltersController =
        new BookingListWithFiltersController();
      bookingListWithFiltersController.run(req, res);
    }
  );

  router.get(
    '/bookings/event/:event_id',
    param('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const bookingListByEventController: BookingListByEventController =
        new BookingListByEventController();
      bookingListByEventController.run(req, res);
    }
  );
};
