import { Uuid } from './../../Domain/Shared/uuid';
import { Event } from './../../Domain/event';

export interface EventRepository {
  add(event: Event): Promise<void>;
  get(eventId: Uuid): Promise<Event>;
  getByActivityId(activityId: Uuid): Promise<Event[]>;
  update(event: Event): Promise<void>;
  delete(eventId: Uuid): Promise<void>;
}
