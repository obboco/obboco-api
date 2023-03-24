import {Subscription} from '../../Domain/Subscription';
import {SubscriptionRepository} from './SubscriptionGuestRepository';

interface UpdateSubscriptionCommand {
  subscription_id: string;
  partner_id: string;
  name: string;
  price: number;
  currency: string;
  cycle: string;
}

export class UpdateSubscription {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  async make(command: UpdateSubscriptionCommand): Promise<void> {
    const subscription: Subscription = Subscription.fromPrimitives({
      subscription_id: command.subscription_id,
      partner_id: command.partner_id,
      name: command.name,
      price: command.price,
      currency: command.currency,
      cycle: command.cycle,
    });
    this.subscriptionRepository.update(subscription);
  }
}
