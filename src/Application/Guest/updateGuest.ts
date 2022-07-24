import { Ulid } from './../../Domain/Shared/ulid';
import { Guest } from '../../Domain/guest';
import { GuestRepository } from './guestRepository';

interface UpdateGuestCommand {
  guest_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export class UpdateGuest {
  guestRepository: GuestRepository;

  constructor(guestRepository: GuestRepository) {
    this.guestRepository = guestRepository;
  }

  async make(command: UpdateGuestCommand): Promise<void> {
    const guest: Guest = await this.guestRepository.get(
      Ulid.fromPrimitives(command.guest_id)
    );
    const updatedGuest: Guest = Guest.fromPrimitives({
      guest_id: guest.guest_id.value,
      partner_id: guest.partner_id.value,
      first_name: command.first_name,
      last_name: command.last_name,
      email: command.email,
      phone: command.phone
    });
    this.guestRepository.update(updatedGuest);
  }
}
