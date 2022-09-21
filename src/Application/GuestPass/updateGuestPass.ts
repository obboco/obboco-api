import { GuestPass } from '../../Domain/GuestPass';
import { Ulid } from '../../Domain/Shared/Ulid';
import { GuestPassRepository } from './GuestPassRepository';

interface UpdateGuestPassCommand {
  guest_pass_id: string;
  status: string;
}

export class UpdateGuestPass {
  constructor(private guestPassRepository: GuestPassRepository) {}

  async make(command: UpdateGuestPassCommand): Promise<void> {
    const guestPassId: Ulid = Ulid.fromPrimitives(command.guest_pass_id);
    const guestPass: GuestPass = await this.guestPassRepository.get(
      guestPassId
    );

    this.guestPassRepository.update(
      GuestPass.fromPrimitives({
        ...guestPass.toPrimitives(),
        status: command.status
      })
    );
  }
}
