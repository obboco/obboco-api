import { Ulid } from '../../../src/Domain/Shared/Ulid';
import { Event } from '../../../src/Domain/Event';
import { Activity } from '../../../src/Domain/Activity';
import faker from 'faker';

export const makeRandomEvent = (activity: Activity): Event => {
  return Event.fromPrimitives({
    event_id: Ulid.create().value,
    start_date: new Date('2022-05-15 06:39:09').toISOString(),
    duration: faker.datatype.number(2000),
    capacity: faker.datatype.number(2000),
    current_capacity: 0,
    activity_id: activity.activity_id.value
  });
};

export const makeRandomIsolatedEvent = (): Event => {
  return Event.fromPrimitives({
    event_id: Ulid.create().value,
    start_date: new Date('2022-05-15 06:39:09').toISOString(),
    duration: faker.datatype.number(2000),
    capacity: faker.datatype.number(2000),
    current_capacity: 0,
    activity_id: Ulid.create().value
  });
};

export const makeRandomEventWithSomeCapacity = (): Event => {
  return Event.fromPrimitives({
    event_id: Ulid.create().value,
    start_date: new Date('2022-05-15 06:39:09').toISOString(),
    duration: faker.datatype.number(2000),
    capacity: faker.datatype.number(2000),
    current_capacity: 5,
    activity_id: Ulid.create().value
  });
};

export const makeRandomPastEvent = (activity: Activity): Event => {
  const date = new Date();
  date.setDate(date.getDate() - 14);
  return Event.fromPrimitives({
    event_id: Ulid.create().value,
    start_date: date.toISOString(),
    duration: faker.datatype.number(2000),
    capacity: faker.datatype.number(2000),
    current_capacity: faker.datatype.number(2000),
    activity_id: activity.activity_id.value
  });
};

export const makeRandomFutureEvent = (activity: Activity): Event => {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return Event.fromPrimitives({
    event_id: Ulid.create().value,
    start_date: date.toISOString(),
    duration: faker.datatype.number(2000),
    capacity: faker.datatype.number(2000),
    current_capacity: faker.datatype.number(2000),
    activity_id: activity.activity_id.value
  });
};

export const makeRandomTodayEvent = (activity: Activity): Event => {
  const today = new Date();
  today.setHours(today.getHours() + 4);

  return Event.fromPrimitives({
    event_id: Ulid.create().value,
    start_date: today.toISOString(),
    duration: faker.datatype.number(2000),
    capacity: faker.datatype.number(2000),
    current_capacity: faker.datatype.number(2000),
    activity_id: activity.activity_id.value
  });
};

export const makeRandomTomorrowEvent = (activity: Activity): Event => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return Event.fromPrimitives({
    event_id: Ulid.create().value,
    start_date: date.toISOString(),
    duration: faker.datatype.number(2000),
    capacity: faker.datatype.number(2000),
    current_capacity: faker.datatype.number(2000),
    activity_id: activity.activity_id.value
  });
};
