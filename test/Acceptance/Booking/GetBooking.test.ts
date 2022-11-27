import {makeNewRandomBooking} from '../../Mock/Booking/bookingSessionMother';
import {Booking} from '../../../src/Domain/Booking';
import request from 'supertest';
import {BookingFixtures} from '../../Mock/Booking/bookingFixtures';
import {application} from '../../hooks';

describe('Get booking', () => {
  it('Get booking correctly', async done => {
    const booking: Booking = makeNewRandomBooking();
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    request(application.httpServer)
      .get('/booking/' + booking.booking_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async response => {
        expect(booking.toPrimitives()).toEqual(response.body.data);
        done();
      });
  });

  it('Get booking with incorrect booking_id format and throw an error', async done => {
    request(application.httpServer)
      .get('/booking/' + 'invalid_id')
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(400)
      .then(async response => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });
});
