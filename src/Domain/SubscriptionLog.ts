import {Ulid} from './Shared/Ulid';

export interface SubscriptionLogPrimitives {
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

export class SubscriptionLog {
  protected constructor(
    public readonly subscription_log_id: Ulid,
    public readonly subscription_guest_id: Ulid,
    public readonly guest_id: Ulid,
    public readonly partner_id: Ulid,
    public readonly subscription_id: Ulid,
    public readonly price: number,
    public readonly currency: string,
    public readonly status: string,
    public readonly date: Date
  ) {}

  static fromPrimitives(primitives: SubscriptionLogPrimitives): SubscriptionLog {
    return new SubscriptionLog(
      Ulid.fromPrimitives(primitives.subscription_log_id),
      Ulid.fromPrimitives(primitives.subscription_guest_id),
      Ulid.fromPrimitives(primitives.guest_id),
      Ulid.fromPrimitives(primitives.partner_id),
      Ulid.fromPrimitives(primitives.subscription_id),
      primitives.price,
      primitives.currency,
      primitives.status,
      new Date(primitives.date)
    );
  }

  toPrimitives(): SubscriptionLogPrimitives {
    return {
      subscription_log_id: this.subscription_log_id.value,
      subscription_guest_id: this.subscription_guest_id.value,
      guest_id: this.guest_id.value,
      partner_id: this.partner_id.value,
      subscription_id: this.subscription_id.value,
      price: this.price,
      currency: this.currency,
      status: this.status,
      date: this.date.toISOString(),
    };
  }
}
