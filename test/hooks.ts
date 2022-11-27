import {BookingApp} from './../src/BookingApp';

const application = new BookingApp();

beforeAll(async () => {
  await application.start();
});

afterAll(async () => {
  await application.stop();
});

export {application};
