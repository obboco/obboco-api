import {
  makeCustomGuestPassPrimitives,
  makeCustomGuestPass
} from '../../Mock/GuestPass/guestPassMother';
import { GuestPassPrimitives } from '../../../src/Domain/guestPass';
import { GuestPassFixtures } from '../../Mock/GuestPass/guestPassFixtures';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';
import { makeRandomGuest } from '../../Mock/Guest/guestMother';

let application: BookingApp;

describe('Get guest pass', () => {
  it('Get some guest pass by guest correctly', async (done) => {
    const guestPassFixtures = new GuestPassFixtures();

    const randomPartner = makeRandomPartner();
    const randomGuest = makeRandomGuest(randomPartner.partner_id);

    let customGuestPass: GuestPassPrimitives = makeCustomGuestPassPrimitives(
      randomGuest.guest_id,
      randomPartner.partner_id,
      randomPartner.partner_id
    );
    customGuestPass.created_date = '2020-05-01';
    await guestPassFixtures.add(makeCustomGuestPass(customGuestPass));
    customGuestPass = makeCustomGuestPassPrimitives(
      randomGuest.guest_id,
      randomPartner.partner_id,
      randomPartner.partner_id
    );
    customGuestPass.created_date = '2020-05-01';
    await guestPassFixtures.add(makeCustomGuestPass(customGuestPass));
    customGuestPass = makeCustomGuestPassPrimitives(
      randomGuest.guest_id,
      randomPartner.partner_id,
      randomPartner.partner_id
    );
    customGuestPass.created_date = '2021-05-01';
    await guestPassFixtures.add(makeCustomGuestPass(customGuestPass));

    request(application.httpServer)
      .get(
        `/guestpass?partner=${randomPartner.partner_id.value}&start_date=2020-01-01&end_date=2020-12-02`
      )
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        expect(JSON.parse(JSON.stringify(response.body.data)).length).toEqual(
          2
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
