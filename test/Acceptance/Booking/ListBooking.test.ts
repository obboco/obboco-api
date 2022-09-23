import { Event } from '../../../src/Domain/Event';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { makeRandomActivity } from '../../Mock/Activity/activityMother';
import { makeRandomEvent } from '../../Mock/Event/eventMother';
import { Ulid } from '../../../src/Domain/Shared/Ulid';
import { makeNewRandomBookingWithEvent } from '../../Mock/Booking/bookingSessionMother';
import request from 'supertest';
import { BookingFixtures } from '../../Mock/Booking/bookingFixtures';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('List booking', () => {
  it('List empty events', async (done) => {
    request(application.httpServer)
      .get('/bookings/event/' + Ulid.create().value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual([]);
        done();
      });
  });

  it('Get bookings correctly', async (done) => {
    const event: Event = makeRandomEvent(
      makeRandomActivity(makeRandomPartner())
    );

    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(makeNewRandomBookingWithEvent(event));
    await bookingFixtures.addBooking(makeNewRandomBookingWithEvent(event));
    await bookingFixtures.addBooking(makeNewRandomBookingWithEvent(event));

    request(application.httpServer)
      .get('/bookings/event/' + event.event_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        expect(JSON.parse(JSON.stringify(response.body.data)).length).toEqual(
          3
        );
        done();
      });
  });

  it('List events with incorrect event_id format and throw an error', async (done) => {
    request(application.httpServer)
      .get('/bookings/event/' + 'invalid_ulid')
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
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
