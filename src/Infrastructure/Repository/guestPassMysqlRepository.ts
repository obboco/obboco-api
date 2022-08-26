import { GuestPassRepository } from './../../Application/GuestPass/guestPassRepository';
import { Ulid } from '../../Domain/Shared/ulid';
import { GuestPass } from '../../Domain/guestPass';
import { mysqlConnection } from '../Mysql/MysqlConnector';
import { Criteria } from '../../Domain/Criteria/criteria';
import { Filter } from '../../Domain/Criteria/filter';

export class GuestPassMysqlRepository implements GuestPassRepository {
  async add(guestPass: GuestPass): Promise<void> {
    const connection = await mysqlConnection();
    await connection.execute(
      'INSERT INTO guest_pass(guest_pass_id, pass_id, guest_id, partner_id, title, quantity, current_quantity, price, currency, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
        guestPass.status
      ]
    );
    connection.end();
  }

  async get(guestPassId: Ulid): Promise<GuestPass> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT guest_pass_id, pass_id, guest_id, partner_id, title, quantity, current_quantity, price, currency, status FROM guest_pass WHERE guest_pass_id = ?',
      [guestPassId.value]
    );
    connection.end();

    return result[0] == undefined ? null : GuestPass.fromPrimitives(result[0]);
  }

  async getByCriteria(criteria: Criteria): Promise<GuestPass[]> {
    const filters: string = criteria.filters
      .map((filter: Filter): string => {
        return `${filter.field} ${filter.operator} '${filter.value}'`;
      })
      .join(' AND ');

    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      `SELECT guest_pass_id, pass_id, guest_id, partner_id, title, quantity, current_quantity, price, currency, status, created_at as created_date FROM guest_pass WHERE ${filters} ORDER BY created_at DESC`
    );
    connection.end();

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (guestPass: any) => GuestPass.fromPrimitives(guestPass)
    );
  }

  async getByGuest(guestId: Ulid): Promise<GuestPass[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT guest_pass_id, pass_id, guest_id, partner_id, title, quantity, current_quantity, price, currency, status FROM guest_pass WHERE guest_id = ?',
      [guestId.value]
    );
    connection.end();

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (guestPass: any) => GuestPass.fromPrimitives(guestPass)
    );
  }

  async getByPass(passId: Ulid): Promise<GuestPass[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT guest_pass_id, pass_id, guest_id, partner_id, title, quantity, current_quantity, price, currency, status FROM guest_pass WHERE pass_id = ?',
      [passId.value]
    );
    connection.end();

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (guestPass: any) => GuestPass.fromPrimitives(guestPass)
    );
  }

  async update(guestPass: GuestPass): Promise<void> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'UPDATE guest_pass SET title = ?, quantity = ?, current_quantity = ?, price = ?, currency = ?, status = ? WHERE guest_pass_id = ? LIMIT 1',
      [
        guestPass.title,
        guestPass.quantity,
        guestPass.currentQuantity,
        guestPass.price,
        guestPass.currency,
        guestPass.status,
        guestPass.guestPassId.value
      ]
    );
    connection.end();
  }

  async delete(guestPassId: Ulid): Promise<void> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'DELETE FROM guest_pass WHERE guest_pass_id = ? LIMIT 1',
      [guestPassId.value]
    );
    connection.end();
  }
}
