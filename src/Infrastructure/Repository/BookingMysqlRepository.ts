import {Filter} from '../../Domain/Criteria/Filter';
import {Criteria} from '../../Domain/Criteria/Criteria';
import {Ulid} from '../../Domain/Shared/Ulid';
import {BookingRepository} from '../../Application/Booking/BookingRepository';
import {Booking, BookingPrimitives} from '../../Domain/Booking';
import {execute} from './../Mysql/MysqlHandler';
export class BookingMysqlRepository implements BookingRepository {
  async add(booking: Booking): Promise<void> {
    await execute(
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
          phone: booking.guest.phone,
        }),
        booking.source,
        booking.type,
        booking.guestPassId ? booking.guestPassId.value : null,
      ]
    );
  }

  async update(booking: Booking): Promise<void> {
    await execute('UPDATE booking SET status = ? WHERE booking_id = ? LIMIT 1', [
      booking.status,
      booking.booking_id.value,
    ]);
  }

  async get(bookingId: Ulid): Promise<Booking> {
    const result = await execute(
      'SELECT booking_id, event_id, activity_id, partner_id, status, title, start_date, duration, price, currency, guest, source, type, guest_pass_id FROM booking WHERE booking_id = ? LIMIT 1',
      [bookingId.value]
    );

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
      guest_pass_id: result[0].guest_pass_id,
    };
    return Booking.fromPrimitives(bookingPrimitives);
  }

  async getByEventId(eventId: Ulid): Promise<Booking[]> {
    const result = await execute(
      'SELECT booking_id, event_id, activity_id, partner_id, status, title, start_date, duration, price, currency, guest, source, type, guest_pass_id FROM booking WHERE event_id = ? ORDER BY created_at ASC',
      [eventId.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map((booking: any) => {
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
        source: booking.source,
        type: booking.type,
        guest_pass_id: booking.guest_pass_id,
      };
      return Booking.fromPrimitives(bookingPrimitives);
    });
  }

  async getByCriteria(criteria: Criteria): Promise<Booking[]> {
    const filters: string = criteria.filters
      .map((filter: Filter): string => {
        return `${filter.field} ${filter.operator} '${filter.value}'`;
      })
      .join(' AND ');

    const result = await execute(
      `SELECT booking_id, event_id, activity_id, partner_id, status, title, start_date, duration, price, currency, guest, source, type, guest_pass_id FROM booking WHERE ${filters} ORDER BY start_date DESC`
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map((booking: any) => {
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
        source: booking.source,
        type: booking.type,
        guest_pass_id: booking.guest_pass_id,
      };
      return Booking.fromPrimitives(bookingPrimitives);
    });
  }

  async getByGuestId(guestId: Ulid): Promise<Booking[]> {
    const result = await execute(
      'SELECT booking_id, event_id, activity_id, partner_id, status, title, start_date, duration, price, currency, guest, source, type, guest_pass_id FROM booking WHERE guest_id = ? ORDER BY created_at ASC',
      [guestId.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map((booking: any) => {
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
        source: booking.source,
        type: booking.type,
        guest_pass_id: booking.guest_pass_id,
      };
      return Booking.fromPrimitives(bookingPrimitives);
    });
  }
}
