import {Subscription} from './../../Domain/Subscription';
import {SubscriptionRepository} from './SubscriptionRepository';

interface CreateSubscriptionCommand {
  subscription_id: string;
  partner_id: string;
  name: string;
  price: number;
  currency: string;
  cycle: string;
}

export class CreateSubscription {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  async make(command: CreateSubscriptionCommand): Promise<void> {
    const subscription: Subscription = Subscription.fromPrimitives({
      subscription_id: command.subscription_id,
      partner_id: command.partner_id,
      name: command.name,
      price: command.price,
      currency: command.currency,
      cycle: command.cycle,
    });
    this.subscriptionRepository.add(subscription);
  }
}
