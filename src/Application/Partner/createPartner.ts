import { Request } from 'express';
import { Partner } from './../../Domain/partner';
import { Uuid } from './../../Domain/Shared/uuid';
import { PartnerRepository } from './partnerRepository';

export class CreatePartner {
  constructor(readonly partnerRepository: PartnerRepository) {
    this.partnerRepository = partnerRepository;
  }

  async make(request: Request): Promise<Uuid> {
    let partner: Partner = await this.partnerRepository.getByEmail(
      request.body.email
    );

    if (partner) {
      throw new Error('Partner already exists');
    }

    partner = Partner.new(
      request.body.email,
      request.body.given_name,
      request.body.family_name,
      request.body.picture,
      request.body.locale,
      request.body.subscription_plan,
      request.body.subdomain
    );
    this.partnerRepository.add(partner);
    return partner.partner_id;
  }
}
