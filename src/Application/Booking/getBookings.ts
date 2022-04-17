import { Booking } from '../../Domain/booking';
import { Ulid } from '../../Domain/Shared/ulid';
import { BookingRepository } from './bookingRepository';

export class GetBookings {
  constructor(private bookingRepository: BookingRepository) {}

  async make(eventId: string): Promise<Booking[]> {
    const event_id: Ulid = Ulid.fromPrimitives(eventId);
    return this.bookingRepository.getByEventId(event_id);
  }
}
