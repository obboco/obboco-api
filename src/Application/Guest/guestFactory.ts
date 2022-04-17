import { Guest } from './../../Domain/guest';
import { Ulid } from '../../Domain/Shared/ulid';
interface GuestPrimitives {
  guest_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export class GuestFactory {
  static fromPrimitives(primitives: GuestPrimitives): Guest {
    return Guest.create({
      ...primitives,
      guest_id: Ulid.fromPrimitives(primitives.guest_id)
    });
  }
}
