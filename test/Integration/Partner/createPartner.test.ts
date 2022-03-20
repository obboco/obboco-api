import { Partner } from './../../../src/Domain/partner';
import { PartnerFixtures } from './../../Mock/Partner/partnerFixtures';
import { app } from '../../../src/app';
import request from 'supertest';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';

describe('Create partner', () => {
  it('Create partner correctly', async (done) => {
    const partnerFixtures: PartnerFixtures = new PartnerFixtures();
    const partner: Partner = makeRandomPartner();

    request(app)
      .post('/partner')
      .set('accept', 'application/json')
      .type('json')
      .send({
        email: partner.email,
        given_name: partner.given_name,
        family_name: partner.family_name,
        picture: partner.picture,
        locale: partner.locale,
        subscription_plan: partner.subscription_plan,
        subdomain: partner.subdomain
      })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        partnerFixtures
          .getPartnerByEmail(partner.email)
          .then((partnerConsole: Partner) => {
            expect(typeof response.body.partner_id).toBe('string');
            expect(partnerConsole.locale).toEqual(partner.locale);
            expect(partnerConsole.subscription_plan).toEqual(
              partner.subscription_plan
            );
            done();
          });
      });
  });

  it('Create already registered partner', async (done) => {
    const partnerFixtures = new PartnerFixtures();
    const partner: Partner = makeRandomPartner();
    partnerFixtures.addPartner(partner);

    request(app)
      .post('/partner')
      .set('accept', 'application/json')
      .type('json')
      .send({
        email: partner.email,
        given_name: partner.given_name,
        family_name: partner.family_name,
        picture: partner.picture,
        locale: partner.locale,
        subscription_plan: partner.subscription_plan,
        subdomain: partner.subdomain
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Partner already exists');
        done();
      });
  });

  it('Create partner with an empty email and throw an error', async (done) => {
    const randomEmail = '';
    request(app)
      .post('/partner')
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
      .post('/partner')
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
