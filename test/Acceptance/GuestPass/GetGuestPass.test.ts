import { GuestPass } from '../../../src/Domain/GuestPass';
import { GuestPassFixtures } from '../../Mock/GuestPass/guestPassFixtures';
import { makeRandomNewGuestPass } from '../../Mock/GuestPass/guestPassMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import { makeRandomGuest } from '../../Mock/Guest/guestMother';
import { makeRandomPass } from '../../Mock/Pass/passMother';
import request from 'supertest';

let application: BookingApp;

describe('Get guest pass', () => {
  it('Get empty guest pass correctly', async (done) => {
    const randomPartner = makeRandomPartner();
    const randomPass = makeRandomPass(randomPartner);
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    const randomGuestPass: GuestPass = makeRandomNewGuestPass(
      randomGuest.guest_id,
      randomPass.pass_id,
      randomPartner.partner_id
    );

    request(application.httpServer)
      .get(`/guestpass/${randomGuestPass.guestPassId.value}`)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(404)
      .then(async (response) => {
        expect(response.body.data).toEqual({});
        done();
      });
  });

  it('Get 1 guest pass correctly', async (done) => {
    const guestPassFixtures = new GuestPassFixtures();
    const randomPartner = makeRandomPartner();
    const randomPass = makeRandomPass(randomPartner);
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    const randomGuestPass: GuestPass = makeRandomNewGuestPass(
      randomGuest.guest_id,
      randomPass.pass_id,
      randomPartner.partner_id
    );
    await guestPassFixtures.add(randomGuestPass);

    request(application.httpServer)
      .get(`/guestpass/${randomGuestPass.guestPassId.value}`)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        delete response.body.data.created_at;
        expect(randomGuestPass.toPrimitives()).toEqual(response.body.data);
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
