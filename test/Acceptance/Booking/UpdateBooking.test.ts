import {GuestPass} from './../../../src/Domain/GuestPass';
import {GuestPassFixtures} from './../../Mock/GuestPass/guestPassFixtures';
import {makeRandomGuestPass} from './../../Mock/GuestPass/guestPassMother';
import {Ulid} from './../../../src/Domain/Shared/Ulid';
import {Event} from '../../../src/Domain/Event';
import {EventFixtures} from '../../Mock/Event/eventFixtures';
import {makeRandomEventWithSomeCapacity} from '../../Mock/Event/eventMother';
import {BookingFixtures} from '../../Mock/Booking/bookingFixtures';
import {
  makeNewRandomBooking,
  makeCustomBooking,
} from '../../Mock/Booking/bookingSessionMother';
import {Booking} from '../../../src/Domain/Booking';
import request from 'supertest';
import {application} from '../../hooks';

describe('Update booking', () => {
  it('Update booking status from booked to paid', async done => {
    const booking: Booking = makeNewRandomBooking();
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    request(application.httpServer)
      .put('/booking')
      .set('accept', 'application/json')
      .type('json')
      .send({
        booking_id: booking.booking_id.value,
        status: 'paid',
      })
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        bookingFixtures.get(booking.booking_id).then((bookingResult: Booking) => {
          expect('paid').toEqual(bookingResult.status);
          done();
        });
      });
  });

  it('Update booking status from booked to canceled and add 1 extra capacity to the event', async done => {
    const randomEvent = makeRandomEventWithSomeCapacity();
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(randomEvent);

    let bookingPrimitives = makeNewRandomBooking().toPrimitives();
    bookingPrimitives = {
      ...bookingPrimitives,
      event_id: randomEvent.event_id.value,
      status: 'booked',
      guest_pass_id: null,
    };

    const booking: Booking = makeCustomBooking(bookingPrimitives);
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    request(application.httpServer)
      .put('/booking')
      .set('accept', 'application/json')
      .type('json')
      .send({
        booking_id: booking.booking_id.value,
        status: 'canceled',
      })
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        bookingFixtures.get(booking.booking_id).then((bookingResult: Booking) => {
          expect('canceled').toEqual(bookingResult.status);
        });
      })
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        eventFixtures.getEvent(randomEvent.event_id.value).then((eventResult: Event) => {
          expect(randomEvent.current_capacity - 1).toEqual(eventResult.current_capacity);
          done();
        });
      });
  });

  it('Update booking status from canceled to paid and reduce 1 capacity to the event', async done => {
    const randomEvent = makeRandomEventWithSomeCapacity();
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(randomEvent);

    let bookingPrimitives = makeNewRandomBooking().toPrimitives();
    bookingPrimitives = {
      ...bookingPrimitives,
      event_id: randomEvent.event_id.value,
      status: 'canceled',
      guest_pass_id: null,
    };

    const booking: Booking = makeCustomBooking(bookingPrimitives);
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    request(application.httpServer)
      .put('/booking')
      .set('accept', 'application/json')
      .type('json')
      .send({
        booking_id: booking.booking_id.value,
        status: 'paid',
      })
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        bookingFixtures.get(booking.booking_id).then((bookingResult: Booking) => {
          expect('paid').toEqual(bookingResult.status);
        });
      })
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        eventFixtures.getEvent(randomEvent.event_id.value).then((eventResult: Event) => {
          expect(randomEvent.current_capacity + 1).toEqual(eventResult.current_capacity);
          done();
        });
      });
  });

  it('Update booking status from booked to canceled and add 1 extra capacity to the guest pass', async done => {
    const randomGuestPass = makeRandomGuestPass(
      Ulid.create(),
      Ulid.create(),
      Ulid.create()
    );
    const guestPassFixtures = new GuestPassFixtures();
    await guestPassFixtures.add(randomGuestPass);

    const randomEvent = makeRandomEventWithSomeCapacity();
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(randomEvent);

    let bookingPrimitives = makeNewRandomBooking().toPrimitives();
    bookingPrimitives = {
      ...bookingPrimitives,
      event_id: randomEvent.event_id.value,
      guest_pass_id: randomGuestPass.guestPassId.value,
      status: 'booked',
    };

    const booking: Booking = makeCustomBooking(bookingPrimitives);
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    request(application.httpServer)
      .put('/booking')
      .set('accept', 'application/json')
      .type('json')
      .send({
        booking_id: booking.booking_id.value,
        status: 'canceled',
      })
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        bookingFixtures.get(booking.booking_id).then((bookingResult: Booking) => {
          expect('canceled').toEqual(bookingResult.status);
        });
      })
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        guestPassFixtures
          .get(randomGuestPass.guestPassId.value)
          .then((guestPassResult: GuestPass) => {
            expect(randomGuestPass.currentQuantity + 1).toEqual(
              guestPassResult.currentQuantity
            );
            done();
          });
      });
  });

  it('Update booking status from canceled to paid and reduce extra capacity to the guest pass', async done => {
    const randomGuestPass = makeRandomGuestPass(
      Ulid.create(),
      Ulid.create(),
      Ulid.create()
    );
    const guestPassFixtures = new GuestPassFixtures();
    await guestPassFixtures.add(randomGuestPass);

    const randomEvent = makeRandomEventWithSomeCapacity();
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(randomEvent);

    let bookingPrimitives = makeNewRandomBooking().toPrimitives();
    bookingPrimitives = {
      ...bookingPrimitives,
      event_id: randomEvent.event_id.value,
      guest_pass_id: randomGuestPass.guestPassId.value,
      status: 'canceled',
    };

    const booking: Booking = makeCustomBooking(bookingPrimitives);
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    request(application.httpServer)
      .put('/booking')
      .set('accept', 'application/json')
      .type('json')
      .send({
        booking_id: booking.booking_id.value,
        status: 'paid',
      })
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        bookingFixtures.get(booking.booking_id).then((bookingResult: Booking) => {
          expect('paid').toEqual(bookingResult.status);
        });
      })
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        guestPassFixtures
          .get(randomGuestPass.guestPassId.value)
          .then((guestPassResult: GuestPass) => {
            expect(randomGuestPass.currentQuantity - 1).toEqual(
              guestPassResult.currentQuantity
            );
            done();
          });
      });
  });
});
