import { Ulid } from '../../Domain/Shared/Ulid';
import { Activity } from '../../Domain/Activity';
import { ActivityRepository } from './ActivityRepository';

export class ListActivity {
  activityRepository: ActivityRepository;

  constructor(activityRepository: ActivityRepository) {
    this.activityRepository = activityRepository;
  }

  async make(userId: string): Promise<Array<Activity>> {
    const user_id = Ulid.fromPrimitives(userId);
    return this.activityRepository.getByPartnerId(user_id);
  }
}
