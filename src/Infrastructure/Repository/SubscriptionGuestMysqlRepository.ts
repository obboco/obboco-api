import {Ulid} from './../../Domain/Shared/Ulid';
import {execute} from './../Mysql/MysqlHandler';
import {SubscriptionGuest} from '../../Domain/SubscriptionGuest';
import {SubscriptionGuestRepository} from './../../Application/SubscriptionGuest/SubscriptionGuestRepository';

export class SubscriptionGuestMysqlRepository implements SubscriptionGuestRepository {
  async add(subscription: SubscriptionGuest): Promise<void> {
    await execute(
      'INSERT INTO subscription_guest(subscription_guest_id, guest_id, partner_id, subscription_id, start_date, end_date, status) VALUES(?, ?, ?, ?, ?, ?, ?)',
      [
        subscription.subscription_guest_id.value,
        subscription.guest_id.value,
        subscription.partner_id.value,
        subscription.subscription_id.value,
        subscription.start_date.toISOString(),
        subscription.end_date.toISOString(),
        subscription.status,
      ]
    );
  }

  async get(subscriptionGuestId: Ulid): Promise<SubscriptionGuest> {
    const result = await execute(
      'SELECT subscription_guest_id, guest_id, partner_id, subscription_id, start_date, end_date, status FROM subscription_guest WHERE subscription_guest_id = ?',
      [subscriptionGuestId.value]
    );

    if (result[0] == undefined) {
      return null;
    }

    return SubscriptionGuest.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }

  async update(subscription: SubscriptionGuest): Promise<void> {
    await execute(
      'UPDATE subscription_guest SET guest_id = ?, partner_id = ?, subscription_id = ?, start_date = ?, end_date = ?, status = ? WHERE subscription_guest_id = ?',
      [
        subscription.guest_id.value,
        subscription.partner_id.value,
        subscription.subscription_id.value,
        subscription.start_date.toISOString(),
        subscription.end_date.toISOString(),
        subscription.status,
        subscription.subscription_guest_id.value,
      ]
    );
  }

  async getBySubscriptionId(subscriptionId: Ulid): Promise<SubscriptionGuest[]> {
    const result = await execute(
      'SELECT subscription_guest_id, guest_id, partner_id, subscription_id, start_date, end_date, status FROM subscription_guest WHERE subscription_id = ?',
      [subscriptionId.value]
    );

    if (result[0] == undefined) {
      return null;
    }

    return JSON.parse(JSON.stringify(result)).map(row =>
      SubscriptionGuest.fromPrimitives(row)
    );
  }
}
