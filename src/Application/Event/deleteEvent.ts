import { BookingRepository } from './../Booking/bookingRepository';
import { EventRepository } from './eventRepository';
import { Ulid } from '../../Domain/Shared/ulid';

export class DeleteEvent {
  constructor(
    private eventRepository: EventRepository,
    private bookingRepository: BookingRepository
  ) {}

  async make(requestEventId: string): Promise<void> {
    const eventId: Ulid = Ulid.fromPrimitives(requestEventId);
    await this.bookingRepository.getByEventId(eventId).then((bookings) => {
      if (bookings.length > 0) {
        throw new Error('Cannot delete an event with bookings');
      }
    });

    this.eventRepository.delete(eventId);
  }
}
