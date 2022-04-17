import { Event } from './../../Domain/event';
import { EventRepository } from './eventRepository';
import { Ulid } from '../../Domain/Shared/ulid';

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
    const activityId: Ulid = Ulid.fromPrimitives(eventListProps.activityId);
    return eventListProps.time === undefined
      ? this.eventRepository.getByActivityId(activityId)
      : this.eventRepository.getByFilter({
          activityId: activityId,
          time: eventListProps.time
        });
  }
}
