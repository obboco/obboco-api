import { Ulid } from './Shared/ulid';

export interface EventPrimitives {
  event_id: string;
  start_date: string;
  duration: number;
  capacity: number;
  current_capacity: number;
  activity_id: string;
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

  static fromPrimitives(primitives: EventPrimitives): Event {
    return new Event(
      Ulid.fromPrimitives(primitives.event_id),
      new Date(primitives.start_date),
      primitives.duration,
      primitives.capacity,
      primitives.current_capacity,
      Ulid.fromPrimitives(primitives.activity_id)
    );
  }

  toPrimitives(): EventPrimitives {
    return {
      event_id: this.event_id.value,
      start_date: this.start_date.toISOString(),
      duration: this.duration,
      capacity: this.capacity,
      current_capacity: this.current_capacity,
      activity_id: this.activity_id.value
    };
  }

  incrementCapacity(): void {
    this.current_capacity += 1;
  }

  calculateCurrentCapacity(totalBookingSessions: number): void {
    this.current_capacity += totalBookingSessions;
  }
}
