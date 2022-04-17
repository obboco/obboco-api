import { Ulid } from '../../../src/Domain/Shared/ulid';
import {
  BookingSession,
  BookingSessionProps
} from '../../../src/Domain/bookingSession';
import faker from 'faker';
import { Event } from '../../../src/Domain/event';

export const makeNewRandomBookingSession = (): BookingSession => {
  const bookingSessionProps: BookingSessionProps = {
    booking_id: Ulid.create(),
    event_id: Ulid.create(),
    status: 'init',
    guest: {
      guest_id: Ulid.create(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    }
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
    guest: {
      guest_id: Ulid.create(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    }
  };
  return BookingSession.create(bookingSessionProps);
};
