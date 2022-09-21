import { BookingSessionPrimitives } from '../../Domain/BookingSession';
import { Guest, GuestPrimitives } from '../../Domain/Guest';
import { GuestRepository } from '../Guest/GuestRepository';
import { BookingSession } from '../../Domain/BookingSession';
import { BookingSessionRepository } from './BookingSessionRepository';

interface AddGuessBokingSessionCommand {
  booking_id: string;
  event_id: string;
  guest: GuestPrimitives;
}

export class AddGuestBookingSession {
  constructor(
    private bookingSessionRepository: BookingSessionRepository,
    private guestRepository: GuestRepository
  ) {}

  async make(command: AddGuessBokingSessionCommand): Promise<void> {
    const guest: Guest = Guest.fromPrimitives(command.guest);

    const guestFromRepository = await this.guestRepository.get(guest.guest_id);
    if (!guestFromRepository) {
      this.guestRepository.add(guest);
    }

    const bookingSessionPrimitives: BookingSessionPrimitives = {
      booking_id: command.booking_id,
      event_id: command.event_id,
      status: 'guest',
      guest: command.guest
    };

    const bookingSession: BookingSession = BookingSession.fromPrimitives(
      bookingSessionPrimitives
    );
    this.bookingSessionRepository.add(bookingSession);
  }
}
