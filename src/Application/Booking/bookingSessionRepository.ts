import { Uuid } from './../../Domain/Shared/uuid';
import { BookingSession } from './../../Domain/bookingSession';

export interface BookingSessionRepository {
  add(bookingSession: BookingSession): Promise<void>;
  get(eventId: Uuid, bookingId: Uuid): Promise<BookingSession>;
  delete(bookingSession: BookingSession): Promise<void>;
}
