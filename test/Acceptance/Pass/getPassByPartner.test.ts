import { Pass } from '../../../src/Domain/pass';
import { makeRandomPass } from '../../Mock/Pass/passMother';
import { PassFixtures } from '../../Mock/Pass/passFixtures';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';

let application: BookingApp;

describe('Get pass by partner', () => {
  it('Get one pass by partner correctly', async (done) => {
    const passFixtures = new PassFixtures();

    const randomPartner = makeRandomPartner();
    const randomPass = makeRandomPass(randomPartner);
    await passFixtures.add(randomPass);

    request(application.httpServer)
      .get('/pass/partner/' + randomPartner.partner_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect([randomPass.toPrimitives()]).toEqual(response.body.data);
        done();
      });
  });

  it('Get multiple pass by partner correctly', async (done) => {
    const passFixtures = new PassFixtures();

    const randomPartner = makeRandomPartner();
    await passFixtures.add(makeRandomPass(randomPartner));
    await passFixtures.add(makeRandomPass(randomPartner));
    await passFixtures.add(makeRandomPass(randomPartner));

    request(application.httpServer)
      .get('/pass/partner/' + randomPartner.partner_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        expect(JSON.parse(JSON.stringify(response.body.data)).length).toEqual(
          3
        );
        done();
      });
  });

  it('Get empty multiple pass', async (done) => {
    const randomPartner = makeRandomPartner();
    request(application.httpServer)
      .get('/pass/partner/' + randomPartner.partner_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async (response) => {
        expect(response.body.data).toEqual([]);
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
