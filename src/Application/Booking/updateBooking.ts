import { Booking } from './../../Domain/booking';
import { Ulid } from '../../Domain/Shared/ulid';
import { BookingRepository } from './bookingRepository';

interface UpdateBookingCommand {
  booking_id: string;
  status: string;
}

export class UpdateBooking {
  constructor(private bookingRepository: BookingRepository) {}

  async make(command: UpdateBookingCommand): Promise<void> {
    const bookingId = Ulid.fromPrimitives(command.booking_id);
    const booking = await this.bookingRepository.get(bookingId);
    this.bookingRepository.update(
      Booking.fromPrimitives({
        ...booking.toPrimitives(),
        status: command.status
      })
    );
  }
}
