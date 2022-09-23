import { makeRandomPass } from '../../Mock/Pass/passMother';
import { GuestPass } from '../../../src/Domain/GuestPass';
import { GuestPassFixtures } from '../../Mock/GuestPass/guestPassFixtures';
import { makeRandomNewGuestPass } from '../../Mock/GuestPass/guestPassMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';
import { makeRandomGuest } from '../../Mock/Guest/guestMother';

let application: BookingApp;

describe('Update guest pass', () => {
  it('Update guest pass correctly', async (done) => {
    const guestPassFixtures = new GuestPassFixtures();

    const randomPartner = makeRandomPartner();
    const randomPass = makeRandomPass(randomPartner);
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    const randomGuestPass = makeRandomNewGuestPass(
      randomGuest.guest_id,
      randomPass.pass_id,
      randomPartner.partner_id
    );
    await guestPassFixtures.add(randomGuestPass);

    request(application.httpServer)
      .put('/guestpass')
      .set('accept', 'application/json')
      .type('json')
      .send({
        guest_pass_id: randomGuestPass.guestPassId.value,
        status: 'paid'
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        guestPassFixtures
          .get(randomGuestPass.guestPassId.value)
          .then((guestPass: GuestPass) => {
            expect('paid').toEqual(guestPass.status);
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
