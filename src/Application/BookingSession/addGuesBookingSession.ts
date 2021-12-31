import { BookingSessionProps } from '../../Domain/bookingSession';
import { Request } from 'express';
import { BookingSession } from '../../Domain/bookingSession';
import { Uuid } from '../../Domain/Shared/uuid';
import { BookingSessionRepository } from './bookingSessionRepository';

export class AddGuestBookingSession {
  bookingSessionRepository: BookingSessionRepository;

  constructor(bookingSessionRepository: BookingSessionRepository) {
    this.bookingSessionRepository = bookingSessionRepository;
  }

  async make(request: Request): Promise<void> {
    const bookingSessionProps: BookingSessionProps = {
      booking_id: Uuid.fromPrimitives(request.body.booking_id),
      event_id: Uuid.fromPrimitives(request.body.event_id),
      status: 'guest',
      guest: request.body.guest
    };
    const bookingSession: BookingSession =
      BookingSession.create(bookingSessionProps);
    this.bookingSessionRepository.add(bookingSession);
  }
}
