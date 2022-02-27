import { Partner } from './../../../src/Domain/partner';
import faker from 'faker';
import { Uuid } from '../../../src/Domain/Shared/uuid';

export const makeRandomPartner = (): Partner => {
  return Partner.create({
    partner_id: Uuid.create(),
    email: faker.internet.email(),
    locale: 'en-GB',
    subscription_plan: 'BASIC'
  });
};
