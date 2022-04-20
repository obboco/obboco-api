import { Ulid } from './Shared/ulid';

export interface ActivityPrimitives {
  activity_id: string;
  title: string;
  description: string;
  partner_id: string;
  image_id: string | null;
}

export class Activity {
  protected constructor(
    readonly activity_id: Ulid,
    readonly title: string,
    readonly description: string,
    readonly partner_id: Ulid,
    readonly image_id: Ulid | null
  ) {}

  static fromPrimitives(props: ActivityPrimitives): Activity {
    return new Activity(
      Ulid.fromPrimitives(props.activity_id),
      props.title,
      props.description,
      Ulid.fromPrimitives(props.partner_id),
      props.image_id ? Ulid.fromPrimitives(props.image_id) : null
    );
  }

  toPrimitives(): ActivityPrimitives {
    return {
      activity_id: this.activity_id.value,
      title: this.title,
      description: this.description,
      partner_id: this.partner_id.value,
      image_id: this.image_id ? this.image_id.value : null
    };
  }
}
