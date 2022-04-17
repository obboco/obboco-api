import { Ulid } from '../../Domain/Shared/ulid';
import { BookingSession } from '../../Domain/bookingSession';

export interface BookingSessionRepository {
  add(bookingSession: BookingSession): Promise<void>;
  get(eventId: Ulid, bookingId: Ulid): Promise<BookingSession>;
  count(eventId: Ulid): Promise<number>;
  delete(bookingSession: BookingSession): Promise<void>;
}
