import { GuestPass } from '../../Domain/GuestPass';
import { GuestPassRepository } from './GuestPassRepository';
import { Criteria } from '../../Domain/Criteria/Criteria';

interface GetGuestPassWithFilterCommand {
  criteria: Criteria;
}

export class GetGuestPassWithFilter {
  constructor(private guestPassRepository: GuestPassRepository) {}

  async make(command: GetGuestPassWithFilterCommand): Promise<GuestPass[]> {
    return this.guestPassRepository.getByCriteria(command.criteria);
  }
}
