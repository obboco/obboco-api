import { Ulid } from './../../Domain/Shared/ulid';
import { Activity } from './../../Domain/activity';
import { Request } from 'express';
import { ActivityRepository } from './activityRepository';

interface CreateActivityCommand {
  activity_id: string;
  title: string;
  description: string;
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
      partner_id: command.partner_id,
      image_id: command.image_id
    });
    this.activityRepository.add(activity);
    return activity.activity_id;
  }
}
