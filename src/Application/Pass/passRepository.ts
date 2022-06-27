import { Ulid } from './../../Domain/Shared/ulid';
import { Pass } from '../../Domain/pass';

export interface PassRepository {
  add(pass: Pass): Promise<void>;
  update(pass: Pass): Promise<void>;
  get(passId: Ulid): Promise<Pass>;
  getByPartner(partnerId: Ulid): Promise<Pass[]>;
  delete(passId: Ulid): Promise<void>;
}
