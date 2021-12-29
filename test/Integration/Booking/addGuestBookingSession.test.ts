import { makeNewRandomBookingSession } from './../../Mock/Booking/bookingSessionMother';
import { BookingSession } from '../../../src/Domain/bookingSession';
import { BookingSessionFixtures } from '../../Mock/Booking/bookingSessionFixtures';
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
});
