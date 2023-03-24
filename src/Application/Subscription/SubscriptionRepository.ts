import {Subscription} from '../../Domain/Subscription';
import {Ulid} from '../../Domain/Shared/Ulid';

export interface SubscriptionRepository {
  add(subscription: Subscription): Promise<void>;
  get(subscriptionId: Ulid): Promise<Subscription>;
  update(subscription: Subscription): Promise<void>;

  /*
  delete(activityId: Ulid): Promise<void>;
  getByPartnerId(partnerId: Ulid): Promise<Activity[]>;*/
}
