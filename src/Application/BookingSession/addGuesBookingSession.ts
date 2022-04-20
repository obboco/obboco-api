import { BookingSessionPrimitives } from './../../Domain/bookingSession';
import { Guest } from './../../Domain/guest';
import { GuestRepository } from './../Guest/guestRepository';
import { Request } from 'express';
import { BookingSession } from '../../Domain/bookingSession';
import { Ulid } from '../../Domain/Shared/ulid';
import { BookingSessionRepository } from './bookingSessionRepository';

export class AddGuestBookingSession {
  constructor(
    private bookingSessionRepository: BookingSessionRepository,
    private guestRepository: GuestRepository
  ) {}

  async make(request: Request): Promise<void> {
    const guest: Guest = Guest.fromPrimitives(request.body.guest);
    this.guestRepository.add(guest);

    const bookingSessionProps: BookingSessionPrimitives = {
      booking_id: request.body.booking_id,
      event_id: request.body.event_id,
      status: 'guest',
      guest: request.body.guest
    };

    const bookingSession: BookingSession =
      BookingSession.fromPrimitives(bookingSessionProps);
    this.bookingSessionRepository.add(bookingSession);
  }
}
