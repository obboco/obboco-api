import { BookingFactory } from './../Application/Booking/bookingFactory';
import { Uuid } from './../Domain/Shared/uuid';
import { BookingRepository } from './../Application/Booking/bookingRepository';
import { Booking } from './../Domain/booking';
import { mysqlConnection } from './mysqlConnector';

export class BookingMysqlRepository implements BookingRepository {
  async add(booking: Booking): Promise<void> {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO booking(booking_id, event_id, status, title, start_date, email, guest) VALUES(?, ?, ?, ?, ?, ?, ?)',
      [
        booking.booking_id.value,
        booking.event_id.value,
        booking.status,
        booking.title,
        booking.start_date,
        booking.email,
        JSON.stringify(booking.guest)
      ]
    );
  }

  async get(bookingId: Uuid): Promise<Booking> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT booking_id, event_id, status, title, start_date, email, guest FROM booking WHERE booking_id = ?',
      [bookingId.value]
    );
    return BookingFactory.fromPrimitives(result[0]);
  }
}
