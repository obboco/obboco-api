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

  async make(eventId: string): Promise<InitBookingSessionResponse> {
    const bookingSession: BookingSession = BookingSession.new({
      event_id: Ulid.fromPrimitives(eventId)
    });
    this.bookingSessionRepository.add(bookingSession);
    return {
      booking_id: bookingSession.booking_id
    } as InitBookingSessionResponse;
  }
}
