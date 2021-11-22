import { Uuid } from './Shared/uuid';
export interface PartnerProps {
  partner_id: Uuid;
  email: string;
}
export class Partner {
  readonly partner_id: Uuid;
  readonly email: string;

  protected constructor(props: PartnerProps) {
    this.partner_id = props.partner_id;
    this.email = props.email;
  }

  static new(email: string): Partner {
    return new Partner({
      partner_id: Uuid.create(),
      email: email
    });
  }

  static create(props: PartnerProps): Partner {
    return new Partner(props);
  }
}
