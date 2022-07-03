import { GuestPass } from './../../Domain/guestPass';
import { Ulid } from '../../Domain/Shared/ulid';
export interface GuestPassRepository {
  add(guestPass: GuestPass): void;
  getByGuest(guestId: Ulid): Promise<GuestPass[]>;
  getByPass(passId: Ulid): Promise<GuestPass[]>;
  delete(guestPassId: Ulid): Promise<void>;
  get(guestPassId: Ulid): Promise<GuestPass>;
}
