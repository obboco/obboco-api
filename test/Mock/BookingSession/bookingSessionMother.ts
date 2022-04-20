import { Ulid } from '../../../src/Domain/Shared/ulid';
import {
  BookingSession,
  BookingSessionPrimitives
} from '../../../src/Domain/bookingSession';
import { Event } from '../../../src/Domain/event';
import { makeRandomGuest } from '../Guest/guestMother';

export const makeNewRandomBookingSession = (): BookingSession => {
  const bookingSessionProps: BookingSessionPrimitives = {
    booking_id: Ulid.create().value,
    event_id: Ulid.create().value,
    status: 'init',
    guest: makeRandomGuest().toPrimitives()
  };
  return BookingSession.fromPrimitives(bookingSessionProps);
};

export const makeNewRandomBookingSessionWithEvent = (
  event: Event
): BookingSession => {
  const bookingSessionProps: BookingSessionPrimitives = {
    booking_id: Ulid.create().value,
    event_id: event.event_id.value,
    status: 'init',
    guest: makeRandomGuest().toPrimitives()
  };
  return BookingSession.fromPrimitives(bookingSessionProps);
};

export const makeInitilizedRandomBookingSessionWithEvent = (
  event: Event
): BookingSession => {
  const bookingSessionProps: BookingSessionPrimitives = {
    booking_id: Ulid.create().value,
    event_id: event.event_id.value,
    status: 'init',
    guest: null
  };
  return BookingSession.fromPrimitives(bookingSessionProps);
};
