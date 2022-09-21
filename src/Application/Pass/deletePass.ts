import { GuestPass } from '../../Domain/GuestPass';
import { Ulid } from '../../Domain/Shared/Ulid';
import { PassRepository } from './PassRepository';
import { GuestPassRepository } from '../GuestPass/GuestPassRepository';

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
