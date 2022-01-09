import { BookingSession } from '../../../src/Domain/bookingSession';
import { BookingSessionFixtures } from '../../Mock/BookingSession/bookingSessionFixtures';
import { makeRandomEvent } from '../../Mock/Event/eventMother';
import { EventFixtures } from '../../Mock/Event/eventFixtures';
import { makeRandomActivity } from '../../Mock/Activity/activityMother';
import { Activity } from '../../../src/Domain/activity';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { app } from '../../../src/app';
import request from 'supertest';
import { Event } from '../../../src/Domain/event';

describe('Initilalize the booking funnel', () => {
  it('Initialize the booking correctly', async (done) => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const event: Event = makeRandomEvent(activity);
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(event);
    const bookingSessionFixtures: BookingSessionFixtures =
      new BookingSessionFixtures();

    request(app)
      .post('/booking/init')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: event.event_id.value
      })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        bookingSessionFixtures
          .get(event.event_id, response.body.data.booking_id)
          .then((bookingSession: string) => {
            expect(event.event_id.value).toEqual(
              JSON.parse(bookingSession).event_id.value
            );
            done();
          });
      });
  });

  it('Initialize the booking with empty event_id format and throw an error', async (done) => {
    request(app)
      .post('/booking/init')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: ''
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Initialize the booking with wrong event_id format and throw an error', async (done) => {
    request(app)
      .post('/booking/init')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: 'wrong_id'
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });
});
