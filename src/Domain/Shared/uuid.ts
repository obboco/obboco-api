import { v4 as uuidv4, validate } from "uuid";

export class Uuid {
  readonly value: string;

  protected constructor(value: string) {
    if (!validate(value)) {
      throw new Error("Invalid uuid");
    }
    this.value = value;
  }

  static create(): Uuid {
    return new Uuid(uuidv4());
  }

  static fromPrimitives(value: string): Uuid {
    return new Uuid(value);
  }
}
