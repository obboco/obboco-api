import { Guest } from './guest';
import { Ulid } from './Shared/ulid';

export interface BookingProps {
  booking_id: Ulid;
  event_id: Ulid;
  status: string;
  title: string;
  start_date: Date;
  duration: number;
  guest: Guest;
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

  static create(props: BookingProps): Booking {
    return new Booking(
      props.booking_id,
      props.event_id,
      props.status,
      props.title,
      props.start_date,
      props.duration,
      props.guest
    );
  }
}
