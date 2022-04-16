import { Partner } from '../../Domain/partner';
import { PartnerRepository } from './partnerRepository';

export class getPartnerBySubdomain {
  constructor(readonly partnerRepository: PartnerRepository) {}

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
