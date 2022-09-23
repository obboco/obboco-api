import { EventFixtures } from '../../Mock/Event/eventFixtures';
import { makeRandomActivityWhithoutOptionalParameters } from '../../Mock/Activity/activityMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { ActivityFixtures } from '../../Mock/Activity/activityFixtures';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';
import { makeRandomEvent } from '../../Mock/Event/eventMother';

let application: BookingApp;

describe('Delete activity', () => {
  it('Delete activity without events correctly', async (done) => {
    const activityFixtures = new ActivityFixtures();

    const randomPartner = makeRandomPartner();
    const randomActivity =
      makeRandomActivityWhithoutOptionalParameters(randomPartner);
    await activityFixtures.addActivity(randomActivity);

    request(application.httpServer)
      .delete('/activity/' + randomActivity.activity_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        expect(
          await activityFixtures.getActivity(randomActivity.activity_id.value)
        ).toBeNull();
        done();
      });
  });

  it('Cannot delete activity with events', async (done) => {
    const activityFixtures = new ActivityFixtures();

    const randomPartner = makeRandomPartner();
    const randomActivity =
      makeRandomActivityWhithoutOptionalParameters(randomPartner);
    await activityFixtures.addActivity(randomActivity);

    const randomEvent = makeRandomEvent(randomActivity);
    const eventFixtures: EventFixtures = new EventFixtures();
    await eventFixtures.addEvent(randomEvent);

    request(application.httpServer)
      .delete('/activity/' + randomActivity.activity_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(400)
      .then(async (response) => {
        expect(response.body.errors[0].msg).toEqual(
          'Cannot delete an activity with events'
        );
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
