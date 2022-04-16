import { Router } from 'express';
import { GuestMysqlRepository } from '../Infrastructure/guestMysqlRepository';
import { GetBookings } from '../Application/Booking/getBookings';
import { Booking } from '../Domain/booking';
import { GetBooking } from '../Application/Booking/getBooking';
import { FinishBookingSession } from '../Application/BookingSession/finishBookingSession';
import { BookingMysqlRepository } from '../Infrastructure/bookingMysqlRepository';
import { AddGuestBookingSession } from '../Application/BookingSession/addGuesBookingSession';
import {
  InitBookingSession,
  InitBookingSessionResponse
} from '../Application/BookingSession/initBookingSession';
import {
  GetEvent as GetEventForBookingSession,
  BookingEventResponse
} from '../Application/BookingSession/getEvent';
import { EventMysqlRepository } from '../Infrastructure/eventMysqlRepository';
import { ActivityMysqlRepository } from '../Infrastructure/activityMysqlRepository';
import { Uuid } from '../Domain/Shared/uuid';
import { BookingSessionRedisRepository } from '../Infrastructure/bookingRedisRepository';
import { body, param, validationResult } from 'express-validator';

export const register = (router: Router) => {
  //Booking Session
  router.get(
    '/booking/event/:event_id',
    param('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom((value) => {
        try {
          Uuid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const getEvent: GetEventForBookingSession = new GetEventForBookingSession(
        new EventMysqlRepository(),
        new ActivityMysqlRepository(),
        new BookingSessionRedisRepository()
      );
      const result: BookingEventResponse = await getEvent.make(
        req.params.event_id
      );
      res.send({ data: result });
    }
  );

  router.post(
    '/booking/init',
    body('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom((value) => {
        try {
          Uuid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const initBooking: InitBookingSession = new InitBookingSession(
        new BookingSessionRedisRepository()
      );
      const result: InitBookingSessionResponse = await initBooking.make(
        req.body.event_id
      );
      res.send({ data: result });
    }
  );

  router.post(
    '/booking/guest',
    body('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom((value) => {
        try {
          Uuid.fromPrimitives(value);
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
          Uuid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    body('guest.first_name').isString().isLength({ min: 1, max: 255 }),
    body('guest.last_name').isString().isLength({ min: 1, max: 255 }),
    body('guest.email').isString().isLength({ min: 1, max: 255 }).isEmail(),
    body('guest.phone').isString().isLength({ min: 1, max: 255 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const addGuestBookingSession: AddGuestBookingSession =
        new AddGuestBookingSession(
          new BookingSessionRedisRepository(),
          new GuestMysqlRepository()
        );
      addGuestBookingSession.make(req);
      res.send({ data: 'ok' });
    }
  );

  router.post(
    '/booking/finish',
    body('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom((value) => {
        try {
          Uuid.fromPrimitives(value);
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
          Uuid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const finishBookingSession: FinishBookingSession =
        new FinishBookingSession(
          new BookingSessionRedisRepository(),
          new BookingMysqlRepository(),
          new ActivityMysqlRepository(),
          new EventMysqlRepository()
        );
      finishBookingSession.make(req);
      res.send({ data: 'ok' });
    }
  );

  // Booking
  router.get(
    '/booking/:booking_id',
    param('booking_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom((value) => {
        try {
          Uuid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const getBooking: GetBooking = new GetBooking(
        new BookingMysqlRepository()
      );
      const booking: Booking = await getBooking.make(req.params.booking_id);
      res.send({ data: booking });
    }
  );

  router.get(
    '/bookings/event/:event_id',
    param('event_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom((value) => {
        try {
          Uuid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const getBookings: GetBookings = new GetBookings(
        new BookingMysqlRepository()
      );
      const bookings: Booking[] = await getBookings.make(req.params.event_id);
      res.send({ data: bookings });
    }
  );
};
