import { Event } from '../../Domain/Event';
import { EventRepository } from './EventRepository';
import { Ulid } from '../../Domain/Shared/Ulid';

export class GetEvent {
  constructor(private eventRepository: EventRepository) {}

  async make(eventId: string): Promise<Event> {
    const event_id: Ulid = Ulid.fromPrimitives(eventId);
    return this.eventRepository.get(event_id);
  }
}
