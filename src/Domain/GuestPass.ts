import { Ulid } from './Shared/Ulid';

export interface GuestPassPrimitives {
  guest_pass_id: string;
  pass_id: string;
  guest_id: string;
  partner_id: string;
  title: string;
  quantity: number;
  current_quantity: number;
  price: number;
  currency: string;
  status: string;
  created_date?: string;
}

export class GuestPass {
  protected constructor(
    readonly guestPassId: Ulid,
    readonly passId: Ulid,
    readonly guestId: Ulid,
    readonly partnerId: Ulid,
    public title: string,
    public quantity: number,
    public currentQuantity: number,
    public price: number,
    public currency: string,
    public status: string,
    public createdDate: string
  ) {}

  static fromPrimitives(props: GuestPassPrimitives): GuestPass {
    return new GuestPass(
      Ulid.fromPrimitives(props.guest_pass_id),
      Ulid.fromPrimitives(props.pass_id),
      Ulid.fromPrimitives(props.guest_id),
      Ulid.fromPrimitives(props.partner_id),
      props.title,
      props.quantity,
      props.current_quantity,
      props.price,
      props.currency,
      props.status,
      props.created_date
    );
  }

  public toPrimitives(): GuestPassPrimitives {
    return {
      guest_pass_id: this.guestPassId.value,
      pass_id: this.passId.value,
      guest_id: this.guestId.value,
      partner_id: this.partnerId.value,
      title: this.title,
      quantity: this.quantity,
      current_quantity: this.currentQuantity,
      price: this.price,
      currency: this.currency,
      status: this.status,
      created_date: this.createdDate
    };
  }

  incrementQuantity(): void {
    this.currentQuantity += 1;
  }
}
