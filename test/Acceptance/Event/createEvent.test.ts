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

    const moment = require('moment');
    const start_date = '2022-05-15 06:39:09';
    const duration = faker.datatype.number();
    const capacity = faker.datatype.number();
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
      .expect(200)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        eventFixtures.getEvent(response.body.event_id).then((event: Event) => {
          expect(
            moment(event.start_date).format('YYYY-MM-DD HH:mm:ss')
          ).toEqual(start_date);
          done();
        });
      });
  });

  it('Create event with empty start_date format and throw an error', async (done) => {
    const start_date = '';
    const duration = faker.datatype.number();
    const capacity = faker.datatype.number();
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
    const capacity = faker.datatype.number();
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
    const capacity = faker.datatype.number();
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
    const duration = faker.datatype.number();
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
    const duration = faker.datatype.number();
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
    const duration = faker.datatype.number();
    const capacity = faker.datatype.number();

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
    const duration = faker.datatype.number();
    const capacity = faker.datatype.number();

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
