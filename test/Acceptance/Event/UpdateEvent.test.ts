import {BookingFixtures} from '../../Mock/Booking/bookingFixtures';
import {makeNewRandomBookingWithEvent} from '../../Mock/Booking/bookingSessionMother';
import {Booking} from '../../../src/Domain/Booking';
import {Activity} from '../../../src/Domain/Activity';
import {makeRandomActivity} from '../../Mock/Activity/activityMother';
import {Event} from '../../../src/Domain/Event';
import {EventFixtures} from '../../Mock/Event/eventFixtures';
import request from 'supertest';
import {makeRandomEvent} from '../../Mock/Event/eventMother';
import {makeRandomPartner} from '../../Mock/Partner/partnerMother';
import {application} from '../../hooks';

describe('Update event', () => {
  it('Update event correctly', async done => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const eventFixtures: EventFixtures = new EventFixtures();
    const event = makeRandomEvent(activity);
    await eventFixtures.addEvent(event);

    const newEvent = makeRandomEvent(activity);
    request(application.httpServer)
      .put('/event')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: event.event_id.value,
        start_date: newEvent.start_date,
        duration: newEvent.duration,
        capacity: newEvent.capacity,
        activity_id: event.activity_id.value,
      })
      .expect(200)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        eventFixtures.getEvent(event.event_id.value).then((eventResponse: Event) => {
          expect(newEvent.duration).toEqual(eventResponse.duration);
          expect(newEvent.capacity).toEqual(eventResponse.capacity);
          done();
        });
      });
  });

  it('Cannot update event with bookings', async done => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());

    const randomEvent = makeRandomEvent(activity);
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(randomEvent);

    const booking: Booking = makeNewRandomBookingWithEvent(randomEvent);
    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(booking);

    const newEvent = makeRandomEvent(activity);
    request(application.httpServer)
      .put('/event')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: randomEvent.event_id.value,
        start_date: newEvent.start_date,
        duration: newEvent.duration,
        capacity: newEvent.capacity,
        activity_id: randomEvent.activity_id.value,
      })
      .expect(400)
      .then(async response => {
        expect(response.body.errors[0].msg).toEqual(
          'Cannot update an event with bookings'
        );
        done();
      });
  });

  /*
  it('Create event with empty start_date format and throw an error', async (done) => {
    const start_date = '';
    const duration = faker.datatype.number(2000);
    const capacity = faker.datatype.number(2000);
    const randomActivityId = Ulid.create();

    request(application.httpServer)
      .post('/event')
      .set('accept', 'application/json')
      .type('json')
      .send({
        start_date: start_date,
        duration: duration,
        capacity: capacity,
        activity_id: randomActivityId.value
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Create event with empty duration format and throw an error', async (done) => {
    const start_date = '2022-05-15 06:39:09';
    const duration = '';
    const capacity = faker.datatype.number(2000);
    const randomActivityId = Ulid.create();

    request(application.httpServer)
      .post('/event')
      .set('accept', 'application/json')
      .type('json')
      .send({
        start_date: start_date,
        duration: duration,
        capacity: capacity,
        activity_id: randomActivityId.value
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Create event with wrong duration format and throw an error', async (done) => {
    const start_date = '2022-05-15 06:39:09';
    const duration = 'wrong';
    const capacity = faker.datatype.number(2000);
    const randomActivityId = Ulid.create();

    request(application.httpServer)
      .post('/event')
      .set('accept', 'application/json')
      .type('json')
      .send({
        start_date: start_date,
        duration: duration,
        capacity: capacity,
        activity_id: randomActivityId.value
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Create event with empty capacity format and throw an error', async (done) => {
    const start_date = '2022-05-15 06:39:09';
    const duration = faker.datatype.number(2000);
    const capacity = '';
    const randomActivityId = Ulid.create();

    request(application.httpServer)
      .post('/event')
      .set('accept', 'application/json')
      .type('json')
      .send({
        start_date: start_date,
        duration: duration,
        capacity: capacity,
        activity_id: randomActivityId.value
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Create event with empty capacity format and throw an error', async (done) => {
    const start_date = '2022-05-15 06:39:09';
    const duration = faker.datatype.number(2000);
    const capacity = 'wrong';
    const randomActivityId = Ulid.create();

    request(application.httpServer)
      .post('/event')
      .set('accept', 'application/json')
      .type('json')
      .send({
        start_date: start_date,
        duration: duration,
        capacity: capacity,
        activity_id: randomActivityId.value
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Create event with empty activity_id format and throw an error', async (done) => {
    const start_date = '2022-05-15 06:39:09';
    const duration = faker.datatype.number(2000);
    const capacity = faker.datatype.number(2000);

    request(application.httpServer)
      .post('/event')
      .set('accept', 'application/json')
      .type('json')
      .send({
        start_date: start_date,
        duration: duration,
        capacity: capacity,
        activity_id: ''
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });

  it('Create event with wrong activity_id format and throw an error', async (done) => {
    const start_date = '2022-05-15 06:39:09';
    const duration = faker.datatype.number(2000);
    const capacity = faker.datatype.number(2000);

    request(application.httpServer)
      .post('/event')
      .set('accept', 'application/json')
      .type('json')
      .send({
        start_date: start_date,
        duration: duration,
        capacity: capacity,
        activity_id: 'wrong'
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });
  */
});
