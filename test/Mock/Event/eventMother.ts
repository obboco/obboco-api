import { Event } from './../../../src/Domain/event';
import { Activity } from '../../../src/Domain/activity';
import faker from 'faker';

export const makeRandomEvent = (activity: Activity): Event => {
  return Event.new({
    start_date: new Date('2022-05-15 06:39:09'),
    duration: faker.datatype.number(),
    capacity: faker.datatype.number(),
    activity_id: activity.activity_id
  });
};
