import { Booking } from './../Domain/booking';
import { BookingRepository } from '../Application/Booking/bookingRepository';
import { mysqlConnection } from './mysqlConnector';

export class BookingMysqlRepository implements BookingRepository {
  async add(booking: Booking): Promise<void> {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO booking(booking_id, event_id, status, email, guest) VALUES(?, ?, ?, ?, ?)',
      [
        booking.booking_id.value,
        booking.event_id.value,
        booking.status,
        booking.email,
        JSON.stringify(booking.guest)
      ]
    );
  }
}
