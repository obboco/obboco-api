import { Uuid } from './Shared/uuid';

export interface BookingProps {
  booking_id: Uuid;
  event_id: Uuid;
  status: string;
  email: string;
  guest: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

export class Booking {
  readonly booking_id: Uuid;
  readonly event_id: Uuid;
  readonly status: string;
  readonly email: string;
  readonly guest: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };

  protected constructor(props: BookingProps) {
    this.booking_id = props.booking_id;
    this.event_id = props.event_id;
    this.status = props.status;
    this.email = props.email;
    this.guest = props.guest;
  }

  static create(props: BookingProps): Booking {
    return new Booking(props);
  }
}
