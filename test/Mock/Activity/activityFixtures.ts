import { Uuid } from './../../../src/Domain/Shared/uuid';
import { mysqlConnection } from '../../../src/Infrastructure/MysqlConnector';
import { ActivityFactory } from '../../../src/Application/Activity/activityFactory';

export class ActivityFixtures {
  /*async addPartner(partner: Partner) {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO partners(partner_id, email) VALUES(? , ?)',
      [partner.partner_id.value, partner.email]
    );
  }*/

  async getActivity(activity_id: string) {
    const connection = await mysqlConnection();
    const [result, fields] = await connection.execute(
      'SELECT activity_id, title, description, partner_id FROM activity WHERE activity_id = ?',
      [activity_id]
    );
    return ActivityFactory.fromPrimitives(result[0]);
  }
}
