import { Ulid } from './Shared/Ulid';
export interface PartnerPrimitives {
  partner_id: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  subscription_plan: string;
  subdomain: string;
}
export class Partner {
  protected constructor(
    readonly partner_id: Ulid,
    readonly email: string,
    readonly given_name: string,
    readonly family_name: string,
    readonly picture: string,
    readonly locale: string,
    readonly subscription_plan: string,
    readonly subdomain: string
  ) {}

  static fromPrimitives(props: PartnerPrimitives): Partner {
    return new Partner(
      Ulid.fromPrimitives(props.partner_id),
      props.email,
      props.given_name,
      props.family_name,
      props.picture,
      props.locale,
      props.subscription_plan,
      props.subdomain
    );
  }

  public toPrimitives(): PartnerPrimitives {
    return {
      partner_id: this.partner_id.value,
      email: this.email,
      given_name: this.given_name,
      family_name: this.family_name,
      picture: this.picture,
      locale: this.locale,
      subscription_plan: this.subscription_plan,
      subdomain: this.subdomain
    };
  }
}
