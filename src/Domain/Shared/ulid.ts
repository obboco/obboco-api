import { ulid } from 'ulid';

export class Ulid {
  private pattern = /[0-9A-HJKMNP-TV-Z]{26}/;

  protected constructor(readonly value: string) {
    if (!this.pattern.test(value)) {
      throw new Error('Invalid ulid:' + value);
    }
  }

  static create(): Ulid {
    return new Ulid(ulid());
  }

  static fromPrimitives(value: string): Ulid {
    return new Ulid(value);
  }
}
