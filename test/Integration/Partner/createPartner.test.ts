import { Partner } from './../../../src/Domain/partner';
import { makeRandomPartner } from './../../Mock/Partner/partnerMother';
import { PartnerFixtures } from './../../Mock/Partner/partnerFixtures';
import { app } from '../../../src/app';
import request from 'supertest';
import faker from 'faker';

describe('Create partner', () => {
  it('Create partner correctly', async (done) => {
    const partnerFixtures = new PartnerFixtures();

    const randomEmail = faker.internet.email();
    request(app)
      .post('/partner')
      .set('accept', 'application/json')
      .type('json')
      .send({ email: randomEmail })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        partnerFixtures
          .getPartnerByEmail(randomEmail)
          .then((partnerConsole: Partner) => {
            expect(typeof response.body.partner_id).toBe('string');
            expect(partnerConsole.email).toEqual(randomEmail);
            done();
          });
      });
  });
});
