import { Pass } from './../../Domain/pass';
import { Ulid } from '../../Domain/Shared/ulid';
import { mysqlConnection } from '../Mysql/mysqlConnector';
import { PassRepository } from '../../Application/Pass/passRepository';

export class PassMysqlRepository implements PassRepository {
  async add(pass: Pass): Promise<void> {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO pass(pass_id, title, quantity, price, currency, partner_id) VALUES(?, ?, ?, ?, ?, ?)',
      [
        pass.pass_id.value,
        pass.title,
        pass.quantity,
        pass.price,
        pass.currency,
        pass.partner_id.value
      ]
    );
  }

  async get(passId: Ulid): Promise<Pass> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT pass_id, title, quantity, price, currency, partner_id FROM pass WHERE pass_id = ?',
      [passId.value]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Pass.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }

  async getByPartner(partnerId: Ulid): Promise<Pass[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT pass_id, title, quantity, price, currency, partner_id FROM pass WHERE partner_id = ? ORDER BY created_at ASC',
      [partnerId.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map((pass: any) =>
      Pass.fromPrimitives(pass)
    );
  }

  async update(pass: Pass): Promise<void> {
    const connection = await mysqlConnection();
    connection.execute(
      'UPDATE pass SET title = ?, quantity = ?, price = ?, currency = ? WHERE pass_id = ?',
      [pass.title, pass.quantity, pass.price, pass.currency, pass.pass_id.value]
    );
  }

  async delete(passId: Ulid): Promise<void> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'DELETE FROM pass WHERE pass_id = ? LIMIT 1',
      [passId.value]
    );
  }
}
