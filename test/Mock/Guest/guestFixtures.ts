import { Guest } from './../../../src/Domain/guest';
import { GuestFactory } from './../../../src/Application/Guest/guestFactory';
import { mysqlConnection } from '../../../src/Infrastructure/mysqlConnector';

export class GuestFixtures {
  async getByEmail(email: string): Promise<Guest> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT guest_id, first_name, last_name, email, phone FROM guest WHERE email = ?',
      [email]
    );

    if (result[0] == undefined) {
      return null;
    }

    return GuestFactory.fromPrimitives(result[0]);
  }
}
