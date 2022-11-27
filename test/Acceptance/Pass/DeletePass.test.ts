import {makeRandomGuest} from '../../Mock/Guest/guestMother';
import {makeRandomGuestPass} from '../../Mock/GuestPass/guestPassMother';
import {GuestPassFixtures} from '../../Mock/GuestPass/guestPassFixtures';
import {Pass} from '../../../src/Domain/Pass';
import {makeRandomPass} from '../../Mock/Pass/passMother';
import {PassFixtures} from '../../Mock/Pass/passFixtures';
import {makeRandomPartner} from '../../Mock/Partner/partnerMother';
import request from 'supertest';
import {application} from '../../hooks';

describe('Delete pass', () => {
  it('Delete pass correctly', async done => {
    const passFixtures = new PassFixtures();

    const randomPartner = makeRandomPartner();
    const randomPass = makeRandomPass(randomPartner);
    await passFixtures.add(randomPass);

    request(application.httpServer)
      .delete('/pass/' + randomPass.pass_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        passFixtures.get(randomPass.pass_id.value).then((pass: Pass) => {
          expect(pass).toBeNull();
          done();
        });
      });
  });

  it('Can not delete pass when it has some bookings assigned', async done => {
    const passFixtures = new PassFixtures();
    const guestPassFixtures = new GuestPassFixtures();

    const randomPartner = makeRandomPartner();
    const randomPass = makeRandomPass(randomPartner);
    await passFixtures.add(randomPass);

    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    const randomGuessPass = makeRandomGuestPass(
      randomGuest.guest_id,
      randomPass.pass_id,
      randomPartner.partner_id
    );
    await guestPassFixtures.add(randomGuessPass);

    request(application.httpServer)
      .delete('/pass/' + randomPass.pass_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(400)
      .then(async response => {
        expect(response.body.errors[0].msg).toEqual(
          'Cannot delete a pass with some bookings assigned'
        );
        done();
      });
  });
});
