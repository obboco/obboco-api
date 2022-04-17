import { Ulid } from './../../../src/Domain/Shared/ulid';
import { Partner } from './../../../src/Domain/partner';
import { Activity } from './../../../src/Domain/activity';
import faker from 'faker';

export const makeRandomActivity = (partner: Partner): Activity => {
  return Activity.new({
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    partner_id: partner.partner_id,
    image_id: null
  });
};

export const makeRandomIsolatedActivity = (): Activity => {
  return Activity.new({
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    partner_id: Ulid.create(),
    image_id: null
  });
};
