import { Event } from '../../Domain/event';
import { Uuid } from '../../Domain/Shared/uuid';
import { Request } from 'express';
import { EventRepository } from './eventRepository';

export class UpdateEvent {
  constructor(private eventRepository: EventRepository) {}

  async make(request: Request): Promise<void> {
    const event: Event = await this.eventRepository.get(
      Uuid.fromPrimitives(request.body.event_id)
    );

    const updateEvent: Event = Event.create({
      event_id: event.event_id,
      start_date: request.body.start_date,
      duration: request.body.duration,
      current_capacity: event.current_capacity,
      capacity: request.body.capacity,
      activity_id: event.activity_id
    });
    await this.eventRepository.update(updateEvent);
  }
}
