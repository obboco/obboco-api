import { Ulid } from '../../Domain/Shared/Ulid';
import { Guest } from '../../Domain/Guest';
import { GuestRepository } from '../../Application/Guest/GuestRepository';
import { mysqlConnection } from '../Mysql/MysqlConnector';

export class GuestMysqlRepository implements GuestRepository {
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

  async update(guest: Guest): Promise<void> {
    const connection = await mysqlConnection();
    await connection.execute(
      'UPDATE guest SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE guest_id = ?',
      [
        guest.first_name,
        guest.last_name,
        guest.email,
        guest.phone,
        guest.guest_id.value
      ]
    );
    connection.end();
  }

  async get(guestId: Ulid): Promise<Guest> {
    const connection = await mysqlConnection();
    const [result] = await connection.execute(
      'SELECT guest_id, partner_id, first_name, last_name, email, phone FROM guest WHERE guest_id = ?',
      [guestId.value]
    );
    connection.end();

    if (result[0] == undefined) {
      return null;
    }

    return Guest.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }

  async getByPartner(partnerId: Ulid): Promise<Guest[]> {
    const connection = await mysqlConnection();
    const [result] = await connection.execute(
      'SELECT guest_id, partner_id, first_name, last_name, email, phone FROM guest WHERE partner_id = ?',
      [partnerId.value]
    );
    connection.end();

    return Object.values(JSON.parse(JSON.stringify(result))).map((guest: any) =>
      Guest.fromPrimitives(guest)
    );
  }

  async delete(guestId: Ulid): Promise<void> {
    const connection = await mysqlConnection();
    await connection.execute('DELETE FROM guest WHERE guest_id = ? LIMIT 1', [
      guestId.value
    ]);
    connection.end();
  }
}
