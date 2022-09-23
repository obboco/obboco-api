import { Ulid } from '../../Domain/Shared/Ulid';
import { Pass } from '../../Domain/Pass';
import { PassRepository } from './PassRepository';

interface GetPassCommand {
  pass_id: string;
}

export class GetPass {
  constructor(private passRepository: PassRepository) {}

  async make(command: GetPassCommand): Promise<Pass> {
    const passId = Ulid.fromPrimitives(command.pass_id);
    return this.passRepository.get(passId);
  }
}
