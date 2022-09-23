import { Ulid } from '../../../src/Domain/Shared/Ulid';
import { GuestPass, GuestPassPrimitives } from '../../../src/Domain/GuestPass';
import faker from 'faker';

export const makeRandomGuestPass = (
  guestId: Ulid,
  passId: Ulid,
  partnerId: Ulid
): GuestPass => {
  return GuestPass.fromPrimitives({
    guest_pass_id: Ulid.create().value,
    guest_id: guestId.value,
    pass_id: passId.value,
    partner_id: partnerId.value,
    title: faker.lorem.word(),
    quantity: faker.datatype.number(2000),
    current_quantity: faker.datatype.number(2000),
    price: faker.datatype.number(2000),
    currency: faker.random.word(),
    status: 'booked'
  });
};

export const makeRandomNewGuestPass = (
  guestId: Ulid,
  passId: Ulid,
  partnerId: Ulid
): GuestPass => {
  return GuestPass.fromPrimitives({
    guest_pass_id: Ulid.create().value,
    guest_id: guestId.value,
    pass_id: passId.value,
    partner_id: partnerId.value,
    title: faker.lorem.word(),
    quantity: faker.datatype.number(2000),
    current_quantity: 0,
    price: faker.datatype.number(2000),
    currency: faker.random.word(),
    status: 'booked'
  });
};

export const makeCustomGuestPassPrimitives = (
  guestId: Ulid,
  passId: Ulid,
  partnerId: Ulid
): GuestPassPrimitives => {
  return {
    guest_pass_id: Ulid.create().value,
    guest_id: guestId.value,
    pass_id: passId.value,
    partner_id: partnerId.value,
    title: faker.lorem.word(),
    quantity: faker.datatype.number(2000),
    current_quantity: 0,
    price: faker.datatype.number(2000),
    currency: faker.random.word(),
    status: 'booked'
  };
};

export const makeCustomGuestPass = (guestPassPrimitives): GuestPass => {
  return GuestPass.fromPrimitives(guestPassPrimitives);
};
