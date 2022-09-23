import { Event } from '../../Domain/Event';
import { EventRepository } from './EventRepository';
import { Ulid } from '../../Domain/Shared/Ulid';

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
