import { Guest } from '../../../src/Domain/Guest';
import { mysqlConnection } from '../../../src/Infrastructure/Mysql/MysqlConnector';

export class GuestFixtures {
  async getGuest(guestId: string): Promise<Guest | null> {
    const connection = await mysqlConnection();
    const [result] = await connection.execute(
      'SELECT guest_id, partner_id, first_name, last_name, email, phone FROM guest WHERE guest_id = ?',
      [guestId]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Guest.fromPrimitives(result[0]);
  }

  async getByEmail(email: string): Promise<Guest | null> {
    const connection = await mysqlConnection();
    const [result] = await connection.execute(
      'SELECT guest_id, partner_id, first_name, last_name, email, phone FROM guest WHERE email = ?',
      [email]
    );
    connection.end();

    if (result[0] == undefined) {
      return null;
    }

    return Guest.fromPrimitives(result[0]);
  }

  async add(guest: Guest): Promise<void> {
    const connection = await mysqlConnection();
    await connection.execute(
      'INSERT INTO guest(guest_id, partner_id, first_name, last_name, email, phone) VALUES(?, ?, ?, ?, ?, ?)',
      [
        guest.guest_id.value,
        guest.partner_id.value,
        guest.first_name,
        guest.last_name,
        guest.email,
        guest.phone
      ]
    );
    connection.end();
  }
}
