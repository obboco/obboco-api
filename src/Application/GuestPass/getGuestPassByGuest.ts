import { GuestPass } from './../../Domain/guestPass';
import { Ulid } from '../../Domain/Shared/ulid';
import { GuestPassRepository } from './guestPassRepository';

interface GetGuestPassByGuestCommand {
  guest_id: string;
}

export class GetGuestPassByGuest {
  constructor(readonly guestPassRepository: GuestPassRepository) {}

  async make(command: GetGuestPassByGuestCommand): Promise<GuestPass[]> {
    return this.guestPassRepository.getByGuest(
      Ulid.fromPrimitives(command.guest_id)
    );
  }
}
