import { Event } from './../../Domain/event';
import { EventRepository } from './eventRepository';
import { Ulid } from '../../Domain/Shared/ulid';

interface EventListCommand {
  activityId: string;
  time: 'past' | 'future';
}
export class ListEvent {
  eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async make(command: EventListCommand): Promise<Event[]> {
    const activityId: Ulid = Ulid.fromPrimitives(command.activityId);
    return command.time === undefined
      ? this.eventRepository.getByActivityId(activityId)
      : this.eventRepository.getByFilter({
          activityId: activityId,
          time: command.time
        });
  }
}
