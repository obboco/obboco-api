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
        locale: partner.locale,
        subscription_plan: partner.subscription_plan
      })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        partnerFixtures
          .getPartnerByEmail(partner.email)
          .then((partnerConsole: Partner) => {
            expect(typeof response.body.partner_id).toBe('string');
            expect(partnerConsole.email).toEqual(partner.email);
            done();
          });
      });
  });
});
