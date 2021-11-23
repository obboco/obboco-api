import { Activity } from './../../Domain/activity';

export interface ActivityRepository {
  add(Activity: Activity): void;
}
