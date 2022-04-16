import { Router, Request, Response } from 'express';
import { getPartnerBySubdomain } from './../Application/Partner/getPartnerBySubdomain';
import { Partner } from '../Domain/partner';
import { GuestMysqlRepository } from '../Infrastructure/guestMysqlRepository';
import { UpdateEvent } from '../Application/Event/updateEvent';
import { DeleteEvent } from '../Application/Event/deleteEvent';
import { UpdateActivity } from '../Application/Activity/updateActivity';
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
import { Event } from '../Domain/event';
import { ListEvent } from '../Application/Event/listEvent';
import { EventMysqlRepository } from '../Infrastructure/eventMysqlRepository';
import { CreateEvent } from '../Application/Event/createEvent';
import { Activity } from '../Domain/activity';
import { ListActivity } from '../Application/Activity/listActivity';
import { ActivityMysqlRepository } from '../Infrastructure/activityMysqlRepository';
import { CreateActivity } from '../Application/Activity/createActivity';
import { Uuid } from '../Domain/Shared/uuid';
import { PartnerMysqlRepository } from '../Infrastructure/partnerMysqlRepository';
import cors from 'cors';
import { CreatePartner } from '../Application/Partner/createPartner';
import { BookingSessionRedisRepository } from '../Infrastructure/bookingRedisRepository';
import { body, param, validationResult } from 'express-validator';
import { GetActivity } from '../Application/Activity/getActivity';
import { uploadFiles } from '../Infrastructure/s3';
import { GetEvent } from '../Application/Event/getEvent';

import container from '../dependency-injection';

export const register = (router: Router) => {
  // Activity
  router.post(
    '/activity',
    body('title').isString().isLength({ min: 1, max: 255 }),
    body('description').isString().isLength({ min: 1, max: 255 }),
    body('partner_id')
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
    body('image_id')
      .optional()
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
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const createActivity: CreateActivity = new CreateActivity(
        new ActivityMysqlRepository()
      );
      const activity_id: Uuid = createActivity.make(req);
      res.send({ activity_id: activity_id.value });
    }
  );

  router.put(
    '/activity',
    body('activity_id')
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
    body('title').isString().isLength({ min: 1, max: 255 }),
    body('description').isString().isLength({ min: 1, max: 255 }),
    body('image_id')
      .optional()
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

    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updateActivity: UpdateActivity = new UpdateActivity(
        new ActivityMysqlRepository()
      );
      updateActivity.make(req);
      res.send({ data: 'ok' });
    }
  );

  router.get(
    '/activity/user/:user_id',
    param('user_id')
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

      const listActivity: ListActivity = new ListActivity(
        new ActivityMysqlRepository()
      );
      const activities: Activity[] = await listActivity.make(
        req.params.user_id
      );
      res.send({ data: activities });
    }
  );

  router.get(
    '/activity/:activity_id',
    param('activity_id')
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

      const getActivity: GetActivity = new GetActivity(
        new ActivityMysqlRepository()
      );
      const activity: Activity = await getActivity.make(req.params.activity_id);
      if (activity === null) {
        res.send({ data: {} });
      } else {
        res.send({ data: activity });
      }
    }
  );

  router.post('/activity/image', uploadFiles, (req, res) => {
    res.send({ data: { activity_image_id: res.locals.activityImageId } });
  });

  // Event
  router.post(
    '/event',
    body('start_date').isString().isLength({ min: 1, max: 255 }),
    body('duration').isNumeric(),
    body('capacity').isNumeric(),
    body('activity_id')
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
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const createEvent: CreateEvent = new CreateEvent(
        new EventMysqlRepository()
      );
      const event_id: Uuid = createEvent.make(req);
      res.send({ event_id: event_id.value });
    }
  );

  router.put(
    '/event',
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
    body('start_date').isString().isLength({ min: 1, max: 255 }),
    body('duration').isNumeric(),
    body('capacity').isNumeric(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updateEvent: UpdateEvent = new UpdateEvent(
        new EventMysqlRepository(),
        new BookingMysqlRepository()
      );
      try {
        await updateEvent.make(req);
        res.send({ data: 'ok' });
      } catch (e) {
        return res.status(400).json({ errors: [{ msg: e.message }] });
      }
    }
  );

  router.get(
    '/event/activity/:activity_id',
    param('activity_id')
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

      const listEvent: ListEvent = new ListEvent(new EventMysqlRepository());
      const events: Event[] = await listEvent.make({
        activityId: req.params.activity_id,
        time: req.query.time
      });
      res.send({ data: events });
    }
  );

  router.get(
    '/event/:event_id',
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

      const getEvent: GetEvent = new GetEvent(new EventMysqlRepository());
      const event: Event = await getEvent.make(req.params.event_id);
      if (event === null) {
        res.send({ data: {} });
      } else {
        res.send({ data: event });
      }
    }
  );

  router.delete(
    '/event/:event_id',
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

      const deleteEvent: DeleteEvent = new DeleteEvent(
        new EventMysqlRepository(),
        new BookingMysqlRepository()
      );

      try {
        await deleteEvent.make(req.params.event_id);
        return res.send({ data: 'ok' });
      } catch (e) {
        return res.status(400).json({ errors: [{ msg: e.message }] });
      }
    }
  );

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
