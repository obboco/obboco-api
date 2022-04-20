import { Activity } from './../../../src/Domain/activity';
import { Ulid } from './../../../src/Domain/Shared/ulid';
import { mysqlConnection } from '../../../src/Infrastructure/Mysql/MysqlConnector';

export class ActivityFixtures {
  async addActivity(activity: Activity) {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO activity(activity_id, title, description, partner_id, image_id) VALUES(?, ?, ?, ?, ?)',
      [
        activity.activity_id.value,
        activity.title,
        activity.description,
        activity.partner_id.value,
        activity.image_id ? activity.image_id.value : null
      ]
    );
  }

  async getActivity(activity_id: string) {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT activity_id, title, description, partner_id, image_id FROM activity WHERE activity_id = ?',
      [activity_id]
    );
    return Activity.fromPrimitives(result[0]);
  }
}
