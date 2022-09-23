import { UpdateCurrentCapacityEvent } from './../Event/UpdateCurrentCapacityEvent';
import { Booking } from '../../Domain/booking';
import { Ulid } from '../../Domain/Shared/Ulid';
import { BookingRepository } from './BookingRepository';

interface UpdateBookingCommand {
  booking_id: string;
  status: string;
}

export class UpdateBooking {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly updateCurrentCapacityEvent: UpdateCurrentCapacityEvent
  ) {}

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

    if (command.status === 'canceled') {
      await this.updateCurrentCapacityEvent.make({
        action: 'decrease',
        event_id: booking.event_id.value
      });
    }

    if (booking.status === 'canceled' && command.status !== 'canceled') {
      //Overbooking case
      await this.updateCurrentCapacityEvent.make({
        action: 'increase',
        event_id: booking.event_id.value
      });
    }
  }
}
