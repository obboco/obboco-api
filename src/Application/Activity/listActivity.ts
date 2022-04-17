import { Ulid } from '../../Domain/Shared/ulid';
import { Activity } from '../../Domain/activity';
import { Request } from 'express';
import { ActivityRepository } from './activityRepository';

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
