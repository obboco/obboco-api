import { Ulid } from './../../Domain/Shared/ulid';
import { Pass } from '../../Domain/pass';
import { PassRepository } from './passRepository';

interface DeletePassCommand {
  pass_id: string;
}

export class DeletePass {
  constructor(private passRepository: PassRepository) {}

  async make(command: DeletePassCommand): Promise<void> {
    const passId: Ulid = Ulid.fromPrimitives(command.pass_id);
    this.passRepository.delete(passId);
  }
}
