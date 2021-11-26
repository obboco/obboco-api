import { Uuid } from './../../Domain/Shared/uuid';
import { Activity } from './../../Domain/activity';

export interface ActivityRepository {
  add(activity: Activity): Promise<void>;
  getByPartnerId(partnerId: Uuid): Promise<Activity[]>;
}
