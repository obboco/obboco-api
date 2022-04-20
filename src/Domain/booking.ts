import { Guest, GuestPrimitives } from './guest';
import { Ulid } from './Shared/ulid';

export interface BookingPrimitives {
  booking_id: string;
  event_id: string;
  status: string;
  title: string;
  start_date: string;
  duration: number;
  guest: GuestPrimitives;
}

export class Booking {
  protected constructor(
    readonly booking_id: Ulid,
    readonly event_id: Ulid,
    readonly status: string,
    readonly title: string,
    readonly start_date: Date,
    readonly duration: number,
    readonly guest: Guest
  ) {}

  static fromPrimitives(primitives: BookingPrimitives): Booking {
    return new Booking(
      Ulid.fromPrimitives(primitives.booking_id),
      Ulid.fromPrimitives(primitives.event_id),
      primitives.status,
      primitives.title,
      new Date(primitives.start_date),
      primitives.duration,
      Guest.fromPrimitives(primitives.guest)
    );
  }

  toPrimitives(): BookingPrimitives {
    return {
      booking_id: this.booking_id.value,
      event_id: this.event_id.value,
      status: this.status,
      title: this.title,
      start_date: this.start_date.toISOString(),
      duration: this.duration,
      guest: this.guest.toPrimitives()
    };
  }
}
