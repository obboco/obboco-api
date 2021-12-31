import { Uuid } from './../../Domain/Shared/uuid';
import { Booking } from '../../Domain/booking';

export interface BookingRepository {
  add(booking: Booking): Promise<void>;

  get(bookingId: Uuid): Promise<Booking>;
}
