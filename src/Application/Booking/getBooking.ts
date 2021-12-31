import { Booking } from './../../Domain/booking';
import { Uuid } from '../../Domain/Shared/uuid';
import { BookingRepository } from './bookingRepository';

export class GetBooking {
  constructor(private bookingRepository: BookingRepository) {}

  async make(bookingId: string): Promise<Booking> {
    const booking_id: Uuid = Uuid.fromPrimitives(bookingId);
    return this.bookingRepository.get(booking_id);
  }
}
