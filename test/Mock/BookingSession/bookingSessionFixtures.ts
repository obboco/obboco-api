import { BookingSession } from '../../../src/Domain/bookingSession';
import { Ulid } from '../../../src/Domain/Shared/ulid';
import { redisConnection } from '../../../src/Infrastructure/redisConnector';

export class BookingSessionFixtures {
  async get(eventId: Ulid, bookingId: Ulid): Promise<BookingSession> {
    const connection = await redisConnection();
    const key: string = eventId.value + ':' + bookingId.value;
    const result = await connection.get(key);

    if (result === null) {
      return null;
    }
    return BookingSession.fromPrimitives(JSON.parse(result));
  }

  async add(bookingSession: BookingSession): Promise<void> {
    const connection = await redisConnection();
    const key: string =
      bookingSession.event_id.value + ':' + bookingSession.booking_id.value;
    connection.set(key, JSON.stringify(bookingSession.toPrimitives()));
  }
}
