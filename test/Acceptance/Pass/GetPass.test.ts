import { makeRandomPass } from '../../Mock/Pass/passMother';
import { PassFixtures } from '../../Mock/Pass/passFixtures';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';

let application: BookingApp;

describe('Get pass', () => {
  it('Get pass correctly', async (done) => {
    const passFixtures = new PassFixtures();

    const randomPartner = makeRandomPartner();
    const randomPass = makeRandomPass(randomPartner);
    await passFixtures.add(randomPass);

    request(application.httpServer)
      .get('/pass/' + randomPass.pass_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual(randomPass.toPrimitives());
        done();
      });
  });

  it('Get empty pass correctly', async (done) => {
    const randomPartner = makeRandomPartner();
    const randomPass = makeRandomPass(randomPartner);

    request(application.httpServer)
      .get('/pass/' + randomPass.pass_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual({});
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
