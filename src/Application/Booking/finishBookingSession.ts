import { Booking } from './../../Domain/booking';
import { BookingSessionProps } from '../../Domain/bookingSession';
import { Request } from 'express';
import { BookingSession } from '../../Domain/bookingSession';
import { Uuid } from '../../Domain/Shared/uuid';
import { BookingSessionRepository } from './bookingSessionRepository';
import { BookingRepository } from './bookingRepository';

export class FinishBookingSession {
  bookingSessionRepository: BookingSessionRepository;
  bookingRepository: BookingRepository;

  constructor(
    bookingSessionRepository: BookingSessionRepository,
    bookingRepository: BookingRepository
  ) {
    this.bookingSessionRepository = bookingSessionRepository;
    this.bookingRepository = bookingRepository;
  }

  async make(request: Request): Promise<void> {
    const bookingSession: BookingSession =
      await this.bookingSessionRepository.get(
        Uuid.fromPrimitives(request.body.event_id),
        Uuid.fromPrimitives(request.body.booking_id)
      );
    const booking: Booking = Booking.create({
      booking_id: bookingSession.booking_id,
      event_id: bookingSession.event_id,
      status: 'paid',
      email: bookingSession.guest.email,
      guest: bookingSession.guest
    });

    this.bookingSessionRepository.delete(bookingSession);
    this.bookingRepository.add(booking);
  }
}
