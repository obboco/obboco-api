import { Guest } from '../../Domain/Guest';
import { GuestRepository } from './GuestRepository';

interface CreateGuestCommand {
  guest_id: string;
  partner_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export class CreateGuest {
  guestRepository: GuestRepository;

  constructor(guestRepository: GuestRepository) {
    this.guestRepository = guestRepository;
  }

  async make(command: CreateGuestCommand): Promise<void> {
    const guest: Guest = Guest.fromPrimitives({
      guest_id: command.guest_id,
      partner_id: command.partner_id,
      first_name: command.first_name,
      last_name: command.last_name,
      email: command.email,
      phone: command.phone
    });
    this.guestRepository.add(guest);
  }
}
