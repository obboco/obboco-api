import { Criteria } from './../../Domain/Criteria/criteria';
import { Booking } from '../../Domain/booking';
import { BookingRepository } from './bookingRepository';

interface GetBookingsWithFilterCommand {
  criteria: Criteria;
}

export class GetBookingsWithFilter {
  constructor(private bookingRepository: BookingRepository) {}

  async make(command: GetBookingsWithFilterCommand): Promise<Booking[]> {
    return this.bookingRepository.getByCriteria(command.criteria);
  }
}
