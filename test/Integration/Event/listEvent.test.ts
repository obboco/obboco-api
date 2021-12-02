import { makeRandomEvent } from './../../Mock/Event/eventMother';
import { EventFixtures } from './../../Mock/Event/eventFixtures';
import { makeRandomActivity } from '../../Mock/Activity/activityMother';
import { Uuid } from '../../../src/Domain/Shared/uuid';
import { Activity } from '../../../src/Domain/activity';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { ActivityFixtures } from '../../Mock/Activity/activityFixtures';
import { app } from '../../../src/app';
import request from 'supertest';
import faker from 'faker';

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

    eventFixtures.addEvent(makeRandomEvent(activity));
    eventFixtures.addEvent(makeRandomEvent(activity));
    eventFixtures.addEvent(makeRandomEvent(activity));

    request(app)
      .get('/event/activity/' + activity.activity_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect(JSON.parse(JSON.stringify(response.body.data)).length).toEqual(
          3
        );
        done();
      });
  });
});
