import {Ulid} from './../../Domain/Shared/Ulid';
import {Subscription} from './../../Domain/Subscription';
import {SubscriptionRepository} from './SubscriptionRepository';

interface ListSubscriptionCommand {
  partner_id: string;
}

export class ListSubscription {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async make(command: ListSubscriptionCommand): Promise<Subscription[]> {
    return await this.subscriptionRepository.getByPartnerId(
      Ulid.fromPrimitives(command.partner_id)
    );
  }
}
