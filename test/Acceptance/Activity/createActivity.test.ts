import { makeRandomActivity } from './../../Mock/Activity/activityMother';
import { Ulid } from '../../../src/Domain/Shared/ulid';
import { Activity } from '../../../src/Domain/activity';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { ActivityFixtures } from '../../Mock/Activity/activityFixtures';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';
import faker from 'faker';

let application: BookingApp;

describe('Create activity', () => {
  it('Create activity correctly', async (done) => {
    const activityFixtures = new ActivityFixtures();

    const randomPartner = makeRandomPartner();
    const randomActivity = makeRandomActivity(randomPartner);
    request(application.httpServer)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        title: randomActivity.title,
        description: randomActivity.description,
        partner_id: randomPartner.partner_id.value
      })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        activityFixtures
          .getActivity(response.body.activity_id)
          .then((activity: Activity) => {
            expect(activity.title).toEqual(randomActivity.title);
            done();
          });
      });
  });

  it('Create activity with image correctly', async (done) => {
    const activityFixtures = new ActivityFixtures();

    const randomPartner = makeRandomPartner();
    const randomActivity = makeRandomActivity(randomPartner);
    const randomActivityImageId = Ulid.create().value;
    request(application.httpServer)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        title: randomActivity.title,
        description: randomActivity.description,
        partner_id: randomPartner.partner_id.value,
        image_id: randomActivityImageId
      })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        activityFixtures
          .getActivity(response.body.activity_id)
          .then((activity: Activity) => {
            expect(activity.image_id.value).toEqual(randomActivityImageId);
            done();
          });
      });
  });

  it('Add activity with empty title and throw an error', async (done) => {
    const randomTitle = '';
    const randomDescription = faker.lorem.sentence();
    const randomPartner = makeRandomPartner();
    request(application.httpServer)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        title: randomTitle,
        description: randomDescription,
        partner_id: randomPartner.partner_id.value
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add activity with empty description and throw an error', async (done) => {
    const randomTitle = faker.lorem.word();
    const randomDescription = '';
    const randomPartner = makeRandomPartner();
    request(application.httpServer)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        title: randomTitle,
        description: randomDescription,
        partner_id: randomPartner.partner_id.value
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add activity with empty partner_id and throw an error', async (done) => {
    const randomTitle = faker.lorem.word();
    const randomDescription = faker.lorem.sentence();
    request(application.httpServer)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        title: randomTitle,
        description: randomDescription,
        partner_id: ''
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add activity with incorrect partner_id format and throw an error', async (done) => {
    const randomTitle = faker.lorem.word();
    const randomDescription = faker.lorem.sentence();
    request(application.httpServer)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        title: randomTitle,
        description: randomDescription,
        partner_id: 'incorrect_id'
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
