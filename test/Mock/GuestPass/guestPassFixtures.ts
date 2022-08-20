import { GuestPass } from './../../../src/Domain/guestPass';
import { mysqlConnection } from '../../../src/Infrastructure/Mysql/MysqlConnector';

export class GuestPassFixtures {
  async get(guestPassId: string): Promise<GuestPass> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT guest_pass_id, pass_id, guest_id, partner_id, title, quantity, current_quantity, price, currency, status, created_at as created FROM guest_pass WHERE guest_pass_id = ?',
      [guestPassId]
    );

    return result[0] == undefined ? null : GuestPass.fromPrimitives(result[0]);
  }

  async add(guestPass: GuestPass): Promise<void> {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO guest_pass(guest_pass_id, pass_id, guest_id, partner_id, title, quantity, current_quantity, price, currency, status, created_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        guestPass.guestPassId.value,
        guestPass.passId.value,
        guestPass.guestId.value,
        guestPass.partnerId.value,
        guestPass.title,
        guestPass.quantity,
        guestPass.currentQuantity,
        guestPass.price,
        guestPass.currency,
        guestPass.status,
        guestPass.created != undefined
          ? guestPass.created
          : new Date().toISOString()
      ]
    );
  }
}
