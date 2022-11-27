import {
  makeRandomEvent,
  makeRandomFutureEvent,
  makeRandomPastEvent,
  makeRandomTodayEvent,
  makeRandomTomorrowEvent,
} from '../../Mock/Event/eventMother';
import {EventFixtures} from '../../Mock/Event/eventFixtures';
import {makeRandomActivity} from '../../Mock/Activity/activityMother';
import {Ulid} from '../../../src/Domain/Shared/Ulid';
import {Activity} from '../../../src/Domain/Activity';
import {makeRandomPartner} from '../../Mock/Partner/partnerMother';
import request from 'supertest';
import {application} from '../../hooks';

describe('List events', () => {
  it('List empty events', async done => {
    request(application.httpServer)
      .get('/event/activity/' + Ulid.create().value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async response => {
        expect(response.body.data).toEqual([]);
        done();
      });
  });

  it('List all events', async done => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const eventFixtures: EventFixtures = new EventFixtures();

    await eventFixtures.addEvent(makeRandomEvent(activity));
    await eventFixtures.addEvent(makeRandomEvent(activity));
    await eventFixtures.addEvent(makeRandomEvent(activity));

    request(application.httpServer)
      .get('/event/activity/' + activity.activity_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async response => {
        expect(JSON.parse(JSON.stringify(response.body.data)).length).toEqual(3);
        done();
      });
  });

  it('List past events', async done => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const eventFixtures: EventFixtures = new EventFixtures();

    await eventFixtures.addEvent(makeRandomFutureEvent(activity));
    await eventFixtures.addEvent(makeRandomTodayEvent(activity));
    await eventFixtures.addEvent(makeRandomPastEvent(activity));
    await eventFixtures.addEvent(makeRandomPastEvent(activity));

    request(application.httpServer)
      .get('/event/activity/' + activity.activity_id.value + '?time=past')
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async response => {
        expect(JSON.parse(JSON.stringify(response.body.data)).length).toEqual(2);
        done();
      });
  });

  it('List future events', async done => {
    const activity: Activity = makeRandomActivity(makeRandomPartner());
    const eventFixtures: EventFixtures = new EventFixtures();

    await eventFixtures.addEvent(makeRandomTodayEvent(activity));
    await eventFixtures.addEvent(makeRandomTomorrowEvent(activity));
    await eventFixtures.addEvent(makeRandomFutureEvent(activity));
    await eventFixtures.addEvent(makeRandomFutureEvent(activity));
    await eventFixtures.addEvent(makeRandomPastEvent(activity));

    request(application.httpServer)
      .get('/event/activity/' + activity.activity_id.value + '?time=future')
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async response => {
        expect(JSON.parse(JSON.stringify(response.body.data)).length).toEqual(4);
        done();
      });
  });

  it('List events with wrong activity_id format and throw an error', async done => {
    request(application.httpServer)
      .get('/event/activity/' + 'wrong_id')
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(400)
      .then(async response => {
        expect(response.body.errors[0].msg).toEqual('Invalid value');
        done();
      });
  });
});
