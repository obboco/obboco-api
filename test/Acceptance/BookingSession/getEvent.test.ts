import { makeNewRandomBookingSessionWithEvent } from '../../Mock/BookingSession/bookingSessionMother';
import { BookingSessionFixtures } from '../../Mock/BookingSession/bookingSessionFixtures';
import { ActivityFixtures } from '../../Mock/Activity/activityFixtures';
import { makeRandomEvent } from '../../Mock/Event/eventMother';
import { EventFixtures } from '../../Mock/Event/eventFixtures';
import { makeRandomActivity } from '../../Mock/Activity/activityMother';
import { Activity } from '../../../src/Domain/activity';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { Event } from '../../../src/Domain/event';
import request from 'supertest';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('Get event and activity for the booking page', () => {
  /*
  it('Get event correctly', async (done) => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const activityFixtures: ActivityFixtures = new ActivityFixtures();
    await activityFixtures.addActivity(activity);

    const event: Event = makeRandomEvent(activity);
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(event);

    request(application.httpServer)
      .get('/booking/event/' + event.event_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data.event.event_id.value).toEqual(
          event.event_id.value
        );
        done();
      });
  });*/

  it('Get event correctly with booking sessions in progress', async (done) => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const activityFixtures: ActivityFixtures = new ActivityFixtures();
    await activityFixtures.addActivity(activity);

    const event: Event = makeRandomEvent(activity);
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(event);

    const bookingSessionFixtures: BookingSessionFixtures =
      new BookingSessionFixtures();
    bookingSessionFixtures.add(makeNewRandomBookingSessionWithEvent(event));
    bookingSessionFixtures.add(makeNewRandomBookingSessionWithEvent(event));

    request(application.httpServer)
      .get('/booking/event/' + event.event_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data.event.current_capacity).toEqual(2);
        done();
      });
  });

  it('Get event and activity with incorrect event_id format and throw an error', async (done) => {
    request(application.httpServer)
      .get('/booking/event/' + 'invalid_id')
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
