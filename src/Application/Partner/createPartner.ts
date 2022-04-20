import { Request } from 'express';
import { Partner } from './../../Domain/partner';
import { Ulid } from './../../Domain/Shared/ulid';
import { PartnerRepository } from './partnerRepository';

export class CreatePartner {
  constructor(readonly partnerRepository: PartnerRepository) {
    this.partnerRepository = partnerRepository;
  }

  async make(request: Request): Promise<Ulid> {
    let partner: Partner = await this.partnerRepository.getByEmail(
      request.body.email
    );

    if (partner) {
      throw new Error('Partner already exists');
    }

    partner = Partner.fromPrimitives({
      partner_id: request.body.partner_id,
      email: request.body.email,
      given_name: request.body.given_name,
      family_name: request.body.family_name,
      picture: request.body.picture,
      locale: request.body.locale,
      subscription_plan: request.body.subscription_plan,
      subdomain: request.body.subdomain
    });
    this.partnerRepository.add(partner);
    return partner.partner_id;
  }
}
