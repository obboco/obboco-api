import { Ulid } from './Shared/Ulid';

export interface GuestPrimitives {
  guest_id: string;
  partner_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export class Guest {
  protected constructor(
    readonly guest_id: Ulid,
    readonly partner_id: Ulid,
    public first_name: string,
    public last_name: string,
    public email: string,
    public phone: string
  ) {}

  static fromPrimitives(props: GuestPrimitives): Guest {
    return new Guest(
      Ulid.fromPrimitives(props.guest_id),
      Ulid.fromPrimitives(props.partner_id),
      props.first_name,
      props.last_name,
      props.email,
      props.phone
    );
  }

  public toPrimitives(): GuestPrimitives {
    return {
      guest_id: this.guest_id.value,
      partner_id: this.partner_id.value,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone
    };
  }
}
