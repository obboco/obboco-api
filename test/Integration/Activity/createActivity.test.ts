import { Activity } from './../../../src/Domain/activity';
import { makeRandomPartner } from './../../Mock/Partner/partnerMother';
import { ActivityFixtures } from './../../Mock/Activity/activityFixtures';
import { app } from '../../../src/app';
import request from 'supertest';
import faker from 'faker';

describe('Create activity', () => {
  it('Create activity correctly', async (done) => {
    const activityFixtures = new ActivityFixtures();

    const randomTitle = faker.lorem.word();
    const randomDescription = faker.lorem.sentence();
    const randomPartner = makeRandomPartner();
    request(app)
      .post('/activity')
      .set('accept', 'application/json')
      .type('json')
      .send({
        title: randomTitle,
        description: randomDescription,
        partner_id: randomPartner.partner_id.value
      })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        activityFixtures
          .getActivity(response.body.activity_id)
          .then((activity: Activity) => {
            expect(activity.title).toEqual(randomTitle);
            done();
          });
      });
  });
});
