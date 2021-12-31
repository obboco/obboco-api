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
}