import { Activity } from '../../Domain/activity';
import { ActivityRepository } from '../../Application/Activity/activityRepository';
import { mysqlConnection } from '../Mysql/MysqlConnector';
import { Ulid } from '../../Domain/Shared/ulid';

export class ActivityMysqlRepository implements ActivityRepository {
  async add(activity: Activity): Promise<void> {
    const connection = await mysqlConnection();
    await connection.query(
      'INSERT INTO activity(activity_id, title, description, price, currency, location, partner_id, image_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
      [
        activity.activity_id.value,
        activity.title,
        activity.description,
        activity.price,
        activity.currency,
        activity.location,
        activity.partner_id.value,
        activity.image_id ? activity.image_id.value : null
      ]
    );
    connection.end();
  }

  async update(activity: Activity): Promise<void> {
    const connection = await mysqlConnection();
    await connection.execute(
      'UPDATE activity SET title = ?, description = ?, price = ?, currency = ?, location = ?, image_id = ? WHERE activity_id = ?',
      [
        activity.title,
        activity.description,
        activity.price,
        activity.currency,
        activity.location ? activity.location : null,
        activity.image_id ? activity.image_id.value : null,
        activity.activity_id.value
      ]
    );
    connection.end();
  }

  async get(activityId: Ulid): Promise<Activity> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT activity_id, title, description, price, currency, location, partner_id, image_id FROM activity WHERE activity_id = ?',
      [activityId.value]
    );
    connection.end();

    if (result[0] == undefined) {
      return null;
    }

    return Activity.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }

  async getByPartnerId(partner_id: Ulid): Promise<Activity[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT activity_id, title, description, price, currency, location, partner_id, image_id FROM activity WHERE partner_id = ? ORDER BY created_at ASC',
      [partner_id.value]
    );
    connection.end();

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (activity: any) => Activity.fromPrimitives(activity)
    );
  }

  async delete(activityId: Ulid): Promise<void> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'DELETE FROM activity WHERE activity_id = ? LIMIT 1',
      [activityId.value]
    );
    connection.end();
  }
}
