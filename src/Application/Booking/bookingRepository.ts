import { Booking } from './../../Domain/booking';

export interface BookingRepository {
  add(booking: Booking): Promise<void>;
}
