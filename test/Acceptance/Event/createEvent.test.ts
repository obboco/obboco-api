import {
  makeRandomEvent,
  makeRandomIsolatedEvent
} from './../../Mock/Event/eventMother';
import { Event } from '../../../src/Domain/event';
import { EventFixtures } from '../../Mock/Event/eventFixtures';
import { Ulid } from '../../../src/Domain/Shared/ulid';
import request from 'supertest';
import faker from 'faker';
import { BookingApp } from '../../../src/BookingApp';

let application: BookingApp;

describe('Create event', () => {
  it('Create event correctly', async (done) => {
    const eventFixtures = new EventFixtures();
    const randomEvent = makeRandomIsolatedEvent();
    request(application.httpServer)
      .post('/event')
      .set('accept', 'application/json')
      .type('json')
      .send({
        event_id: randomEvent.event_id.value,
        start_date: randomEvent.start_date,
        duration: randomEvent.duration,
        capacity: randomEvent.capacity,
        activity_id: randomEvent.activity_id.value
      })
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        eventFixtures.getEvent(response.body.event_id).then((event: Event) => {
          expect(event).toEqual(randomEvent);
          done();
        });
      });
  });

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
});

beforeAll(async () => {
  application = new BookingApp();
  await application.start();
});

afterAll(async () => {
  await application.stop();
});
