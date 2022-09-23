import { Partner } from '../../../src/Domain/Partner';
import { PartnerFixtures } from '../../Mock/Partner/partnerFixtures';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import request from 'supertest';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('Create partner', () => {
  it('Create partner correctly', async (done) => {
    const partnerFixtures: PartnerFixtures = new PartnerFixtures();
    const partner: Partner = makeRandomPartner();

    request(application.httpServer)
      .post('/partner')
      .set('accept', 'application/json')
      .type('json')
      .send({
        partner_id: partner.partner_id.value,
        email: partner.email,
        given_name: partner.given_name,
        family_name: partner.family_name,
        picture: partner.picture,
        locale: partner.locale,
        subscription_plan: partner.subscription_plan,
        subdomain: partner.subdomain
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        partnerFixtures
          .getPartnerByEmail(partner.email)
          .then((partnerConsole: Partner) => {
            expect(partnerConsole.partner_id.value).toEqual(
              partner.partner_id.value
            );
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
    await partnerFixtures.addPartner(partner);

    request(application.httpServer)
      .post('/partner')
      .set('accept', 'application/json')
      .type('json')
      .send({
        partner_id: partner.partner_id.value,
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
        expect(response.body.errors[0].msg).toEqual('Partner already exists');
        done();
      });
  });

  it('Create partner correctly with no optional values ', async (done) => {
    const partnerFixtures = new PartnerFixtures();
    const partner: Partner = makeRandomPartner();
    await partnerFixtures.addPartner(partner);

    request(application.httpServer)
      .post('/partner')
      .set('accept', 'application/json')
      .type('json')
      .send({
        partner_id: partner.partner_id.value,
        email: partner.email,
        locale: partner.locale,
        subscription_plan: partner.subscription_plan
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Partner already exists');
        done();
      });
  });

  it('Create partner with an empty email and throw an error', async (done) => {
    const randomEmail = '';
    request(application.httpServer)
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
    request(application.httpServer)
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

beforeAll(async () => {
  application = new BookingApp();
  await application.start();
});

afterAll(async () => {
  await application.stop();
});
