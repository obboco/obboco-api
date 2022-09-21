import { Booking } from '../../Domain/booking';
import { Ulid } from '../../Domain/Shared/Ulid';
import { BookingRepository } from './BookingRepository';

interface UpdateBookingCommand {
  booking_id: string;
  status: string;
}

export class UpdateBooking {
  constructor(private bookingRepository: BookingRepository) {}

  async make(command: UpdateBookingCommand): Promise<void> {
    const bookingId = Ulid.fromPrimitives(command.booking_id);
    const booking = await this.bookingRepository.get(bookingId);

    if (command.status === booking.status) return;

    this.bookingRepository.update(
      Booking.fromPrimitives({
        ...booking.toPrimitives(),
        status: command.status
      })
    );

    if (command.status === 'deleted') {
      //decrease
    }

    if (booking.status === 'deleted' && command.status !== 'deleted') {
      //Overbooking case
      //increase
    }
  }
}
