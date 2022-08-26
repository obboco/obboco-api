import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';

let application: BookingApp;

describe('Status check', () => {
  it('Status check call', async (done) => {
    const response = await request(application.httpServer).get('/status');

    expect(response.status).toBe(200);
    expect(response.text).toBe('ok');
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
