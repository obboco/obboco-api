import { makeNewRandomBooking } from '../../Mock/Booking/bookingSessionMother';
import { Booking } from '../../../src/Domain/booking';
import { app } from '../../../src/app';
import request from 'supertest';
import { BookingFixtures } from '../../Mock/Booking/bookingFixtures';

describe('Get booking', () => {
  it('Get booking correctly', async (done) => {
    const booking: Booking = makeNewRandomBooking();
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    request(app)
      .get('/booking/' + booking.booking_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(booking.booking_id.value).toEqual(
          response.body.data.booking_id.value
        );
        expect(booking.guest).toEqual(response.body.data.guest);
        done();
      });
  });

  it('Get booking with incorrect booking_id format and throw an error', async (done) => {
    request(app)
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
