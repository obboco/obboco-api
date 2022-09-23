import { Ulid } from '../../Domain/Shared/Ulid';
import { Activity } from '../../Domain/Activity';
import { ActivityRepository } from './ActivityRepository';

interface CreateActivityCommand {
  activity_id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string | null;
  partner_id: string;
  image_id: string | null;
}

export class CreateActivity {
  activityRepository: ActivityRepository;

  constructor(activityRepository: ActivityRepository) {
    this.activityRepository = activityRepository;
  }

  make(command: CreateActivityCommand): Ulid {
    const activity: Activity = Activity.fromPrimitives({
      activity_id: command.activity_id,
      title: command.title,
      description: command.description,
      price: command.price,
      currency: command.currency,
      location: command.location,
      partner_id: command.partner_id,
      image_id: command.image_id
    });
    this.activityRepository.add(activity);
    return activity.activity_id;
  }
}
