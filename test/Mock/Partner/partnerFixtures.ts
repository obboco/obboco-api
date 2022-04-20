import { mysqlConnection } from '../../../src/Infrastructure/Mysql/MysqlConnector';
import { Partner } from './../../../src/Domain/partner';

export class PartnerFixtures {
  async addPartner(partner: Partner) {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO partner (partner_id, email, given_name, family_name, picture, locale, subscription_plan, subdomain) VALUES(? , ? , ? , ? , ? , ? , ? , ?)',
      [
        partner.partner_id.value,
        partner.email,
        partner.given_name,
        partner.family_name,
        partner.picture,
        partner.locale,
        partner.subscription_plan,
        partner.subdomain
      ]
    );
  }

  async getPartnerByEmail(email: string) {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT partner_id, email, given_name, family_name, picture, locale, subscription_plan, subdomain FROM partner WHERE email = ?',
      [email]
    );

    return Partner.fromPrimitives(result[0]);
  }
}
