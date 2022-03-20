import { Partner } from './../../../src/Domain/partner';
import faker from 'faker';
import { Uuid } from '../../../src/Domain/Shared/uuid';

export const makeRandomPartner = (): Partner => {
  return Partner.create({
    partner_id: Uuid.create(),
    email: faker.internet.email(),
    given_name: faker.name.firstName(),
    family_name: faker.name.lastName(),
    picture: faker.image.avatar(),
    locale: 'en-GB',
    subscription_plan: 'BETA',
    subdomain: faker.internet.domainName()
  });
};
