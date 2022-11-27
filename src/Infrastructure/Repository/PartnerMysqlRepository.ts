import {Ulid} from '../../Domain/Shared/Ulid';
import {PartnerRepository} from '../../Application/Partner/PartnerRepository';
import {execute} from './../Mysql/MysqlHandler';
import {Partner} from '../../Domain/Partner';

export class PartnerMysqlRepository implements PartnerRepository {
  async add(partner: Partner): Promise<void> {
    await execute(
      'INSERT INTO partner (partner_id, email, given_name, family_name, picture, locale, subscription_plan, subdomain) VALUES(? , ? , ? , ? , ? , ? , ? , ?)',
      [
        partner.partner_id.value,
        partner.email,
        partner.given_name,
        partner.family_name,
        partner.picture,
        partner.locale,
        partner.subscription_plan,
        partner.subdomain,
      ]
    );
  }

  async get(partnerId: Ulid): Promise<Partner> {
    const result = await execute(
      'SELECT partner_id, email, given_name, family_name, picture, locale, subscription_plan, subdomain FROM partner WHERE partner_id = ? LIMIT 1',
      [partnerId.value]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Partner.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }

  async getByEmail(email: string): Promise<Partner> {
    const result = await execute(
      'SELECT partner_id, email, given_name, family_name, picture, locale, subscription_plan, subdomain FROM partner WHERE email = ? LIMIT 1',
      [email]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Partner.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }

  async getBySubdomain(subdomain: string): Promise<Partner> {
    const result = await execute(
      'SELECT partner_id, email, given_name, family_name, picture, locale, subscription_plan, subdomain FROM partner WHERE subdomain = ? LIMIT 1',
      [subdomain]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Partner.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }
}
