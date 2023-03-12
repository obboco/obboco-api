import {Ulid} from './Shared/Ulid';

export interface SubscriptionPrimitives {
  subscription_id: string;
  partner_id: string;
  name: string;
  price: number;
  currency: string;
  cycle: string;
}

export class Subscription {
  protected constructor(
    readonly subscription_id: Ulid,
    readonly partner_id: Ulid,
    readonly name: string,
    readonly price: number,
    readonly currency: string,
    readonly cycle: string
  ) {}

  static fromPrimitives(primitives: SubscriptionPrimitives): Subscription {
    return new Subscription(
      Ulid.fromPrimitives(primitives.subscription_id),
      Ulid.fromPrimitives(primitives.partner_id),
      primitives.name,
      primitives.price,
      primitives.currency,
      primitives.cycle
    );
  }

  toPrimitives(): SubscriptionPrimitives {
    return {
      subscription_id: this.subscription_id.value,
      partner_id: this.partner_id.value,
      name: this.name,
      price: this.price,
      currency: this.currency,
      cycle: this.cycle,
    };
  }
}
