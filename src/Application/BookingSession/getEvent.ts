import { BookingSession } from './../../Domain/bookingSession';
import { BookingSessionRedisRepository } from './../../Infrastructure/bookingRedisRepository';
import { ActivityRepository } from '../Activity/activityRepository';
import { Event } from '../../Domain/event';
import { EventRepository } from '../Event/eventRepository';
import { Ulid } from '../../Domain/Shared/ulid';
import { Activity } from '../../Domain/activity';

export interface BookingEventResponse {
  event: Event;
  activity: Activity;
}

export class GetEvent {
  eventRepository: EventRepository;
  activityRepository: ActivityRepository;
  bookingSessionRepository: BookingSessionRedisRepository;

  constructor(
    eventRepository: EventRepository,
    activityRepository: ActivityRepository,
    bookingSessionRepository: BookingSessionRedisRepository
  ) {
    this.eventRepository = eventRepository;
    this.activityRepository = activityRepository;
    this.bookingSessionRepository = bookingSessionRepository;
  }

  async make(eventId: string): Promise<BookingEventResponse> {
    const event_id: Ulid = Ulid.fromPrimitives(eventId);
    const event: Event = await this.eventRepository.get(event_id);
    const activity: Activity = await this.activityRepository.get(
      event.activity_id
    );
    const totalBookingSessions: number =
      await this.bookingSessionRepository.count(event_id);

    event.calculateCurrentCapacity(totalBookingSessions);
    return { event, activity } as BookingEventResponse;
  }
}
