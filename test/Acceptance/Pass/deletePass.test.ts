import { Pass } from '../../../src/Domain/pass';
import { makeRandomPass } from '../../Mock/Pass/passMother';
import { PassFixtures } from '../../Mock/Pass/passFixtures';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';

let application: BookingApp;

describe('Delete pass', () => {
  it('Delete pass correctly', async (done) => {
    const passFixtures = new PassFixtures();

    const randomPartner = makeRandomPartner();
    const randomPass = makeRandomPass(randomPartner);
    await passFixtures.add(randomPass);

    request(application.httpServer)
      .delete('/pass/' + randomPass.pass_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        passFixtures.get(randomPass.pass_id.value).then((pass: Pass) => {
          expect(pass).toBeNull();
          done();
        });
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
