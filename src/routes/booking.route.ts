import { Router, Request, Response } from 'express';
import { Ulid } from '../Domain/Shared/ulid';
import { body, param, query } from 'express-validator';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const bookingGetController = container.get(
    'Infrastructure.Web.Booking.BookingGetController'
  );
  router.get(
    '/booking/:booking_id',
    param('booking_id')
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
    (req: Request, res: Response) => bookingGetController.run(req, res)
  );

  const bookingPutController = container.get(
    'Infrastructure.Web.Booking.BookingPutController'
  );
  router.put(
    '/booking',
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
    body('status').isString().isLength({ min: 1, max: 255 }),
    (req: Request, res: Response) => bookingPutController.run(req, res)
  );

  const bookingListWithFiltersController = container.get(
    'Infrastructure.Web.Booking.BookingListWithFiltersController'
  );
  router.get(
    '/bookings',
    query('filter').isString().isLength({ min: 1, max: 255 }),
    query('partner_id')
      .optional({ nullable: true })
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
    (req: Request, res: Response) =>
      bookingListWithFiltersController.run(req, res)
  );

  const bookingListByEventController = container.get(
    'Infrastructure.Web.Booking.BookingListByEventController'
  );
  router.get(
    '/bookings/event/:event_id',
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
    (req: Request, res: Response) => bookingListByEventController.run(req, res)
  );
};
