import { GuestFixtures } from '../../Mock/Guest/guestFixtures';
import { makeRandomGuest } from '../../Mock/Guest/guestMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';

let application: BookingApp;

describe('Get guest', () => {
  it('Get empty guest list correctly', async (done) => {
    const randomPartner = makeRandomPartner();
    request(application.httpServer)
      .get('/guest/' + randomPartner.partner_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual([]);
        done();
      });
  });

  it('Get guest correctly', async (done) => {
    const guestFixtures = new GuestFixtures();

    const randomPartner = makeRandomPartner();
    guestFixtures.add(makeRandomGuest(randomPartner.partner_id));
    guestFixtures.add(makeRandomGuest(randomPartner.partner_id));
    guestFixtures.add(makeRandomGuest(randomPartner.partner_id));

    request(application.httpServer)
      .get('/guest/' + randomPartner.partner_id.value)
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
