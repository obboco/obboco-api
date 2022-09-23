import { Partner } from '../../Domain/Partner';
import { PartnerRepository } from './PartnerRepository';

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
