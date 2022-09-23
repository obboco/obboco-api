import { Ulid } from '../../Domain/Shared/Ulid';
import { Activity } from '../../Domain/Activity';

export interface ActivityRepository {
  add(activity: Activity): Promise<void>;
  update(activity: Activity): Promise<void>;
  delete(activityId: Ulid): Promise<void>;
  get(activityId: Ulid): Promise<Activity>;
  getByPartnerId(partnerId: Ulid): Promise<Activity[]>;
}
