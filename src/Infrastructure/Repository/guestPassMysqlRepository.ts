import { GuestPassRepository } from './../../Application/GuestPass/guestPassRepository';
import { Ulid } from '../../Domain/Shared/ulid';
import { GuestPass } from '../../Domain/guestPass';
import { mysqlConnection } from '../Mysql/mysqlConnector';

export class GuestPassMysqlRepository implements GuestPassRepository {
  async add(guestPass: GuestPass): Promise<void> {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO guest_pass(guest_pass_id, pass_id, guest_id, quantity, current_quantity, price, currency, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
      [
        guestPass.guestPassId.value,
        guestPass.passId.value,
        guestPass.guestId.value,
        guestPass.quantity,
        guestPass.currentQuantity,
        guestPass.price,
        guestPass.currency,
        guestPass.status
      ]
    );
  }

  async get(guestPassId: Ulid): Promise<GuestPass> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT guest_pass_id, pass_id, guest_id, quantity, current_quantity, price, currency, status FROM guest_pass WHERE guest_pass_id = ?',
      [guestPassId.value]
    );

    return result[0] == undefined ? null : GuestPass.fromPrimitives(result[0]);
  }

  /*
  async getByPartner(partnerId: Ulid): Promise<Guest[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT guest_id, partner_id, first_name, last_name, email, phone FROM guest WHERE partner_id = ?',
      [partnerId.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map((guest: any) =>
      Guest.fromPrimitives(guest)
    );
  }

  async delete(guestId: Ulid): Promise<void> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'DELETE FROM guest WHERE guest_id = ? LIMIT 1',
      [guestId.value]
    );
  }*/
}
