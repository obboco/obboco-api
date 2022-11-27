import {Pass} from '../../Domain/Pass';
import {Ulid} from '../../Domain/Shared/Ulid';
import {PassRepository} from '../../Application/Pass/PassRepository';
import {execute} from './../Mysql/MysqlHandler';

export class PassMysqlRepository implements PassRepository {
  async add(pass: Pass): Promise<void> {
    await execute(
      'INSERT INTO pass(pass_id, title, description, quantity, price, currency, partner_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
      [
        pass.pass_id.value,
        pass.title,
        pass.description ? pass.description : null,
        pass.quantity,
        pass.price,
        pass.currency,
        pass.partner_id.value,
      ]
    );
  }

  async get(passId: Ulid): Promise<Pass> {
    const result = await execute(
      'SELECT pass_id, title, description, quantity, price, currency, partner_id FROM pass WHERE pass_id = ?',
      [passId.value]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Pass.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }

  async getByPartner(partnerId: Ulid): Promise<Pass[]> {
    const result = await execute(
      'SELECT pass_id, title, description, quantity, price, currency, partner_id FROM pass WHERE partner_id = ? ORDER BY created_at ASC',
      [partnerId.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map((pass: any) =>
      Pass.fromPrimitives(pass)
    );
  }

  async update(pass: Pass): Promise<void> {
    await execute(
      'UPDATE pass SET title = ?, description = ?, quantity = ?, price = ?, currency = ? WHERE pass_id = ?',
      [
        pass.title,
        pass.description,
        pass.quantity,
        pass.price,
        pass.currency,
        pass.pass_id.value,
      ]
    );
  }

  async delete(passId: Ulid): Promise<void> {
    await execute('DELETE FROM pass WHERE pass_id = ? LIMIT 1', [passId.value]);
  }
}
