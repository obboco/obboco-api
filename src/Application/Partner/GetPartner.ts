import { Partner } from '../../Domain/Partner';
import { PartnerRepository } from './PartnerRepository';
import { Ulid } from '../../Domain/Shared/Ulid';

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
