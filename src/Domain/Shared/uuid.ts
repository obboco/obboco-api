import { v4 as uuidv4, validate } from 'uuid';

export class Uuid {
  protected constructor(readonly value: string) {
    if (!validate(value)) {
      throw new Error('Invalid uuid:' + value);
    }
  }

  static create(): Uuid {
    return new Uuid(uuidv4());
  }

  static fromPrimitives(value: string): Uuid {
    return new Uuid(value);
  }
}
