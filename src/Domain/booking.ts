import { Guest, GuestPrimitives } from './guest';
import { Ulid } from './Shared/ulid';

export interface BookingPrimitives {
  booking_id: string;
  event_id: string;
  activity_id: string;
  partner_id: string;
  status: string;
  title: string;
  start_date: string;
  duration: number;
  price: number;
  currency: string;
  guest: GuestPrimitives;
}

export class Booking {
  protected constructor(
    readonly booking_id: Ulid,
    readonly event_id: Ulid,
    readonly activity_id: Ulid,
    readonly partner_id: Ulid,
    readonly status: string,
    readonly title: string,
    readonly start_date: Date,
    readonly duration: number,
    readonly price: number,
    readonly currency: string,
    readonly guest: Guest
  ) {}

  static fromPrimitives(primitives: BookingPrimitives): Booking {
    return new Booking(
      Ulid.fromPrimitives(primitives.booking_id),
      Ulid.fromPrimitives(primitives.event_id),
      Ulid.fromPrimitives(primitives.activity_id),
      Ulid.fromPrimitives(primitives.partner_id),
      primitives.status,
      primitives.title,
      new Date(primitives.start_date),
      primitives.duration,
      primitives.price,
      primitives.currency,
      Guest.fromPrimitives(primitives.guest)
    );
  }

  toPrimitives(): BookingPrimitives {
    return {
      booking_id: this.booking_id.value,
      event_id: this.event_id.value,
      activity_id: this.activity_id.value,
      partner_id: this.partner_id.value,
      status: this.status,
      title: this.title,
      start_date: this.start_date.toISOString(),
      duration: this.duration,
      price: this.price,
      currency: this.currency,
      guest: this.guest.toPrimitives()
    };
  }
}
