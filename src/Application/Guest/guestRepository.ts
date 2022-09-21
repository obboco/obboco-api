import { Ulid } from '../../Domain/Shared/Ulid';
import { Guest } from '../../Domain/Guest';
export interface GuestRepository {
  add(guest: Guest): void;
  update(guest: Guest): void;
  get(guestId: Ulid): Promise<Guest>;
  getByPartner(partnerId: Ulid): Promise<Guest[]>;
  delete(guestId: Ulid): Promise<void>;
}
