import { Ulid } from '../../Domain/Shared/ulid';
import { Partner } from './../../Domain/partner';
interface PartnerPrimitives {
  partner_id: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  subscription_plan: string;
  subdomain: string;
}

export class PartnerFactory {
  static fromPrimitives(primitives: PartnerPrimitives): Partner {
    return Partner.create({
      partner_id: Ulid.fromPrimitives(primitives.partner_id),
      email: primitives.email,
      given_name: primitives.given_name,
      family_name: primitives.family_name,
      picture: primitives.picture,
      locale: primitives.locale,
      subscription_plan: primitives.subscription_plan,
      subdomain: primitives.subdomain
    });
  }
}
