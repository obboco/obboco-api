import { Guest } from '../../Domain/Guest';
import { Ulid } from '../../Domain/Shared/Ulid';
import { GuestRepository } from './GuestRepository';

interface GetGuestCommand {
  guest_id: string;
}

export class GetGuest {
  constructor(readonly guestRepository: GuestRepository) {}
  async make(command: GetGuestCommand): Promise<Guest> {
    return this.guestRepository.get(Ulid.fromPrimitives(command.guest_id));
  }
}
