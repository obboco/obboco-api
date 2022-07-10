import { Guest } from '../../Domain/guest';
import { Ulid } from '../../Domain/Shared/ulid';
import { GuestRepository } from './guestRepository';

interface GetGuestCommand {
  guest_id: string;
}

export class GetGuest {
  constructor(readonly guestRepository: GuestRepository) {}
  async make(command: GetGuestCommand): Promise<Guest> {
    return this.guestRepository.get(Ulid.fromPrimitives(command.guest_id));
  }
}
