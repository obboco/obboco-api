import { Uuid } from './Shared/uuid';

export interface BookingSessionProps {
  booking_id: Uuid;
  event_id: Uuid;
  guest: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

export interface NewBookingSessionProps {
  event_id: Uuid;
}

export class BookingSession {
  readonly booking_id: Uuid;
  readonly event_id: Uuid;
  readonly guest: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };

  protected constructor(props: BookingSessionProps) {
    this.booking_id = props.booking_id;
    this.event_id = props.event_id;
    this.guest = props.guest;
  }

  static new(props: NewBookingSessionProps): BookingSession {
    return new BookingSession({
      booking_id: Uuid.create(),
      event_id: props.event_id,
      guest: {
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      }
    });
  }

  static create(props: BookingSessionProps): BookingSession {
    return new BookingSession(props);
  }
}
