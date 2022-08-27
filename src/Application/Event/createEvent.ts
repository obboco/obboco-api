import { Event } from './../../Domain/event';
import { Ulid } from '../../Domain/Shared/ulid';
import { EventRepository } from './eventRepository';

interface EventListCommand {
  event_id: string;
  start_date: string;
  duration: number;
  capacity: number;
  activity_id: string;
}

export class CreateEvent {
  constructor(private eventRepository: EventRepository) {}

  make(command: EventListCommand): Ulid {
    const event: Event = Event.fromPrimitives({
      event_id: command.event_id,
      start_date: command.start_date,
      duration: command.duration,
      capacity: command.capacity,
      current_capacity: 0,
      activity_id: command.activity_id
    });
    this.eventRepository.add(event);
    return event.event_id;
  }
}
