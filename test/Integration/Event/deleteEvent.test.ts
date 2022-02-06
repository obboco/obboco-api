import { BookingFixtures } from './../../Mock/Booking/bookingFixtures';
import { Booking } from './../../../src/Domain/booking';
import { makeNewRandomBookingWithEvent } from './../../Mock/Booking/bookingSessionMother';
import { makeRandomEvent } from '../../Mock/Event/eventMother';
import { EventFixtures } from '../../Mock/Event/eventFixtures';
import { makeRandomActivity } from '../../Mock/Activity/activityMother';
import { Activity } from '../../../src/Domain/activity';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { app } from '../../../src/app';
import request from 'supertest';

describe('Delete events', () => {
  it('Delete event without bookings correctly', async (done) => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const eventFixtures: EventFixtures = new EventFixtures();

    const randomEvent = makeRandomEvent(activity);
    await eventFixtures.addEvent(randomEvent);

    request(app)
      .delete('/event/' + randomEvent.event_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        expect(
          await eventFixtures.getEvent(randomEvent.event_id.value)
        ).toBeNull();
        done();
      });
  });

  it('Cannot delete event with bookings', async (done) => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());

    const randomEvent = makeRandomEvent(activity);
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(randomEvent);

    const booking: Booking = makeNewRandomBookingWithEvent(randomEvent);
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    request(app)
      .delete('/event/' + randomEvent.event_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual(
          'Cannot delete an event with bookings'
        );
        done();
      });
  });

  it('Delete event with wrong event_id format and throw an error', async (done) => {
    request(app)
      .delete('/event/wrong_event_id')
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
