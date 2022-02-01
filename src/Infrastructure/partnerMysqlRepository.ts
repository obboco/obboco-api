import { PartnerFactory } from './../Application/Partner/partnerFactory';
import { Partner } from '../Domain/partner';
import { PartnerRepository } from '../Application/Partner/partnerRepository';
import { mysqlConnection } from './mysqlConnector';

export class PartnerMysqlRepository implements PartnerRepository {
  async add(partner: Partner): Promise<void> {
    const connection = await mysqlConnection();
    connection.execute('INSERT INTO partner(partner_id, email) VALUES(? , ?)', [
      partner.partner_id.value,
      partner.email
    ]);
  }

  async getByEmail(email: string): Promise<Partner> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT partner_id, email FROM partner WHERE email = ? LIMIT 1',
      [email]
    );

    if (result[0] == undefined) {
      return null;
    }

    return PartnerFactory.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }
}
