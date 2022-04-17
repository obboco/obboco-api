import { Ulid } from './../../Domain/Shared/ulid';
import { Event } from './../../Domain/event';

export interface EventRepostitoryFilter {
  activityId: Ulid;
  time: 'past' | 'future';
}
export interface EventRepository {
  add(event: Event): Promise<void>;
  get(eventId: Ulid): Promise<Event>;
  getByActivityId(activityId: Ulid): Promise<Event[]>;
  getByFilter(filters: EventRepostitoryFilter): Promise<Event[]>;
  update(event: Event): Promise<void>;
  delete(eventId: Ulid): Promise<void>;
}
