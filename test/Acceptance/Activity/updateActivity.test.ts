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
    const randomPrice = faker.datatype.number(2000);
    const randomCurrency = faker.finance.currencyCode();
    const randomLocation = faker.address.city();

    request(application.httpServer)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: activity.activity_id.value,
        title: randomTitle,
        description: randomDescription,
        price: randomPrice,
        currency: randomCurrency,
        location: randomLocation
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        activityFixtures
          .getActivity(activity.activity_id.value)
          .then((activityResult: Activity) => {
            expect(randomTitle).toEqual(activityResult.title);
            expect(randomDescription).toEqual(activityResult.description);
            expect(randomPrice).toEqual(activityResult.price);
            expect(randomCurrency).toEqual(activityResult.currency);
            expect(randomLocation).toEqual(activityResult.location);
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
    const randomPrice = faker.datatype.number(2000);
    const randomCurrency = faker.finance.currencyCode();
    const randomActivityImageId = Ulid.create().value;

    request(application.httpServer)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: activity.activity_id.value,
        title: randomTitle,
        description: randomDescription,
        price: randomPrice,
        currency: randomCurrency,
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
    const activity: Activity = makeRandomIsolatedActivity();

    request(application.httpServer)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: randomUlid,
        title: activity.title,
        description: activity.description,
        price: activity.price,
        currency: activity.currency
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Update activity with empty title and throw an error', async (done) => {
    const emptyTitle = '';
    const activity: Activity = makeRandomIsolatedActivity();

    request(application.httpServer)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: activity.activity_id.value,
        title: emptyTitle,
        description: activity.description
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Update activity with empty description and throw an error', async (done) => {
    const activity: Activity = makeRandomIsolatedActivity();
    const randomDescription = '';

    request(application.httpServer)
      .put('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: activity.activity_id.value,
        title: activity.title,
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
