import { makeRandomEvent } from './../../Mock/Event/eventMother';
import { makeRandomPartner } from './../../Mock/Partner/partnerMother';
import { makeRandomActivity } from './../../Mock/Activity/activityMother';
import { Activity } from './../../../src/Domain/activity';
import { Event } from '../../../src/Domain/event';
import { EventFixtures } from '../../Mock/Event/eventFixtures';
import { app } from '../../../src/app';
import request from 'supertest';

describe('Get event', () => {
  it('Get event correctly', async (done) => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const eventFixtures: EventFixtures = new EventFixtures();

    const event = makeRandomEvent(activity);
    await eventFixtures.addEvent(event);

    request(app)
      .get('/event/' + event.event_id.value)
      .set('accept', 'application/json')
      .type('json')
      .expect(200)
      .then(async (response) => {
        eventFixtures
          .getEvent(response.body.data.event_id.value)
          .then((eventResult: Event) => {
            expect(eventResult.event_id).toEqual(event.event_id);
            done();
          });
      });
  });

  it('Get empty event', async (done) => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const event = makeRandomEvent(activity);

    request(app)
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
    request(app)
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
