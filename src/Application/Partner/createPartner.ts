import { Uuid } from './../../Domain/Shared/uuid';
import { Partner } from './../../Domain/partner';
import { PartnerRepository } from './partnerRepository';
import { Request } from 'express';

export class CreatePartner {
  partnerRepository: PartnerRepository;

  constructor(partnerRepository: PartnerRepository) {
    this.partnerRepository = partnerRepository;
  }

  make(request: Request): Uuid {
    const partner: Partner = Partner.new(request.body.email);
    this.partnerRepository.add(partner);
    return partner.partner_id;
  }
}
