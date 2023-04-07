import {Ulid} from './../../Domain/Shared/Ulid';
import {execute} from './../Mysql/MysqlHandler';
import {Subscription} from './../../Domain/Subscription';
import {SubscriptionRepository} from './../../Application/Subscription/SubscriptionRepository';

export class SubscriptionMysqlRepository implements SubscriptionRepository {
  async add(subscription: Subscription): Promise<void> {
    await execute(
      'INSERT INTO subscription(subscription_id, user_id, activity_id, status) VALUES(?, ?, ?, ?)',
      [
        subscription.subscription_id.value,
        subscription.partner_id.value,
        subscription.name,
        subscription.price,
        subscription.currency,
        subscription.cycle,
      ]
    );
  }

  async update(subscription: Subscription): Promise<void> {
    await execute(
      'UPDATE subscription SET subscription_id = ?, partner_id = ?, name = ?, price = ?, currency = ?, cycle = ? WHERE subscription_id = ?',
      [
        subscription.subscription_id.value,
        subscription.partner_id.value,
        subscription.name,
        subscription.price,
        subscription.currency,
        subscription.cycle,
      ]
    );
  }

  async get(subscriptionId: Ulid): Promise<Subscription> {
    const result = await execute(
      'SELECT subscription_id, partner_id, name, price, currency, cycle FROM subscription WHERE subscription_id = ?',
      [subscriptionId.value]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Subscription.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }

  async getByPartnerId(partnerId: Ulid): Promise<Subscription[]> {
    const result = await execute(
      'SELECT subscription_id, partner_id, name, price, currency, cycle FROM subscription WHERE partner_id = ? ORDER BY created_at ASC',
      [partnerId.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map((subscription: any) =>
      Subscription.fromPrimitives(subscription)
    );
  }
}
