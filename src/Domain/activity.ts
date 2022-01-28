import { Uuid } from './Shared/uuid';

export interface ActivityProps {
  activity_id: Uuid;
  title: string;
  description: string;
  partner_id: Uuid;
  image_id: Uuid | null;
}

export interface NewActivityProps {
  title: string;
  description: string;
  partner_id: Uuid;
  image_id: Uuid | null;
}

export class Activity {
  readonly activity_id: Uuid;
  readonly title: string;
  readonly description: string;
  readonly partner_id: Uuid;
  readonly image_id: Uuid | null;

  protected constructor(props: ActivityProps) {
    this.activity_id = props.activity_id;
    this.title = props.title;
    this.description = props.description;
    this.partner_id = props.partner_id;
    this.image_id = props.image_id;
  }

  static new(props: NewActivityProps): Activity {
    return new Activity({
      activity_id: Uuid.create(),
      title: props.title,
      description: props.description,
      partner_id: props.partner_id,
      image_id: props.image_id
    });
  }

  static create(props: ActivityProps): Activity {
    return new Activity(props);
  }
}
