import { Event } from './../../Domain/event';
import { Ulid } from '../../Domain/Shared/ulid';

interface EventPrimitives {
  event_id: string;
  start_date: string;
  duration: number;
  capacity: number;
  current_capacity: number;
  activity_id: string;
}

export class EventFactory {
  static fromPrimitives(primitives: EventPrimitives): Event {
    return Event.create({
      event_id: Ulid.fromPrimitives(primitives.event_id),
      start_date: new Date(primitives.start_date),
      duration: primitives.duration,
      capacity: primitives.capacity,
      current_capacity: primitives.current_capacity,
      activity_id: Ulid.fromPrimitives(primitives.activity_id)
    });
  }
}
