import { Ulid } from '../../Domain/Shared/ulid';
import { Activity } from '../../Domain/activity';
import { Request } from 'express';
import { ActivityRepository } from './activityRepository';

interface UpdateActivityCommand {
  activity_id: string;
  title: string;
  description: string;
  partner_id: string;
  image_id: string | null;
}

export class UpdateActivity {
  constructor(private activityRepository: ActivityRepository) {}

  async make(command: UpdateActivityCommand): Promise<void> {
    const activity: Activity = await this.activityRepository.get(
      Ulid.fromPrimitives(command.activity_id)
    );
    const UpdateActivity: Activity = Activity.fromPrimitives({
      activity_id: activity.activity_id.value,
      title: command.title,
      description: command.description,
      partner_id: activity.partner_id.value,
      image_id: command.image_id
    });
    this.activityRepository.update(UpdateActivity);
  }
}
