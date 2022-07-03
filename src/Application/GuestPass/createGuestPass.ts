import { GuestPass } from '../../Domain/guestPass';
import { GuestPassRepository } from './guestPassRepository';

interface CreatGuestPassCommand {
  guest_pass_id: string;
  pass_id: string;
  guest_id: string;
  quantity: number;
  price: number;
  currency: string;
}

export class CreateGuestPass {
  guestPassRepository: GuestPassRepository;

  constructor(guestPassRepository: GuestPassRepository) {
    this.guestPassRepository = guestPassRepository;
  }

  async make(command: CreatGuestPassCommand): Promise<void> {
    const guestPass: GuestPass = GuestPass.fromPrimitives({
      guest_pass_id: command.guest_pass_id,
      pass_id: command.pass_id,
      guest_id: command.guest_id,
      quantity: command.quantity,
      current_quantity: 0,
      price: command.price,
      currency: command.currency,
      status: 'booked'
    });
    this.guestPassRepository.add(guestPass);
  }
}
