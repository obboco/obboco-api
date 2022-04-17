import { Ulid } from '../../Domain/Shared/ulid';
import { Activity } from '../../Domain/activity';
import { ActivityRepository } from './activityRepository';

export class GetActivity {
  constructor(private activityRepository: ActivityRepository) {}

  async make(activity_id: string): Promise<Activity> {
    const activityId: Ulid = Ulid.fromPrimitives(activity_id);
    return this.activityRepository.get(activityId);
  }
}
