import { Criteria } from '../../Domain/Criteria/Criteria';
import { Booking } from '../../Domain/Booking';
import { BookingRepository } from './BookingRepository';

interface GetBookingsWithFilterCommand {
  criteria: Criteria;
}

export class GetBookingsWithFilter {
  constructor(private bookingRepository: BookingRepository) {}

  async make(command: GetBookingsWithFilterCommand): Promise<Booking[]> {
    return this.bookingRepository.getByCriteria(command.criteria);
  }
}
