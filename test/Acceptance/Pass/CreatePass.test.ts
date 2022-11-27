import {Pass} from '../../../src/Domain/Pass';
import {makeRandomPass} from '../../Mock/Pass/passMother';
import {PassFixtures} from '../../Mock/Pass/passFixtures';
import {makeRandomPartner} from '../../Mock/Partner/partnerMother';
import request from 'supertest';
import {application} from '../../hooks';

describe('Create pass', () => {
  it('Create pass correctly', async done => {
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
        description: randomPass.description,
        quantity: randomPass.quantity,
        price: randomPass.price,
        currency: randomPass.currency,
      })
      .expect(200)
      .then(async response => {
        await new Promise(resolve => setTimeout(resolve, 500));
        passFixtures.get(randomPass.pass_id.value).then((pass: Pass) => {
          expect(pass.toPrimitives()).toEqual(randomPass.toPrimitives());
          done();
        });
      });
  });

  it('Create pass without description correctly', async done => {
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
        currency: randomPass.currency,
      })
      .expect(200)
      .then(async response => {
        await new Promise(resolve => setTimeout(resolve, 500));
        passFixtures.get(randomPass.pass_id.value).then((pass: Pass) => {
          expect(pass.toPrimitives().pass_id).toEqual(randomPass.toPrimitives().pass_id);
          expect(pass.toPrimitives().title).toEqual(randomPass.toPrimitives().title);
          expect(pass.toPrimitives().description).toBeNull();
          done();
        });
      });
  });
});
