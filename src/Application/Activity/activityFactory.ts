import { Activity } from './../../Domain/activity';
import { Uuid } from '../../Domain/Shared/uuid';
interface ActivityPrimitives {
  activity_id: string;
  title: string;
  description: string;
  partner_id: string;
}

export class ActivityFactory {
  static fromPrimitives(primitives: ActivityPrimitives): Activity {
    return Activity.create({
      activity_id: Uuid.fromPrimitives(primitives.activity_id),
      title: primitives.title,
      description: primitives.description,
      partner_id: Uuid.fromPrimitives(primitives.partner_id)
    });
  }
}
