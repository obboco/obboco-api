import { Request } from 'express';
import { Partner } from './../../Domain/partner';
import { Ulid } from './../../Domain/Shared/ulid';
import { PartnerRepository } from './partnerRepository';

interface createPartnerCommand {
  partner_id: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  subscription_plan: string;
  subdomain: string;
}

export class CreatePartner {
  constructor(readonly partnerRepository: PartnerRepository) {
    this.partnerRepository = partnerRepository;
  }

  async make(command: createPartnerCommand): Promise<Ulid> {
    let partner: Partner = await this.partnerRepository.getByEmail(
      command.email
    );

    if (partner) {
      throw new Error('Partner already exists');
    }

    partner = Partner.fromPrimitives(command);
    this.partnerRepository.add(partner);
    return partner.partner_id;
  }
}
