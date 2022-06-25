import { EventRepository } from './../Event/eventRepository';
import { Ulid } from '../../Domain/Shared/ulid';
import { Activity } from '../../Domain/activity';
import { Request } from 'express';
import { ActivityRepository } from './activityRepository';

interface DeleteActivityCommand {
  activity_id: string;
}

export class DeleteActivity {
  constructor(
    private activityRepository: ActivityRepository,
    private eventRepository: EventRepository
  ) {}

  async make(command: DeleteActivityCommand): Promise<void> {
    const activityId: Ulid = Ulid.fromPrimitives(command.activity_id);

    await this.eventRepository.getByActivityId(activityId).then((events) => {
      if (events.length > 0) {
        throw new Error('Cannot delete an activity with events');
      }
    });

    this.activityRepository.delete(activityId);
  }
}
