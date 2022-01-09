import { makeNewRandomBookingSession } from '../../Mock/BookingSession/bookingSessionMother';
import { BookingSession } from '../../../src/Domain/bookingSession';
import { BookingSessionFixtures } from '../../Mock/BookingSession/bookingSessionFixtures';
import { app } from '../../../src/app';
import request from 'supertest';

describe('Add guest details into the booking session', () => {
  it('Add guest into the booking session correctly', async (done) => {
    const bookingSessionFixtures: BookingSessionFixtures =
      new BookingSessionFixtures();
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(app)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        bookingSessionFixtures
          .get(bookingSession.event_id, bookingSession.booking_id)
          .then((bookingSessionResult: string) => {
            expect(bookingSession.guest).toEqual(
              JSON.parse(bookingSessionResult).guest
            );
            expect('guest').toEqual(JSON.parse(bookingSessionResult).status);
            done();
          });
      });
  });

  it('Add guest with empty event_id format and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(app)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: '',
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with incorrect event_id format and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(app)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: 'invalid_id',
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with empty booking_id format and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(app)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: '',
        guest: bookingSession.guest
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with incorrect booking_id format and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(app)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: 'invalid_id',
        guest: bookingSession.guest
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add guest with empty guest format and throw an error', async (done) => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(app)
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

    request(app)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest
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

    request(app)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest
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

    request(app)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest
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

    request(app)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest
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

    request(app)
      .post('/booking/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        guest: bookingSession.guest
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });
});
