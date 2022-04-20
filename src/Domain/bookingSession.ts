import { Guest, GuestPrimitives } from './guest';
import { Ulid } from './Shared/ulid';

export interface BookingSessionPrimitives {
  booking_id: string;
  event_id: string;
  status: string;
  guest: GuestPrimitives;
}

export interface BookingSessionProps {
  booking_id: Ulid;
  event_id: Ulid;
  status: string;
  guest: Guest;
}

export interface NewBookingSessionProps {
  booking_id: Ulid;
  event_id: Ulid;
}

export class BookingSession {
  protected constructor(
    readonly booking_id: Ulid,
    readonly event_id: Ulid,
    readonly status: string,
    readonly guest: Guest | null
  ) {}

  static new(props: NewBookingSessionProps): BookingSession {
    return new BookingSession(props.booking_id, props.event_id, 'init', null);
  }

  static create(props: BookingSessionProps): BookingSession {
    return new BookingSession(
      props.booking_id,
      props.event_id,
      props.status,
      props.guest
    );
  }

  static fromPrimitives(props: BookingSessionPrimitives): BookingSession {
    return new BookingSession(
      Ulid.fromPrimitives(props.booking_id),
      Ulid.fromPrimitives(props.event_id),
      props.status,
      props.guest ? Guest.fromPrimitives(props.guest) : null
    );
  }

  toPrimitives(): BookingSessionPrimitives {
    return {
      booking_id: this.booking_id.value,
      event_id: this.event_id.value,
      status: this.status,
      guest: this.guest ? this.guest.toPrimitives() : null
    };
  }
}
