import {SubscriptionGuestRepository} from './SubscriptionGuestRepository';
import {SubscriptionGuest} from '../../Domain/SubscriptionGuest';
import {Ulid} from '../../Domain/Shared/Ulid';

interface ListSubscriptionGuestCommand {
  subscription_id: string;
}

export class ListSubscriptionGuest {
  constructor(private subscriptionRepository: SubscriptionGuestRepository) {}

  async make(command: ListSubscriptionGuestCommand): Promise<SubscriptionGuest[]> {
    return this.subscriptionRepository.getBySubscriptionId(
      Ulid.fromPrimitives(command.subscription_id)
    );
  }
}
