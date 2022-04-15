import { Uuid } from '../../../src/Domain/Shared/uuid';
import request from 'supertest';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('Upload image activitity correctly', () => {
  it('Create activity correctly', async (done) => {
    const path = require('path');
    const filePath = path.resolve(
      __filename,
      '../../../Mock/Activity/Image/yoga.jpeg'
    );
    request(application.httpServer)
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

beforeAll(async () => {
  application = new BookingApp();
  await application.start();
});

afterAll(async () => {
  await application.stop();
});
