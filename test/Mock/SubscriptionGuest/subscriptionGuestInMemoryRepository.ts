import {SubscriptionGuest} from './../../../src/Domain/SubscriptionGuest';
import {SubscriptionGuestRepository} from './../../../src/Application/SubscriptionGuest/SubscriptionGuestRepository';
import {Ulid} from '../../../src/Domain/Shared/Ulid';

export class SubscriptionGuestInMemoryRepository implements SubscriptionGuestRepository {
  private readonly subscriptionGuests = new Map<string, SubscriptionGuest>();
  async add(subscriptionGuest: SubscriptionGuest): Promise<void> {
    this.subscriptionGuests.set(
      subscriptionGuest.subscription_guest_id.value,
      subscriptionGuest
    );
  }

  async get(subscriptionGuestId: Ulid): Promise<SubscriptionGuest> {
    const subscriptionGuest =
      this.subscriptionGuests.get(subscriptionGuestId.value) ??
      this.throwExpression('SubscriptionGuest not found');
    return subscriptionGuest;
  }

  async update(subscriptionGuest: SubscriptionGuest): Promise<void> {
    this.subscriptionGuests.set(
      subscriptionGuest.subscription_guest_id.value,
      subscriptionGuest
    );
  }

  async getBySubscriptionId(subscriptionId: Ulid): Promise<SubscriptionGuest[]> {
    const subscriptionGuests: SubscriptionGuest[] = [];
    this.subscriptionGuests.forEach(subscriptionGuest => {
      if (subscriptionGuest.subscription_id.value === subscriptionId.value) {
        subscriptionGuests.push(subscriptionGuest);
      }
    });
    return subscriptionGuests;
  }

  throwExpression(errorMessage: string): never {
    throw new Error(errorMessage);
  }
}
