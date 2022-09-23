import { GuestFixtures } from '../../Mock/Guest/guestFixtures';
import { makeRandomGuest } from '../../Mock/Guest/guestMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';

let application: BookingApp;

describe('Get guests', () => {
  it('Get empty guest list correctly', async (done) => {
    const randomPartner = makeRandomPartner();
    request(application.httpServer)
      .get('/guests/' + randomPartner.partner_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual([]);
        done();
      });
  });

  it('Get guests correctly', async (done) => {
    const guestFixtures = new GuestFixtures();

    const randomPartner = makeRandomPartner();
    await guestFixtures.add(makeRandomGuest(randomPartner.partner_id));
    await guestFixtures.add(makeRandomGuest(randomPartner.partner_id));
    await guestFixtures.add(makeRandomGuest(randomPartner.partner_id));

    request(application.httpServer)
      .get('/guests/' + randomPartner.partner_id.value)
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
