import { Pass } from '../../Domain/pass';
import { PassRepository } from './passRepository';

interface CreatePassCommand {
  pass_id: string;
  partner_id: string;
  title: string;
  quantity: number;
  price: number;
  currency: string;
}

export class CreatePass {
  constructor(private passRepository: PassRepository) {}

  async make(command: CreatePassCommand): Promise<void> {
    const pass: Pass = Pass.fromPrimitives({
      pass_id: command.pass_id,
      partner_id: command.partner_id,
      title: command.title,
      quantity: command.quantity,
      price: command.price,
      currency: command.currency
    });
    this.passRepository.add(pass);
  }
}
