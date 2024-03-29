import {Activity} from '../../../src/Domain/Activity';
import {execute} from '../../../src/Infrastructure/Mysql/MysqlHandler';

export class ActivityFixtures {
  async addActivity(activity: Activity) {
    await execute(
      'INSERT INTO activity(activity_id, title, description, price, currency, location, partner_id, image_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
      [
        activity.activity_id.value,
        activity.title,
        activity.description,
        activity.price,
        activity.currency,
        activity.location ? activity.location : null,
        activity.partner_id.value,
        activity.image_id ? activity.image_id.value : null,
      ]
    );
  }

  async getActivity(activity_id: string): Promise<Activity | null> {
    const result: any = await execute(
      'SELECT activity_id, title, description, price, currency, location, partner_id, image_id FROM activity WHERE activity_id = ?',
      [activity_id]
    );

    if (result[0] == undefined) {
      return null;
    }
    return Activity.fromPrimitives(result[0]);
  }
}
