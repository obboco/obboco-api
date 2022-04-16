import { Partner } from './../../Domain/partner';
import { Uuid } from './../../Domain/Shared/uuid';

export interface PartnerRepository {
  add(partner: Partner): void;
  get(partnerId: Uuid): Promise<Partner>;
  getByEmail(email: string): Promise<Partner>;
  getBySubdomain(subdomain: string): Promise<Partner>;
}
