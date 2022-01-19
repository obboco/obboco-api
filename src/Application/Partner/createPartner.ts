import { Request } from 'express';
import { Partner } from './../../Domain/partner';
import { Uuid } from './../../Domain/Shared/uuid';
import { PartnerRepository } from './partnerRepository';

export class CreatePartner {
  partnerRepository: PartnerRepository;

  constructor(partnerRepository: PartnerRepository) {
    this.partnerRepository = partnerRepository;
  }

  async make(request: Request): Promise<Uuid> {
    let partner: Partner = await this.partnerRepository.getByEmail(
      request.body.email
    );
    if (null === partner) {
      partner = Partner.new(request.body.email);
      this.partnerRepository.add(partner);
    }

    return partner.partner_id;
  }
}
