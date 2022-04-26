import { BookingFixtures } from './../../Mock/Booking/bookingFixtures';
import { makeNewRandomBooking } from './../../Mock/Booking/bookingSessionMother';
import { Booking } from './../../../src/Domain/booking';
import request from 'supertest';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('Update booking', () => {
  it('Update booking status from booked to paid', async (done) => {
    const booking: Booking = makeNewRandomBooking();
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    request(application.httpServer)
      .put('/booking')
      .set('accept', 'application/json')
      .type('json')
      .send({
        booking_id: booking.booking_id.value,
        status: 'paid'
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        bookingFixtures
          .get(booking.booking_id)
          .then((bookingResult: Booking) => {
            expect('paid').toEqual(bookingResult.status);
            done();
          });
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
