import { Event } from './../../../src/Domain/event';
import { makeRandomPartner } from './../../Mock/Partner/partnerMother';
import { makeRandomActivity } from './../../Mock/Activity/activityMother';
import { makeRandomEvent } from './../../Mock/Event/eventMother';
import { Uuid } from './../../../src/Domain/Shared/uuid';
import { makeNewRandomBookingWithEvent } from '../../Mock/Booking/bookingSessionMother';
import { Booking } from '../../../src/Domain/booking';
import { app } from '../../../src/app';
import request from 'supertest';
import { BookingFixtures } from '../../Mock/Booking/bookingFixtures';

describe('List booking', () => {
  it('List empty events', async (done) => {
    request(app)
      .get('/bookings/event/' + Uuid.create().value)
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

    request(app)
      .get('/bookings/event/' + event.event_id.value)
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
