import { BookingSession } from '../../Domain/BookingSession';
import { Ulid } from '../../Domain/Shared/Ulid';
import { BookingSessionRepository } from './BookingSessionRepository';

export interface InitBookingSessionResponse {
  booking_id: Ulid;
}

export class InitBookingSession {
  bookingSessionRepository: BookingSessionRepository;

  constructor(bookingSessionRepository: BookingSessionRepository) {
    this.bookingSessionRepository = bookingSessionRepository;
  }

  async make(bookingId: string, eventId: string): Promise<void> {
    const bookingSession: BookingSession = BookingSession.fromPrimitives({
      booking_id: bookingId,
      event_id: eventId,
      status: 'init',
      guest: null
    });
    this.bookingSessionRepository.add(bookingSession);
  }
}
