import { Guest } from './guest';
import { Ulid } from './Shared/ulid';

export interface BookingSessionProps {
  booking_id: Ulid;
  event_id: Ulid;
  status: string;
  guest: Guest;
}

export interface NewBookingSessionProps {
  event_id: Ulid;
}

export class BookingSession {
  protected constructor(
    readonly booking_id: Ulid,
    readonly event_id: Ulid,
    readonly status: string,
    readonly guest: Guest
  ) {}

  static new(props: NewBookingSessionProps): BookingSession {
    return new BookingSession(Ulid.create(), props.event_id, 'init', {
      guest_id: Ulid.create(),
      first_name: '',
      last_name: '',
      email: '',
      phone: ''
    });
  }

  static create(props: BookingSessionProps): BookingSession {
    return new BookingSession(
      props.booking_id,
      props.event_id,
      props.status,
      props.guest
    );
  }
}
