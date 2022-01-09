import { makeRandomActivity } from './../../Mock/Activity/activityMother';
import { Uuid } from '../../../src/Domain/Shared/uuid';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { ActivityFixtures } from '../../Mock/Activity/activityFixtures';
import { app } from '../../../src/app';
import request from 'supertest';

describe('List activities', () => {
  it('List empty activities', async (done) => {
    const activityFixtures = new ActivityFixtures();

    request(app)
      .get('/activity/user/' + Uuid.create().value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual([]);
        done();
      });
  });

  it('List some activities', async (done) => {
    const partner = makeRandomPartner();
    const activityFixtures = new ActivityFixtures();
    await activityFixtures.addActivity(makeRandomActivity(partner));
    await activityFixtures.addActivity(makeRandomActivity(partner));
    await activityFixtures.addActivity(makeRandomActivity(partner));

    request(app)
      .get('/activity/user/' + partner.partner_id.value)
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
    request(app)
      .get('/activity/user/' + 'invalid_id')
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
