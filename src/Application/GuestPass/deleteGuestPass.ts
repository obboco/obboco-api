import { Ulid } from '../../Domain/Shared/ulid';
import { GuestPassRepository } from './guestPassRepository';

interface DeleteGuestPassCommand {
  guest_pass_id: string;
}

export class DeleteGuestPass {
  constructor(private guestPassRepository: GuestPassRepository) {}

  async make(command: DeleteGuestPassCommand): Promise<void> {
    const guestPassId: Ulid = Ulid.fromPrimitives(command.guest_pass_id);

    const guestPass = await this.guestPassRepository.get(guestPassId);
    if (guestPass == null || guestPass.currentQuantity > 0) {
      throw new Error('Cannot delete a guest pass with some bookings assigned');
    }

    this.guestPassRepository.delete(guestPassId);
  }
}
