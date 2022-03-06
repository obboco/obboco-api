import { Uuid } from './../../Domain/Shared/uuid';
import { Event } from './../../Domain/event';

export interface EventRepostitoryFilter {
  activityId: Uuid;
  time: 'past' | 'future';
}
export interface EventRepository {
  add(event: Event): Promise<void>;
  get(eventId: Uuid): Promise<Event>;
  getByActivityId(activityId: Uuid): Promise<Event[]>;
  getByFilter(filters: EventRepostitoryFilter): Promise<Event[]>;
  update(event: Event): Promise<void>;
  delete(eventId: Uuid): Promise<void>;
}
