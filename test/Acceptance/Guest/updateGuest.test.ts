import { GuestFixtures } from '../../Mock/Guest/guestFixtures';
import { Guest } from '../../../src/Domain/guest';
import { makeRandomGuest } from '../../Mock/Guest/guestMother';
import { makeRandomPartner } from '../../Mock/Partner/partnerMother';
import { BookingApp } from '../../../src/BookingApp';
import request from 'supertest';
import faker from 'faker';

let application: BookingApp;

describe('Update guest', () => {
  it('Update guest correctly', async (done) => {
    const guestFixtures = new GuestFixtures();

    const randomPartner = makeRandomPartner();
    const randomGuest = makeRandomGuest(randomPartner.partner_id);
    await guestFixtures.add(randomGuest);

    const randomFirstName = faker.name.firstName();
    const randomLastName = faker.name.lastName();
    const randomEmail = faker.internet.email();
    const randomPhone = faker.phone.phoneNumber();
    request(application.httpServer)
      .put('/guest')
      .set('accept', 'application/json')
      .type('json')
      .send({
        guest_id: randomGuest.guest_id.value,
        first_name: randomFirstName,
        last_name: randomLastName,
        email: randomEmail,
        phone: randomPhone
      })
      .expect(200)
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        guestFixtures
          .getGuest(randomGuest.guest_id.value)
          .then((guest: Guest) => {
            expect(randomFirstName).toEqual(guest.first_name);
            expect(randomLastName).toEqual(guest.last_name);
            expect(randomEmail).toEqual(guest.email);
            expect(randomPhone).toEqual(guest.phone);
            done();
          });
      });
  });
});

beforeAll(async () => {
  application = new BookingApp();
  await application.start();
});

afterAll(async () => {
  await application.stop();
});
