import { Ulid } from '../../../src/Domain/Shared/Ulid';
import { Partner } from '../../../src/Domain/Partner';
import { Activity } from '../../../src/Domain/Activity';
import faker from 'faker';

export const makeRandomActivity = (partner: Partner): Activity => {
  return Activity.fromPrimitives({
    activity_id: Ulid.create().value,
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    price: faker.datatype.number(2000),
    currency: 'EUR',
    location: faker.address.city(),
    partner_id: partner.partner_id.value,
    image_id: Ulid.create().value
  });
};

export const makeRandomActivityWhithoutOptionalParameters = (
  partner: Partner
): Activity => {
  return Activity.fromPrimitives({
    activity_id: Ulid.create().value,
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    price: faker.datatype.number(2000),
    currency: 'EUR',
    location: null,
    partner_id: partner.partner_id.value,
    image_id: null
  });
};

export const makeRandomIsolatedActivity = (): Activity => {
  return Activity.fromPrimitives({
    activity_id: Ulid.create().value,
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    price: faker.datatype.number(2000),
    currency: 'EUR',
    location: faker.address.city(),
    partner_id: Ulid.create().value,
    image_id: Ulid.create().value
  });
};
