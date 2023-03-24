import {
  SubscriptionGuest,
  SubscriptionGuestPrimitives,
} from './../../../src/Domain/SubscriptionGuest';
import {Ulid} from '../../../src/Domain/Shared/Ulid';

export const makeNewRandomSubscriptionGuest = (): SubscriptionGuest => {
  const subscriptionPrimitives: SubscriptionGuestPrimitives = {
    subscription_guest_id: Ulid.create().value,
    guest_id: Ulid.create().value,
    partner_id: Ulid.create().value,
    subscription_id: Ulid.create().value,
    start_date: new Date('2022-05-15 06:39:09').toISOString(),
    end_date: new Date('2023-05-15 06:39:09').toISOString(),
    status: 'active',
  };
  return SubscriptionGuest.fromPrimitives(subscriptionPrimitives);
};
