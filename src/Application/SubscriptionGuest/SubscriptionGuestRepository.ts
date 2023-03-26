import {SubscriptionGuest} from './../../Domain/SubscriptionGuest';
import {Ulid} from '../../Domain/Shared/Ulid';

export interface SubscriptionGuestRepository {
  add(subscription: SubscriptionGuest): Promise<void>;
  get(subscriptionId: Ulid): Promise<SubscriptionGuest>;
  update(subscription: SubscriptionGuest): Promise<void>;
  getBySubscriptionId(subscriptionId: Ulid): Promise<SubscriptionGuest[]>;
}
