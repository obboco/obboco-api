import {Subscription, SubscriptionPrimitives} from './../../../src/Domain/Subscription';
import {Ulid} from '../../../src/Domain/Shared/Ulid';
import faker from 'faker';

export const makeNewRandomSubscription = (): Subscription => {
  const subscriptionPrimitives: SubscriptionPrimitives = {
    subscription_id: Ulid.create().value,
    partner_id: Ulid.create().value,
    name: faker.lorem.word(),
    price: faker.datatype.number(2000),
    currency: faker.finance.currencyCode(),
    cycle: 'monthly',
  };
  return Subscription.fromPrimitives(subscriptionPrimitives);
};
