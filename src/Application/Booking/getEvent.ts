import { ActivityRepository } from './../Activity/activityRepository';
import { Event } from '../../Domain/event';
import { EventRepository } from '../Event/eventRepository';
import { Uuid } from '../../Domain/Shared/uuid';
import { Activity } from '../../Domain/activity';

export interface BookingEventResponse {
  event: Event;
  activity: Activity;
}

export class GetEvent {
  eventRepository: EventRepository;
  activityRepository: ActivityRepository;

  constructor(
    eventRepository: EventRepository,
    activityRepository: ActivityRepository
  ) {
    this.eventRepository = eventRepository;
    this.activityRepository = activityRepository;
  }

  async make(eventId: string): Promise<BookingEventResponse> {
    const event_id: Uuid = Uuid.fromPrimitives(eventId);
    const event: Event = await this.eventRepository.get(event_id);
    const activity: Activity = await this.activityRepository.get(
      event.activity_id
    );
    return { event, activity } as BookingEventResponse;
  }
}
