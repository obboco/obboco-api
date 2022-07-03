import { GuestPass } from './../../Domain/guestPass';
import { Ulid } from '../../Domain/Shared/ulid';
export interface GuestPassRepository {
  add(guestPass: GuestPass): void;
  getByGuest(guestId: Ulid): Promise<GuestPass[]>;
  getByPass(passId: Ulid): Promise<GuestPass[]>;
  /*
  get(guestId: Ulid): Promise<Guest>;
  delete(guestId: Ulid): Promise<void>;
  */
}
