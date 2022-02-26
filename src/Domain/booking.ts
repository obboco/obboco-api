import { Guest } from './guest';
import { Uuid } from './Shared/uuid';

export interface BookingProps {
  booking_id: Uuid;
  event_id: Uuid;
  status: string;
  title: string;
  start_date: Date;
  duration: number;
  guest: Guest;
}

export class Booking {
  protected constructor(
    readonly booking_id: Uuid,
    readonly event_id: Uuid,
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
