import { Event } from '../../Domain/event';
import { Activity } from '../../Domain/activity';
import { EventRepository } from '../Event/eventRepository';
import { ActivityRepository } from '../Activity/activityRepository';
import { Booking } from '../../Domain/booking';
import { Request } from 'express';
import { BookingSession } from '../../Domain/bookingSession';
import { Uuid } from '../../Domain/Shared/uuid';
import { BookingSessionRepository } from './bookingSessionRepository';
import { BookingRepository } from '../Booking/bookingRepository';

export class FinishBookingSession {
  bookingSessionRepository: BookingSessionRepository;
  bookingRepository: BookingRepository;
  activityRepository: ActivityRepository;
  eventRepository: EventRepository;

  constructor(
    bookingSessionRepository: BookingSessionRepository,
    bookingRepository: BookingRepository,
    activityRepository: ActivityRepository,
    eventRepository: EventRepository
  ) {
    this.bookingSessionRepository = bookingSessionRepository;
    this.bookingRepository = bookingRepository;
    this.activityRepository = activityRepository;
    this.eventRepository = eventRepository;
  }

  async make(request: Request): Promise<void> {
    const bookingSession: BookingSession =
      await this.bookingSessionRepository.get(
        Uuid.fromPrimitives(request.body.event_id),
        Uuid.fromPrimitives(request.body.booking_id)
      );

    const event: Event = await this.eventRepository.get(
      Uuid.fromPrimitives(request.body.event_id)
    );

    const activity: Activity = await this.activityRepository.get(
      event.activity_id
    );

    const booking: Booking = Booking.create({
      booking_id: bookingSession.booking_id,
      event_id: bookingSession.event_id,
      status: 'paid',
      title: activity.title,
      start_date: event.start_date,
      email: bookingSession.guest.email,
      guest: bookingSession.guest
    });

    this.bookingSessionRepository.delete(bookingSession);
    this.bookingRepository.add(booking);
  }
}
