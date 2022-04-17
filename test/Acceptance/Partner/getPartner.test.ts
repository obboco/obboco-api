import { Partner } from '../../../src/Domain/partner';
import { PartnerFixtures } from '../../Mock/Partner/partnerFixtures';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import request from 'supertest';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('Get partner', () => {
  it('Get partner by email correctly', async (done) => {
    const partnerFixtures = new PartnerFixtures();
    const partner: Partner = makeRandomPartner();
    await partnerFixtures.addPartner(partner);

    request(application.httpServer)
      .get('/partner/email/' + partner.email)
      .set('accept', 'application/json')
      .type('json')
      .expect(200)
      .then(async (response) => {
        partnerFixtures
          .getPartnerByEmail(response.body.data.email)
          .then((partnerResult: Partner) => {
            expect(partner.partner_id).toEqual(partnerResult.partner_id);
            done();
          });
      });
  });

  it('Get partner by id', async (done) => {
    const partnerFixtures = new PartnerFixtures();
    const partner: Partner = makeRandomPartner();
    await partnerFixtures.addPartner(partner);

    request(application.httpServer)
      .get('/partner/' + partner.partner_id.value)
      .set('accept', 'application/json')
      .type('json')
      .expect(200)
      .then(async (response) => {
        partnerFixtures
          .getPartnerByEmail(response.body.data.email)
          .then((partnerResult: Partner) => {
            expect(partner.partner_id).toEqual(partnerResult.partner_id);
            done();
          });
      });
  });

  it('Get partner by subdomain correctly', async (done) => {
    const partnerFixtures = new PartnerFixtures();
    const partner: Partner = makeRandomPartner();
    await partnerFixtures.addPartner(partner);

    request(application.httpServer)
      .get('/partner/subdomain/' + partner.subdomain)
      .set('accept', 'application/json')
      .type('json')
      .expect(200)
      .then(async (response) => {
        partnerFixtures
          .getPartnerByEmail(response.body.data.email)
          .then((partnerResult: Partner) => {
            expect(partner.partner_id).toEqual(partnerResult.partner_id);
            done();
          });
      });
  });

  it('Get unexisten partner', async (done) => {
    request(application.httpServer)
      .get('/partner/subdomain/noexists')
      .set('accept', 'application/json')
      .type('json')
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Partner not found');
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
