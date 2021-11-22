import { Partner } from '../Domain/partner';
import { PartnerRepository } from '../Application/Partner/partnerRepository';
import { mysqlConnection } from './MysqlConnector';

export class PartnerMysqlRepository implements PartnerRepository {
  async add(partner: Partner): Promise<void> {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO partners(partner_id, email) VALUES(? , ?)',
      [partner.partner_id.value, partner.email]
    );
  }
}
