import { Ulid } from './Shared/ulid';
export interface PartnerProps {
  partner_id: Ulid;
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

  static new(
    email: string,
    given_name: string,
    family_name: string,
    picture: string,
    locale: string,
    subscription_plan: string,
    subdomain: string
  ): Partner {
    return new Partner(
      Ulid.create(),
      email,
      given_name,
      family_name,
      picture,
      locale ? locale : 'en-GB',
      subscription_plan ? subscription_plan : 'BETA',
      subdomain
    );
  }

  static create(props: PartnerProps): Partner {
    return new Partner(
      props.partner_id,
      props.email,
      props.given_name,
      props.family_name,
      props.picture,
      props.locale,
      props.subscription_plan,
      props.subdomain
    );
  }
}
