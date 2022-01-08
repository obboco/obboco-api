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
    activityFixtures.addActivity(makeRandomActivity(partner));
    activityFixtures.addActivity(makeRandomActivity(partner));
    activityFixtures.addActivity(makeRandomActivity(partner));

    request(app)
      .get('/activity/user/' + partner.partner_id.value)
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
