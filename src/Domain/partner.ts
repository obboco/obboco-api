import { Uuid } from './Shared/uuid';
export interface PartnerProps {
  email: string;
}
export class Partner {
  readonly email: string;

  protected constructor(props: PartnerProps) {
    this.email = props.email;
  }

  static new(email: string): Partner {
    return new Partner({
      email: email
    });
  }

  static create(props: PartnerProps): Partner {
    return new Partner(props);
  }
}
