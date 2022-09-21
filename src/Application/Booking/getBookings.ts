import { Booking } from '../../Domain/Booking';
import { Ulid } from '../../Domain/Shared/Ulid';
import { BookingRepository } from './BookingRepository';

export class GetBookings {
  constructor(private bookingRepository: BookingRepository) {}

  async make(eventId: string): Promise<Booking[]> {
    const event_id: Ulid = Ulid.fromPrimitives(eventId);
    return this.bookingRepository.getByEventId(event_id);
  }
}
