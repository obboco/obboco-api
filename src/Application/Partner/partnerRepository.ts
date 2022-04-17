import { Partner } from './../../Domain/partner';
import { Ulid } from './../../Domain/Shared/ulid';

export interface PartnerRepository {
  add(partner: Partner): void;
  get(partnerId: Ulid): Promise<Partner>;
  getByEmail(email: string): Promise<Partner>;
  getBySubdomain(subdomain: string): Promise<Partner>;
}
