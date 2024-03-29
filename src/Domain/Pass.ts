import { Ulid } from './Shared/Ulid';

export interface PassPrimitives {
  pass_id: string;
  partner_id: string;
  title: string;
  description: string | null;
  quantity: number;
  price: number;
  currency: string;
}

export class Pass {
  protected constructor(
    readonly pass_id: Ulid,
    readonly partner_id: Ulid,
    public title: string,
    public description: string | null,
    public quantity: number,
    public price: number,
    public currency: string
  ) {}

  static fromPrimitives(props: PassPrimitives): Pass {
    return new Pass(
      Ulid.fromPrimitives(props.pass_id),
      Ulid.fromPrimitives(props.partner_id),
      props.title,
      props.description,
      props.quantity,
      props.price,
      props.currency
    );
  }

  public toPrimitives(): PassPrimitives {
    return {
      pass_id: this.pass_id.value,
      partner_id: this.partner_id.value,
      title: this.title,
      description: this.description,
      quantity: this.quantity,
      price: this.price,
      currency: this.currency
    };
  }
}
