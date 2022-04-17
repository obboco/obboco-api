import { Ulid } from './Shared/ulid';

export interface NewGuestProps {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface GuestProps {
  guest_id: Ulid;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export class Guest {
  protected constructor(
    readonly guest_id: Ulid,
    public first_name: string,
    public last_name: string,
    public email: string,
    public phone: string
  ) {}

  static create(props: GuestProps): Guest {
    return new Guest(
      props.guest_id,
      props.first_name,
      props.last_name,
      props.email,
      props.phone
    );
  }

  static new(props: NewGuestProps): Guest {
    return new Guest(
      Ulid.create(),
      props.first_name,
      props.last_name,
      props.email,
      props.phone
    );
  }
}
