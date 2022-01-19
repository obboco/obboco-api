import { Partner } from './../../Domain/partner';
interface PartnerPrimitives {
  email: string;
}

export class PartnerFactory {
  static fromPrimitives(primitives: PartnerPrimitives): Partner {
    return Partner.create({
      email: primitives.email
    });
  }
}
