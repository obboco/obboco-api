import { Guest } from './../../../src/Domain/guest';
import { GuestFixtures } from '../../Mock/Guest/guestFixtures';
import { makeNewRandomBookingSession } from '../../Mock/BookingSession/bookingSessionMother';
import { BookingSession } from '../../../src/Domain/bookingSession';
import { BookingSessionFixtures } from '../../Mock/BookingSession/bookingSessionFixtures';
import request from 'supertest';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('Add guest details into the booking session', () => {
  it('Add guest into the booking session correctly', async (done) => {
    const bookingSessionFixtures: BookingSessionFixtures =
      new BookingSessionFixtures();
    const bookingSession: BookingSession = makeNewRandomBookingSession();
    const guestFixtures: GuestFixtures = new GuestFixtures();

    request(application.httpServer)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest.toPrimitives()
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        bookingSessionFixtures
          .get(bookingSession.event_id, bookingSession.booking_id)
          .then((bookingSessionResult: BookingSession) => {
            expect('guest').toEqual(bookingSessionResult.status);
            expect(bookingSession.guest).toEqual(bookingSessionResult.guest);
          });
      })
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        guestFixtures.getByEmail(bookingSession.guest.email).then((guest) => {
          expect(guest).not.toBeNull();
          expect(bookingSession.guest).toEqual(guest);
          done();
        });
      });
  });

  it('Add guest with empty event_id format and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: '',
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest.toPrimitives()
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with incorrect event_id format and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: 'invalid_id',
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest.toPrimitives()
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with empty booking_id format and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: '',
        guest: bookingSession.guest.toPrimitives()
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with incorrect booking_id format and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: 'invalid_id',
        guest: bookingSession.guest.toPrimitives()
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with empty guest format and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: ''
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with empty guest first_name and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();
    bookingSession.guest.first_name = '';

    request(application.httpServer)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest.toPrimitives()
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with empty guest last_name and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();
    bookingSession.guest.last_name = '';

    request(application.httpServer)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest.toPrimitives()
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with empty guest email and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();
    bookingSession.guest.email = '';

    request(application.httpServer)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest.toPrimitives()
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with wrong format guest email and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();
    bookingSession.guest.email = 'wrong format';

    request(application.httpServer)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest.toPrimitives()
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with empty guest phone and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();
    bookingSession.guest.phone = '';

    request(application.httpServer)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest.toPrimitives()
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
