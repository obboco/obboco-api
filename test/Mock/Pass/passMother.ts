import { Partner } from '../../../src/Domain/Partner';
import { Pass } from '../../../src/Domain/Pass';
import { Ulid } from '../../../src/Domain/Shared/Ulid';
import faker from 'faker';

export const makeRandomPass = (partner: Partner): Pass => {
  return Pass.fromPrimitives({
    pass_id: Ulid.create().value,
    partner_id: partner.partner_id.value,
    title: faker.lorem.word(),
    description: faker.lorem.word(),
    quantity: faker.datatype.number(2000),
    price: faker.datatype.number(2000),
    currency: 'EUR'
  });
};
