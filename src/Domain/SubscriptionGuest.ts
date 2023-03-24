import {Ulid} from './Shared/Ulid';

export interface SubscriptionGuestPrimitives {
  subscription_guest_id: string;
  guest_id: string;
  partner_id: string;
  subscription_id: string;
  start_date: string;
  end_date: string;
  status: string;
}

export class SubscriptionGuest {
  protected constructor(
    readonly subscription_guest_id: Ulid,
    readonly guest_id: Ulid,
    readonly partner_id: Ulid,
    readonly subscription_id: Ulid,
    readonly start_date: Date,
    readonly end_date: Date,
    readonly status: string
  ) {}

  static fromPrimitives(primitives: SubscriptionGuestPrimitives): SubscriptionGuest {
    return new SubscriptionGuest(
      Ulid.fromPrimitives(primitives.subscription_guest_id),
      Ulid.fromPrimitives(primitives.guest_id),
      Ulid.fromPrimitives(primitives.partner_id),
      Ulid.fromPrimitives(primitives.subscription_id),
      new Date(primitives.start_date),
      new Date(primitives.end_date),
      primitives.status
    );
  }

  toPrimitives(): SubscriptionGuestPrimitives {
    return {
      subscription_guest_id: this.subscription_guest_id.value,
      guest_id: this.guest_id.value,
      partner_id: this.partner_id.value,
      subscription_id: this.subscription_id.value,
      start_date: this.start_date.toISOString(),
      end_date: this.end_date.toISOString(),
      status: this.status,
    };
  }
}
