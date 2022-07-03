import { GuestPassRepository } from './../../Application/GuestPass/guestPassRepository';
import { Ulid } from '../../Domain/Shared/ulid';
import { GuestPass } from '../../Domain/guestPass';
import { mysqlConnection } from '../Mysql/mysqlConnector';

export class GuestPassMysqlRepository implements GuestPassRepository {
  async add(guestPass: GuestPass): Promise<void> {
    const connection = await mysqlConnection();
    await connection.execute(
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
    connection.end();
  }

  async get(guestPassId: Ulid): Promise<GuestPass> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT guest_pass_id, pass_id, guest_id, quantity, current_quantity, price, currency, status FROM guest_pass WHERE guest_pass_id = ?',
      [guestPassId.value]
    );
    connection.end();

    return result[0] == undefined ? null : GuestPass.fromPrimitives(result[0]);
  }

  async getByGuest(guestId: Ulid): Promise<GuestPass[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT guest_pass_id, pass_id, guest_id, quantity, current_quantity, price, currency, status FROM guest_pass WHERE guest_id = ?',
      [guestId.value]
    );
    connection.end();

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (guestPass: any) => GuestPass.fromPrimitives(guestPass)
    );
  }
  /*
  async delete(guestId: Ulid): Promise<void> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'DELETE FROM guest WHERE guest_id = ? LIMIT 1',
      [guestId.value]
    );
  }*/
}
