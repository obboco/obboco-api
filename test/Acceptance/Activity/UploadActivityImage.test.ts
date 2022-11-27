/**
import {Ulid} from '../../../src/Domain/Shared/Ulid';
import request from 'supertest';
import {application} from '../../hooks';
 *
describe('Upload image activitity correctly', () => {
  it('Upload image correctly', async done => {
    const path = require('path');
    const filePath = path.resolve(__filename, '../../../Mock/Activity/Image/yoga.jpeg');
    request(application.httpServer)
      .post('/activity/image')
      .set('accept', 'application/json')
      .attach('activity_photo', filePath)
      .expect(200)
      .then(async response => {
        expect(Ulid.fromPrimitives(response.body.data.activity_image_id));
        done();
      });
  });
});
 */
