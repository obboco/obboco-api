import { Event } from './../../Domain/event';
import { EventRepository } from './eventRepository';
import { Uuid } from '../../Domain/Shared/uuid';

interface EventListProps {
  activityId: string;
  time: 'past' | 'future';
}
export class ListEvent {
  eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async make(eventListProps: EventListProps): Promise<Event[]> {
    const activityId: Uuid = Uuid.fromPrimitives(eventListProps.activityId);
    return eventListProps.time === undefined
      ? this.eventRepository.getByActivityId(activityId)
      : this.eventRepository.getByFilter({
          activityId: activityId,
          time: eventListProps.time
        });
  }
}
