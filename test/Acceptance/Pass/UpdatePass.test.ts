import {Pass} from '../../../src/Domain/Pass';
import {makeRandomPass} from '../../Mock/Pass/passMother';
import {PassFixtures} from '../../Mock/Pass/passFixtures';
import {makeRandomPartner} from '../../Mock/Partner/partnerMother';
import request from 'supertest';
import {application} from '../../hooks';

describe('Update pass', () => {
  it('Update pass correctly', async done => {
    const passFixtures = new PassFixtures();

    const randomPartner = makeRandomPartner();
    const randomPass = makeRandomPass(randomPartner);
    const newRandomPass = makeRandomPass(randomPartner);

    await passFixtures.add(randomPass);
    request(application.httpServer)
      .put('/pass')
      .set('accept', 'application/json')
      .type('json')
      .send({
        pass_id: randomPass.pass_id.value,
        partner_id: newRandomPass.partner_id.value,
        title: newRandomPass.title,
        description: newRandomPass.description,
        quantity: newRandomPass.quantity,
        price: newRandomPass.price,
        currency: newRandomPass.currency,
      })
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        passFixtures.get(randomPass.pass_id.value).then((pass: Pass) => {
          expect(randomPass.pass_id.value).toEqual(pass.pass_id.value);
          expect(randomPass.partner_id.value).toEqual(pass.partner_id.value);
          expect(newRandomPass.title).toEqual(pass.title);
          expect(newRandomPass.description).toEqual(pass.description);
          expect(newRandomPass.quantity).toEqual(pass.quantity);
          expect(newRandomPass.price).toEqual(pass.price);
          expect(newRandomPass.currency).toEqual(pass.currency);
          done();
        });
      });
  });
});
