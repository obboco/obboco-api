import { Activity } from './../../../src/Domain/activity';
import { makeRandomIsolatedActivity } from '../../Mock/Activity/activityMother';
import { Uuid } from '../../../src/Domain/Shared/uuid';
import { ActivityFixtures } from '../../Mock/Activity/activityFixtures';
import { app } from '../../../src/app';
import request from 'supertest';

describe('Get empty activity', () => {
  it('Get empty activty', async (done) => {
    request(app)
      .get('/activity/' + Uuid.create().value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual({});
        done();
      });
  });

  it('Get activty with incorrect activity_id format and throw an error', async (done) => {
    request(app)
      .get('/activity/' + 'invalid_id')
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Get an activity correctly', async (done) => {
    const activityFixtures = new ActivityFixtures();
    const activity = makeRandomIsolatedActivity();
    await activityFixtures.addActivity(activity);

    request(app)
      .get('/activity/' + activity.activity_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data.activity_id.value).toEqual(
          activity.activity_id.value
        );
        done();
      });
  });
});
