import { GuestPass } from './../../Domain/guestPass';
import { GuestPassRepository } from './guestPassRepository';
import { Criteria } from '../../Domain/Criteria/criteria';

interface GetGuestPassWithFilterCommand {
  criteria: Criteria;
}

export class GetGuestPassWithFilter {
  constructor(private guestPassRepository: GuestPassRepository) {}

  async make(command: GetGuestPassWithFilterCommand): Promise<GuestPass[]> {
    return this.guestPassRepository.getByCriteria(command.criteria);
  }
}
