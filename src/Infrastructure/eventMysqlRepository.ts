import { Event } from './../Domain/event';
import { EventRepository } from './../Application/Event/eventRepository';
import { mysqlConnection } from './mysqlConnector';

export class EventMysqlRepository implements EventRepository {
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
}
