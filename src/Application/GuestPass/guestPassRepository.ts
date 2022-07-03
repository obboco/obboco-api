import { GuestPass } from './../../Domain/guestPass';
import { Ulid } from '../../Domain/Shared/ulid';
import { Guest } from '../../Domain/guest';
export interface GuestPassRepository {
  add(guestPass: GuestPass): void;
  /*
  get(guestId: Ulid): Promise<Guest>;
  getByPartner(partnerId: Ulid): Promise<Guest[]>;
  delete(guestId: Ulid): Promise<void>;
  */
}
