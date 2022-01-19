import { Partner } from '../Domain/partner';
import { PartnerRepository } from '../Application/Partner/partnerRepository';
import { mysqlConnection } from './mysqlConnector';

export class PartnerMysqlRepository implements PartnerRepository {
  async add(partner: Partner): Promise<void> {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO partner(email) VALUES( ?) ON DUPLICATE KEY UPDATE email=?',
      [partner.email, partner.email]
    );
  }
}
