import { Criteria } from '../../Domain/Criteria/Criteria';
import { Ulid } from '../../Domain/Shared/Ulid';
import { Booking } from '../../Domain/Booking';

export interface BookingRepository {
  add(booking: Booking): Promise<void>;
  update(booking: Booking): Promise<void>;
  get(bookingId: Ulid): Promise<Booking>;
  getByEventId(eventId: Ulid): Promise<Booking[]>;
  getByCriteria(criteria: Criteria): Promise<Booking[]>;
  getByGuestId(guestId: Ulid): Promise<Booking[]>;
}
