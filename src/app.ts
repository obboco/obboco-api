import { FinishBookingSession } from './Application/Booking/finishBookingSession';
import { BookingMysqlRepository } from './Infrastructure/bookingMysqlRepository';
import { AddGuestBookingSession } from './Application/Booking/addGuesBookingSession';
import {
  InitBookingSession,
  InitBookingSessionResponse
} from './Application/Booking/initBookingSession';
import { GetEvent, BookingEventResponse } from './Application/Booking/getEvent';
import { Event } from './Domain/event';
import { ListEvent } from './Application/Event/listEvent';
import { EventMysqlRepository } from './Infrastructure/eventMysqlRepository';
import { CreateEvent } from './Application/Event/createEvent';
import { Activity } from './Domain/activity';
import { ListActivity } from './Application/Activity/listActivity';
import { ActivityMysqlRepository } from './Infrastructure/activityMysqlRepository';
import { CreateActivity } from './Application/Activity/createActivity';
import { Uuid } from './Domain/Shared/uuid';
import { PartnerMysqlRepository } from './Infrastructure/partnerMysqlRepository';
import express from 'express';
import cors from 'cors';
import { CreatePartner } from './Application/Partner/createPartner';
import { BookingSessionRedisRepository } from './Infrastructure/bookingRedisRepository';

export const app = express();
app.use(cors());
app.use(express.json());

app.get('/healthcheck', (req, res) => {
  res.send('ok');
});

// Partner
app.post('/partner', (req, res) => {
  const createPartner: CreatePartner = new CreatePartner(
    new PartnerMysqlRepository()
  );
  const partner_id: Uuid = createPartner.make(req);
  res.send({ partner_id: partner_id.value });
});

// Activity
app.post('/activity', (req, res) => {
  const createActivity: CreateActivity = new CreateActivity(
    new ActivityMysqlRepository()
  );
  const activity_id: Uuid = createActivity.make(req);
  res.send({ activity_id: activity_id.value });
});

app.get('/activity/user/:user_id', async (req, res) => {
  const listActivity: ListActivity = new ListActivity(
    new ActivityMysqlRepository()
  );
  const activities: Array<Activity> = await listActivity.make(
    req.params.user_id
  );
  res.send({ data: activities });
});

// Event
app.post('/event', (req, res) => {
  try {
    const createEvent: CreateEvent = new CreateEvent(
      new EventMysqlRepository()
    );
    const event_id: Uuid = createEvent.make(req);
    res.send({ event_id: event_id.value });
  } catch (error) {
    console.log(error);
  }
});

app.get('/event/activity/:activity_id', async (req, res) => {
  const listEvent: ListEvent = new ListEvent(new EventMysqlRepository());
  const events: Event[] = await listEvent.make(req.params.activity_id);
  res.send({ data: events });
});

//Booking
app.get('/booking/event/:event_id', async (req, res) => {
  const getEvent: GetEvent = new GetEvent(
    new EventMysqlRepository(),
    new ActivityMysqlRepository()
  );
  const result: BookingEventResponse = await getEvent.make(req.params.event_id);
  res.send({ data: result });
});

app.post('/booking/init', async (req, res) => {
  const initBooking: InitBookingSession = new InitBookingSession(
    new BookingSessionRedisRepository()
  );
  const result: InitBookingSessionResponse = await initBooking.make(
    req.body.event_id
  );
  res.send({ data: result });
});

app.post('/booking/guest', async (req, res) => {
  const addGuestBookingSession: AddGuestBookingSession =
    new AddGuestBookingSession(new BookingSessionRedisRepository());
  addGuestBookingSession.make(req);
  res.send({ data: 'ok' });
});

app.post('/booking/finish', async (req, res) => {
  const finishBookingSession: FinishBookingSession = new FinishBookingSession(
    new BookingSessionRedisRepository(),
    new BookingMysqlRepository()
  );
  finishBookingSession.make(req);
  res.send({ data: 'ok' });
});
