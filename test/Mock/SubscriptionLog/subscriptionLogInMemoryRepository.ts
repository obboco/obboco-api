import {SubscriptionLog} from './../../../src/Domain/SubscriptionLog';
import {SubscriptionLogRepository} from './../../../src/Application/SubscriptionLog/SubscriptionLogRepository';
import {Ulid} from '../../../src/Domain/Shared/Ulid';

export class SubscriptionLogInMemoryRepository implements SubscriptionLogRepository {
  private readonly subscriptionLogs = new Map<string, SubscriptionLog>();
  async add(subscriptionLog: SubscriptionLog): Promise<void> {
    this.subscriptionLogs.set(subscriptionLog.subscription_log_id.value, subscriptionLog);
  }

  async get(subscriptionLogId: Ulid): Promise<SubscriptionLog> {
    const subscriptionLog =
      this.subscriptionLogs.get(subscriptionLogId.value) ??
      this.throwExpression('SubscriptionLog not found');
    return subscriptionLog;
  }

  throwExpression(errorMessage: string): never {
    throw new Error(errorMessage);
  }
}
