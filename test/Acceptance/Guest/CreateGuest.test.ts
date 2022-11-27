import {Guest} from '../../../src/Domain/Guest';
import {GuestFixtures} from '../../Mock/Guest/guestFixtures';
import {makeRandomGuest} from '../../Mock/Guest/guestMother';
import {makeRandomPartner} from '../../Mock/Partner/partnerMother';
import request from 'supertest';
import {application} from '../../hooks';

describe('Create guest', () => {
  it('Create guest correctly', async done => {
    const guestFixtures = new GuestFixtures();

    const randomPartner = makeRandomPartner();
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    request(application.httpServer)
      .post('/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        guest_id: randomGuest.guest_id.value,
        partner_id: randomGuest.partner_id.value,
        first_name: randomGuest.first_name,
        last_name: randomGuest.last_name,
        email: randomGuest.email,
        phone: randomGuest.phone,
      })
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        guestFixtures.getByEmail(randomGuest.email).then((guest: Guest) => {
          expect(guest.toPrimitives()).toEqual(randomGuest.toPrimitives());
          done();
        });
      });
  });
});
