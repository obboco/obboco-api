import { GuestPassFixtures } from '../../Mock/GuestPass/guestPassFixtures';
import { makeRandomNewGuestPass } from '../../Mock/GuestPass/guestPassMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';
import { makeRandomGuest } from '../../Mock/Guest/guestMother';

let application: BookingApp;

describe('Get guest pass', () => {
  it('Get empty guest pass by guest correctly', async (done) => {
    const randomPartner = makeRandomPartner();
    const randomGuest = makeRandomGuest(randomPartner.partner_id);

    request(application.httpServer)
      .get('/guestpass/guest/' + randomGuest.guest_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual([]);
        done();
      });
  });

  it('Get 1 guest pass by guest correctly', async (done) => {
    const guestPassFixtures = new GuestPassFixtures();

    const randomPartner = makeRandomPartner();
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    const randomGuestPass = makeRandomNewGuestPass(
      randomGuest.guest_id,
      randomPartner.partner_id
    );
    await guestPassFixtures.add(randomGuestPass);

    request(application.httpServer)
      .get('/guestpass/guest/' + randomGuest.guest_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect([randomGuestPass.toPrimitives()]).toEqual(response.body.data);
        done();
      });
  });

  it('Get some guest pass by guest correctly', async (done) => {
    const guestPassFixtures = new GuestPassFixtures();

    const randomPartner = makeRandomPartner();
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    const randomGuestPass = makeRandomNewGuestPass(
      randomGuest.guest_id,
      randomPartner.partner_id
    );
    await guestPassFixtures.add(randomGuestPass);
    await guestPassFixtures.add(
      makeRandomNewGuestPass(randomGuest.guest_id, randomPartner.partner_id)
    );
    await guestPassFixtures.add(
      makeRandomNewGuestPass(randomGuest.guest_id, randomPartner.partner_id)
    );

    request(application.httpServer)
      .get('/guestpass/guest/' + randomGuest.guest_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(JSON.parse(JSON.stringify(response.body.data)).length).toEqual(
          3
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
