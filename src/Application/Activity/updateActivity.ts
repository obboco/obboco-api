import { Ulid } from '../../Domain/Shared/ulid';
import { Activity } from '../../Domain/activity';
import { Request } from 'express';
import { ActivityRepository } from './activityRepository';

export class UpdateActivity {
  constructor(private activityRepository: ActivityRepository) {}

  async make(request: Request): Promise<void> {
    const activity: Activity = await this.activityRepository.get(
      Ulid.fromPrimitives(request.body.activity_id)
    );
    const UpdateActivity: Activity = Activity.create({
      activity_id: activity.activity_id,
      title: request.body.title,
      description: request.body.description,
      partner_id: activity.partner_id,
      image_id: request.body.image_id
        ? Ulid.fromPrimitives(request.body.image_id)
        : null
    });
    this.activityRepository.update(UpdateActivity);
  }
}
