import { Uuid } from './Shared/uuid';

export interface EventProps {
  event_id: Uuid;
  start_date: Date;
  duration: number;
  capacity: number;
  current_capacity: number;
  activity_id: Uuid;
}

export interface NewEventProps {
  start_date: Date;
  duration: number;
  capacity: number;
  activity_id: Uuid;
}

export class Event {
  protected constructor(
    readonly event_id: Uuid,
    readonly start_date: Date,
    readonly duration: number,
    readonly capacity: number,
    public current_capacity: number,
    readonly activity_id: Uuid
  ) {}

  static new(props: NewEventProps): Event {
    return new Event(
      Uuid.create(),
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
