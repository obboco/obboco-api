import {SubscriptionLog} from './../../Domain/SubscriptionLog';
import {SubscriptionLogRepository} from './SubscriptionLogRepository';
interface CreateSubscriptionLogCommand {
  subscription_log_id: string;
  subscription_guest_id: string;
  guest_id: string;
  partner_id: string;
  subscription_id: string;
  price: number;
  currency: string;
  status: string;
  date: string;
}

export class CreateSubscriptionLog {
  constructor(private readonly subscriptionLogRepository: SubscriptionLogRepository) {}

  async make(command: CreateSubscriptionLogCommand): Promise<void> {
    const subscriptionLog: SubscriptionLog = SubscriptionLog.fromPrimitives({
      subscription_log_id: command.subscription_log_id,
      subscription_guest_id: command.subscription_guest_id,
      guest_id: command.guest_id,
      partner_id: command.partner_id,
      subscription_id: command.subscription_id,
      price: command.price,
      currency: command.currency,
      status: command.status,
      date: command.date,
    });
    this.subscriptionLogRepository.add(subscriptionLog);
  }
}
