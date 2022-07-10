import { GuestPass } from './../../Domain/guestPass';
import { Ulid } from '../../Domain/Shared/ulid';
export interface GuestPassRepository {
  add(guestPass: GuestPass): Promise<void>;
  getByGuest(guestId: Ulid): Promise<GuestPass[]>;
  getByPass(passId: Ulid): Promise<GuestPass[]>;
  update(guestPass: GuestPass): Promise<void>;
  delete(guestPassId: Ulid): Promise<void>;
  get(guestPassId: Ulid): Promise<GuestPass>;
}
