import { GuestPass } from './../../Domain/guestPass';
import { Ulid } from './../../Domain/Shared/ulid';
import { PassRepository } from './passRepository';
import { GuestPassRepository } from '../GuestPass/guestPassRepository';

interface DeletePassCommand {
  pass_id: string;
}

export class DeletePass {
  constructor(
    private passRepository: PassRepository,
    private guestPassRepository: GuestPassRepository
  ) {}

  async make(command: DeletePassCommand): Promise<void> {
    const passId: Ulid = Ulid.fromPrimitives(command.pass_id);

    const passes: GuestPass[] = await this.guestPassRepository.getByPass(
      passId
    );

    if (passes.length > 0) {
      throw new Error('Cannot delete a pass with some bookings assigned');
    }

    this.passRepository.delete(passId);
  }
}
