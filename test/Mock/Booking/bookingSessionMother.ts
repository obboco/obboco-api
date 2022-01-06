import { Booking, BookingProps } from './../../../src/Domain/booking';
import { Uuid } from '../../../src/Domain/Shared/uuid';
import faker from 'faker';
import { Event } from '../../../src/Domain/event';

export const makeNewRandomBooking = (): Booking => {
  const email: string = faker.internet.email();
  const bookingProps: BookingProps = {
    booking_id: Uuid.create(),
    event_id: Uuid.create(),
    status: 'init',
    title: faker.lorem.word(),
    start_date: new Date('2022-05-15 06:39:09'),
    duration: faker.datatype.number(),
    email,
    guest: {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: email,
      phone: faker.phone.phoneNumber()
    }
  };
  return Booking.create(bookingProps);
};

export const makeNewRandomBookingWithEvent = (event: Event): Booking => {
  const email: string = faker.internet.email();
  const bookingProps: BookingProps = {
    booking_id: Uuid.create(),
    event_id: event.event_id,
    status: 'init',
    title: faker.lorem.word(),
    start_date: event.start_date,
    duration: event.duration,
    email,
    guest: {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: email,
      phone: faker.phone.phoneNumber()
    }
  };
  return Booking.create(bookingProps);
};
