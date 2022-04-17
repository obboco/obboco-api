import { Partner } from './../../Domain/partner';
import { PartnerRepository } from './partnerRepository';
import { Ulid } from './../../Domain/Shared/ulid';

export class GetPartner {
  constructor(readonly partnerRepository: PartnerRepository) {}

  async make(partnerId: Ulid): Promise<Partner> {
    const partner: Partner = await this.partnerRepository.get(partnerId);
    if (!partner) {
      throw new Error('Partner not found');
    }
    return partner;
  }
}
