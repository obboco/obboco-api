import { Uuid } from './../../Domain/Shared/uuid';
import { Event } from './../../Domain/event';

export interface EventRepository {
  add(event: Event): Promise<void>;

  getByActivityId(activityId: Uuid): Promise<Event[]>;
}
