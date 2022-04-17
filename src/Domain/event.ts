import { Ulid } from './Shared/ulid';

export interface EventProps {
  event_id: Ulid;
  start_date: Date;
  duration: number;
  capacity: number;
  current_capacity: number;
  activity_id: Ulid;
}

export interface NewEventProps {
  start_date: Date;
  duration: number;
  capacity: number;
  activity_id: Ulid;
}

export class Event {
  protected constructor(
    readonly event_id: Ulid,
    readonly start_date: Date,
    readonly duration: number,
    readonly capacity: number,
    public current_capacity: number,
    readonly activity_id: Ulid
  ) {}

  static new(props: NewEventProps): Event {
    return new Event(
      Ulid.create(),
      props.start_date,
      props.duration,
      props.capacity,
      0,
      props.activity_id
    );
  }

  static create(props: EventProps): Event {
    return new Event(
      props.event_id,
      props.start_date,
      props.duration,
      props.capacity,
      props.current_capacity,
      props.activity_id
    );
  }

  incrementCapacity(): void {
    this.current_capacity += 1;
  }

  calculateCurrentCapacity(totalBookingSessions: number): void {
    this.current_capacity += totalBookingSessions;
  }
}
