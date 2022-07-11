import { Ulid } from './../../Domain/Shared/ulid';
import { Pass } from '../../Domain/pass';
import { PassRepository } from './passRepository';

interface UpdatePassCommand {
  pass_id: string;
  partner_id: string;
  title: string;
  description: string | null;
  quantity: number;
  price: number;
  currency: string;
}

export class UpdatePass {
  constructor(private passRepository: PassRepository) {}

  async make(command: UpdatePassCommand): Promise<void> {
    const pass: Pass = await this.passRepository.get(
      Ulid.fromPrimitives(command.pass_id)
    );
    const updatePass: Pass = Pass.fromPrimitives({
      pass_id: pass.pass_id.value,
      partner_id: pass.pass_id.value,
      title: command.title,
      description: command.description,
      quantity: command.quantity,
      price: command.price,
      currency: command.currency
    });
    this.passRepository.update(updatePass);
  }
}
