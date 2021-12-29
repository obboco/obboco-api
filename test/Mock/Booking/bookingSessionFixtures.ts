import { Uuid } from './../../../src/Domain/Shared/uuid';
import { redisConnection } from './../../../src/Infrastructure/redisConnector';

export class BookingSessionFixtures {
  async get(eventId: Uuid, bookingId: Uuid): Promise<any> {
    const connection = await redisConnection();
    const key: string = eventId.value + ':' + bookingId.value;
    return connection.get(key);
  }
}
