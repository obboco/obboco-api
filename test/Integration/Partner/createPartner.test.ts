import { Partner } from './../../../src/Domain/partner';
import { PartnerFixtures } from './../../Mock/Partner/partnerFixtures';
import { app } from '../../../src/app';
import request from 'supertest';
import faker from 'faker';

describe('Create partner', () => {
  it('Create partner correctly', async (done) => {
    const partnerFixtures = new PartnerFixtures();

    const randomEmail = faker.internet.email();
    request(app)
      .put('/partner')
      .set('accept', 'application/json')
      .type('json')
      .send({ email: randomEmail })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        partnerFixtures
          .getPartnerByEmail(randomEmail)
          .then((partnerConsole: Partner) => {
            expect(partnerConsole.email).toEqual(randomEmail);
            done();
          });
      });
  });

  it('Update partner correctly', async (done) => {
    const partnerFixtures = new PartnerFixtures();
    const partner = Partner.new(faker.internet.email());
    await partnerFixtures.addPartner(partner);

    request(app)
      .put('/partner')
      .set('accept', 'application/json')
      .type('json')
      .send({ email: partner.email })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        partnerFixtures
          .getPartnerByEmail(partner.email)
          .then((partnerConsole: Partner) => {
            expect(partnerConsole.email).toEqual(partner.email);
            done();
          });
      });
  });

  it('Create partner with an empty email and throw an error', async (done) => {
    const randomEmail = '';
    request(app)
      .put('/partner')
      .set('accept', 'application/json')
      .type('json')
      .send({ email: randomEmail })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Create partner with an wrong email format and throw an error', async (done) => {
    const randomEmail = 'wrong_email';
    request(app)
      .put('/partner')
      .set('accept', 'application/json')
      .type('json')
      .send({ email: randomEmail })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });
});
