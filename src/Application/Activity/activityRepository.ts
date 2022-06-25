import { Ulid } from './../../Domain/Shared/ulid';
import { Activity } from './../../Domain/activity';

export interface ActivityRepository {
  add(activity: Activity): Promise<void>;
  update(activity: Activity): Promise<void>;
  get(activityId: Ulid): Promise<Activity>;
  getByPartnerId(partnerId: Ulid): Promise<Activity[]>;
  delete(activityId: Ulid): Promise<void>;
}
