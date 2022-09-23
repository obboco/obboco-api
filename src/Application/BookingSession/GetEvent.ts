import { BookingSessionRedisRepository } from '../../Infrastructure/Repository/BookingRedisRepository';
import { ActivityRepository } from '../Activity/ActivityRepository';
import { Event } from '../../Domain/Event';
import { EventRepository } from '../Event/EventRepository';
import { Ulid } from '../../Domain/Shared/Ulid';
import { Activity } from '../../Domain/Activity';

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
