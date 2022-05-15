import { makeRandomActivity } from '../../Mock/Activity/activityMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { ActivityFixtures } from '../../Mock/Activity/activityFixtures';
import request from 'supertest';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('List activities', () => {
  it('List empty activities', async (done) => {
    const partner = makeRandomPartner();
    request(application.httpServer)
      .get('/activity/partner/' + partner.partner_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual([]);
        done();
      });
  });

  it('List 1 activity', async (done) => {
    const partner = makeRandomPartner();
    const activityFixtures = new ActivityFixtures();
    const randomActivity = makeRandomActivity(partner);
    await activityFixtures.addActivity(randomActivity);

    request(application.httpServer)
      .get('/activity/partner/' + partner.partner_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect([randomActivity.toPrimitives()]).toEqual(response.body.data);
        done();
      });
  });

  it('List some activities', async (done) => {
    const partner = makeRandomPartner();
    const activityFixtures = new ActivityFixtures();
    await activityFixtures.addActivity(makeRandomActivity(partner));
    await activityFixtures.addActivity(makeRandomActivity(partner));
    await activityFixtures.addActivity(makeRandomActivity(partner));

    request(application.httpServer)
      .get('/activity/partner/' + partner.partner_id.value)
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

  it('List activities with incorrect activity_id format and throw an error', async (done) => {
    request(application.httpServer)
      .get('/activity/partner/' + 'invalid_id')
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

beforeAll(async () => {
  application = new BookingApp();
  await application.start();
});

afterAll(async () => {
  await application.stop();
});
