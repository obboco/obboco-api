import { BookingPrimitives } from '../../../src/Domain/Booking';
import { Booking } from '../../../src/Domain/Booking';
import { Ulid } from '../../../src/Domain/Shared/Ulid';
import { mysqlConnection } from '../../../src/Infrastructure/Mysql/MysqlConnector';

export class BookingFixtures {
  async get(bookingId: Ulid): Promise<Booking | null> {
    const connection = await mysqlConnection();
    const [result] = await connection.execute(
      'SELECT booking_id, event_id, activity_id, partner_id, status, title, start_date, duration, price, currency, guest, source, type, guest_pass_id FROM booking WHERE booking_id = ? LIMIT 1',
      [bookingId.value]
    );
    connection.end();
    if (result[0] == undefined) {
      return null;
    }
    const bookingPrimitives: BookingPrimitives = {
      booking_id: result[0].booking_id,
      event_id: result[0].event_id,
      activity_id: result[0].activity_id,
      partner_id: result[0].partner_id,
      status: result[0].status,
      title: result[0].title,
      start_date: result[0].start_date,
      duration: result[0].duration,
      price: result[0].price,
      currency: result[0].currency,
      guest: JSON.parse(result[0].guest),
      source: result[0].source,
      type: result[0].type,
      guest_pass_id: result[0].guest_pass_id
    };
    return Booking.fromPrimitives(bookingPrimitives);
  }

  async addBooking(booking: Booking) {
    const connection = await mysqlConnection();
    await connection.execute(
      'INSERT INTO booking(booking_id, event_id, activity_id, partner_id, status, title, start_date, duration, price, currency, guest_id, guest, source, type, guest_pass_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        booking.booking_id.value,
        booking.event_id.value,
        booking.activity_id.value,
        booking.partner_id.value,
        booking.status,
        booking.title,
        booking.start_date,
        booking.duration,
        booking.price,
        booking.currency,
        booking.guest.guest_id.value,
        JSON.stringify({
          guest_id: booking.guest.guest_id.value,
          partner_id: booking.guest.partner_id.value,
          first_name: booking.guest.first_name,
          last_name: booking.guest.last_name,
          email: booking.guest.email,
          phone: booking.guest.phone
        }),
        booking.source,
        booking.type,
        booking.guestPassId ? booking.guestPassId.value : null
      ]
    );
    connection.end();
  }
}
