import { Activity } from './../../Domain/activity';
import { Uuid } from '../../Domain/Shared/uuid';
interface ActivityPrimitives {
  activity_id: string;
  title: string;
  description: string;
  partner_id: string;
  image_id: string | null;
}

export class ActivityFactory {
  static fromPrimitives(primitives: ActivityPrimitives): Activity {
    const imageId = primitives.image_id
      ? Uuid.fromPrimitives(primitives.image_id)
      : null;
    return Activity.create({
      activity_id: Uuid.fromPrimitives(primitives.activity_id),
      title: primitives.title,
      description: primitives.description,
      partner_id: Uuid.fromPrimitives(primitives.partner_id),
      image_id: imageId
    });
  }
}
