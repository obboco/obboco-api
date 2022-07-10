import { Ulid } from './../../../src/Domain/Shared/ulid';
import { GuestPass } from './../../../src/Domain/guestPass';
import faker from 'faker';

export const makeRandomGuestPass = (guestId: Ulid, passId: Ulid): GuestPass => {
  return GuestPass.fromPrimitives({
    guest_pass_id: Ulid.create().value,
    guest_id: guestId.value,
    pass_id: passId.value,
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
  passId: Ulid
): GuestPass => {
  return GuestPass.fromPrimitives({
    guest_pass_id: Ulid.create().value,
    guest_id: guestId.value,
    pass_id: passId.value,
    title: faker.lorem.word(),
    quantity: faker.datatype.number(2000),
    current_quantity: 0,
    price: faker.datatype.number(2000),
    currency: faker.random.word(),
    status: 'booked'
  });
};
