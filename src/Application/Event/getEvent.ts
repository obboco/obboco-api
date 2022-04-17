import { Event } from '../../Domain/event';
import { EventRepository } from './eventRepository';
import { Ulid } from '../../Domain/Shared/ulid';

export class GetEvent {
  constructor(private eventRepository: EventRepository) {}

  async make(eventId: string): Promise<Event> {
    const event_id: Ulid = Ulid.fromPrimitives(eventId);
    return this.eventRepository.get(event_id);
  }
}
