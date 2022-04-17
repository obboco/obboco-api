import { Booking, BookingProps } from './../../../src/Domain/booking';
import { Ulid } from '../../../src/Domain/Shared/ulid';
import faker from 'faker';
import { Event } from '../../../src/Domain/event';

export const makeNewRandomBooking = (): Booking => {
  const bookingProps: BookingProps = {
    booking_id: Ulid.create(),
    event_id: Ulid.create(),
    status: 'init',
    title: faker.lorem.word(),
    start_date: new Date('2022-05-15 06:39:09'),
    duration: faker.datatype.number(),
    guest: {
      guest_id: Ulid.create(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    }
  };
  return Booking.create(bookingProps);
};

export const makeNewRandomBookingWithEvent = (event: Event): Booking => {
  const bookingProps: BookingProps = {
    booking_id: Ulid.create(),
    event_id: event.event_id,
    status: 'init',
    title: faker.lorem.word(),
    start_date: event.start_date,
    duration: event.duration,
    guest: {
      guest_id: Ulid.create(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    }
  };
  return Booking.create(bookingProps);
};
