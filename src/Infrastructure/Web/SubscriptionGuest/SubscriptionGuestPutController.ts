import {Controller} from '../Controller';
import {Request, Response} from 'express';
import httpStatus from 'http-status';
import {UpdateSubscriptionGuest} from '../../../Application/SubscriptionGuest/UpdateSubscriptionGuest';
import {SubscriptionGuestMysqlRepository} from '../../Repository/SubscriptionGuestMysqlRepository';

export class SubscriptionGuestPutController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const updateSubscriptionGuest: UpdateSubscriptionGuest = new UpdateSubscriptionGuest(
      new SubscriptionGuestMysqlRepository()
    );
    updateSubscriptionGuest.make({
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
