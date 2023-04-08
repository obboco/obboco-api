import {SubscriptionGuest} from '../../Domain/SubscriptionGuest';
import {SubscriptionGuestRepository} from './SubscriptionGuestRepository';

interface UpdateSubscriptionGuestCommand {
  subscription_guest_id: string;
  guest_id: string;
  partner_id: string;
  subscription_id: string;
  start_date: string;
  end_date: string;
  status: string;
}

export class UpdateSubscriptionGuest {
  constructor(
    private readonly subscriptionGuestRepository: SubscriptionGuestRepository
  ) {}

  async make(command: UpdateSubscriptionGuestCommand): Promise<void> {
    const subscriptionGuest: SubscriptionGuest = SubscriptionGuest.fromPrimitives({
      subscription_guest_id: command.subscription_guest_id,
      subscription_id: command.subscription_id,
      partner_id: command.partner_id,
      guest_id: command.guest_id,
      start_date: command.start_date,
      end_date: command.end_date,
      status: command.status,
    });
    this.subscriptionGuestRepository.update(subscriptionGuest);
  }
}
