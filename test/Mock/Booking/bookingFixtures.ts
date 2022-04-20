import { Booking } from '../../../src/Domain/booking';
import { Ulid } from '../../../src/Domain/Shared/ulid';
import { mysqlConnection } from '../../../src/Infrastructure/mysqlConnector';

export class BookingFixtures {
  async get(bookingId: Ulid): Promise<Booking> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT booking_id, event_id, status, title, start_date, duration, guest FROM booking WHERE booking_id = ?',
      [bookingId.value]
    );
    if (result[0] == undefined) {
      return null;
    }
    return Booking.fromPrimitives(result[0]);
  }

  async addBooking(booking: Booking) {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO booking(booking_id, event_id, status, title, start_date, duration, guest_id, guest ) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
      [
        booking.booking_id.value,
        booking.event_id.value,
        booking.status,
        booking.title,
        booking.start_date,
        booking.duration,
        booking.guest.guest_id.value,
        JSON.stringify({
          guest_id: booking.guest.guest_id.value,
          first_name: booking.guest.first_name,
          last_name: booking.guest.last_name,
          email: booking.guest.email,
          phone: booking.guest.phone
        })
      ]
    );
  }
}
