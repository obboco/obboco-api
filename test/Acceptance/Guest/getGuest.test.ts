import { GuestFixtures } from '../../Mock/Guest/guestFixtures';
import { makeRandomGuest } from '../../Mock/Guest/guestMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';

let application: BookingApp;

describe('Get guest', () => {
  it('Guest not found', async (done) => {
    const randomPartner = makeRandomPartner();
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    request(application.httpServer)
      .get('/guest/' + randomGuest.guest_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(404)
      .then(async (response) => {
        expect(response.body.data).toEqual({});
        done();
      });
  });

  it('Get guest correctly', async (done) => {
    const guestFixtures = new GuestFixtures();

    const randomPartner = makeRandomPartner();
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    await guestFixtures.add(randomGuest);

    request(application.httpServer)
      .get('/guest/' + randomGuest.guest_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual(randomGuest.toPrimitives());
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
