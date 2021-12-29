import { Uuid } from './../Domain/Shared/uuid';
import { BookingSession } from './../Domain/bookingSession';
import { redisConnection } from './redisConnector';
import { BookingSessionRepository } from './../Application/Booking/bookingSessionRepository';

export class BookingSessionRedisRepository implements BookingSessionRepository {
  async add(bookingSession: BookingSession): Promise<void> {
    const connection = await redisConnection();
    const key: string =
      bookingSession.event_id.value + ':' + bookingSession.booking_id.value;
    connection.set(key, JSON.stringify(bookingSession), {
      EX: 900
    });
  }

  async get(eventId: Uuid, bookingId: Uuid): Promise<BookingSession> {
    const connection = await redisConnection();
    const key: string = eventId.value + ':' + bookingId.value;
    return JSON.parse(await connection.get(key));
  }

  async delete(bookingSession: BookingSession): Promise<void> {
    const connection = await redisConnection();
    const key: string =
      bookingSession.event_id.value + ':' + bookingSession.booking_id.value;
    connection.del(key);
  }
}
