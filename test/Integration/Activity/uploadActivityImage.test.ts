import { Uuid } from './../../../src/Domain/Shared/uuid';
import { app } from '../../../src/app';
import request from 'supertest';

describe('Upload image activitity correctly', () => {
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
});
