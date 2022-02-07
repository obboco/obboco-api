import { Event } from '../../Domain/event';
import { EventRepository } from './eventRepository';
import { Uuid } from '../../Domain/Shared/uuid';

export class GetEvent {
  constructor(private eventRepository: EventRepository) {}

  async make(eventId: string): Promise<Event> {
    const event_id: Uuid = Uuid.fromPrimitives(eventId);
    return this.eventRepository.get(event_id);
  }
}
