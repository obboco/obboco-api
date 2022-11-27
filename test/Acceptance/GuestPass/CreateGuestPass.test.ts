import {makeRandomPass} from '../../Mock/Pass/passMother';
import {PassFixtures} from '../../Mock/Pass/passFixtures';
import {GuestPass, GuestPassPrimitives} from '../../../src/Domain/GuestPass';
import {GuestPassFixtures} from '../../Mock/GuestPass/guestPassFixtures';
import {makeRandomNewGuestPass} from '../../Mock/GuestPass/guestPassMother';
import {makeRandomPartner} from '../../Mock/Partner/partnerMother';
import request from 'supertest';
import {makeRandomGuest} from '../../Mock/Guest/guestMother';
import {application} from '../../hooks';

describe('Create guest pass', () => {
  it('Create guest pass correctly', async done => {
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
        partner_id: randomGuestPass.partnerId.value,
      })
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        guestPassFixtures
          .get(randomGuestPass.guestPassId.value)
          .then((guestPass: GuestPass) => {
            let guestPassResult: GuestPassPrimitives = guestPass.toPrimitives();
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
              status: 'booked',
            });
            done();
          });
      });
  });
});
