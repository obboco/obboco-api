import { makeRandomPass } from '../../Mock/Pass/passMother';
import { PassFixtures } from '../../Mock/Pass/passFixtures';
import { GuestPass, GuestPassPrimitives } from '../../../src/Domain/guestPass';
import { GuestPassFixtures } from '../../Mock/GuestPass/guestPassFixtures';
import { makeRandomNewGuestPass } from '../../Mock/GuestPass/guestPassMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';
import { makeRandomGuest } from '../../Mock/Guest/guestMother';

let application: BookingApp;

describe('Create guest pass', () => {
  it('Create guest pass correctly', async (done) => {
    const guestPassFixtures = new GuestPassFixtures();
    const passFixtures = new PassFixtures();

    const randomPartner = makeRandomPartner();
    const randomPass = makeRandomPass(randomPartner);
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    const randomGuestPass = makeRandomNewGuestPass(
      randomGuest.guest_id,
      randomPass.pass_id,
      randomPartner.partner_id
    );
    await passFixtures.add(randomPass);

    request(application.httpServer)
      .post('/guestpass')
      .set('accept', 'application/json')
      .type('json')
      .send({
        guest_pass_id: randomGuestPass.guestPassId.value,
        pass_id: randomPass.pass_id.value,
        guest_id: randomGuestPass.guestId.value,
        partner_id: randomGuestPass.partnerId.value
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        guestPassFixtures
          .get(randomGuestPass.guestPassId.value)
          .then((guestPass: GuestPass) => {
            let guestPassResult: GuestPassPrimitives = guestPass.toPrimitives();
            delete guestPassResult.created;
            expect(guestPassResult).toEqual({
              guest_pass_id: randomGuestPass.guestPassId.value,
              pass_id: randomPass.pass_id.value,
              guest_id: randomGuestPass.guestId.value,
              partner_id: randomGuestPass.partnerId.value,
              title: randomPass.title,
              quantity: randomPass.quantity,
              current_quantity: 0,
              price: randomPass.price,
              currency: randomPass.currency,
              status: 'booked'
            });
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
