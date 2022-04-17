import { Booking } from './../../Domain/booking';
import { Ulid } from '../../Domain/Shared/ulid';
import { BookingRepository } from './bookingRepository';

export class GetBooking {
  constructor(private bookingRepository: BookingRepository) {}

  async make(bookingId: string): Promise<Booking> {
    const booking_id: Ulid = Ulid.fromPrimitives(bookingId);
    return this.bookingRepository.get(booking_id);
  }
}
