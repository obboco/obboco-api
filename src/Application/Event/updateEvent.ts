import { BookingRepository } from './../Booking/bookingRepository';
import { Event } from '../../Domain/event';
import { Ulid } from '../../Domain/Shared/ulid';
import { Request } from 'express';
import { EventRepository } from './eventRepository';

export class UpdateEvent {
  constructor(
    private eventRepository: EventRepository,
    private bookingRepository: BookingRepository
  ) {}

  async make(request: Request): Promise<void> {
    const eventId = Ulid.fromPrimitives(request.body.event_id);

    await this.bookingRepository.getByEventId(eventId).then((bookings) => {
      if (bookings.length > 0) {
        throw new Error('Cannot update an event with bookings');
      }
    });

    const event: Event = await this.eventRepository.get(eventId);

    const updateEvent: Event = Event.fromPrimitives({
      event_id: event.event_id.value,
      start_date: request.body.start_date,
      duration: request.body.duration,
      current_capacity: event.current_capacity,
      capacity: request.body.capacity,
      activity_id: event.activity_id.value
    });
    await this.eventRepository.update(updateEvent);
  }
}
