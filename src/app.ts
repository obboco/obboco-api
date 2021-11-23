import { ActivityMysqlRepository } from './Infrastructure/activityMysqlRepository copy';
import { CreateActivity } from './Application/Activity/createActivity';
import { Uuid } from './Domain/Shared/uuid';
import { PartnerMysqlRepository } from './Infrastructure/partnerMysqlRepository';
import express from 'express';
import { ulid } from 'ulid';
import { CreatePartner } from './Application/Partner/createPartner';

export const app = express();
app.use(express.json());

app.get('/healthcheck', (req, res) => {
  res.send('ok');
});

app.get('/*', (req, res) => {});

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
