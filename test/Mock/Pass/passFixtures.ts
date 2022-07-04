import { Pass } from '../../../src/Domain/pass';
import { mysqlConnection } from '../../../src/Infrastructure/Mysql/MysqlConnector';

export class PassFixtures {
  async get(passId: string): Promise<Pass> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT pass_id, title, description, quantity, price, currency, partner_id FROM pass WHERE pass_id = ?',
      [passId]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Pass.fromPrimitives(result[0]);
  }

  async add(pass: Pass): Promise<void> {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO pass(pass_id, title, description, quantity, price, currency, partner_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
      [
        pass.pass_id.value,
        pass.title,
        pass.description,
        pass.quantity,
        pass.price,
        pass.currency,
        pass.partner_id.value
      ]
    );
  }
}
