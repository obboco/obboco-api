import { Event } from './../../Domain/event';
import { Uuid } from '../../Domain/Shared/uuid';
import { Request } from 'express';
import { EventRepository } from './eventRepository';

export class CreateEvent {
  eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  make(request: Request): Uuid {
    const event: Event = Event.new({
      start_date: new Date(request.body.start_date),
      duration: request.body.duration,
      capacity: request.body.capacity,
      activity_id: Uuid.fromPrimitives(request.body.activity_id)
    });
    this.eventRepository.add(event);
    return event.event_id;
  }
}
