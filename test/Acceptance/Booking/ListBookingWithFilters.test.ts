import {BookingPrimitives} from '../../../src/Domain/Booking';
import {
  makeCustomBookingPrimitives,
  makeCustomBooking,
} from '../../Mock/Booking/bookingSessionMother';
import {Partner} from '../../../src/Domain/Partner';
import {Event} from '../../../src/Domain/Event';
import {makeRandomPartner} from '../../Mock/Partner/partnerMother';
import {makeRandomActivity} from '../../Mock/Activity/activityMother';
import {makeRandomEvent} from '../../Mock/Event/eventMother';
import {makeRandomBooking} from '../../Mock/Booking/bookingSessionMother';
import request from 'supertest';
import {BookingFixtures} from '../../Mock/Booking/bookingFixtures';
import {application} from '../../hooks';

describe('List booking with filters', () => {
  it('Get bookings by partner correctly', async done => {
    const partner: Partner = makeRandomPartner();
    const event: Event = makeRandomEvent(makeRandomActivity(partner));

    const bookingFixtures = new BookingFixtures();
    await bookingFixtures.addBooking(makeRandomBooking(event, partner));
    await bookingFixtures.addBooking(makeRandomBooking(event, partner));
    await bookingFixtures.addBooking(makeRandomBooking(event, partner));

    request(application.httpServer)
      .get('/bookings?partner=' + partner.partner_id.value)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async response => {
        await new Promise(resolve => setTimeout(resolve, 500));
        expect(JSON.parse(JSON.stringify(response.body.data)).length).toEqual(3);
        done();
      });
  });

  it('Get bookings by partner and date correctly', async done => {
    const partner: Partner = makeRandomPartner();

    let customBooking: BookingPrimitives = makeCustomBookingPrimitives();
    const bookingFixtures = new BookingFixtures();
    customBooking.partner_id = partner.partner_id.value;
    customBooking.start_date = '2020-05-01';
    await bookingFixtures.addBooking(makeCustomBooking(customBooking));
    await bookingFixtures.addBooking(makeCustomBooking(customBooking));

    customBooking.start_date = '2021-01-02';
    await bookingFixtures.addBooking(makeCustomBooking(customBooking));

    request(application.httpServer)
      .get(
        `/bookings?partner=${partner.partner_id.value}&start_date=2020-02-01&end_date=2020-12-02`
      )
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async response => {
        await new Promise(resolve => setTimeout(resolve, 500));
        expect(JSON.parse(JSON.stringify(response.body.data)).length).toEqual(2);
        done();
      });
  });

  it('Get bookings by partner and status correctly', async done => {
    const partner: Partner = makeRandomPartner();

    let customBooking: BookingPrimitives = makeCustomBookingPrimitives();
    const bookingFixtures = new BookingFixtures();
    customBooking.partner_id = partner.partner_id.value;
    await bookingFixtures.addBooking(makeCustomBooking(customBooking));

    customBooking.status = 'paid';
    await bookingFixtures.addBooking(makeCustomBooking(customBooking));
    await bookingFixtures.addBooking(makeCustomBooking(customBooking));

    request(application.httpServer)
      .get(`/bookings?partner=${partner.partner_id.value}&status=paid`)
      .set('accept', 'application/json')
      .type('json')
      .send()
      .expect(200)
      .then(async response => {
        await new Promise(resolve => setTimeout(resolve, 500));
        expect(JSON.parse(JSON.stringify(response.body.data)).length).toEqual(2);
        done();
      });
  });
});
