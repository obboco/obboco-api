import { Activity } from './../Domain/activity';
import { ActivityRepository } from './../Application/Activity/activityRepository';
import { mysqlConnection } from './MysqlConnector';

export class ActivityMysqlRepository implements ActivityRepository {
  async add(activity: Activity): Promise<void> {
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
}
