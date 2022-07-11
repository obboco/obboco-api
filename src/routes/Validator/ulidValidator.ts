import { CustomValidator } from 'express-validator';
import { Ulid } from './../../Domain/Shared/ulid';

export const ulidValidator: CustomValidator = (input: string): boolean => {
  try {
    Ulid.fromPrimitives(input);
    return true;
  } catch (e) {
    return false;
  }
};
