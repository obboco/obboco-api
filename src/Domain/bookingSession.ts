import { Uuid } from './Shared/uuid';

export interface BookingSessionProps {
  booking_id: Uuid;
  event_id: Uuid;
  status: string;
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
  readonly status: string;
  readonly guest: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };

  protected constructor(props: BookingSessionProps) {
    this.booking_id = props.booking_id;
    this.event_id = props.event_id;
    this.status = props.status;
    this.guest = props.guest;
  }

  static new(props: NewBookingSessionProps): BookingSession {
    return new BookingSession({
      booking_id: Uuid.create(),
      event_id: props.event_id,
      status: 'init',
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
