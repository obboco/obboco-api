import { Guest } from './../../Domain/guest';
export interface GuestRepository {
  add(guest: Guest): void;
}
