import {Subscription} from '../../Domain/Subscription';
import {Ulid} from '../../Domain/Shared/Ulid';

export interface SubscriptionRepository {
  add(subscription: Subscription): Promise<void>;
  get(subscriptionId: Ulid): Promise<Subscription>;
  /*
  update(activity: Activity): Promise<void>;
  delete(activityId: Ulid): Promise<void>;
  getByPartnerId(partnerId: Ulid): Promise<Activity[]>;*/
}
