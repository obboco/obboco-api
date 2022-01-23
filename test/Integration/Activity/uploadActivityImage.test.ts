import { Uuid } from './../../../src/Domain/Shared/uuid';
import { app } from '../../../src/app';
import request from 'supertest';

describe('Create activity', () => {
  it('Create activity correctly', async (done) => {
    const path = require('path');
    const filePath = path.resolve(
      __filename,
      '../../../Mock/Activity/Image/yoga.jpeg'
    );
    request(app)
      .post('/activity/image')
      .set('accept', 'application/json')
      .attach('activity_photo', filePath)
      .expect(200)
      .then(async (response) => {
        expect(Uuid.fromPrimitives(response.body.data.activity_image_id));
        done();
      });
  });
  /*
  it('Add activity with incorrect partner_id format and throw an error', async (done) => {
    const randomTitle = faker.lorem.word();
    const randomDescription = faker.lorem.sentence();
    request(app)
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
  });*/
});
