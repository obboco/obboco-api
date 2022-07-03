import { GuestPass } from './../../../src/Domain/guestPass';
import { GuestPassFixtures } from './../../Mock/GuestPass/guestPassFixtures';
import { makeRandomNewGuestPass } from './../../Mock/GuestPass/guestPassMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';
import { makeRandomGuest } from '../../Mock/Guest/guestMother';

let application: BookingApp;

describe('Create guest pass', () => {
  it('Create guest pass correctly', async (done) => {
    const guestPassFixtures = new GuestPassFixtures();

    const randomPartner = makeRandomPartner();
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    const randomGuestPass = makeRandomNewGuestPass(
      randomGuest.guest_id,
      randomPartner.partner_id
    );

    request(application.httpServer)
      .post('/guestPass')
      .set('accept', 'application/json')
      .type('json')
      .send({
        guest_pass_id: randomGuestPass.guestPassId.value,
        pass_id: randomGuestPass.passId.value,
        guest_id: randomGuestPass.guestId.value,
        quantity: randomGuestPass.quantity,
        price: randomGuestPass.price,
        currency: randomGuestPass.currency
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        guestPassFixtures
          .get(randomGuestPass.guestPassId.value)
          .then((guestPass: GuestPass) => {
            expect(guestPass.toPrimitives()).toEqual(
              randomGuestPass.toPrimitives()
            );
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
