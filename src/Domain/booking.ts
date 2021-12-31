import { Uuid } from './Shared/uuid';

export interface BookingProps {
  booking_id: Uuid;
  event_id: Uuid;
  status: string;
  title: string;
  start_date: Date;
  duration: number;
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
  readonly title: string;
  readonly start_date: Date;
  readonly duration: number;
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
    this.title = props.title;
    this.start_date = props.start_date;
    this.duration = props.duration;
    this.email = props.email;
    this.guest = props.guest;
  }

  static create(props: BookingProps): Booking {
    return new Booking(props);
  }
}
