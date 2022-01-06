import { Booking } from '../../Domain/booking';
import { Uuid } from '../../Domain/Shared/uuid';
import { BookingRepository } from './bookingRepository';

export class GetBookings {
  constructor(private bookingRepository: BookingRepository) {}

  async make(eventId: string): Promise<Booking[]> {
    const event_id: Uuid = Uuid.fromPrimitives(eventId);
    return this.bookingRepository.getByEventId(event_id);
  }
}
