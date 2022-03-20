import { Partner } from './../../../src/Domain/partner';
import { PartnerFixtures } from './../../Mock/Partner/partnerFixtures';
import { app } from '../../../src/app';
import request from 'supertest';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';

describe('Get partner', () => {
  it('Get partner by subdomain correctly', async (done) => {
    const partnerFixtures = new PartnerFixtures();
    const partner: Partner = makeRandomPartner();
    await partnerFixtures.addPartner(partner);

    request(app)
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

  it('Get no existen partner', async (done) => {
    request(app)
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
