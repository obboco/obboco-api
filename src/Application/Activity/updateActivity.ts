import { Ulid } from '../../Domain/Shared/Ulid';
import { Activity } from '../../Domain/Activity';
import { ActivityRepository } from './ActivityRepository';

interface UpdateActivityCommand {
  activity_id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string | null;
  partner_id: string;
  image_id: string | null;
}

export class UpdateActivity {
  constructor(private activityRepository: ActivityRepository) {}

  async make(command: UpdateActivityCommand): Promise<void> {
    const activity: Activity = await this.activityRepository.get(
      Ulid.fromPrimitives(command.activity_id)
    );
    const updatedActivity: Activity = Activity.fromPrimitives({
      activity_id: activity.activity_id.value,
      title: command.title,
      description: command.description,
      price: command.price,
      currency: command.currency,
      location: command.location,
      partner_id: activity.partner_id.value,
      image_id: command.image_id
    });
    this.activityRepository.update(updatedActivity);
  }
}
