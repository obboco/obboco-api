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

  async make(
    bookingId: Ulid,
    eventId: Ulid
  ): Promise<InitBookingSessionResponse> {
    const bookingSession: BookingSession = BookingSession.new({
      booking_id: bookingId,
      event_id: eventId
    });
    this.bookingSessionRepository.add(bookingSession);
    return {
      booking_id: bookingSession.booking_id
    } as InitBookingSessionResponse;
  }
}
