import { Guest } from '../../Domain/guest';
import { Ulid } from '../../Domain/Shared/ulid';
import { GuestRepository } from './guestPassRepository';

interface GetGuestsCommand {
  partner_id: string;
}

export class GetGuests {
  guestRepository: GuestRepository;

  constructor(guestRepository: GuestRepository) {
    this.guestRepository = guestRepository;
  }
  async make(command: GetGuestsCommand): Promise<Guest[]> {
    return this.guestRepository.getByPartner(
      Ulid.fromPrimitives(command.partner_id)
    );
  }
}
