import { Guest } from './guest';
import { Uuid } from './Shared/uuid';

export interface BookingSessionProps {
  booking_id: Uuid;
  event_id: Uuid;
  status: string;
  guest: Guest;
}

export interface NewBookingSessionProps {
  event_id: Uuid;
}

export class BookingSession {
  protected constructor(
    readonly booking_id: Uuid,
    readonly event_id: Uuid,
    readonly status: string,
    readonly guest: Guest
  ) {}

  static new(props: NewBookingSessionProps): BookingSession {
    return new BookingSession(Uuid.create(), props.event_id, 'init', {
      guest_id: Uuid.create(),
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
