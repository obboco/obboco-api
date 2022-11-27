import {Event} from '../../../src/Domain/Event';
import {execute} from '../../../src/Infrastructure/Mysql/MysqlHandler';

export class EventFixtures {
  async addEvent(event: Event) {
    await execute(
      'INSERT INTO event(event_id, start_date, duration, capacity, current_capacity, activity_id) VALUES(?, ?, ?, ?, ?, ?)',
      [
        event.event_id.value,
        event.start_date,
        event.duration,
        event.capacity,
        event.current_capacity,
        event.activity_id.value,
      ]
    );
  }

  async getEvent(event_id: string) {
    const result: any = await execute(
      'SELECT event_id, start_date, duration, capacity, current_capacity, activity_id FROM event WHERE event_id = ?',
      [event_id]
    );

    if (result[0] == undefined) {
      return null;
    }
    return Event.fromPrimitives(result[0]);
  }
}
