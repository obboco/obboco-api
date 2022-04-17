import { Ulid } from './../../Domain/Shared/ulid';
import { Booking } from '../../Domain/booking';

export interface BookingRepository {
  add(booking: Booking): Promise<void>;

  get(bookingId: Ulid): Promise<Booking>;

  getByEventId(eventId: Ulid): Promise<Booking[]>;
}
