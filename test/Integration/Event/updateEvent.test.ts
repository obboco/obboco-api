import { Activity } from './../../../src/Domain/activity';
import { makeRandomActivity } from './../../Mock/Activity/activityMother';
import { Event } from '../../../src/Domain/event';
import { EventFixtures } from '../../Mock/Event/eventFixtures';
import { app } from '../../../src/app';
import request from 'supertest';
import { makeRandomEvent } from '../../Mock/Event/eventMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';

describe('Update event', () => {
  it('Update event correctly', async (done) => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const eventFixtures: EventFixtures = new EventFixtures();
    const event = makeRandomEvent(activity);
    await eventFixtures.addEvent(event);

    const newEvent = makeRandomEvent(activity);
    request(app)
      .put('/event')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: event.event_id.value,
        start_date: newEvent.start_date,
        duration: newEvent.duration,
        capacity: newEvent.capacity
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        eventFixtures
          .getEvent(event.event_id.value)
          .then((eventResponse: Event) => {
            expect(newEvent.duration).toEqual(eventResponse.duration);
            expect(newEvent.capacity).toEqual(eventResponse.capacity);
            done();
          });
      });
  });
  /*
  it('Create event with empty start_date format and throw an error', async (done) => {
    const start_date = '';
    const duration = faker.datatype.number();
    const capacity = faker.datatype.number();
    const randomActivityId = Uuid.create();

    request(app)
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
    const capacity = faker.datatype.number();
    const randomActivityId = Uuid.create();

    request(app)
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
    const capacity = faker.datatype.number();
    const randomActivityId = Uuid.create();

    request(app)
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
    const duration = faker.datatype.number();
    const capacity = '';
    const randomActivityId = Uuid.create();

    request(app)
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
    const duration = faker.datatype.number();
    const capacity = 'wrong';
    const randomActivityId = Uuid.create();

    request(app)
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
    const duration = faker.datatype.number();
    const capacity = faker.datatype.number();

    request(app)
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
    const duration = faker.datatype.number();
    const capacity = faker.datatype.number();

    request(app)
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
