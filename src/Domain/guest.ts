import { Uuid } from './Shared/uuid';

export interface NewGuestProps {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface GuestProps {
  guest_id: Uuid;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export class Guest {
  protected constructor(
    readonly guest_id: Uuid,
    readonly first_name: string,
    readonly last_name: string,
    readonly email: string,
    readonly phone: string
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
      Uuid.create(),
      props.first_name,
      props.last_name,
      props.email,
      props.phone
    );
  }
}
