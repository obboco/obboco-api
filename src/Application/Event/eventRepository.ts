import { Event } from './../../Domain/event';

export interface EventRepository {
  add(event: Event): Promise<void>;
}
