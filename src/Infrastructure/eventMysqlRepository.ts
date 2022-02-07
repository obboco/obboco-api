import { Event } from './../Domain/event';
import { EventRepository } from './../Application/Event/eventRepository';
import { mysqlConnection } from './mysqlConnector';
import { Uuid } from '../Domain/Shared/uuid';
import { EventFactory } from '../Application/Event/eventFactory';

export class EventMysqlRepository implements EventRepository {
  async getByActivityId(activityId: Uuid): Promise<Event[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT event_id, start_date, duration, capacity, current_capacity, activity_id FROM event WHERE activity_id = ? ORDER BY start_date DESC',
      [activityId.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map((event: any) =>
      EventFactory.fromPrimitives(event)
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

  async get(eventId: Uuid): Promise<Event> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT event_id, start_date, duration, capacity, current_capacity, activity_id FROM event WHERE event_id = ? LIMIT 1',
      [eventId.value]
    );

    return EventFactory.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }

  async delete(eventId: Uuid): Promise<void> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'DELETE FROM event WHERE event_id = ? LIMIT 1',
      [eventId.value]
    );
  }
}
