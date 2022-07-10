import { Ulid } from './../../Domain/Shared/ulid';
import { BookingRepository } from './../../Application/Booking/bookingRepository';
import { Booking, BookingPrimitives } from './../../Domain/booking';
import { mysqlConnection } from './../Mysql/mysqlConnector';

export class BookingMysqlRepository implements BookingRepository {
  async add(booking: Booking): Promise<void> {
    const connection = await mysqlConnection();
    await connection.execute(
      'INSERT INTO booking(booking_id, event_id, activity_id, partner_id, status, title, start_date, duration, price, currency, guest_id, guest, source) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
        booking.source
      ]
    );
    connection.end();
  }

  async update(booking: Booking): Promise<void> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'UPDATE booking SET status = ? WHERE booking_id = ? LIMIT 1',
      [booking.status, booking.booking_id.value]
    );
    connection.end();
  }

  async get(bookingId: Ulid): Promise<Booking> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT booking_id, event_id, activity_id, partner_id, status, title, start_date, duration, price, currency, guest, source FROM booking WHERE booking_id = ? LIMIT 1',
      [bookingId.value]
    );
    connection.end();

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
      source: result[0].source
    };
    return Booking.fromPrimitives(bookingPrimitives);
  }

  async getByEventId(eventId: Ulid): Promise<Booking[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT booking_id, event_id, activity_id, partner_id, status, title, start_date, duration, price, currency, guest, source FROM booking WHERE event_id = ? ORDER BY created_at ASC',
      [eventId.value]
    );
    connection.end();

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (booking: any) => {
        const bookingPrimitives: BookingPrimitives = {
          booking_id: booking.booking_id,
          event_id: booking.event_id,
          activity_id: booking.activity_id,
          partner_id: booking.partner_id,
          status: booking.status,
          title: booking.title,
          start_date: booking.start_date,
          duration: booking.duration,
          price: booking.price,
          currency: booking.currency,
          guest: JSON.parse(booking.guest),
          source: booking.source
        };
        return Booking.fromPrimitives(bookingPrimitives);
      }
    );
  }

  async getByPartnerId(partnerId: Ulid): Promise<Booking[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT booking_id, event_id, activity_id, partner_id, status, title, start_date, duration, price, currency, guest, source FROM booking WHERE partner_id = ? ORDER BY created_at ASC',
      [partnerId.value]
    );
    connection.end();

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (booking: any) => {
        const bookingPrimitives: BookingPrimitives = {
          booking_id: booking.booking_id,
          event_id: booking.event_id,
          activity_id: booking.activity_id,
          partner_id: booking.partner_id,
          status: booking.status,
          title: booking.title,
          start_date: booking.start_date,
          duration: booking.duration,
          price: booking.price,
          currency: booking.currency,
          guest: JSON.parse(booking.guest),
          source: booking.source
        };
        return Booking.fromPrimitives(bookingPrimitives);
      }
    );
  }

  async getByGuestId(guestId: Ulid): Promise<Booking[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT booking_id, event_id, activity_id, partner_id, status, title, start_date, duration, price, currency, guest, source FROM booking WHERE guest_id = ? ORDER BY created_at ASC',
      [guestId.value]
    );
    connection.end();

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (booking: any) => {
        const bookingPrimitives: BookingPrimitives = {
          booking_id: booking.booking_id,
          event_id: booking.event_id,
          activity_id: booking.activity_id,
          partner_id: booking.partner_id,
          status: booking.status,
          title: booking.title,
          start_date: booking.start_date,
          duration: booking.duration,
          price: booking.price,
          currency: booking.currency,
          guest: JSON.parse(booking.guest),
          source: booking.source
        };
        return Booking.fromPrimitives(bookingPrimitives);
      }
    );
  }
}
