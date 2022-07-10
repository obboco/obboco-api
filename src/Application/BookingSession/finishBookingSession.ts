import { GuestPassRepository } from './../GuestPass/guestPassRepository';
import { GuestPass } from './../../Domain/guestPass';
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
  source: string;
  type: string;
  guest_pass_id: string | null;
}

export class FinishBookingSession {
  constructor(
    readonly bookingSessionRepository: BookingSessionRepository,
    readonly bookingRepository: BookingRepository,
    readonly activityRepository: ActivityRepository,
    readonly eventRepository: EventRepository,
    readonly guestPassRepository: GuestPassRepository
  ) {}

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

    const guestPassId = command.guest_pass_id
      ? Ulid.fromPrimitives(command.guest_pass_id).value
      : null;

    const price = command.guest_pass_id ? 0 : activity.price;

    const booking: Booking = Booking.fromPrimitives({
      booking_id: bookingSession.booking_id.value,
      event_id: bookingSession.event_id.value,
      activity_id: activity.activity_id.value,
      partner_id: activity.partner_id.value,
      status: 'booked',
      title: activity.title,
      start_date: event.start_date.toISOString(),
      duration: event.duration,
      price: price,
      currency: activity.currency,
      guest: bookingSession.guest.toPrimitives(),
      source: command.source,
      type: command.type,
      guest_pass_id: guestPassId
    });

    this.bookingSessionRepository.delete(bookingSession);
    this.bookingRepository.add(booking);
    this.incrementEventCapacity(event);
    this.incrementGuestPassCapacityWhenPassIsApplied(guestPassId);
  }

  private async incrementEventCapacity(event: Event): Promise<void> {
    event.incrementCapacity();
    this.eventRepository.update(event);
  }

  private async incrementGuestPassCapacityWhenPassIsApplied(
    guestPassId: string | null
  ): Promise<void> {
    if (!guestPassId) {
      return;
    }

    const guestPass: GuestPass = await this.guestPassRepository.get(
      Ulid.fromPrimitives(guestPassId)
    );
    guestPass.incrementQuantity();
    this.guestPassRepository.update(guestPass);
  }
}
