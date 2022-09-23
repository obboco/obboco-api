import { Guest } from '../../Domain/Guest';
import { Ulid } from '../../Domain/Shared/Ulid';
import { GuestRepository } from './GuestRepository';

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
