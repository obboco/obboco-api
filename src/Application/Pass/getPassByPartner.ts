import { Ulid } from '../../Domain/Shared/Ulid';
import { Pass } from '../../Domain/Pass';
import { PassRepository } from './PassRepository';

interface GetPassByPartnerCommand {
  partner_id: string;
}

export class GetPassByPartner {
  constructor(private passRepository: PassRepository) {}

  async make(command: GetPassByPartnerCommand): Promise<Pass[]> {
    const partnerId = Ulid.fromPrimitives(command.partner_id);
    return this.passRepository.getByPartner(partnerId);
  }
}
