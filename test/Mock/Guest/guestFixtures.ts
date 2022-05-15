import { Guest } from './../../../src/Domain/guest';
import { mysqlConnection } from '../../../src/Infrastructure/Mysql/MysqlConnector';

export class GuestFixtures {
  async getByEmail(email: string): Promise<Guest> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT guest_id, partner_id, first_name, last_name, email, phone FROM guest WHERE email = ?',
      [email]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Guest.fromPrimitives(result[0]);
  }
}
