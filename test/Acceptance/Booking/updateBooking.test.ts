import { Event } from './../../../src/Domain/event';
import { EventFixtures } from './../../Mock/Event/eventFixtures';
import { makeRandomEventWithSomeCapacity } from './../../Mock/Event/eventMother';
import { BookingFixtures } from './../../Mock/Booking/bookingFixtures';
import {
  makeNewRandomBooking,
  makeCustomBooking
} from './../../Mock/Booking/bookingSessionMother';
import { Booking } from './../../../src/Domain/booking';
import request from 'supertest';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('Update booking', () => {
  it('Update booking status from booked to paid', async (done) => {
    const booking: Booking = makeNewRandomBooking();
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    request(application.httpServer)
      .put('/booking')
      .set('accept', 'application/json')
      .type('json')
      .send({
        booking_id: booking.booking_id.value,
        status: 'paid'
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        bookingFixtures
          .get(booking.booking_id)
          .then((bookingResult: Booking) => {
            expect('paid').toEqual(bookingResult.status);
            done();
          });
      });
  });

  it('Update booking status from booked to canceled and add 1 extra capacity to the event', async (done) => {
    const randomEvent = makeRandomEventWithSomeCapacity();
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(randomEvent);

    let bookingPrimitives = makeNewRandomBooking().toPrimitives();
    bookingPrimitives = { ...bookingPrimitives, status: 'booked' };

    const booking: Booking = makeCustomBooking(bookingPrimitives);
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    request(application.httpServer)
      .put('/booking')
      .set('accept', 'application/json')
      .type('json')
      .send({
        booking_id: booking.booking_id.value,
        status: 'canceled'
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        bookingFixtures
          .get(booking.booking_id)
          .then((bookingResult: Booking) => {
            expect('canceled').toEqual(bookingResult.status);
          });
      })
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        eventFixtures
          .getEvent(randomEvent.event_id.value)
          .then((eventResult: Event) => {
            expect(randomEvent.current_capacity + 1).toEqual(
              eventResult.current_capacity
            );
            done();
          });
      });
  });
});

beforeAll(async () => {
  application = new BookingApp();
  await application.start();
});

afterAll(async () => {
  await application.stop();
});
