import {GuestPass} from '../../../src/Domain/GuestPass';
import {makeRandomNewGuestPass} from '../../Mock/GuestPass/guestPassMother';
import {Booking} from '../../../src/Domain/Booking';
import {
  makeNewRandomBookingSessionWithEvent,
  makeNewRandomBookingSession,
} from '../../Mock/BookingSession/bookingSessionMother';
import {BookingSession} from '../../../src/Domain/BookingSession';
import {BookingSessionFixtures} from '../../Mock/BookingSession/bookingSessionFixtures';
import {ActivityFixtures} from '../../Mock/Activity/activityFixtures';
import {makeRandomEvent} from '../../Mock/Event/eventMother';
import {EventFixtures} from '../../Mock/Event/eventFixtures';
import {makeRandomActivity} from '../../Mock/Activity/activityMother';
import {Activity} from '../../../src/Domain/Activity';
import {makeRandomPartner} from '../../Mock/Partner/partnerMother';
import {Event} from '../../../src/Domain/Event';
import request from 'supertest';
import {BookingFixtures} from '../../Mock/Booking/bookingFixtures';
import {GuestPassFixtures} from '../../Mock/GuestPass/guestPassFixtures';
import {application} from '../../hooks';

describe('Finish booking session', () => {
  it('Finish booking session correctly', async done => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const activityFixtures: ActivityFixtures = new ActivityFixtures();
    await activityFixtures.addActivity(activity);

    const event: Event = makeRandomEvent(activity);
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(event);

    const bookingSessionFixtures: BookingSessionFixtures = new BookingSessionFixtures();
    const bookingSession: BookingSession = makeNewRandomBookingSessionWithEvent(event);
    await bookingSessionFixtures.add(bookingSession);

    const bookingFixtures: BookingFixtures = new BookingFixtures();
    request(application.httpServer)
      .post('/booking/finish')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        source: 'landing',
        type: 'direct',
      })
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
      })
      .then(async () => {
        bookingSessionFixtures
          .get(bookingSession.event_id, bookingSession.booking_id)
          .then((bookingSessionResult: BookingSession) => {
            expect(bookingSessionResult).toBeNull();
          });
      })
      .then(async () => {
        const bookingResult: Booking = await bookingFixtures.get(
          bookingSession.booking_id
        );
        expect(bookingSession.booking_id).toEqual(bookingResult.booking_id);
        expect(activity.title).toEqual(bookingResult.title);
        expect(activity.price).toEqual(bookingResult.price);
        expect(activity.currency).toEqual(bookingResult.currency);
        expect(event.start_date).toEqual(bookingResult.start_date);
        expect('booked').toEqual(bookingResult.status);
        expect('landing').toEqual(bookingResult.source);
        expect('direct').toEqual(bookingResult.type);
      })
      .then(async () => {
        eventFixtures.getEvent(event.event_id.value).then((eventResult: Event) => {
          expect(1).toEqual(eventResult.current_capacity);
        });
        done();
      });
  });

  it('Finish booking session with pass is appied correctly', async done => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const activityFixtures: ActivityFixtures = new ActivityFixtures();
    await activityFixtures.addActivity(activity);

    const event: Event = makeRandomEvent(activity);
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(event);

    const bookingSession: BookingSession = makeNewRandomBookingSessionWithEvent(event);
    const bookingSessionFixtures: BookingSessionFixtures = new BookingSessionFixtures();
    await bookingSessionFixtures.add(bookingSession);

    const randomPartner = makeRandomPartner();
    const randomGuestPass = makeRandomNewGuestPass(
      bookingSession.guest.guest_id,
      randomPartner.partner_id,
      bookingSession.event_id
    );
    const guestPassFixtures = new GuestPassFixtures();
    await guestPassFixtures.add(randomGuestPass);

    const bookingFixtures: BookingFixtures = new BookingFixtures();
    request(application.httpServer)
      .post('/booking/finish')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: bookingSession.booking_id.value,
        source: 'landing',
        type: 'direct',
        guest_pass_id: randomGuestPass.guestPassId.value,
      })
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
      })
      .then(async () => {
        bookingSessionFixtures
          .get(bookingSession.event_id, bookingSession.booking_id)
          .then((bookingSessionResult: BookingSession) => {
            expect(bookingSessionResult).toBeNull();
          });
      })
      .then(async () => {
        const bookingResult: Booking = await bookingFixtures.get(
          bookingSession.booking_id
        );
        expect(bookingSession.booking_id).toEqual(bookingResult.booking_id);
        expect(activity.title).toEqual(bookingResult.title);
        expect(0).toEqual(bookingResult.price);
        expect(activity.currency).toEqual(bookingResult.currency);
        expect(event.start_date).toEqual(bookingResult.start_date);
        expect('booked').toEqual(bookingResult.status);
        expect('landing').toEqual(bookingResult.source);
        expect('direct').toEqual(bookingResult.type);
        expect(randomGuestPass.guestPassId).toEqual(bookingResult.guestPassId);
      })
      .then(async () => {
        eventFixtures.getEvent(event.event_id.value).then((eventResult: Event) => {
          expect(1).toEqual(eventResult.current_capacity);
        });
      })
      .then(async () => {
        guestPassFixtures
          .get(randomGuestPass.guestPassId.value)
          .then((guestPassResult: GuestPass) => {
            expect(1).toEqual(guestPassResult.currentQuantity);
          });
        done();
      });
  });

  it('Finish booking session with wrong event_id and throw an error', async done => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/finish')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: 'wrong_booking_id',
      })
      .expect(400)
      .then(async response => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Finish booking session with empty booking_id and throw an error', async done => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/finish')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: bookingSession.event_id.value,
        booking_id: '',
      })
      .expect(400)
      .then(async response => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Finish booking session with empty event_id and throw an error', async done => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/finish')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: '',
        booking_id: bookingSession.booking_id.value,
      })
      .expect(400)
      .then(async response => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Finish booking session with wrong event_id and throw an error', async done => {
    const bookingSession: BookingSession = makeNewRandomBookingSession();

    request(application.httpServer)
      .post('/booking/finish')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: 'wrong_event_id',
        booking_id: bookingSession.booking_id.value,
      })
      .expect(400)
      .then(async response => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });
});
