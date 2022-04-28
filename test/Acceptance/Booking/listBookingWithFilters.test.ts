import { Partner } from './../../../src/Domain/partner';
import { Event } from '../../../src/Domain/event';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { makeRandomActivity } from '../../Mock/Activity/activityMother';
import { makeRandomEvent } from '../../Mock/Event/eventMother';
import { makeRandomBooking } from '../../Mock/Booking/bookingSessionMother';
import request from 'supertest';
import { BookingFixtures } from '../../Mock/Booking/bookingFixtures';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('List booking with filters', () => {
  it('Get bookings by partner correctly', async (done) => {
    const partner: Partner = makeRandomPartner();
    const event: Event = makeRandomEvent(makeRandomActivity(partner));

    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(makeRandomBooking(event, partner));
    await bookingFixtures.addBooking(makeRandomBooking(event, partner));
    await bookingFixtures.addBooking(makeRandomBooking(event, partner));

    request(application.httpServer)
      .get('/bookings?filter=partner&partner_id=' + partner.partner_id.value)
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
