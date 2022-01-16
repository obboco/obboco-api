import { Uuid } from './../../Domain/Shared/uuid';
import { Activity } from './../../Domain/activity';

export interface ActivityRepository {
  add(activity: Activity): Promise<void>;
  update(activity: Activity): Promise<void>;
  get(activityId: Uuid): Promise<Activity>;
  getByPartnerId(partnerId: Uuid): Promise<Activity[]>;
}
