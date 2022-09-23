import { Criteria } from '../../Domain/Criteria/Criteria';
import { GuestPass } from '../../Domain/GuestPass';
import { Ulid } from '../../Domain/Shared/Ulid';
export interface GuestPassRepository {
  add(guestPass: GuestPass): Promise<void>;
  getByGuest(guestId: Ulid): Promise<GuestPass[]>;
  getByPass(passId: Ulid): Promise<GuestPass[]>;
  getByCriteria(criteria: Criteria): Promise<GuestPass[]>;
  update(guestPass: GuestPass): Promise<void>;
  delete(guestPassId: Ulid): Promise<void>;
  get(guestPassId: Ulid): Promise<GuestPass>;
}
