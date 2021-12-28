import { BookingSession } from './../../Domain/bookingSession';

export interface BookingSessionRepository {
  add(bookingSession: BookingSession): Promise<void>;
}
