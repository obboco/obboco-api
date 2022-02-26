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
  readonly event_id: Uuid;
  readonly start_date: Date;
  readonly duration: number;
  readonly capacity: number;
  public current_capacity: number;
  readonly activity_id: Uuid;

  protected constructor(props: EventProps) {
    this.event_id = props.event_id;
    this.start_date = props.start_date;
    this.duration = props.duration;
    this.capacity = props.capacity;
    this.current_capacity = props.current_capacity;
    this.activity_id = props.activity_id;
  }

  static new(props: NewEventProps): Event {
    return new Event({
      event_id: Uuid.create(),
      start_date: props.start_date,
      duration: props.duration,
      capacity: props.capacity,
      current_capacity: 0,
      activity_id: props.activity_id
    });
  }

  static create(props: EventProps): Event {
    return new Event(props);
  }

  incrementCapacity(): void {
    this.current_capacity += 1;
  }

  calculateCurrentCapacity(totalBookingSessions: number): void {
    this.current_capacity += totalBookingSessions;
  }
}
