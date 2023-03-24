import {Ulid} from './../../../src/Domain/Shared/Ulid';
import {Subscription} from '../../../src/Domain/Subscription';
import {SubscriptionRepository} from '../../../src/Application/Subscription/SubscriptionRepository';

export class SubscriptionInMemoryRepository implements SubscriptionRepository {
  private readonly subscriptions = new Map<string, Subscription>();
  async add(subscription: Subscription): Promise<void> {
    this.subscriptions.set(subscription.subscription_id.value, subscription);
  }

  async get(subscriptionId: Ulid): Promise<Subscription> {
    const subscription = this.subscriptions.get(subscriptionId.value);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    return subscription;
  }

  async update(subscription: Subscription): Promise<void> {
    this.subscriptions.set(subscription.subscription_id.value, subscription);
  }
}
