import { Criteria } from './../../Domain/Criteria/criteria';
import { Ulid } from './../../Domain/Shared/ulid';
import { Booking } from '../../Domain/booking';

export interface BookingRepository {
  add(booking: Booking): Promise<void>;
  update(booking: Booking): Promise<void>;
  get(bookingId: Ulid): Promise<Booking>;
  getByEventId(eventId: Ulid): Promise<Booking[]>;
  getByCriteria(criteria: Criteria): Promise<Booking[]>;
  getByGuestId(guestId: Ulid): Promise<Booking[]>;
}
