import {
  SubscriptionLog,
  SubscriptionLogPrimitives,
} from './../../../src/Domain/SubscriptionLog';
import {Ulid} from '../../../src/Domain/Shared/Ulid';
import faker from 'faker';

export const makeNewRandomSubscriptionLog = (): SubscriptionLog => {
  const subscriptionLogPrimitives: SubscriptionLogPrimitives = {
    subscription_log_id: Ulid.create().value,
    subscription_guest_id: Ulid.create().value,
    guest_id: Ulid.create().value,
    partner_id: Ulid.create().value,
    subscription_id: Ulid.create().value,
    price: faker.datatype.number(2000),
    currency: faker.finance.currencyCode(),
    status: 'active',
    date: faker.date.past().toISOString(),
  };
  return SubscriptionLog.fromPrimitives(subscriptionLogPrimitives);
};
