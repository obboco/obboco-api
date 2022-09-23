import { BookingRepository } from '../Booking/BookingRepository';
import { Ulid } from '../../Domain/Shared/Ulid';
import { GuestRepository } from './GuestRepository';

interface DeleteGuestCommand {
  guest_id: string;
}

export class DeleteGuest {
  constructor(
    private guestRepository: GuestRepository,
    private bookingRepository: BookingRepository
  ) {}

  async make(command: DeleteGuestCommand): Promise<void> {
    const guestId: Ulid = Ulid.fromPrimitives(command.guest_id);

    await this.bookingRepository.getByGuestId(guestId).then((bookings) => {
      if (bookings.length > 0) {
        throw new Error('Cannot delete a guest with bookings');
      }
    });

    this.guestRepository.delete(guestId);
  }
}
