import { Uuid } from '../../Domain/Shared/uuid';
import { Activity } from '../../Domain/activity';
import { ActivityRepository } from './activityRepository';

export class GetActivity {
  activityRepository: ActivityRepository;

  constructor(activityRepository: ActivityRepository) {
    this.activityRepository = activityRepository;
  }

  async make(activity_id: string): Promise<Activity> {
    const activityId: Uuid = Uuid.fromPrimitives(activity_id);
    return this.activityRepository.get(activityId);
  }
}
