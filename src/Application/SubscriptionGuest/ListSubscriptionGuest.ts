import {SubscriptionGuestRepository} from './SubscriptionGuestRepository';
import {SubscriptionGuest} from '../../Domain/SubscriptionGuest';
import {Ulid} from '../../Domain/Shared/Ulid';

interface ListGuestSubscriptionCommand {
  subscription_id: string;
}

export class ListGuestSubscription {
  constructor(private subscriptionRepository: SubscriptionGuestRepository) {}

  async make(command: ListGuestSubscriptionCommand): Promise<SubscriptionGuest[]> {
    return this.subscriptionRepository.getBySubscriptionId(
      Ulid.fromPrimitives(command.subscription_id)
    );
  }
}
