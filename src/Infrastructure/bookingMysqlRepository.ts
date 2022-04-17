import {
  BookingFactory,
  BookingPrimitives
} from './../Application/Booking/bookingFactory';
import { Ulid } from './../Domain/Shared/ulid';
import { BookingRepository } from './../Application/Booking/bookingRepository';
import { Booking } from './../Domain/booking';
import { mysqlConnection } from './mysqlConnector';

export class BookingMysqlRepository implements BookingRepository {
  async add(booking: Booking): Promise<void> {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO booking(booking_id, event_id, status, title, start_date, duration, guest_id, guest) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
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

  async get(bookingId: Ulid): Promise<Booking> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT booking_id, event_id, status, title, start_date, duration, guest FROM booking WHERE booking_id = ? LIMIT 1',
      [bookingId.value]
    );

    const bookingPrimitives: BookingPrimitives = {
      booking_id: result[0].booking_id,
      event_id: result[0].event_id,
      status: result[0].status,
      title: result[0].title,
      start_date: result[0].start_date,
      duration: result[0].duration,
      guest: JSON.parse(result[0].guest)
    };
    return BookingFactory.fromPrimitives(bookingPrimitives);
  }

  async getByEventId(eventId: Ulid): Promise<Booking[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT booking_id, event_id, status, title, start_date, duration, guest FROM booking WHERE event_id = ? ORDER BY created_at ASC',
      [eventId.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (event: any) => {
        const bookingPrimitives: BookingPrimitives = {
          booking_id: event.booking_id,
          event_id: event.event_id,
          status: event.status,
          title: event.title,
          start_date: event.start_date,
          duration: event.duration,
          guest: JSON.parse(event.guest)
        };
        return BookingFactory.fromPrimitives(bookingPrimitives);
      }
    );
  }
}
