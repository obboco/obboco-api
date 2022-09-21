import { Booking } from '../../Domain/Booking';
import { Ulid } from '../../Domain/Shared/Ulid';
import { BookingRepository } from './BookingRepository';

export class GetBooking {
  constructor(private bookingRepository: BookingRepository) {}

  async make(bookingId: string): Promise<Booking> {
    const booking_id: Ulid = Ulid.fromPrimitives(bookingId);
    return this.bookingRepository.get(booking_id);
  }
}
