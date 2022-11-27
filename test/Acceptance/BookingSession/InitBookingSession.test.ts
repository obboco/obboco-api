import {BookingSession} from '../../../src/Domain/BookingSession';
import {makeInitilizedRandomBookingSessionWithEvent} from '../../Mock/BookingSession/bookingSessionMother';
import {BookingSessionFixtures} from '../../Mock/BookingSession/bookingSessionFixtures';
import {makeRandomEvent} from '../../Mock/Event/eventMother';
import {EventFixtures} from '../../Mock/Event/eventFixtures';
import {makeRandomActivity} from '../../Mock/Activity/activityMother';
import {Activity} from '../../../src/Domain/Activity';
import {makeRandomPartner} from '../../Mock/Partner/partnerMother';
import {Event} from '../../../src/Domain/Event';
import request from 'supertest';
import {application} from '../../hooks';

describe('Initilalize the booking funnel', () => {
  it('Initialize the booking correctly', async done => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const event: Event = makeRandomEvent(activity);
    const randomBookingSession: BookingSession =
      makeInitilizedRandomBookingSessionWithEvent(event);
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(event);
    const bookingSessionFixtures: BookingSessionFixtures = new BookingSessionFixtures();

    request(application.httpServer)
      .post('/booking/init')
      .set('accept', 'application/json')
      .type('json')
      .send({
        booking_id: randomBookingSession.booking_id.value,
        event_id: randomBookingSession.event_id.value,
      })
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        bookingSessionFixtures
          .get(randomBookingSession.event_id, randomBookingSession.booking_id)
          .then((bookingSession: BookingSession) => {
            expect(bookingSession.status).toEqual(randomBookingSession.status);
            expect(bookingSession.guest).toEqual(randomBookingSession.guest);
            done();
          });
      });
  });

  it('Initialize the booking with empty event_id format and throw an error', async done => {
    request(application.httpServer)
      .post('/booking/init')
      .set('accept', 'application/json')
      .type('json')
      .send({
        booking_id: '',
        event_id: '',
      })
      .expect(400)
      .then(async response => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Initialize the booking with wrong event_id format and throw an error', async done => {
    request(application.httpServer)
      .post('/booking/init')
      .set('accept', 'application/json')
      .type('json')
      .send({
        booking_id: 'wrong_id',
        event_id: 'wrong_id',
      })
      .expect(400)
      .then(async response => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });
});
