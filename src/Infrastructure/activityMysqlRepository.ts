import { ActivityFactory } from '../Application/Activity/activityFactory';
import { Activity } from '../Domain/activity';
import { ActivityRepository } from '../Application/Activity/activityRepository';
import { mysqlConnection } from './mysqlConnector';
import { Uuid } from '../Domain/Shared/uuid';

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

  async get(activityId: Uuid): Promise<Activity> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT activity_id, title, description, partner_id FROM activity WHERE activity_id = ?',
      [activityId.value]
    );

    if (result[0] == undefined) {
      return null;
    }

    return ActivityFactory.fromPrimitives(
      JSON.parse(JSON.stringify(result[0]))
    );
  }

  async getByPartnerId(partner_id: Uuid): Promise<Activity[]> {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT activity_id, title, description, partner_id FROM activity WHERE partner_id = ?',
      [partner_id.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (activity: any) => ActivityFactory.fromPrimitives(activity)
    );
  }
}
