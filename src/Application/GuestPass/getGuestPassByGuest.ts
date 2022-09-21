import { GuestPass } from '../../Domain/GuestPass';
import { Ulid } from '../../Domain/Shared/Ulid';
import { GuestPassRepository } from './GuestPassRepository';

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
