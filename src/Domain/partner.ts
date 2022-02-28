import { Uuid } from './Shared/uuid';
export interface PartnerProps {
  partner_id: Uuid;
  email: string;
  locale: string;
  subscription_plan: string;
}
export class Partner {
  protected constructor(
    readonly partner_id: Uuid,
    readonly email: string,
    readonly locale: string,
    readonly subscription_plan: string
  ) {}

  static new(
    email: string,
    locale: string,
    subscription_plan: string
  ): Partner {
    return new Partner(
      Uuid.create(),
      email,
      locale ? locale : 'en-GB',
      subscription_plan ? subscription_plan : 'BETA'
    );
  }

  static create(props: PartnerProps): Partner {
    return new Partner(
      props.partner_id,
      props.email,
      props.locale,
      props.subscription_plan
    );
  }
}
