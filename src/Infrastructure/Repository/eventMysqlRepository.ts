import { Event } from './../../Domain/event';
import {
  EventRepository,
  EventRepostitoryFilter
} from './../../Application/Event/eventRepository';
import { mysqlConnection } from './../Mysql/mysqlConnector';
import { Ulid } from '../../Domain/Shared/ulid';

export class EventMysqlRepository implements EventRepository {
  async getByActivityId(activityId: Ulid): Promise<Event[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT event_id, start_date, duration, capacity, current_capacity, activity_id FROM event WHERE activity_id = ? ORDER BY start_date DESC',
      [activityId.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map((event: any) =>
      Event.fromPrimitives(event)
    );
  }

  async add(event: Event): Promise<void> {
    const connection = await mysqlConnection();
    const moment = require('moment');
    connection.execute(
      'INSERT INTO event(event_id, start_date, duration, capacity, current_capacity, activity_id) VALUES(?, ?, ?, ?, ?, ?)',
      [
        event.event_id.value,
        moment(event.start_date).format('YYYY-MM-DD HH:mm:ss'),
        event.duration,
        event.capacity,
        event.current_capacity,
        event.activity_id.value
      ]
    );
  }

  async update(event: Event): Promise<void> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'UPDATE event SET start_date = ?, duration = ?, capacity = ?, current_capacity = ? WHERE event_id = ? LIMIT 1',
      [
        event.start_date,
        event.duration,
        event.capacity,
        event.current_capacity,
        event.event_id.value
      ]
    );
  }

  async get(eventId: Ulid): Promise<Event> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT event_id, start_date, duration, capacity, current_capacity, activity_id FROM event WHERE event_id = ? LIMIT 1',
      [eventId.value]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Event.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }

  async getByFilter(filters: EventRepostitoryFilter): Promise<Event[]> {
    const connection = await mysqlConnection();
    const sqlOptionsMaker = (filters: EventRepostitoryFilter) => {
      if (filters.time === 'past') {
        return {
          query:
            'SELECT event_id, start_date, duration, capacity, current_capacity, activity_id FROM event WHERE activity_id = ? AND start_date < NOW() ORDER BY start_date DESC',
          params: [filters.activityId.value]
        };
      } else {
        return {
          query:
            'SELECT event_id, start_date, duration, capacity, current_capacity, activity_id FROM event WHERE activity_id = ? AND start_date >= NOW() ORDER BY start_date ASC',
          params: [filters.activityId.value]
        };
      }
    };
    const sqlOptions = sqlOptionsMaker(filters);
    const [result, fields] = await connection.execute(
      sqlOptions.query,
      sqlOptions.params
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map((event: any) =>
      Event.fromPrimitives(event)
    );
  }

  async delete(eventId: Ulid): Promise<void> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'DELETE FROM event WHERE event_id = ? LIMIT 1',
      [eventId.value]
    );
  }
}