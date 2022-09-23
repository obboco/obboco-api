import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';

let application: BookingApp;

describe('Status check', () => {
  it('Status check call', async (done) => {
    const response = await request(application.httpServer).get('/status');

    const expectedResponse = {
      http: 'ok',
      mysql: true,
      redis: true
    };
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
    done();
  });
});

beforeAll(async () => {
  application = new BookingApp();
  await application.start();
});

afterAll(async () => {
  await application.stop();
});
