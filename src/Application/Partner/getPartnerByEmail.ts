import { Partner } from '../../Domain/Partner';
import { PartnerRepository } from './PartnerRepository';

export class getPartnerByEmail {
  constructor(readonly partnerRepository: PartnerRepository) {}

  async make(email: string): Promise<Partner> {
    const partner: Partner = await this.partnerRepository.getByEmail(email);
    if (!partner) {
      throw new Error('Partner not found');
    }
    return partner;
  }
}
