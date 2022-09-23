import { makeNewRandomBooking } from '../../Mock/Booking/bookingSessionMother';
import { BookingFixtures } from '../../Mock/Booking/bookingFixtures';
import { GuestFixtures } from '../../Mock/Guest/guestFixtures';
import { makeRandomGuest } from '../../Mock/Guest/guestMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';

let application: BookingApp;

describe('Delete guest', () => {
  it('Delete guest without bookings correctly', async (done) => {
    const guestFixtures = new GuestFixtures();

    const randomPartner = makeRandomPartner();
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    await guestFixtures.add(randomGuest);
    request(application.httpServer)
      .delete('/guest/' + randomGuest.guest_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        expect(await guestFixtures.getByEmail(randomGuest.email)).toBeNull();
        done();
      });
  });

  it('Cannot delete guest with bookings', async (done) => {
    const guestFixtures = new GuestFixtures();
    const bookingFixtures = new BookingFixtures();

    const randomBooking = makeNewRandomBooking();
    await guestFixtures.add(randomBooking.guest);
    await bookingFixtures.addBooking(randomBooking);

    request(application.httpServer)
      .delete('/guest/' + randomBooking.guest.guest_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual(
          'Cannot delete a guest with bookings'
        );
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
