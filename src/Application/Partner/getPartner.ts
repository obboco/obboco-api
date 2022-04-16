import { Partner } from './../../Domain/partner';
import { PartnerRepository } from './partnerRepository';
import { Uuid } from './../../Domain/Shared/uuid';

export class GetPartner {
  constructor(readonly partnerRepository: PartnerRepository) {}

  async make(partnerId: Uuid): Promise<Partner> {
    const partner: Partner = await this.partnerRepository.get(partnerId);
    if (!partner) {
      throw new Error('Partner not found');
    }
    return partner;
  }
}
