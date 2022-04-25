import {
  makeRandomActivity,
  makeRandomActivityWhithoutImage,
  makeRandomIsolatedActivity
} from './../../Mock/Activity/activityMother';
import { Activity } from '../../../src/Domain/activity';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { ActivityFixtures } from '../../Mock/Activity/activityFixtures';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';

let application: BookingApp;

describe('Create activity', () => {
  it('Create activity correctly', async (done) => {
    const activityFixtures = new ActivityFixtures();

    const randomPartner = makeRandomPartner();
    const randomActivity = makeRandomActivityWhithoutImage(randomPartner);
    request(application.httpServer)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: randomActivity.activity_id.value,
        title: randomActivity.title,
        description: randomActivity.description,
        price: randomActivity.price,
        currency: randomActivity.currency,
        partner_id: randomPartner.partner_id.value
      })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        activityFixtures
          .getActivity(response.body.activity_id)
          .then((activity: Activity) => {
            expect(activity.toPrimitives()).toEqual(
              randomActivity.toPrimitives()
            );
            done();
          });
      });
  });

  it('Create activity with image correctly', async (done) => {
    const activityFixtures = new ActivityFixtures();

    const randomPartner = makeRandomPartner();
    const randomActivity = makeRandomActivity(randomPartner);
    request(application.httpServer)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        activity_id: randomActivity.activity_id.value,
        title: randomActivity.title,
        description: randomActivity.description,
        price: randomActivity.price,
        currency: randomActivity.currency,
        partner_id: randomPartner.partner_id.value,
        image_id: randomActivity.image_id.value
      })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        activityFixtures
          .getActivity(response.body.activity_id)
          .then((activity: Activity) => {
            expect(activity).toEqual(randomActivity);
            done();
          });
      });
  });

  it('Add activity with empty title and throw an error', async (done) => {
    const randomPartner = makeRandomPartner();
    const randomActivity = makeRandomActivity(randomPartner);
    request(application.httpServer)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        title: '',
        description: randomActivity.description,
        price: randomActivity.price,
        currency: randomActivity.currency,
        partner_id: randomPartner.partner_id.value
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add activity with empty description and throw an error', async (done) => {
    let randomPartner = makeRandomPartner();
    const randomActivity = makeRandomActivity(randomPartner);
    request(application.httpServer)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        title: randomActivity.title,
        description: '',
        price: randomActivity.price,
        currency: randomActivity.currency,
        partner_id: randomPartner.partner_id.value
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add activity with empty partner_id and throw an error', async (done) => {
    const randomActivity = makeRandomIsolatedActivity();
    request(application.httpServer)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        title: randomActivity.title,
        description: randomActivity.description,
        price: randomActivity.price,
        currency: randomActivity.currency,
        partner_id: ''
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Add activity with incorrect partner_id format and throw an error', async (done) => {
    const randomActivity = makeRandomIsolatedActivity();
    request(application.httpServer)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        title: randomActivity.title,
        description: randomActivity.description,
        price: randomActivity.price,
        currency: randomActivity.currency,
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
