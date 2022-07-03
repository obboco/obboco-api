import { Ulid } from './Shared/ulid';

export interface GuestPastPrimitives {
  guest_pass_id: string;
  pass_id: string;
  guest_id: string;
  quantity: number;
  current_quantity: number;
  price: number;
  currency: string;
  status: string;
}

export class GuestPass {
  protected constructor(
    readonly guestPassId: Ulid,
    readonly passId: Ulid,
    readonly guestId: Ulid,
    public quantity: number,
    public currentQuantity: number,
    public price: number,
    public currency: string,
    public status: string
  ) {}

  static fromPrimitives(props: GuestPastPrimitives): GuestPass {
    return new GuestPass(
      Ulid.fromPrimitives(props.guest_pass_id),
      Ulid.fromPrimitives(props.pass_id),
      Ulid.fromPrimitives(props.guest_id),
      props.quantity,
      props.current_quantity,
      props.price,
      props.currency,
      props.status
    );
  }

  public toPrimitives(): GuestPastPrimitives {
    return {
      guest_pass_id: this.guestPassId.value,
      pass_id: this.passId.value,
      guest_id: this.guestId.value,
      quantity: this.quantity,
      current_quantity: this.currentQuantity,
      price: this.price,
      currency: this.currency,
      status: this.status
    };
  }
}
