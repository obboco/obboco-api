import { Partner } from './../../Domain/partner';
import { PartnerRepository } from './partnerRepository';

export class GetPartner {
  constructor(readonly partnerRepository: PartnerRepository) {
    this.partnerRepository = partnerRepository;
  }

  async make(subdomain: string): Promise<Partner> {
    const partner: Partner = await this.partnerRepository.getBySubdomain(
      subdomain
    );
    if (!partner) {
      throw new Error('Partner not found');
    }
    return partner;
  }
}
