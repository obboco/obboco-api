import { mysqlConnection } from '../../../src/Infrastructure/mysqlConnector';
import { PartnerFactory } from './../../../src/Application/Partner/partnerFactory';
import { Partner } from './../../../src/Domain/partner';

export class PartnerFixtures {
  async addPartner(partner: Partner) {
    const connection = await mysqlConnection();
    connection.execute('INSERT INTO partner(email) VALUES(?)', [partner.email]);
  }

  async getPartnerByEmail(email: string) {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT email FROM partner WHERE email = ?',
      [email]
    );
    return PartnerFactory.fromPrimitives(result[0]);
  }
}
