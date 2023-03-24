import {SubscriptionLog} from './../../Domain/SubscriptionLog';
import {Ulid} from '../../Domain/Shared/Ulid';

export interface SubscriptionLogRepository {
  add(subscriptionLog: SubscriptionLog): Promise<void>;
  get(subscriptionLogId: Ulid): Promise<SubscriptionLog>;
}
