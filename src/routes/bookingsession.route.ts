import { Router, Request, Response } from 'express';
import { Ulid } from '../Domain/Shared/ulid';
import { body, param } from 'express-validator';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const bookingGetByEventController = container.get(
    'Infrastructure.Web.Booking.BookingGetByEventController'
  );

  router.get(
    '/booking/event/:event_id',
    param('event_id')
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
      .custom((value) => {
        try {
          Ulid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    body('event_id')
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
      .custom((value) => {
        try {
          Ulid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    body('booking_id')
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
    body('guest.guest_id')
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
    body('guest.first_name').isString().isLength({ min: 1, max: 255 }),
    body('guest.last_name').isString().isLength({ min: 1, max: 255 }),
    body('guest.email').isString().isLength({ min: 1, max: 255 }).isEmail(),
    body('guest.phone').isString().isLength({ min: 1, max: 255 }),
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
      .custom((value) => {
        try {
          Ulid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    body('booking_id')
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
    (req: Request, res: Response) => bookingFinishPostController.run(req, res)
  );
};
