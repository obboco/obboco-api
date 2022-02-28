import { Uuid } from '../../Domain/Shared/uuid';
import { Partner } from './../../Domain/partner';
interface PartnerPrimitives {
  partner_id: string;
  email: string;
  locale: string;
  subscription_plan: string;
}

export class PartnerFactory {
  static fromPrimitives(primitives: PartnerPrimitives): Partner {
    return Partner.create({
      partner_id: Uuid.fromPrimitives(primitives.partner_id),
      email: primitives.email,
      locale: primitives.locale,
      subscription_plan: primitives.subscription_plan
    });
  }
}
