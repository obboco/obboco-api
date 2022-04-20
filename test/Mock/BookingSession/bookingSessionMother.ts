import { Ulid } from '../../../src/Domain/Shared/ulid';
import {
  BookingSession,
  BookingSessionProps
} from '../../../src/Domain/bookingSession';
import { Event } from '../../../src/Domain/event';
import { makeRandomGuest } from '../Guest/guestMother';

export const makeNewRandomBookingSession = (): BookingSession => {
  const bookingSessionProps: BookingSessionProps = {
    booking_id: Ulid.create(),
    event_id: Ulid.create(),
    status: 'init',
    guest: makeRandomGuest()
  };
  return BookingSession.create(bookingSessionProps);
};

export const makeNewRandomBookingSessionWithEvent = (
  event: Event
): BookingSession => {
  const bookingSessionProps: BookingSessionProps = {
    booking_id: Ulid.create(),
    event_id: event.event_id,
    status: 'init',
    guest: makeRandomGuest()
  };
  return BookingSession.create(bookingSessionProps);
};

export const makeInitilizedRandomBookingSessionWithEvent = (
  event: Event
): BookingSession => {
  const bookingSessionProps: BookingSessionProps = {
    booking_id: Ulid.create(),
    event_id: event.event_id,
    status: 'init',
    guest: null
  };
  return BookingSession.create(bookingSessionProps);
};
