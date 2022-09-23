import { Pass } from '../../Domain/Pass';
import { PassRepository } from './PassRepository';

interface CreatePassCommand {
  pass_id: string;
  partner_id: string;
  title: string;
  description: string;
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
      description: command.description,
      quantity: command.quantity,
      price: command.price,
      currency: command.currency
    });
    this.passRepository.add(pass);
  }
}
