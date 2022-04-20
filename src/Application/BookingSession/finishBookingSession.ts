import { Event } from '../../Domain/event';
import { Activity } from '../../Domain/activity';
import { EventRepository } from '../Event/eventRepository';
import { ActivityRepository } from '../Activity/activityRepository';
import { Booking } from '../../Domain/booking';
import { Request } from 'express';
import { BookingSession } from '../../Domain/bookingSession';
import { Ulid } from '../../Domain/Shared/ulid';
import { BookingSessionRepository } from './bookingSessionRepository';
import { BookingRepository } from '../Booking/bookingRepository';

interface FinnishBookingSessionCommand {
  booking_id: string;
  event_id: string;
}

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

  async make(command: FinnishBookingSessionCommand): Promise<void> {
    const bookingSession: BookingSession =
      await this.bookingSessionRepository.get(
        Ulid.fromPrimitives(command.event_id),
        Ulid.fromPrimitives(command.booking_id)
      );

    const event: Event = await this.eventRepository.get(
      Ulid.fromPrimitives(command.event_id)
    );

    const activity: Activity = await this.activityRepository.get(
      event.activity_id
    );

    const booking: Booking = Booking.fromPrimitives({
      booking_id: bookingSession.booking_id.value,
      event_id: bookingSession.event_id.value,
      status: 'paid',
      title: activity.title,
      start_date: event.start_date.toISOString(),
      duration: event.duration,
      guest: bookingSession.guest.toPrimitives()
    });

    this.bookingSessionRepository.delete(bookingSession);
    this.bookingRepository.add(booking);
    this.incrementCapacity(event);
  }

  async incrementCapacity(event: Event): Promise<void> {
    event.incrementCapacity();
    this.eventRepository.update(event);
  }
}
