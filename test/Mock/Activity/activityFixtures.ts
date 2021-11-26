import { Activity } from './../../../src/Domain/activity';
import { Uuid } from './../../../src/Domain/Shared/uuid';
import { mysqlConnection } from '../../../src/Infrastructure/MysqlConnector';
import { ActivityFactory } from '../../../src/Application/Activity/activityFactory';

export class ActivityFixtures {
  async addActivity(activity: Activity) {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO activity(activity_id, title, description, partner_id) VALUES(?, ?, ?, ?)',
      [
        activity.activity_id.value,
        activity.title,
        activity.description,
        activity.partner_id.value
      ]
    );
  }

  async getActivity(activity_id: string) {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT activity_id, title, description, partner_id FROM activity WHERE activity_id = ?',
      [activity_id]
    );
    return ActivityFactory.fromPrimitives(result[0]);
  }
}
