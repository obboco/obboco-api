import { Ulid } from './../../Domain/Shared/ulid';
import { PassRepository } from './../Pass/passRepository';
import { GuestPass } from '../../Domain/guestPass';
import { GuestPassRepository } from './guestPassRepository';
import { Pass } from '../../Domain/pass';

interface CreatGuestPassCommand {
  guest_pass_id: string;
  pass_id: string;
  guest_id: string;
  partner_id: string;
}

export class CreateGuestPass {
  constructor(
    readonly guestPassRepository: GuestPassRepository,
    readonly passRepository: PassRepository
  ) {}

  async make(command: CreatGuestPassCommand): Promise<void> {
    const passId: Ulid = Ulid.fromPrimitives(command.pass_id);
    const pass: Pass = await this.passRepository.get(passId);
    const guestPass: GuestPass = GuestPass.fromPrimitives({
      guest_pass_id: command.guest_pass_id,
      pass_id: command.pass_id,
      guest_id: command.guest_id,
      partner_id: command.partner_id,
      title: pass.title,
      quantity: pass.quantity,
      current_quantity: 0,
      price: pass.price,
      currency: pass.currency,
      status: 'booked'
    });
    this.guestPassRepository.add(guestPass);
  }
}
