import { Ulid } from '../../../src/Domain/Shared/ulid';
import { makeRandomIsolatedActivity } from '../../Mock/Activity/activityMother';
import { Activity } from '../../../src/Domain/activity';
import { ActivityFixtures } from '../../Mock/Activity/activityFixtures';
import request from 'supertest';
import faker from 'faker';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('Update activity', () => {
  it('Update activity correctly', async (done) => {
    const activity: Activity = makeRandomIsolatedActivity();
    const activityFixtures = new ActivityFixtures();
    await activityFixtures.addActivity(activity);

    const randomTitle = faker.lorem.word();
    const randomDescription = faker.lorem.sentence();

    request(application.httpServer)
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

  it('Update activity with an image correctly', async (done) => {
    const activity: Activity = makeRandomIsolatedActivity();
    const activityFixtures = new ActivityFixtures();
    await activityFixtures.addActivity(activity);

    const randomTitle = faker.lorem.word();
    const randomDescription = faker.lorem.sentence();
    const randomActivityImageId = Ulid.create().value;

    request(application.httpServer)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: activity.activity_id.value,
        title: randomTitle,
        description: randomDescription,
        image_id: randomActivityImageId
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        activityFixtures
          .getActivity(activity.activity_id.value)
          .then((activityResult: Activity) => {
            expect(activityResult.image_id.value).toEqual(
              randomActivityImageId
            );
            done();
          });
      });
  });

  it('Update activity with empty activity_id and throw an error', async (done) => {
    const randomUlid = '';
    const randomTitle = faker.lorem.word();
    const randomDescription = faker.lorem.sentence();

    request(application.httpServer)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: randomUlid,
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
    const randomUlid = Ulid.create().value;
    const randomTitle = '';
    const randomDescription = faker.lorem.sentence();

    request(application.httpServer)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: randomUlid,
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
    const randomUlid = Ulid.create().value;
    const randomTitle = faker.lorem.word();
    const randomDescription = '';

    request(application.httpServer)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: randomUlid,
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

beforeAll(async () => {
  application = new BookingApp();
  await application.start();
});

afterAll(async () => {
  await application.stop();
});
