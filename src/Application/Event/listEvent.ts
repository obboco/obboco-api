import { Event } from './../../Domain/event';
import { EventRepository } from './eventRepository';
import { Uuid } from '../../Domain/Shared/uuid';

export class ListEvent {
  eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async make(activityId: string): Promise<Event[]> {
    const activity_id: Uuid = Uuid.fromPrimitives(activityId);
    return this.eventRepository.getByActivityId(activity_id);
  }
}
