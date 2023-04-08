import {CreateSubscriptionGuest} from '../../../Application/SubscriptionGuest/CreateSubscriptionGuest';
import {SubscriptionGuestMysqlRepository} from '../../Repository/SubscriptionGuestMysqlRepository';
import {Controller} from '../Controller';
import {Request, Response} from 'express';
import httpStatus from 'http-status';

export class SubscriptionGuestPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const createSubscriptionGuest: CreateSubscriptionGuest = new CreateSubscriptionGuest(
      new SubscriptionGuestMysqlRepository()
    );
    createSubscriptionGuest.make({
      subscription_guest_id: req.body.subscription_guest_id,
      subscription_id: req.body.subscription_id,
      partner_id: req.body.partner_id,
      guest_id: req.body.guest_id,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      status: req.body.status,
    });
    res.status(httpStatus.OK).send(this.toResponse());
  }
  private toResponse(): any {
    return {
      data: 'ok',
    };
  }
}
