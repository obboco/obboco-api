import { Partner } from '../../../src/Domain/Partner';
import { Booking, BookingPrimitives } from '../../../src/Domain/Booking';
import { Ulid } from '../../../src/Domain/Shared/Ulid';
import faker from 'faker';
import { Event } from '../../../src/Domain/Event';
import { makeRandomGuest } from '../Guest/guestMother';

export const makeNewRandomBooking = (): Booking => {
  const bookingPrimitives: BookingPrimitives = {
    booking_id: Ulid.create().value,
    event_id: Ulid.create().value,
    activity_id: Ulid.create().value,
    partner_id: Ulid.create().value,
    status: 'init',
    title: faker.lorem.word(),
    start_date: new Date('2022-05-15 06:39:09').toISOString(),
    duration: faker.datatype.number(2000),
    price: faker.datatype.number(2000),
    currency: faker.finance.currencyCode(),
    guest: makeRandomGuest(Ulid.create()).toPrimitives(),
    source: 'pos',
    type: 'direct',
    guest_pass_id: Ulid.create().value
  };
  return Booking.fromPrimitives(bookingPrimitives);
};

export const makeNewRandomBookingWithEvent = (event: Event): Booking => {
  const bookingPrimitives: BookingPrimitives = {
    booking_id: Ulid.create().value,
    event_id: event.event_id.value,
    activity_id: Ulid.create().value,
    partner_id: Ulid.create().value,
    status: 'init',
    title: faker.lorem.word(),
    start_date: event.start_date.toISOString(),
    duration: event.duration,
    price: faker.datatype.number(2000),
    currency: faker.finance.currencyCode(),
    guest: makeRandomGuest(Ulid.create()).toPrimitives(),
    source: 'pos',
    type: 'direct',
    guest_pass_id: Ulid.create().value
  };
  return Booking.fromPrimitives(bookingPrimitives);
};

export const makeRandomBooking = (event: Event, partner: Partner): Booking => {
  const bookingPrimitives: BookingPrimitives = {
    booking_id: Ulid.create().value,
    event_id: event.event_id.value,
    activity_id: Ulid.create().value,
    partner_id: partner.partner_id.value,
    status: 'init',
    title: faker.lorem.word(),
    start_date: event.start_date.toISOString(),
    duration: event.duration,
    price: faker.datatype.number(2000),
    currency: faker.finance.currencyCode(),
    guest: makeRandomGuest(partner.partner_id).toPrimitives(),
    source: 'pos',
    type: 'direct',
    guest_pass_id: Ulid.create().value
  };
  return Booking.fromPrimitives(bookingPrimitives);
};

export const makeCustomBookingPrimitives = (): BookingPrimitives => {
  return {
    booking_id: Ulid.create().value,
    event_id: Ulid.create().value,
    activity_id: Ulid.create().value,
    partner_id: Ulid.create().value,
    status: 'init',
    title: faker.lorem.word(),
    start_date: new Date('2022-05-15 06:39:09').toISOString(),
    duration: faker.datatype.number(2000),
    price: faker.datatype.number(2000),
    currency: faker.finance.currencyCode(),
    guest: makeRandomGuest(Ulid.create()).toPrimitives(),
    source: 'pos',
    type: 'direct',
    guest_pass_id: Ulid.create().value
  };
};

export const makeCustomBooking = (bookingPrimitives): Booking => {
  bookingPrimitives.booking_id = Ulid.create().value;
  return Booking.fromPrimitives(bookingPrimitives);
};
