import { BookingSession } from './../../../src/Domain/bookingSession';
import { Uuid } from './../../../src/Domain/Shared/uuid';
import { redisConnection } from './../../../src/Infrastructure/redisConnector';

export class BookingSessionFixtures {
  async get(eventId: Uuid, bookingId: Uuid): Promise<any> {
    const connection = await redisConnection();
    const key: string = eventId.value + ':' + bookingId.value;
    return connection.get(key);
  }

  async add(bookingSession: BookingSession): Promise<void> {
    const connection = await redisConnection();
    const key: string =
      bookingSession.booking_id.value + ':' + bookingSession.event_id.value;
    connection.set(key, JSON.stringify(bookingSession));
  }
}
