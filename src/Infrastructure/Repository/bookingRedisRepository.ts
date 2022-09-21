import { Ulid } from '../../Domain/Shared/Ulid';
import { BookingSession } from '../../Domain/BookingSession';
import { redisConnection } from '../Redis/redisConnector';
import { BookingSessionRepository } from '../../Application/BookingSession/BookingSessionRepository';

export class BookingSessionRedisRepository implements BookingSessionRepository {
  async add(bookingSession: BookingSession): Promise<void> {
    const connection = await redisConnection();
    const key: string =
      bookingSession.event_id.value + ':' + bookingSession.booking_id.value;
    connection.set(key, JSON.stringify(bookingSession.toPrimitives()), {
      EX: 900
    });
  }

  async get(eventId: Ulid, bookingId: Ulid): Promise<BookingSession> {
    const connection = await redisConnection();
    const key: string = eventId.value + ':' + bookingId.value;
    const result = await connection.get(key);
    if (result === null) {
      return null;
    }
    return BookingSession.fromPrimitives(JSON.parse(result));
  }

  async count(eventId: Ulid): Promise<number> {
    const connection = await redisConnection();
    const key: string = eventId.value + ':*';
    const eventIds: string[] = await connection.keys(key);
    return eventIds.length;
  }

  async delete(bookingSession: BookingSession): Promise<void> {
    const connection = await redisConnection();
    const key: string =
      bookingSession.event_id.value + ':' + bookingSession.booking_id.value;
    connection.del(key);
  }
}
