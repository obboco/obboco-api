import { makeNewRandomBooking } from '../../Mock/Booking/bookingSessionMother';
import { Booking } from '../../../src/Domain/booking';
import request from 'supertest';
import { BookingFixtures } from '../../Mock/Booking/bookingFixtures';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('Get booking', () => {
  it('Get booking correctly', async (done) => {
    const booking: Booking = makeNewRandomBooking();
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    request(application.httpServer)
      .get('/booking/' + booking.booking_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(booking.booking_id.value).toEqual(
          response.body.data.booking_id.value
        );
        expect(booking.guest.email).toEqual(response.body.data.guest.email);
        done();
      });
  });

  it('Get booking with incorrect booking_id format and throw an error', async (done) => {
    request(application.httpServer)
      .get('/booking/' + 'invalid_id')
      .set('accept', 'application/json')
      .type('json')
      .send()
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
