import {Pass} from '../../../src/Domain/Pass';
import {execute} from '../../../src/Infrastructure/Mysql/MysqlHandler';

export class PassFixtures {
  async get(passId: string): Promise<Pass | null> {
    const result: any = await execute(
      'SELECT pass_id, title, description, quantity, price, currency, partner_id FROM pass WHERE pass_id = ?',
      [passId]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Pass.fromPrimitives(result[0]);
  }

  async add(pass: Pass): Promise<void> {
    await execute(
      'INSERT INTO pass(pass_id, title, description, quantity, price, currency, partner_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
      [
        pass.pass_id.value,
        pass.title,
        pass.description,
        pass.quantity,
        pass.price,
        pass.currency,
        pass.partner_id.value,
      ]
    );
  }
}
