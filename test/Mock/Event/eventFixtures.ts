import { EventFactory } from './../../../src/Application/Event/eventFactory';
import { Event } from './../../../src/Domain/event';
import { mysqlConnection } from '../../../src/Infrastructure/mysqlConnector';

export class EventFixtures {
  async addEvent(event: Event) {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO event(event_id, start_date, duration, capacity, current_capacity, activity_id) VALUES(?, ?, ?, ?, ?, ?)',
      [
        event.event_id.value,
        event.start_date,
        event.duration,
        event.capacity,
        event.current_capacity,
        event.activity_id.value
      ]
    );
  }

  async getEvent(event_id: string) {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT event_id, start_date, duration, capacity, current_capacity, activity_id FROM event WHERE event_id = ?',
      [event_id]
    );
    return EventFactory.fromPrimitives(result[0]);
  }
}
