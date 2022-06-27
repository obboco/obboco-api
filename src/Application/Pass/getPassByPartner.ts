import { Ulid } from '../../Domain/Shared/ulid';
import { Pass } from '../../Domain/pass';
import { PassRepository } from './passRepository';

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
