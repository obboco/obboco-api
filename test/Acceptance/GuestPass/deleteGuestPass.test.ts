import { makeRandomGuestPass } from './../../Mock/GuestPass/guestPassMother';
import { GuestPass } from './../../../src/Domain/guestPass';
import { makeRandomGuest } from '../../Mock/Guest/guestMother';
import { makeRandomNewGuestPass } from '../../Mock/GuestPass/guestPassMother';
import { GuestPassFixtures } from '../../Mock/GuestPass/guestPassFixtures';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';

let application: BookingApp;

describe('Delete guest pass', () => {
  it('Delete guest pass correctly', async (done) => {
    const guestPassFixtures = new GuestPassFixtures();

    const randomPartner = makeRandomPartner();
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    const randomGuestPass: GuestPass = makeRandomNewGuestPass(
      randomGuest.guest_id,
      randomPartner.partner_id,
      randomPartner.partner_id
    );
    await guestPassFixtures.add(randomGuestPass);

    request(application.httpServer)
      .delete('/guestpass/' + randomGuestPass.guestPassId.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        guestPassFixtures
          .get(randomGuestPass.guestPassId.value)
          .then((guestPass: GuestPass) => {
            expect(guestPass).toBeNull();
            done();
          });
      });
  });

  it('Can not delete guest pass when it has some bookings assigned', async (done) => {
    const guestPassFixtures = new GuestPassFixtures();

    const randomPartner = makeRandomPartner();
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    const randomGuestPass: GuestPass = makeRandomGuestPass(
      randomGuest.guest_id,
      randomPartner.partner_id,
      randomPartner.partner_id
    );
    randomGuestPass.currentQuantity = 1;
    await guestPassFixtures.add(randomGuestPass);

    request(application.httpServer)
      .delete('/guestpass/' + randomGuestPass.guestPassId.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual(
          'Cannot delete a guest pass with some bookings assigned'
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
