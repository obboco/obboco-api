import { Uuid } from './../../../src/Domain/Shared/uuid';
import { makeRandomIsolatedActivity } from './../../Mock/Activity/activityMother';
import { Activity } from '../../../src/Domain/activity';
import { ActivityFixtures } from '../../Mock/Activity/activityFixtures';
import { app } from '../../../src/app';
import request from 'supertest';
import faker from 'faker';

describe('Update activity', () => {
  it('Update activity correctly', async (done) => {
    const activity: Activity = makeRandomIsolatedActivity();
    const activityFixtures = new ActivityFixtures();
    await activityFixtures.addActivity(activity);

    const randomTitle = faker.lorem.word();
    const randomDescription = faker.lorem.sentence();

    request(app)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: activity.activity_id.value,
        title: randomTitle,
        description: randomDescription
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        activityFixtures
          .getActivity(activity.activity_id.value)
          .then((activityResult: Activity) => {
            expect(randomTitle).toEqual(activityResult.title);
            expect(randomDescription).toEqual(activityResult.description);
            done();
          });
      });
  });

  it('Update activity with empty activity_id and throw an error', async (done) => {
    const randomUuid = '';
    const randomTitle = faker.lorem.word();
    const randomDescription = faker.lorem.sentence();

    request(app)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: randomUuid,
        title: randomTitle,
        description: randomDescription
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Update activity with empty title and throw an error', async (done) => {
    const randomUuid = Uuid.create().value;
    const randomTitle = '';
    const randomDescription = faker.lorem.sentence();

    request(app)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: randomUuid,
        title: randomTitle,
        description: randomDescription
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Update activity with empty description and throw an error', async (done) => {
    const randomUuid = Uuid.create().value;
    const randomTitle = faker.lorem.word();
    const randomDescription = '';

    request(app)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: randomUuid,
        title: randomTitle,
        description: randomDescription
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });
});
