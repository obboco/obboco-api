import { Partner } from "./../../Domain/partner";

export interface PartnerRepository {
  add(partner: Partner): void;
}
