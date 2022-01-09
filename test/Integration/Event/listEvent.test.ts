import { makeRandomEvent } from './../../Mock/Event/eventMother';
import { EventFixtures } from './../../Mock/Event/eventFixtures';
import { makeRandomActivity } from '../../Mock/Activity/activityMother';
import { Uuid } from '../../../src/Domain/Shared/uuid';
import { Activity } from '../../../src/Domain/activity';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { app } from '../../../src/app';
import request from 'supertest';

describe('List events', () => {
  it('List empty events', async (done) => {
    request(app)
      .get('/event/activity/' + Uuid.create().value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual([]);
        done();
      });
  });

  it('List some events', async (done) => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const eventFixtures: EventFixtures = new EventFixtures();

    await eventFixtures.addEvent(makeRandomEvent(activity));
    await eventFixtures.addEvent(makeRandomEvent(activity));
    await eventFixtures.addEvent(makeRandomEvent(activity));

    request(app)
      .get('/event/activity/' + activity.activity_id.value)
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

  it('List events with wrong activity_id format and throw an error', async (done) => {
    request(app)
      .get('/event/activity/' + 'wrong_id')
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
