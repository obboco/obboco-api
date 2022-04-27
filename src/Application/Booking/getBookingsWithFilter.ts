import { Booking } from '../../Domain/booking';
import { Ulid } from '../../Domain/Shared/ulid';
import { BookingRepository } from './bookingRepository';

interface GetBookingsWithFilterCommand {
  filter: string;
  attributes: {
    partner_id?: string;
  };
}

export class GetBookingsWithFilter {
  constructor(private bookingRepository: BookingRepository) {}

  async make(command: GetBookingsWithFilterCommand): Promise<Booking[]> {
    const partnerId = Ulid.fromPrimitives(command.attributes.partner_id);
    return this.bookingRepository.getByPartnerId(partnerId);
  }
}
