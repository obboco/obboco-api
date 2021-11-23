import { Uuid } from './../../Domain/Shared/uuid';
import { Activity } from './../../Domain/activity';
import { Partner } from '../../Domain/partner';
import { Request } from 'express';
import { ActivityRepository } from './activityRepository';

export class CreateActivity {
  activityRepository: ActivityRepository;

  constructor(activityRepository: ActivityRepository) {
    this.activityRepository = activityRepository;
  }

  make(request: Request): Uuid {
    const activity: Activity = Activity.new({
      title: request.body.title,
      description: request.body.description,
      partner_id: Uuid.fromPrimitives(request.body.partner_id)
    });
    this.activityRepository.add(activity);
    return activity.activity_id;
  }
}
