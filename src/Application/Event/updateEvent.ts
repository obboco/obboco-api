import { BookingRepository } from './../Booking/bookingRepository';
import { Event } from '../../Domain/event';
import { Ulid } from '../../Domain/Shared/ulid';
import { EventRepository } from './eventRepository';

interface EventListCommand {
  event_id: string;
  start_date: string;
  duration: number;
  capacity: number;
  activity_id: string;
}

export class UpdateEvent {
  constructor(
    private eventRepository: EventRepository,
    private bookingRepository: BookingRepository
  ) {}

  async make(command: EventListCommand): Promise<void> {
    const eventId = Ulid.fromPrimitives(command.event_id);

    await this.bookingRepository.getByEventId(eventId).then((bookings) => {
      if (bookings.length > 0) {
        throw new Error('Cannot update an event with bookings');
      }
    });

    const event: Event = await this.eventRepository.get(eventId);

    const updateEvent: Event = Event.fromPrimitives({
      event_id: event.event_id.value,
      start_date: command.start_date,
      duration: command.duration,
      current_capacity: event.current_capacity,
      capacity: command.capacity,
      activity_id: event.activity_id.value
    });
    await this.eventRepository.update(updateEvent);
  }
}
