import { Partner } from './../../Domain/partner';

export interface PartnerRepository {
  add(partner: Partner): void;
  getByEmail(email: string): Promise<Partner>;
}
