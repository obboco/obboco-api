import { Booking } from './../../../src/Domain/booking';
import { BookingFactory } from './../../../src/Application/Booking/bookingFactory';
import { Uuid } from './../../../src/Domain/Shared/uuid';
import { mysqlConnection } from '../../../src/Infrastructure/mysqlConnector';

export class BookingFixtures {
  async get(bookingId: Uuid): Promise<Booking> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT booking_id, event_id, status, email, guest FROM booking WHERE booking_id = ?',
      [bookingId.value]
    );
    return BookingFactory.fromPrimitives(result[0]);
  }
}
