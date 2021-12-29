import { Uuid } from './../../../src/Domain/Shared/uuid';
import {
  BookingSession,
  BookingSessionProps
} from './../../../src/Domain/bookingSession';
import faker from 'faker';

export const makeNewRandomBookingSession = (): BookingSession => {
  const bookingSessionProps: BookingSessionProps = {
    booking_id: Uuid.create(),
    event_id: Uuid.create(),
    status: 'init',
    guest: {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    }
  };
  return BookingSession.create(bookingSessionProps);
};
