import { Event } from '../../../src/Domain/Event';
import { mysqlConnection } from '../../../src/Infrastructure/Mysql/MysqlConnector';

export class EventFixtures {
  async addEvent(event: Event) {
    const connection = await mysqlConnection();
    await connection.execute(
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
    connection.end();
  }

  async getEvent(event_id: string) {
    const connection = await mysqlConnection();
    const [result] = await connection.execute(
      'SELECT event_id, start_date, duration, capacity, current_capacity, activity_id FROM event WHERE event_id = ?',
      [event_id]
    );
    connection.end();

    if (result[0] == undefined) {
      return null;
    }
    return Event.fromPrimitives(result[0]);
  }
}
