import { Booking } from '../../../src/Domain/booking';
import {
  makeNewRandomBookingSessionWithEvent,
  makeNewRandomBookingSession
} from '../../Mock/BookingSession/bookingSessionMother';
import { BookingSession } from '../../../src/Domain/bookingSession';
import { BookingSessionFixtures } from '../../Mock/BookingSession/bookingSessionFixtures';
import { ActivityFixtures } from '../../Mock/Activity/activityFixtures';
import { makeRandomEvent } from '../../Mock/Event/eventMother';
import { EventFixtures } from '../../Mock/Event/eventFixtures';
import { makeRandomActivity } from '../../Mock/Activity/activityMother';
import { Activity } from '../../../src/Domain/activity';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { Event } from '../../../src/Domain/event';
import request from 'supertest';
import { BookingFixtures } from '../../Mock/Booking/bookingFixtures';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('Finish booking session', () => {
  it('Finish booking session with wrong event_id and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/finish')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: 'wrong_booking_id'
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Finish booking session with empty booking_id and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/finish')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: ''
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Finish booking session correctly', async (done) => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const activityFixtures: ActivityFixtures = new ActivityFixtures();
    await activityFixtures.addActivity(activity);

    const event: Event = makeRandomEvent(activity);
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(event);

    const bookingSessionFixtures: BookingSessionFixtures =
      new BookingSessionFixtures();
    const bookingSession: BookingSession =
      makeNewRandomBookingSessionWithEvent(event);
    bookingSessionFixtures.add(bookingSession);

    const bookingFixtures: BookingFixtures = new BookingFixtures();
    request(application.httpServer)
      .post('/booking/finish')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      })
      .then(async () => {
        bookingSessionFixtures
          .get(bookingSession.event_id, bookingSession.booking_id)
          .then((bookingSessionResult: BookingSession) => {
            expect(bookingSessionResult).toBeNull();
          });
      })
      .then(async () => {
        bookingFixtures
          .get(bookingSession.booking_id)
          .then((bookingResult: Booking) => {
            expect(bookingSession.booking_id).toEqual(bookingResult.booking_id);
            expect(activity.title).toEqual(bookingResult.title);
            expect(event.start_date).toEqual(bookingResult.start_date);
          });
      })
      .then(async () => {
        eventFixtures
          .getEvent(event.event_id.value)
          .then((eventResult: Event) => {
            expect(1).toEqual(eventResult.current_capacity);
          });
        done();
      });
  });

  it('Finish booking session with empty event_id and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/finish')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: '',
        booking_id: bookingSession.booking_id.value
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Finish booking session with wrong event_id and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/finish')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: 'wrong_event_id',
        booking_id: bookingSession.booking_id.value
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });
});

beforeAll(async () => {
  application = new BookingApp();
  await application.start();
});

afterAll(async () => {
  await application.stop();
});
