import { Partner } from '../../Domain/Partner';
import { Ulid } from '../../Domain/Shared/Ulid';

export interface PartnerRepository {
  add(partner: Partner): void;
  get(partnerId: Ulid): Promise<Partner>;
  getByEmail(email: string): Promise<Partner>;
  getBySubdomain(subdomain: string): Promise<Partner>;
}
