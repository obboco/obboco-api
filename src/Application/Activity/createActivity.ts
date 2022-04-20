import { Ulid } from './../../Domain/Shared/ulid';
import { Activity } from './../../Domain/activity';
import { Request } from 'express';
import { ActivityRepository } from './activityRepository';

export class CreateActivity {
  activityRepository: ActivityRepository;

  constructor(activityRepository: ActivityRepository) {
    this.activityRepository = activityRepository;
  }

  make(request: Request): Ulid {
    const activity: Activity = Activity.fromPrimitives({
      activity_id: request.body.activity_id,
      title: request.body.title,
      description: request.body.description,
      partner_id: request.body.partner_id,
      image_id: request.body.image_id ? request.body.image_id : null
    });
    this.activityRepository.add(activity);
    return activity.activity_id;
  }
}
