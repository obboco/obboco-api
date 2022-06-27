import { Pass } from '../../../src/Domain/pass';
import { makeRandomPass } from '../../Mock/Pass/passMother';
import { PassFixtures } from '../../Mock/Pass/passFixtures';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';

let application: BookingApp;

describe('Create pass', () => {
  it('Create pass correctly', async (done) => {
    const passFixtures = new PassFixtures();

    const randomPartner = makeRandomPartner();
    const randomPass = makeRandomPass(randomPartner);
    request(application.httpServer)
      .post('/pass')
      .set('accept', 'application/json')
      .type('json')
      .send({
        pass_id: randomPass.pass_id.value,
        partner_id: randomPartner.partner_id.value,
        title: randomPass.title,
        quantity: randomPass.quantity,
        price: randomPass.price,
        currency: randomPass.currency
      })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        passFixtures.get(randomPass.pass_id.value).then((pass: Pass) => {
          expect(pass.toPrimitives()).toEqual(randomPass.toPrimitives());
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
