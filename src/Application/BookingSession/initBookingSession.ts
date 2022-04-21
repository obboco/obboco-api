import { BookingSession } from '../../Domain/bookingSession';
import { Ulid } from '../../Domain/Shared/ulid';
import { BookingSessionRepository } from './bookingSessionRepository';

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
