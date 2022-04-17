import { Activity } from './../../Domain/activity';
import { Ulid } from '../../Domain/Shared/ulid';
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
      ? Ulid.fromPrimitives(primitives.image_id)
      : null;
    return Activity.create({
      activity_id: Ulid.fromPrimitives(primitives.activity_id),
      title: primitives.title,
      description: primitives.description,
      partner_id: Ulid.fromPrimitives(primitives.partner_id),
      image_id: imageId
    });
  }
}
