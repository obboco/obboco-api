import { GuestPass } from '../../Domain/GuestPass';
import { Ulid } from '../../Domain/Shared/Ulid';
import { GuestPassRepository } from './GuestPassRepository';

interface GetGuestPassCommand {
  guest_pass_id: string;
}

export class GetGuestPass {
  constructor(readonly guestPassRepository: GuestPassRepository) {}

  async make(command: GetGuestPassCommand): Promise<GuestPass> {
    return this.guestPassRepository.get(
      Ulid.fromPrimitives(command.guest_pass_id)
    );
  }
}
