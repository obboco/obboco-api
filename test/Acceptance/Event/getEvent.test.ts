import { makeRandomEvent } from '../../Mock/Event/eventMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { makeRandomActivity } from '../../Mock/Activity/activityMother';
import { Activity } from '../../../src/Domain/activity';
import { Event } from '../../../src/Domain/event';
import { EventFixtures } from '../../Mock/Event/eventFixtures';
import request from 'supertest';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('Get event', () => {
  it('Get event correctly', async (done) => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const eventFixtures: EventFixtures = new EventFixtures();

    const event = makeRandomEvent(activity);
    await eventFixtures.addEvent(event);

    request(application.httpServer)
      .get('/event/' + event.event_id.value)
      .set('accept', 'application/json')
      .type('json')
      .expect(200)
      .then(async (response) => {
        eventFixtures
          .getEvent(response.body.data.event_id)
          .then((eventResult: Event) => {
            expect(eventResult.toPrimitives()).toEqual(response.body.data);
            done();
          });
      });
  });

  it('Get empty event', async (done) => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const event = makeRandomEvent(activity);

    request(application.httpServer)
      .get('/event/' + event.event_id.value)
      .set('accept', 'application/json')
      .type('json')
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual({});
        done();
      });
  });

  it('Get event with incorrect event_id format and throw an error', async (done) => {
    request(application.httpServer)
      .get('/event/wrong_id')
      .set('accept', 'application/json')
      .type('json')
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
