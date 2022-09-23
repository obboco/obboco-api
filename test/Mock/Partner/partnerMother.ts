import { Partner } from '../../../src/Domain/Partner';
import faker from 'faker';
import { Ulid } from '../../../src/Domain/Shared/Ulid';

export const makeRandomPartner = (): Partner => {
  return Partner.fromPrimitives({
    partner_id: Ulid.create().value,
    email: faker.internet.email(),
    given_name: faker.name.firstName(),
    family_name: faker.name.lastName(),
    picture: faker.image.avatar(),
    locale: 'en-GB',
    subscription_plan: 'BETA',
    subdomain: faker.internet.domainName()
  });
};
