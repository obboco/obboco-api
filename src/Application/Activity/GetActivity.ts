import { Ulid } from '../../Domain/Shared/Ulid';
import { Activity } from '../../Domain/Activity';
import { ActivityRepository } from './ActivityRepository';

export class GetActivity {
  constructor(private activityRepository: ActivityRepository) {}

  async make(activity_id: string): Promise<Activity> {
    const activityId: Ulid = Ulid.fromPrimitives(activity_id);
    return this.activityRepository.get(activityId);
  }
}
