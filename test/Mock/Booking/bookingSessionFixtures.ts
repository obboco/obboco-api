import { Uuid } from './../../../src/Domain/Shared/uuid';
import { redisConnection } from './../../../src/Infrastructure/redisConnector';

export class BookingSessionFixtures {
  async get(eventId: Uuid, bookingId: string): Promise<any> {
    const connection = await redisConnection();
    const key: string = eventId.value + ':' + bookingId;
    return connection.get(key);
  }
}
