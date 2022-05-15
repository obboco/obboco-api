import { Ulid } from './../../Domain/Shared/ulid';
import { Guest } from './../../Domain/guest';
export interface GuestRepository {
  add(guest: Guest): void;
  getByPartner(partnerId: Ulid): Promise<Guest[]>;
}
