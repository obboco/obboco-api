import { Event } from './../../../src/Domain/event';
import { EventFixtures } from './../../Mock/Event/eventFixtures';
import { Uuid } from './../../../src/Domain/Shared/uuid';
import { app } from '../../../src/app';
import request from 'supertest';
import faker from 'faker';

describe('Create event', () => {
  it('Create event correctly', async (done) => {
    const eventFixtures = new EventFixtures();

    const moment = require('moment');
    const start_date = '2022-05-15 06:39:09';
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
});
