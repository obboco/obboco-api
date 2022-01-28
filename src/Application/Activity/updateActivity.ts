import { Uuid } from '../../Domain/Shared/uuid';
import { Activity } from '../../Domain/activity';
import { Request } from 'express';
import { ActivityRepository } from './activityRepository';

export class UpdateActivity {
  activityRepository: ActivityRepository;

  constructor(activityRepository: ActivityRepository) {
    this.activityRepository = activityRepository;
  }

  async make(request: Request): Promise<void> {
    const activity: Activity = await this.activityRepository.get(
      Uuid.fromPrimitives(request.body.activity_id)
    );
    const UpdateActivity: Activity = Activity.create({
      activity_id: activity.activity_id,
      title: request.body.title,
      description: request.body.description,
      partner_id: activity.partner_id,
      image_id: null
    });
    this.activityRepository.update(UpdateActivity);
  }
}
