import { Guest } from './../../Domain/guest';
import { Uuid } from '../../Domain/Shared/uuid';
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
      guest_id: Uuid.fromPrimitives(primitives.guest_id)
    });
  }
}
