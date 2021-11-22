import { mysqlConnection } from './../../../src/Infrastructure/MysqlConnector';
import { PartnerFactory } from './../../../src/Application/Partner/partnerFactory';
import { Partner } from './../../../src/Domain/partner';

export class PartnerFixtures {
  async addPartner(partner: Partner) {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO partners(partner_id, email) VALUES(? , ?)',
      [partner.partner_id.value, partner.email]
    );
  }

  async getPartnerByEmail(email: string) {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT partner_id, email FROM partners WHERE email = ?',
      [email]
    );
    return PartnerFactory.fromPrimitives(result[0]);
  }
}
